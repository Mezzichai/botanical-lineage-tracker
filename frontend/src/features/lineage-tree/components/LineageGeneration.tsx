import React, { useCallback, useRef, useState, useMemo } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageNode from "./LineageNode";
import LineageAggregateNode from "./LineageAggregateNode";
import useInvalidateParentWidthRefCallback from "../hooks/useInvalidateParentWidthCallback";

type Child = {
  title: string;
  image?: string;
  children: Child[];
  father?: Child
  _id: string
  
}

type Props = {
  children: Child[]
  invalidateParentWidth: (newULwidth:number | undefined) => void
}

const LineageGeneration: React.FC<Props> = ({children, invalidateParentWidth = ()=>{}}) => {
  
  const [activeNodeOfAggregates, setActiveNodeOfAggregates] = useState<Child>();
  const [hoveredNode, setHoveredNode] = useState<Child>();
  const [ulRefCB] = useInvalidateParentWidthRefCallback(invalidateParentWidth)
  const [aggregateChildrenWidth, setAggregateChildrenWidth] = useState<number>(133 + (children.length * 44));
  const aggregateChildrenRef = useRef<HTMLLIElement | null>(null)



  const childrenRef = useRef(children);
  const childrenWithChildrenIds = useMemo(() => (
      childrenRef.current
      .filter(child => child.children.length !== 0)
      .map(child => child._id)
  ), []);

  const doesHoveredOrActiveNodeHaveChildren = useMemo(() => (
    (activeNodeOfAggregates?._id && childrenWithChildrenIds.includes(activeNodeOfAggregates._id)) ||
    (childrenWithChildrenIds.includes(hoveredNode?._id || ""))
  ), [])

  const findWidthOfAggregateContainer = useCallback((newULwidth = 0)  => {
    const childUl = aggregateChildrenRef.current?.querySelector("ul")

    const liMinWidth = Math.max(
      133 + (children.length * 44), 
      childUl && doesHoveredOrActiveNodeHaveChildren ? 176 + 395 : 0,
      newULwidth,
    )
    return liMinWidth
  }, [children.length, doesHoveredOrActiveNodeHaveChildren])

  
  const invalidateWidth = useCallback((newULwidth: number | undefined) => {
    setAggregateChildrenWidth(findWidthOfAggregateContainer(newULwidth))
  }, [findWidthOfAggregateContainer])
  

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

  const handleHover = (id: string) => {
    setHoveredNode(children.find(child => child._id === id))
  };

  const handleUnHover = () => {
    setHoveredNode(undefined)
  };
    
  return  (
    <ul className={`${LineageTreeStyles.childrenContainer}`} ref={useCallback((node: HTMLUListElement) => ulRefCB(node), [ulRefCB])}>
      {children.length > 2 
        ? <li 
            ref={aggregateChildrenRef} 
            className={`${LineageTreeStyles.child} ${LineageTreeStyles.aggregateChildren} fadeInElement`}
            style={{width: `${aggregateChildrenWidth}px`}} 
          >
            {/* needed to maintain the aggregate nodes height in document */}
            <div style={{position: "relative", height: "165.71px"}}></div>
            
            {children.map((node, index) => {
              return (
                <>
                  {(activeNodeOfAggregates?._id === node._id && node?.children[0]?.father) &&
                    <div className={`${LineageTreeStyles.fatherContainer} fadeInElement`}>
                      <LineageNode 
                        image={node.children[0]?.father.image} 
                        _id={node.children[0].father._id || ""} 
                        title ={node.children[0].father.title || ""} 
                        handleNodeClick={handleNodeClick}
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
                    />
                  </div>
                </>
              )}
            )}    

            {hoveredNode?.children.length ? (
              <LineageGeneration 
                invalidateParentWidth={invalidateWidth}
                children={hoveredNode.children} 
              /> 
            ) : (
            activeNodeOfAggregates?.children.length ? (
              <LineageGeneration 
                invalidateParentWidth={invalidateWidth}
                children={activeNodeOfAggregates.children} 
              />
            ) : null)}
          </li>

        : children.map((node, index) => (
          <li className={`${LineageTreeStyles.child} fadeInElement`} key={node._id + index}>
            <LineageNode 
              key={index+node._id}
              image={node.image} 
              _id={node._id} 
              title ={node.title} 
              handleNodeClick={handleNodeClick}
            />
            {node.children.length 
            ? <LineageGeneration 
                invalidateParentWidth={invalidateWidth}
                children={node.children} 
              /> 
            : null}
          </li>
        ))
      }
    </ul> 
  )
}

export default LineageGeneration

