import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'


import LineageNode from "./LineageNode";
import LineageAggregateNode from "./LineageAggregateNode";

type Child = {
  title: string;
  image?: string;
  children: Child[];
  father?: Child
  _id: string
}

type Props = {
  children: Child[]
  isParentHovered?: boolean;

}

function getPositionAtCenter(element: HTMLElement) {
  const {left, right} = element.getBoundingClientRect();
  const elementCenter = right - (right - left) / 2;
  return {
    x: elementCenter,
  };
}

function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  let mutiplyer = 1;
  if ((aPosition.x - bPosition.x) > 0) {
    mutiplyer = -1
  }
  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2)
  ) * mutiplyer;
}



const LineageGeneration: React.FC<Props> = ({children, isParentHovered = false}) => {

  const aggregateChildrenRef = useRef<HTMLLIElement>(null)

  const [activeNodeOfAggregates, setActiveNodeOfAggregates] = useState<Child>();
  const [hoveredNode,  setHoveredNode] = useState<Child>();

  const handleNodeClick = (id: string, e?: React.MouseEvent) => {
    setActiveNodeOfAggregates(children.find(child => child._id === id))
    if (aggregateChildrenRef.current && !activeNodeOfAggregates) {
      const target = e?.currentTarget as HTMLElement;
      const distance = getDistanceBetweenElements(target, aggregateChildrenRef.current)
      target.style.transform = `translateX(${distance}px)`;
    }
  }

  const handleHover = (id: string) => {
    setHoveredNode(children.find(child => child._id === id))
  }  

  const handleUnHover = () => {
    setHoveredNode(undefined)
  }
  
  return  (
    <ul className={`${LineageTreeStyles.childrenContainer} ${isParentHovered ? LineageTreeStyles.pathFocused : null}`}>
      {children.length > 2 
      ? <li className={`${LineageTreeStyles.child} fadeInElement`} ref={aggregateChildrenRef}>
          <div 
            className={`${LineageTreeStyles.aggregateChildren} ${activeNodeOfAggregates ? LineageTreeStyles.nodeClosed : null}`}
            style={{paddingRight: 3 * 44}}
          >
            {children.map((node, index) => (
              <LineageAggregateNode
                key={index+node._id}
                image={node.image} 
                _id={node._id} 
                title={node.title} 
                handleNodeClick={handleNodeClick}
                handleHover={handleHover} 
                handleUnHover={handleUnHover} 
                isParentHovered={(node._id === hoveredNode?._id) || isParentHovered}
                activeOfAggregatesId={activeNodeOfAggregates?._id}
                siblingCount={children.length-1}
              />
            ))}
            {activeNodeOfAggregates?.children[0]?.father &&
              <div className={`${LineageTreeStyles.fatherContainer} fadeInElement`}>
                <LineageNode 
                  image={activeNodeOfAggregates.children[0].father.image} 
                  _id={activeNodeOfAggregates.children[0].father._id} 
                  title ={activeNodeOfAggregates.children[0].father.title} 
                  handleNodeClick={handleNodeClick}
                  handleHover={handleHover} 
                  handleUnHover={handleUnHover}
                  isParentHovered={true}
                />
              </div>
            }
          </div>
    
          {hoveredNode?.children.length ? (
            <LineageGeneration 
              children={hoveredNode.children} 
              isParentHovered={true}
            /> 
          ) : (
          activeNodeOfAggregates?.children.length ? (
            <LineageGeneration 
              children={activeNodeOfAggregates.children} 
              isParentHovered={(activeNodeOfAggregates?._id === hoveredNode?._id) || isParentHovered}
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
              handleHover={handleHover} 
              handleUnHover={handleUnHover}
              isParentHovered={(node._id === hoveredNode?._id) || isParentHovered}
            />
            {node.children.length 
            ? <LineageGeneration 
                children={node.children} 
                isParentHovered={(node._id === hoveredNode?._id) || isParentHovered}
              /> 
            : null}
          </li>
        ))
      }
      

    </ul> 
  )
}

export default LineageGeneration

