import React, { forwardRef, useCallback, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import TreeNode from "./TreeNode";
import LineageAggregateNode from "./LineageAggregateNode";
import useInvalidateParentWidthRefCallback from "../hooks/useInvalidateParentWidthCallback";
import { LineageNode } from "../../../types";
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
  isParentBeingHovered?: boolean;
  displayInfoCard: (id: string) => void
  displayNewInfoCard: (mother: LineageNode | undefined, father: LineageNode | undefined) => void
}

//todo: 
// 1. add cascading hover effects (must use state for this)
// 2. make it so after a node is selected, the width of the ul may become even smaller (done?)
// 3. adjust for larger aggregate containers
// 4. clean up change widths

const LineageGeneration: React.FC<Props> = forwardRef(({children, displayInfoCard, displayNewInfoCard, handleChangeWidths, widthTree, shouldUnmount, refCallbackFromAggregateNodes, isParentBeingHovered=false}) => {
  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeNodeOfAggregates, setActiveNodeOfAggregates] = useState<LineageNode>();
  const [hoveredNode, setHoveredNode] = useState<LineageNode>();
  
  let width: number | undefined;

  function searchWidths(nodes: LineageNode[]): number | undefined{
    if (nodes.length > 2) {
      if (nodes[0].id === children[0].id) {
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
  if (!width && activeNodeOfAggregates?.id) {
    width = 176
  }

  const aggregateChildrenRef = useRef<HTMLLIElement | null>(null)

  const childrenWithChildrenIds = children
    .filter(child => child.children.length !== 0)
    .map(child => child.id)

  const doesHoveredOrActiveNodeHaveChildren = 
  (activeNodeOfAggregates?.id && childrenWithChildrenIds.includes(activeNodeOfAggregates.id)) ||
  (childrenWithChildrenIds.includes(hoveredNode?.id || ""))


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

  const aggregateNodesId = children[0].id
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



  const handleAggregateNodeClick = (id: string) => {
    if (!activeNodeOfAggregates) {
      setActiveNodeOfAggregates(children.find(child => child.id === id))
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
      setHoveredNode(children.find(child => child.id === id))
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



  type refProps = {
    ref?: (node: HTMLUListElement) => void;
  }

  const ulRefProp: refProps = {};

  if (refCallbackFromAggregateNodes) {
    ulRefProp["ref"] = refCallbackFromAggregateNodes
  }

  const aggregateNodesChildUlRefCallback = useCallback((node: HTMLUListElement) => ulRefCB(node), [ulRefCB])
  
  return (
    <ul 
      className={`${LineageTreeStyles.childrenContainer} ${shouldUnmount ? 'fadeOutElement' : 'fadeInElement'}`}
      {...ulRefProp}
    >
      {children.length > 2 
        ? <li 
            ref={aggregateChildrenRef} 
            className={`
            ${LineageTreeStyles.child} ${LineageTreeStyles.aggregateChildren}
            ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}
            `}
            style={{width: `${width || 133 + (children.length * 44)}px`}} 
          >
            {/* needed to maintain the aggregate nodes height in document */}
            <div style={{position: "relative", height: "165.71px"}}></div>
            
            {children.map((node, index) => {
              return (
                <>
                  {(node?.children[0]?.father) &&
                    <div className={`${LineageTreeStyles.fatherContainer} ${LineageTreeStyles.fatherContainerOfActive} ${activeNodeOfAggregates?.id === node.id ? `fadeInElement` : "fadeOutElement"}`}>
                      <TreeNode 
                        displayInfoCard={displayInfoCard}
                        image={node.children[0]?.father.images[0]} 
                        id={node.children[0].father.id || ""} 
                        name ={node.children[0].father.name || ""} 
                      />
                    </div>
                  }
                  <div 
                    style={{
                      transform: "translateX(" + computedXPositionsForAggregateNodes[index] + "px)",
                    }}
                    className={`${LineageTreeStyles.nodeContainer}
                      ${(activeNodeOfAggregates?.id && activeNodeOfAggregates.id !== node.id) ? LineageTreeStyles.shaded: ""}
                      ${isParentBeingHovered || hoveredNode?.id === node.id ? LineageTreeStyles.parentFocused: ""}
                      `}
                  >
                    <LineageAggregateNode
                      key={index+node.id}
                      image={node.images[0]} 
                      id={node.id} 
                      name={node.name} 
                      handleNodeClick={activeNodeOfAggregates?.id ? displayInfoCard : handleAggregateNodeClick}
                      handleHover={handleHover} 
                      handleUnHover={handleUnHover} 
                      activeOfAggregatesId={activeNodeOfAggregates?.id}
                      siblingCount={children.length-1}
                      father={node?.children[0]?.father}
                      handleShowSiblings={handleUnfocusAggregateNode}
                      
                    />
                  </div>
                  {activeNodeOfAggregates?.id && (
                    <ButtonWithHoverLabel
                      positioningStyles={LineageTreeStyles.addChildPosition}
                      label="Add child"
                    >
                      <button 
                        className={LineageTreeStyles.addChild}
                        onClick={() => displayNewInfoCard({...node, children: []}, node?.children[0]?.father)}
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
                isParentBeingHovered={isParentBeingHovered || Boolean(hoveredNode?.id)}
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
                isParentBeingHovered={isParentBeingHovered || Boolean(hoveredNode?.id)}
                displayInfoCard={displayInfoCard}
                displayNewInfoCard={displayNewInfoCard}
              />
            ) : null)}
          </li>

        : children.map((node, index) => (
          <li 
            className={`${LineageTreeStyles.child} fadeInElement`} 
            key={node.id + index} 
          >
            <div className={`
              ${LineageTreeStyles.parentsContainer} 
              ${!node.children.length ? LineageTreeStyles.paddingForAddingChildren : ""}
              ${isParentBeingHovered || hoveredNode?.id === node.id ? LineageTreeStyles.parentFocused : ""}

              `}>
              {/* need to maintain width */}
              {(node?.children[0]?.father) &&
                <span className={`${LineageTreeStyles.pseudoContainer}`}>
                </span>
              }
              <TreeNode
                key={index+node.id}
                image={node.images[0]} 
                id={node.id} 
                name ={node.name} 
                displayInfoCard={displayInfoCard}
                handleHover={handleHover}
                handleUnHover={handleUnHover}
              />
              <ButtonWithHoverLabel
                positioningStyles={node.children.length ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                label="Add child"
              >
                <button 
                  className={LineageTreeStyles.addChild}
                  onClick={() => displayNewInfoCard({...node, children: []}, node?.children[0]?.father)}
                  >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </ButtonWithHoverLabel>
              {(node?.children[0]?.father) &&
                <span className={`${LineageTreeStyles.fatherContainer} ${`fadeInElement`}`}>
                  <TreeNode 
                    image={node.children[0]?.father.images[0]} 
                    id={node.children[0].father.id || ""} 
                    name ={node.children[0].father.name || ""} 
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
                isParentBeingHovered={isParentBeingHovered || hoveredNode?.id === node.id}
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

