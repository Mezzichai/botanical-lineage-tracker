import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPlus} from '@fortawesome/free-solid-svg-icons'
import optionModalStyles from '../../../styles/optionsModalStyles.module.css'
import placeholder from '../../../assets/placeholder.jpeg'
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import { LeanLineageNode } from "../../../types";
type Child = {
  name: string;
  image?: string;
  children: Child[];
  father?: Child
  id: string
}

type Props = {
  name: string;
  image?: string;
  id: string;
  handleNodeClick: (id: string, e?: React.MouseEvent) => void;
  handleHover: (id: string) => void;
  handleUnHover: () => void;
  handleShowSiblings: () => void
  activeOfAggregatesId?: string;
  siblingCount?: number;
  father?: LeanLineageNode

}



const LineageAggregateNode: React.FC<Props> = ({name, id, image, handleNodeClick, handleHover, handleUnHover, handleShowSiblings, activeOfAggregatesId, siblingCount}) => {
  const [optionsModalState, setOptionsModal] = useState<boolean>(false);
  const optionsModalRef = useRef<HTMLDivElement>(null)

  const [isHoveringSiblingCounter, setIsHoveringSiblingCounter] = useState<boolean>(false);



  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleExpandSiblings = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleShowSiblings()
  }

  const handleOptionsClick = () => {
    setOptionsModal(optionsModalState => !optionsModalState)
  }

  const handleMouseEnterSiblingCounter = () => {
    setIsHoveringSiblingCounter(true)
  }

  const handleMouseLeaveSiblingCounter = () => {
    setIsHoveringSiblingCounter(false)
  }

  return (
    <div 
      onMouseEnter={() => handleHover(id)} 
      onMouseLeave={handleUnHover} 
      onClick={(e) => handleNodeClick(id, e)}
      className={
        `${LineageTreeStyles.nodeContent} 
         ${!activeOfAggregatesId ? LineageTreeStyles.aggregateNode : LineageTreeStyles.activeNodeOfAggregates} 
         `
      }
    >
      {activeOfAggregatesId === id &&
        <ButtonWithHoverLabel
          positioningStyles={`${LineageTreeStyles.siblingCounter}`}
          label={"show siblings"}
        > 
        <button 
          className={LineageTreeStyles.expandSiblingsButton}
          onClick={handleExpandSiblings} 
          onMouseEnter={handleMouseEnterSiblingCounter}
          onMouseLeave={handleMouseLeaveSiblingCounter}
        >
          {isHoveringSiblingCounter 
           ? <FontAwesomeIcon icon={faPlus} className={`fadeInElement`} />
           : siblingCount}
        </button>
        </ButtonWithHoverLabel>
      }
  
      {optionsModalState &&
        <div className={optionModalStyles.modal} ref={optionsModalRef}>
          <button aria-label={`more info`} className={optionModalStyles.modalBtn} onClick={handleMoreInfoClick}>More Info</button>
        </div>
      }
      <img src={image || placeholder} className={LineageTreeStyles.nodeImage}/>
      <span className={`${LineageTreeStyles.nodeInfo}`}>
        <p className={LineageTreeStyles.nodeTitle}>{name}</p>
        <button>
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleOptionsClick}/>
        </button>
      </span>
    </div>
  )
}

export default LineageAggregateNode

