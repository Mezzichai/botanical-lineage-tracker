import React, { useCallback, useRef, useState } from "react";
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
  shouldUnmount: boolean
}

const LineageGeneration: React.FC<Props> = ({children, invalidateParentWidth = ()=>{}, shouldUnmount}) => {
  
  const [shouldActiveNodeChildrenUnmount, setShouldActiveNodeChildrenUnmount] = useState(false);
  const [activeNodeOfAggregates, setActiveNodeOfAggregates] = useState<Child>();
  const [hoveredNode, setHoveredNode] = useState<Child>();
  const [ulRefCB] = useInvalidateParentWidthRefCallback(invalidateParentWidth)

  const aggregateChildrenRef = useRef<HTMLLIElement | null>(null)

  const childrenWithChildrenIds = children
    .filter(child => child.children.length !== 0)
    .map(child => child._id)

  const doesHoveredOrActiveNodeHaveChildren = 
    (activeNodeOfAggregates?._id && childrenWithChildrenIds.includes(activeNodeOfAggregates._id)) ||
    (childrenWithChildrenIds.includes(hoveredNode?._id || ""))

    
  const findWidthOfAggregateContainer = useCallback((newULwidth = 0)  => {
    const childUl = aggregateChildrenRef.current?.querySelector("ul")
    const liMinWidth = Math.max(
      133 + (children.length * 44), 
      childUl && doesHoveredOrActiveNodeHaveChildren ? 176 + 395 : 0,
      newULwidth
    )
    return liMinWidth
  }, [children.length, doesHoveredOrActiveNodeHaveChildren])

  const invalidateWidth = useCallback((newULwidth: number | undefined) => {
    if (aggregateChildrenRef?.current?.style.width) {
      aggregateChildrenRef.current.style.width = `${findWidthOfAggregateContainer(newULwidth)}px`
    }
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

  const handleUnfocusAggregateNode = () => {
    setShouldActiveNodeChildrenUnmount(true);
    setTimeout(() => {
      setShouldActiveNodeChildrenUnmount(false);
      setActiveNodeOfAggregates(() => undefined)
    }, 300);  
  };

  const handleHover = (id: string) => {
    setHoveredNode(children.find(child => child._id === id))
  };

  const handleUnHover = () => {
    setHoveredNode(undefined)
    if (!activeNodeOfAggregates) {
      setShouldActiveNodeChildrenUnmount(true);
      setTimeout(() => {
        setShouldActiveNodeChildrenUnmount(false);
      }, 300);  
    }
  };
    
  return  (
    <ul 
      className={`${LineageTreeStyles.childrenContainer} ${shouldUnmount ? 'fadeOutElement' : 'fadeInElement'}`}
      ref={useCallback((node: HTMLUListElement) => ulRefCB(node), [ulRefCB])}
    >
      {children.length > 2 
        ? <li 
            ref={aggregateChildrenRef} 
            className={`${LineageTreeStyles.child} ${LineageTreeStyles.aggregateChildren}`}
            style={{width: `${133 + (children.length * 44)}px`}} 
          >
            {/* needed to maintain the aggregate nodes height in document */}
            <div style={{position: "relative", height: "165.71px"}}></div>
            
            {children.map((node, index) => {
              return (
                <>
                  {(node?.children[0]?.father) &&
                    <div className={`${LineageTreeStyles.fatherContainer} ${activeNodeOfAggregates?._id === node._id ? `fadeInElement` : "fadeOutElement"}`}>
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
                      handleShowSiblings={handleUnfocusAggregateNode}
                    />
                  </div>
                </>
              )}
            )}    

            {hoveredNode?.children.length ? (
              <LineageGeneration 
                shouldUnmount={shouldActiveNodeChildrenUnmount}
                invalidateParentWidth={invalidateWidth}
                children={hoveredNode.children} 
              /> 
            ) : (
            activeNodeOfAggregates?.children.length ? (
              <LineageGeneration 
                shouldUnmount={shouldActiveNodeChildrenUnmount}
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
                shouldUnmount={shouldActiveNodeChildrenUnmount}
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

