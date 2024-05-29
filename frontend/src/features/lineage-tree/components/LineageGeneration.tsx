import React, { forwardRef, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import CardStyles from '../../../styles/cardAndListStyles.module.css'
import { LeanLineageNode, LineageNode } from "../../../types";
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import useChangeContentWidth from "../hooks/useChangeContentWidth";
import ItemCard from "../../../components/ItemCard";
import ItemCardInfo from "../../../components/ItemCardInfo";

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
  const [activeMateIndex, setActiveMateIndex] = useState<number[]>(children.length > 2 ? [0] : [0, 0]);
  const [activeIdOfAggregates, setActiveIdOfAggregates] = useState<string>("");
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("");
  const [isHoveringSiblingCounter, setIsHoveringSiblingCounter] = useState<boolean>(false);

  function getActiveNode() {
    return children.find(child => child.id === activeIdOfAggregates);
  }

  function getHoveredNode() {
    return children.find(child => child.id === hoveredNodeId);
  }

  const childrenRef = useRef<HTMLLIElement>(null)

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

  const prevActiveIndex = useRef<number[]>([0,0])
  const preHoverOrActiveLiWidth = useRef<number>(0)

  const isContractAnimating = useRef<boolean>(false)
  const isExpandAnimating = useRef<boolean>(false)

  useChangeContentWidth(
    childrenRef,
    preHoverOrActiveLiWidth.current,
    (Boolean(hoveredNodeId) || activeMateIndex[0] !== prevActiveIndex.current?.[0] || activeMateIndex[1] !== prevActiveIndex.current?.[1]) && !isContractAnimating.current, 
    [hoveredNodeId, activeMateIndex[0], activeMateIndex[1]],
    isExpandAnimating
  )

//  useChangeContentWidth(
//     childrenRef, 
//     preHoverOrActiveLiWidth.current, 
//     (Boolean(!hoveredNodeId && !activeIdOfAggregates) || activeMateIndex[0] !== prevActiveIndex.current?.[0] || activeMateIndex[1] !== prevActiveIndex.current?.[1]) && !isExpandAnimating.current, 
//     [hoveredNodeId, activeIdOfAggregates, activeMateIndex[0], activeMateIndex[1]],
//     isContractAnimating
//   )

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


  // let hoverTimeout:NodeJS.Timeout;

  const handleHover = (id?: string) => {
    // if (hoverTimeout) {
    //   clearTimeout(hoverTimeout)
    // }
 // if (!isExpandAnimating && !isContractAnimating) {
    preHoverOrActiveLiWidth.current = childrenRef.current?.offsetWidth || 0
    setHoveredNodeId(id || "")
  };

  const handleUnHover = () => {
      if (!activeIdOfAggregates) {
        preHoverOrActiveLiWidth.current = childrenRef.current?.offsetWidth || 0
      }
      setHoveredNodeId("")
  };


  const getNextParent = (nodePosition: number = 0) => {
    setActiveMateIndex(prevState => {
      const state = [...prevState];
      prevActiveIndex.current = [...state]
      const numberOfMates = children[nodePosition].mates.length
      state[nodePosition] = ((prevState[nodePosition]) + 1) % numberOfMates;
      preHoverOrActiveLiWidth.current = childrenRef.current?.offsetWidth || 0
      return state;
    });
  }

  const getPrevParent = (nodePosition: number = 0) => {
    setActiveMateIndex(prevState => {
      const state = [...prevState];
      prevActiveIndex.current = [...state]
      const numberOfMates = children[nodePosition].mates.length
      state[nodePosition] = Math.abs(prevState[nodePosition] - 1) % numberOfMates;
      preHoverOrActiveLiWidth.current = childrenRef.current?.offsetWidth || 0
      return state;
    });
  }

  const handleMouseEnterSiblingCounter = () => {
    setIsHoveringSiblingCounter(true)
  }

  const handleMouseLeaveSiblingCounter = () => {
    setIsHoveringSiblingCounter(false)
  }

  return (
    <ul 
      className={`${LineageTreeStyles.childrenContainer} ${shouldUnmount ? 'fadeOutElement' : 'fadeInElement'}`}
    >
      {children.length > 2 
        ? <li 
            ref={childrenRef} 
            className={`
            ${LineageTreeStyles.child}
            ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}
            `}
          >
            <div 
              className={`${activeIdOfAggregates && !getActiveNode()?.mates?.[activeMateIndex[0]]?.children.length ? LineageTreeStyles.hasNoChildren : LineageTreeStyles.parentsContainer}`}
              style={{width: `${activeIdOfAggregates ? 568 : 176 + ((children.length-1) * 44)}px`}}
              onMouseLeave={handleUnHover}
            >
              {children.map((node, index) => {
                return (
                  <>
                    <div className={`${LineageTreeStyles.fatherContainer} ${LineageTreeStyles.fatherContainerOfActive} ${activeIdOfAggregates === node.id ? `fadeInElement` : "fadeOutElement"}`}>
                      {node.mates.length > 1 && (
                        <div className={LineageTreeStyles.paginateMatesContainer}>
                          <ButtonWithHoverLabel label="Next Mate">
                            <button onClick={() => getNextParent()}><FontAwesomeIcon icon={faChevronUp} /></button>
                          </ButtonWithHoverLabel>
                          <ButtonWithHoverLabel label="Previous Mate">
                            <button onClick={() => getPrevParent()}><FontAwesomeIcon icon={faChevronDown} /></button>
                          </ButtonWithHoverLabel>
                        </div>
                      )}
                      <ItemCard 
                        key={index+node.mates[activeMateIndex[0]]?.id}
                        image={node.mates[activeMateIndex[0]]?.images?.[0]} 
                        id={node.mates[activeMateIndex[0]]?.id || ""} 
                        sizeStyles={CardStyles.smallCardSize} 
                        imageDimensions={{width: 176}} 
                        styles={`${LineageTreeStyles.nodeContent} ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}`}
                        handleHover={handleHover}
                        handleUnHover={handleUnHover}
                      >
                        <ItemCardInfo id={node.mates[activeMateIndex[0]]?.id || ""} onClick={displayInfoCard} name={node.mates[activeMateIndex[0]]?.name || "???"}/>
                      </ItemCard>
                    </div>
                  
                    <div 
                      style={{
                        transform: "translateX(" + computedXPositionsForAggregateNodes[index] + "px)"
                      }}
                      className={`${LineageTreeStyles.nodeContainer}
                        ${(activeIdOfAggregates && activeIdOfAggregates !== node.id) ? LineageTreeStyles.shaded: ""}
                        ${isParentBeingHovered || hoveredNodeId === node.id ? LineageTreeStyles.parentFocused: ""}
                      `}
                    >
                      <ItemCard
                        key={index+node.id}
                        image={node.images[0]} 
                        id={node.id} 
                        handleClick={!activeIdOfAggregates ? handleAggregateNodeClick : () => {}}
                        handleHover={handleHover} 
                        sizeStyles={CardStyles.smallCardSize} 
                        imageDimensions={{width: 176}} 
                        styles={`
                          ${LineageTreeStyles.nodeContent} 
                          ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""} 
                          ${!activeIdOfAggregates ? LineageTreeStyles.aggregateNode : LineageTreeStyles.activeNodeOfAggregates} 
                        `}
                      >
                        <>
                          {activeIdOfAggregates === node.id &&
                            <ButtonWithHoverLabel
                              positioningStyles={`${LineageTreeStyles.siblingCounter}`}
                              label={"show siblings"}
                            > 
                            <button 
                              className={LineageTreeStyles.expandSiblingsButton}
                              onClick={handleUnfocusAggregateNode} 
                              onMouseEnter={handleMouseEnterSiblingCounter}
                              onMouseLeave={handleMouseLeaveSiblingCounter}
                            >
                              {isHoveringSiblingCounter 
                              ? <FontAwesomeIcon icon={faPlus} className={`fadeInElement`} />
                              : children.length-1}
                            </button>
                            </ButtonWithHoverLabel>
                          }
                          <ItemCardInfo id={node.id} onClick={displayInfoCard} name={node.name || "???"}/>
                        </>
                      </ItemCard>
                    </div>
                    {(activeIdOfAggregates === node.id) && (
                      <ButtonWithHoverLabel
                        positioningStyles={getActiveNode()?.mates?.[activeMateIndex[0]]?.children.length || 0 > 0 ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                        label="Add child"
                      >
                        <button 
                          className={LineageTreeStyles.addChild}
                          onClick={
                            () => displayNewInfoCard(
                              {name: node.name, image: node.images[0], id: node.id},
                              {name: node.mates[activeMateIndex[0]]?.name, image: node.mates[activeMateIndex[0]]?.images?.[0], id: node.mates[activeMateIndex[0]]?.id}
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
            {(getHoveredNode()?.mates[activeMateIndex[0]]?.children.length || (getActiveNode()?.mates[activeMateIndex[0]]?.children.length || 0) > 0) && (
              <LineageGeneration 
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                children={
                  getHoveredNode()?.mates[activeMateIndex[0]]?.children.length ? 
                  getHoveredNode()?.mates[activeMateIndex[0]].children : 
                  getActiveNode()?.mates[activeMateIndex[0]].children 
                }
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
            ref={childrenRef}
          >
            <div className={`
              ${!node.mates[activeMateIndex[index]]?.children.length ? LineageTreeStyles.hasNoChildren : LineageTreeStyles.parentsContainer}
              ${isParentBeingHovered || hoveredNodeId === node.id ? LineageTreeStyles.parentFocused : ""}
              `}>
              {/* need to maintain width */}
              {node.mates[activeMateIndex[index]]?.children.length > 0 &&
                <span className={`${LineageTreeStyles.pseudoContainer}`}>
                </span>
              }
              <ItemCard 
                key={index+node.id}
                image={node.images[0]} 
                id={node.id} 
                sizeStyles={CardStyles.smallCardSize} 
                imageDimensions={{width: 176}} 
                styles={`${LineageTreeStyles.nodeContent} ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}`}
                handleHover={handleHover}
                handleUnHover={handleUnHover}
              >
                <ItemCardInfo id={node.id} onClick={displayInfoCard} name={node.name}/>
              </ItemCard>

              <ButtonWithHoverLabel
                positioningStyles={node.mates[activeMateIndex[index]]?.children.length ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                label="Add child"
              >
                <button 
                  className={LineageTreeStyles.addChild}
                  onClick={() => displayNewInfoCard(
                    {name: node.name, image: node.images[0], id: node.id},
                    {name: node.mates[activeMateIndex[index]]?.name, image: node.mates[activeMateIndex[index]]?.images?.[0], id: node.mates[activeMateIndex[index]]?.id}
                  )}
                  >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </ButtonWithHoverLabel>
              {node.mates[activeMateIndex[index]]?.children.length > 0 &&
                <span className={`${LineageTreeStyles.fatherContainer} ${`fadeInElement`}`}>
                  {node.mates.length > 1 && (
                    <div className={LineageTreeStyles.paginateMatesContainer}>
                      <ButtonWithHoverLabel label="Next Mate">
                        <button onClick={() => getNextParent(index)}><FontAwesomeIcon icon={faChevronUp} /></button>
                      </ButtonWithHoverLabel>
                      <ButtonWithHoverLabel label="Previous Mate">
                        <button onClick={() => getPrevParent(index)}><FontAwesomeIcon icon={faChevronDown} /></button>
                      </ButtonWithHoverLabel>
                    </div>
                  )}

                  <ItemCard 
                    image={node?.mates[activeMateIndex[index]]?.images?.[0]} 
                    id={node.mates[activeMateIndex[index]]?.id}
                    sizeStyles={CardStyles.smallCardSize} 
                    imageDimensions={{width: 176}} 
                    styles={`${LineageTreeStyles.nodeContent} ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}`}
                  >
                    <ItemCardInfo id={node.mates[activeMateIndex[index]]?.id} onClick={displayInfoCard} name={node.mates[activeMateIndex[index]]?.name || "???"}/>
                  </ItemCard>
                </span>
              }
            </div>
        
            {node.mates[activeMateIndex[index]]?.children.length 
            ? <LineageGeneration 
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                children={node.mates[activeMateIndex[index]]?.children} 
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

