import React, { forwardRef, useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import TreeNode from "./TreeNode";
import LineageAggregateNode from "./LineageAggregateNode";
import { LeanLineageNode, LineageNode } from "../../../types";
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import useChangeContentWidth from "../hooks/useChangeContentWidth";
import TreeNodeInfo from "./TreeNodeInfo";



type Props = {
  children: LineageNode[];
  invalidateParentWidth?: (newULwidth:number | undefined) => void;
  shouldUnmount?: boolean;
  isParentBeingHovered?: boolean;
  displayInfoCard: (id: string) => void
  displayNewInfoCard: (mother: LeanLineageNode, father: LeanLineageNode) => void
}


const LineageGeneration: React.FC<Props> = forwardRef(({children, displayInfoCard, displayNewInfoCard, shouldUnmount, isParentBeingHovered=false}) => {
  // const { speciesId } = useParams({ strict: false})

  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeMateIndex, setActiveMateIndex] = useState<number[]>(children.length > 2 ? [0] : [0, 0]);
  const [activeIdOfAggregates, setActiveIdOfAggregates] = useState<string>("");
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("");
  // const { data: childrenOfFirstPairData} = useGetNestedChildrenOfPairQuery({
  //   speciesId: speciesId, 
  //   motherId: activeIdOfAggregates || children[0]?.id, 
  //   fatherId: activeIdOfAggregates ? getActiveNode()?.mates[activeMateIndex[0]]?.id : children[0]?.mates[activeMateIndex[0]]?.id
  // }, { skip: Boolean(!activeMateIndex[0]) });
  
  // const {data: childrenOfSecondPairData} = useGetNestedChildrenOfPairQuery({
  //   speciesId: speciesId, 
  //   motherId: children[1]?.id, 
  //   fatherId: children[1]?.mates[activeMateIndex[1]]?.id
  // }, { skip: Boolean(!activeMateIndex[1]) });

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


  const getNextParent = (nodePosition: number = 0) => {
    setActiveMateIndex(prevState => {
      const state = [...prevState];
      const numberOfMates = children[nodePosition].mates.length
      state[nodePosition] = ((prevState[nodePosition]) + 1) % numberOfMates;
      return state;
    });
  }

  const getPrevParent = (nodePosition: number = 0) => {
    setActiveMateIndex(prevState => {
      const state = [...prevState];
      const numberOfMates = children[nodePosition].mates.length
      state[nodePosition] = Math.abs(prevState[nodePosition] - 1) % numberOfMates;
      return state;
    });
  }

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
                      <TreeNode
                        key={index+node.mates[0]?.id}
                        image={node.mates[activeMateIndex[0]]?.images?.[0]} 
                        id={node.mates[activeMateIndex[0]]?.id || ""} 
                        displayInfoCard={displayInfoCard}
                        handleHover={handleHover}
                      >
                        <TreeNodeInfo onClick={() => displayInfoCard(node.mates[activeMateIndex[0]]?.id)} name={node.mates[activeMateIndex[0]]?.name || "???"}/>
                      </TreeNode>
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
                      <LineageAggregateNode
                        key={index+node.id}
                        image={node.images[0]} 
                        id={node.id} 
                        name={node.name} 
                        handleNodeClick={activeIdOfAggregates ? displayInfoCard : handleAggregateNodeClick}
                        handleHover={handleHover} 
                        activeOfAggregatesId={activeIdOfAggregates}
                        siblingCount={children.length-1}
                        handleShowSiblings={handleUnfocusAggregateNode}
                      />
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
                              {name: node.mates[activeMateIndex[0]]?.name, image: node.mates[activeMateIndex[0]]?.images[0], id: node.mates[activeMateIndex[0]]?.id}
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
              <TreeNode
                key={index+node.id}
                image={node.images[0]} 
                id={node.id} 
                displayInfoCard={displayInfoCard}
                handleHover={handleHover}
                handleUnHover={handleUnHover}
              >
                <TreeNodeInfo onClick={() => displayInfoCard(node.id)} name={node.name}/>
              </TreeNode>
              <ButtonWithHoverLabel
                positioningStyles={node.mates[activeMateIndex[index]]?.children.length ? LineageTreeStyles.addChildPosition : LineageTreeStyles.addFirstChildPosition}
                label="Add child"
              >
                <button 
                  className={LineageTreeStyles.addChild}
                  onClick={() => displayNewInfoCard(
                    {name: node.name, image: node.images[0], id: node.id},
                    {name: node.mates[activeMateIndex[index]]?.name, image: node.mates[activeMateIndex[index]]?.images[0], id: node.mates[activeMateIndex[index]]?.id}
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
                  <TreeNode 
                    image={node?.mates[activeMateIndex[0]]?.images?.[0]} 
                    id={node?.mates[0]?.id || ""} 
                    displayInfoCard={displayInfoCard}
                  >
                    <TreeNodeInfo onClick={() => displayInfoCard(node.mates[activeMateIndex[0]]?.id)} name={node.mates[activeMateIndex[0]]?.name || "???"}/>
                  </TreeNode>
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

