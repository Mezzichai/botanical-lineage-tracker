import React, { forwardRef, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import TreeNode from "./TreeNode";
import LineageAggregateNode from "./LineageAggregateNode";
import { LeanLineageNode, LineageNode } from "../../../types";
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useChangeContentWidth from "../hooks/useChangeContentWidth";



type Props = {
  children: LineageNode[];
  invalidateParentWidth?: (newULwidth:number | undefined) => void;
  shouldUnmount?: boolean;
  isParentBeingHovered?: boolean;
  displayInfoCard: (id: string) => void
  displayNewInfoCard: (mother: LeanLineageNode, father: LeanLineageNode) => void
}


const LineageGeneration: React.FC<Props> = forwardRef(({children, displayInfoCard, displayNewInfoCard, shouldUnmount, isParentBeingHovered=false}) => {
  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeMateIndexes, setActiveIndexes] = useState<number>(0);
  const [activeIdOfAggregates, setActiveIdOfAggregates] = useState<string>("");
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("");

  function getActiveNode() {
    return children.find(child => child.id === activeIdOfAggregates);
  }

  function getHoveredNode() {
    return children.find(child => child.id === hoveredNodeId);
  }

  const aggregateChildrenRef = useRef<HTMLLIElement>(null)

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


  const preHoverOrActiveLiWidth = useRef<number>(0)
  const isExpandAnimating = useChangeContentWidth(aggregateChildrenRef.current, preHoverOrActiveLiWidth.current, Boolean(hoveredNodeId), [hoveredNodeId])
  const isContractAnimating = useChangeContentWidth(aggregateChildrenRef.current, preHoverOrActiveLiWidth.current, Boolean(!hoveredNodeId && !activeIdOfAggregates), [hoveredNodeId, activeIdOfAggregates])

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

    // setTimeout(() => {
      // if (doesHoveredOrActiveNodeHaveChildren) {
      //   changeWidth(0)
      // }
      setShouldActiveNodeChildrenUnmount(false);
      setActiveIdOfAggregates("");
    // }, 300);  
  };


  let hoverTimeout:NodeJS.Timeout;
  const handleHover = (id: string) => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    // if (!isExpandAnimating && !isContractAnimating) {
      preHoverOrActiveLiWidth.current = aggregateChildrenRef.current?.offsetWidth || 0
      setHoveredNodeId(id)
  };

  const handleUnHover = () => {
      if (!activeIdOfAggregates) {
        preHoverOrActiveLiWidth.current = aggregateChildrenRef.current?.offsetWidth || 0
      }
      setHoveredNodeId("")
  };



  return (
    <ul 
      className={`${LineageTreeStyles.childrenContainer} ${shouldUnmount ? 'fadeOutElement' : 'fadeInElement'}`}
    >
      {children.length > 2 
        ? <li 
            ref={aggregateChildrenRef} 
            className={`
            ${LineageTreeStyles.child} ${LineageTreeStyles.aggregateChildren}
            ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}
            `}
          >
            <div 
              className={`${activeIdOfAggregates && !getActiveNode()?.children.length ? LineageTreeStyles.hasNoChildren : LineageTreeStyles.parentsContainer}`}
              style={{width: `${176 + ((children.length-1) * 44)}px`}}
              onMouseLeave={handleUnHover}
            >
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
                shouldUnmount={shouldActiveNodeChildrenUnmount}
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

