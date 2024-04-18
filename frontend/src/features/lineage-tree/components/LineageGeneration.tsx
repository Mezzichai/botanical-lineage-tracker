import React, { forwardRef, useCallback, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import TreeNode from "./TreeNode";
import LineageAggregateNode from "./LineageAggregateNode";
import useInvalidateParentWidthRefCallback from "../hooks/useInvalidateParentWidthCallback";
import { LineageNode } from "../types";
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



type Props = {
  children: LineageNode[];
  invalidateParentWidth?: (newULwidth:number | undefined) => void;
  widthTree: LineageNode[];
  handleChangeWidths: (newWidth: number, ulParentId: string, oldWidth: number) => void;
  shouldUnmount?: boolean;
  refCallbackFromAggregateNodes?: (node: HTMLUListElement) => void;
  displayInfoCard: (cardId: string) => void
  displayNewInfoCard: (motherId?: LineageNode, fatherId?: LineageNode) => void
}

//todo: 
// 1. add cascading hover effects (must use state for this)
// 2. make it so after a node is selected, the width of the ul may become even smaller (done?)
// 3. adjust for larger aggregate containers
// 4. clean up change widths

const LineageGeneration: React.FC<Props> = forwardRef(({children, handleChangeWidths, widthTree, shouldUnmount, refCallbackFromAggregateNodes, displayInfoCard, displayNewInfoCard}) => {
  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeNodeOfAggregates, setActiveNodeOfAggregates] = useState<LineageNode>();
  const [hoveredNode, setHoveredNode] = useState<LineageNode>();

  let width: number | undefined;

  function searchWidths(nodes: LineageNode[]): number | undefined{
    if (nodes.length > 2) {
      if (nodes[0]._id === children[0]._id) {
        return nodes[0].width
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const search = searchWidths(nodes[i].children)
      if (search) {
        return search
      }
    }
  }

  if (children.length > 2) {
    width = searchWidths(widthTree)
  }
  if (!width && activeNodeOfAggregates?._id) {
    width = 176
  }

  const aggregateChildrenRef = useRef<HTMLLIElement | null>(null)

  const childrenWithChildrenIds = children
    .filter(child => child.children.length !== 0)
    .map(child => child._id)

  const doesHoveredOrActiveNodeHaveChildren = 
  (activeNodeOfAggregates?._id && childrenWithChildrenIds.includes(activeNodeOfAggregates._id)) ||
  (childrenWithChildrenIds.includes(hoveredNode?._id || ""))


  const findWidthOfAggregateContainer = useCallback((newULwidth: number) => {
    let liMinWidth = Math.max(
      133 + (children.length * 44),
      doesHoveredOrActiveNodeHaveChildren ? 176 + 395 : 0,
      newULwidth || 0
    )
    if (newULwidth === 0) {
      liMinWidth = 133 + (children.length * 44)
    }
    
    return liMinWidth
  }, [children.length, doesHoveredOrActiveNodeHaveChildren])

  const aggregateNodesId = children[0]._id
  const changeWidth = useCallback((newULwidth: number) => {
    const newWidth = findWidthOfAggregateContainer(newULwidth)
      handleChangeWidths(newWidth, aggregateNodesId, aggregateChildrenRef.current?.offsetWidth || 0)
  }, [findWidthOfAggregateContainer, handleChangeWidths, aggregateNodesId])

  const [ulRefCB] = useInvalidateParentWidthRefCallback(changeWidth)

  const computeXPositioningInOrder = (childrenCount: number, offset: number) => {
    let positions: number[] = []
    const center = Math.floor(childrenCount / 2)
    let minOffset = 0;
    if (childrenCount % 2 === 0) {
      minOffset = Math.floor(offset/2)
    }
    let currentOffset = (center * offset) - minOffset

    while (currentOffset >= -(center * offset) + minOffset) {
      if (childrenCount % 2 === 0 && (currentOffset <= 0 && currentOffset > -minOffset)) {
        currentOffset -= offset
        continue
      }
      positions.push(currentOffset)
      currentOffset -= offset
    }

    if (activeNodeOfAggregates) {
      positions = positions.map(() => {
        return 0
      })
    }
    return positions
  }

  
  let computedXPositionsForAggregateNodes: number[];

  if (children.length > 2) {
    computedXPositionsForAggregateNodes = computeXPositioningInOrder(children.length, 44)
  }



  const handleNodeClick = (id: string) => {
    if (!activeNodeOfAggregates) {
      setActiveNodeOfAggregates(children.find(child => child._id === id))
    }
  };

  const handleUnfocusAggregateNode = () => {
    setShouldActiveNodeChildrenUnmount(true);

    setTimeout(() => {
      if (doesHoveredOrActiveNodeHaveChildren) {
        changeWidth(0)
      }
      setShouldActiveNodeChildrenUnmount(false);
      setActiveNodeOfAggregates(() => undefined);
    }, 300);  
  };


  let hoverTimeout:NodeJS.Timeout;
  const handleHover = (id: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    hoverTimeout = setTimeout(() => {
      setHoveredNode(children.find(child => child._id === id))
    }, 0);
  };

  const handleUnHover = () => {
    if (!activeNodeOfAggregates) {
      if (doesHoveredOrActiveNodeHaveChildren) {
        changeWidth(0)
      }
    }
    setHoveredNode(undefined)
  };

  const handleNewChild = (mother?:LineageNode, father?:LineageNode) => {
    displayNewInfoCard(mother, father)
  }


  type Props = {
    ref?: (node: HTMLUListElement) => void;
  }

  const ulRefProp: Props = {};

  if (refCallbackFromAggregateNodes) {
    ulRefProp["ref"] = refCallbackFromAggregateNodes
  }

  const aggregateNodesChildUlRefCallback = useCallback((node: HTMLUListElement) => ulRefCB(node), [ulRefCB])
  
  return  (
    <ul 
      className={`${LineageTreeStyles.childrenContainer} ${shouldUnmount ? 'fadeOutElement' : 'fadeInElement'}`}
      {...ulRefProp}
    >
      {children.length > 2 
        ? <li 
            ref={aggregateChildrenRef} 
            className={`${LineageTreeStyles.child} ${LineageTreeStyles.aggregateChildren}`}
            style={{width: `${width || 133 + (children.length * 44)}px`}} 
          >
            {/* needed to maintain the aggregate nodes height in document */}
            <div style={{position: "relative", height: "165.71px"}}></div>
            
            {children.map((node, index) => {
              return (
                <>
                  {(node?.children[0]?.father) &&
                    <div className={`${LineageTreeStyles.fatherContainer} ${LineageTreeStyles.fatherContainerOfActive} ${activeNodeOfAggregates?._id === node._id ? `fadeInElement` : "fadeOutElement"}`}>
                      <TreeNode 
                        image={node.children[0]?.father.image} 
                        _id={node.children[0].father._id || ""} 
                        title ={node.children[0].father.title || ""} 
                        displayInfoCard={displayInfoCard}                     
                      />
                    </div>
                  }
                  <div 
                    style={{
                      transform: "translateX(" + computedXPositionsForAggregateNodes[index] + "px)",
                    }}
                    className={`${LineageTreeStyles.nodeContainer}
                      ${(activeNodeOfAggregates?._id && activeNodeOfAggregates._id !== node._id) ? LineageTreeStyles.shaded: ""}
                    `}
                  >
                    <LineageAggregateNode
                      key={index+node._id}
                      image={node.image} 
                      _id={node._id} 
                      title={node.title} 
                      handleNodeClick={handleNodeClick}
                      handleHover={handleHover} 
                      handleUnHover={handleUnHover} 
                      activeOfAggregatesId={activeNodeOfAggregates?._id}
                      siblingCount={children.length-1}
                      father={node?.children[0]?.father}
                      handleShowSiblings={handleUnfocusAggregateNode}
                    />
                  </div>
                  {activeNodeOfAggregates?._id && (
                    <ButtonWithHoverLabel
                      positioningStyles={LineageTreeStyles.addChildPosition}
                      label="Add child"
                    >
                      <button 
                        className={LineageTreeStyles.addChild}
                        onClick={() => handleNewChild({...node, children: []}, node?.children[0]?.father)}
                        >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </ButtonWithHoverLabel>
                  )}
                 
                </>
              )}
            )}    

            {hoveredNode?.children.length ? (
              <LineageGeneration 
                refCallbackFromAggregateNodes={aggregateNodesChildUlRefCallback}
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                handleChangeWidths={handleChangeWidths}
                widthTree={widthTree}
                children={hoveredNode.children}
                displayInfoCard={displayInfoCard}
                displayNewInfoCard={displayNewInfoCard}

              /> 
            ) : (
            activeNodeOfAggregates?.children.length ? (
              <LineageGeneration 
                refCallbackFromAggregateNodes={aggregateNodesChildUlRefCallback}
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                handleChangeWidths={handleChangeWidths}
                widthTree={widthTree}
                children={activeNodeOfAggregates.children}
                displayInfoCard={displayInfoCard}
                displayNewInfoCard={displayNewInfoCard}

              />
            ) : null)}
          </li>

        : children.map((node, index) => (
          <li 
            className={`${LineageTreeStyles.child} fadeInElement`} 
            key={node._id + index} 
          >
            <div className={`${LineageTreeStyles.parentsContainer} ${!node.children.length ? LineageTreeStyles.paddingForAddingChildren : ""}`}>
              {/* need to maintain width */}
              {(node?.children[0]?.father) &&
                <span className={`${LineageTreeStyles.pseudoContainer}`}>
                </span>
              }
              <TreeNode
                key={index+node._id}
                image={node.image} 
                _id={node._id} 
                title ={node.title} 
                displayInfoCard={displayInfoCard}
              />
              <ButtonWithHoverLabel
                positioningStyles={node.children.length ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                label="Add child"
              >
                <button 
                  className={LineageTreeStyles.addChild}
                  onClick={() => handleNewChild({...node, children:[]}, node?.children[0]?.father)}
                  >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </ButtonWithHoverLabel>
              {(node?.children[0]?.father) &&
                <span className={`${LineageTreeStyles.fatherContainer} ${`fadeInElement`}`}>
                  <TreeNode 
                    image={node.children[0]?.father.image} 
                    _id={node.children[0].father._id || ""} 
                    title ={node.children[0].father.title || ""} 
                    displayInfoCard={displayInfoCard}                     
                  />
                </span>
              }
            </div>
        
            {node.children.length 
            ? <LineageGeneration 
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                handleChangeWidths={handleChangeWidths}
                widthTree={widthTree}
                children={node.children} 
                displayInfoCard={displayInfoCard}
                displayNewInfoCard={displayNewInfoCard}

              /> 
            : null}
          </li>
        ))
      }
    </ul> 
  )
})

export default LineageGeneration

