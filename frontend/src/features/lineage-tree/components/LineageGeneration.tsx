import React, { forwardRef, useCallback, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import TreeNode from "./TreeNode";
import LineageAggregateNode from "./LineageAggregateNode";
import useInvalidateParentWidthRefCallback from "../hooks/useInvalidateParentWidthCallback";
import { LeanLineageNode, LineageNode } from "../../../types";
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
  displayNewInfoCard: (mother: LeanLineageNode, father: LeanLineageNode) => void
}

//todo: 
// 1. add cascading hover effects (must use state for this)
// 2. make it so after a node is selected, the width of the ul may become even smaller (done?)
// 3. adjust for larger aggregate containers
// 4. clean up change widths

const LineageGeneration: React.FC<Props> = forwardRef(({children, displayInfoCard, displayNewInfoCard, handleChangeWidths, widthTree, shouldUnmount, refCallbackFromAggregateNodes, isParentBeingHovered=false}) => {
  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeMateIndexes, setActiveIndexes] = useState<number>(0);
  const [activeIdOfAggregates, setActiveIdOfAggregates] = useState<string>();
  const [hoveredNodeId, setHoveredNodeId] = useState<string>();

  function getActiveNode() {
    return children.find(child => child.id === activeIdOfAggregates);
  }

  function getHoveredNode() {
    return children.find(child => child.id === hoveredNodeId);
  }


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
  if (!width && activeIdOfAggregates) {
    width = 176
  }



  const aggregateChildrenRef = useRef<HTMLLIElement | null>(null)

  const childrenWithChildrenIds = children
    .filter(child => child?.children?.length !== 0)
    .map(child => child.id)

  const doesHoveredOrActiveNodeHaveChildren = 
  (activeIdOfAggregates && childrenWithChildrenIds.includes(activeIdOfAggregates)) ||
  (childrenWithChildrenIds.includes(hoveredNodeId || ""))


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
   
    const newWidth = findWidthOfAggregateContainer(newULwidth);
    console.log(newWidth)
    handleChangeWidths(newWidth, aggregateNodesId, aggregateChildrenRef.current?.offsetWidth || 0);
  }, [findWidthOfAggregateContainer, handleChangeWidths, aggregateNodesId]);

  const [ulRefCB] = useInvalidateParentWidthRefCallback(changeWidth);

  const computeXPositioningInOrder = (childrenCount: number, offset: number) => {
    let positions: number[] = [];
    const center = Math.floor(childrenCount / 2);
    let minOffset = 0;
    if (childrenCount % 2 === 0) {
      minOffset = Math.floor(offset/2);
    }
    let currentOffset = (center * offset) - minOffset;

    while (currentOffset >= -(center * offset) + minOffset) {
      if (childrenCount % 2 === 0 && (currentOffset <= 0 && currentOffset > -minOffset)) {
        currentOffset -= offset;
        continue
      }
      positions.push(currentOffset);
      currentOffset -= offset;
    }

    if (activeIdOfAggregates) {
      positions = positions.map(() => {
        return 0
      });
    }
    return positions
  }

  
  let computedXPositionsForAggregateNodes: number[];

  if (children.length > 2) {
    computedXPositionsForAggregateNodes = computeXPositioningInOrder(children.length, 44)
  }



  const handleAggregateNodeClick = (id: string) => {
    setActiveIdOfAggregates(state => {
      if (!activeIdOfAggregates) {
        return id
      }
      return state
    })
  };


  const handleUnfocusAggregateNode = () => {
    setShouldActiveNodeChildrenUnmount(true);

    setTimeout(() => {
      if (doesHoveredOrActiveNodeHaveChildren) {
        changeWidth(0)
      }
      setShouldActiveNodeChildrenUnmount(false);
      setActiveIdOfAggregates(undefined);
    }, 300);  
  };


  let hoverTimeout:NodeJS.Timeout;
  const handleHover = (id: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    hoverTimeout = setTimeout(() => {
      setHoveredNodeId(id)
    }, 0);
  };

  const handleUnHover = () => {
    if (!activeIdOfAggregates) {
      if (doesHoveredOrActiveNodeHaveChildren) {
        changeWidth(0)
      }
    }
    setHoveredNodeId(undefined)
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
            <div className={`${activeIdOfAggregates && !getActiveNode()?.children.length ? LineageTreeStyles.hasNoChildren : LineageTreeStyles.parentsContainer}`}>
              {/* needed to maintain the aggregate nodes height and width in document */}
              <span className={`${LineageTreeStyles.pseudoContainer}`}>
              </span>          
            
              {children.map((node, index) => {
                return (
                  <>
                    {(node.mates.length > 0) &&
                      <div className={`${LineageTreeStyles.fatherContainer} ${LineageTreeStyles.fatherContainerOfActive} ${activeIdOfAggregates === node.id ? `fadeInElement` : "fadeOutElement"}`}>
                        <TreeNode 
                          displayInfoCard={displayInfoCard}
                          image={node.mates[activeMateIndexes]?.images[0]} 
                          id={node.mates[0]?.id || ""} 
                          name ={node.mates[0]?.name || "???"} 
                        />
                      </div>
                    }
                    <div 
                      style={{
                        transform: "translateX(" + computedXPositionsForAggregateNodes[index] + "px)"
                      }}
                      className={`${LineageTreeStyles.nodeContainer}
                        ${(activeIdOfAggregates && activeIdOfAggregates !== node.id) ? LineageTreeStyles.shaded: ""}
                        ${isParentBeingHovered || hoveredNodeId === node.id ? LineageTreeStyles.parentFocused: ""}
                      `}
                    >
                      <LineageAggregateNode
                        key={index+node.id}
                        image={node.images[0]} 
                        id={node.id} 
                        name={node.name} 
                        handleNodeClick={activeIdOfAggregates ? displayInfoCard : handleAggregateNodeClick}
                        handleHover={handleHover} 
                        handleUnHover={handleUnHover} 
                        activeOfAggregatesId={activeIdOfAggregates}
                        siblingCount={children.length-1}
                        father={node?.mates[activeMateIndexes]}
                        handleShowSiblings={handleUnfocusAggregateNode}
                      />
                    </div>
                    {(activeIdOfAggregates === node.id) && (
                      <ButtonWithHoverLabel
                        positioningStyles={getActiveNode()?.children?.length || 0 > 0 ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                        label="Add child"
                      >
                        <button 
                          className={LineageTreeStyles.addChild}
                          onClick={
                            () => displayNewInfoCard(
                              {name: node.name, images: node.images[0], id: node.id},
                              {name: node.mates[activeMateIndexes]?.name, images: node.mates[activeMateIndexes]?.images[0], id: node.mates[activeMateIndexes]?.id}
                            )}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </ButtonWithHoverLabel>
                    )}
                  </>
                )}
              )}    
            </div>
            {(getHoveredNode()?.children.length || (getActiveNode()?.children.length || 0) > 0) && (
              <LineageGeneration 
                refCallbackFromAggregateNodes={aggregateNodesChildUlRefCallback}
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                handleChangeWidths={handleChangeWidths}
                widthTree={widthTree}
                children={getHoveredNode()?.children.length ? getHoveredNode()?.children : getActiveNode()?.children}
                isParentBeingHovered={isParentBeingHovered || Boolean(hoveredNodeId)}
                displayInfoCard={displayInfoCard}
                displayNewInfoCard={displayNewInfoCard}
              />
            )}
          </li>

        : children.map((node, index) => (
          <li 
            className={`${LineageTreeStyles.child} fadeInElement`} 
            key={node.id + index} 
          >
            <div className={`
              ${!node.children.length ? LineageTreeStyles.hasNoChildren : LineageTreeStyles.parentsContainer}
              ${isParentBeingHovered || hoveredNodeId === node.id ? LineageTreeStyles.parentFocused : ""}

              `}>
              {/* need to maintain width */}
              {node.children.length > 0 &&
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
                  onClick={() => displayNewInfoCard(
                    {name: node.name, images: node.images[0], id: node.id},
                    {name: node.mates[activeMateIndexes]?.name, image: node.mates[activeMateIndexes]?.images[0], id: node.mates[activeMateIndexes]?.id}
                  )}
                  >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </ButtonWithHoverLabel>
              {node.children.length > 0 &&
                <span className={`${LineageTreeStyles.fatherContainer} ${`fadeInElement`}`}>
                  <TreeNode 
                    image={node?.mates[activeMateIndexes]?.images[0]} 
                    id={node?.mates[0]?.id || ""} 
                    name ={node?.mates[0]?.name || "???"} 
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
                isParentBeingHovered={isParentBeingHovered || hoveredNodeId === node.id}
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

