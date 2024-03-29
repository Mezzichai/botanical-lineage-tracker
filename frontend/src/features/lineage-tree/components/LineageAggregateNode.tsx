import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPlus} from '@fortawesome/free-solid-svg-icons'
import optionModalStyles from '../../../styles/optionsModalStyles.module.css'

import image1 from '../../../assets/13947.jpg'
import ButtonWithHoverLabel from "../../../components/ButtonWithHoverLabel";
import LineageNode from "./LineageNode";
type Child = {
  title: string;
  image?: string;
  children: Child[];
  father?: Child
  _id: string
}

type Props = {
  title: string;
  image?: string;
  _id: string;
  handleNodeClick: (id: string, e?: React.MouseEvent) => void;
  handleHover: (id: string) => void;
  handleUnHover: () => void;
  isParentHovered: boolean;
  activeOfAggregatesId?: string;
  siblingCount?: number;
  father?: Child
}



const LineageAggregateNode: React.FC<Props> = ({title, _id, image, handleNodeClick, handleHover, handleUnHover, isParentHovered, activeOfAggregatesId, siblingCount, father}) => {

  const [optionsModalState, setOptionsModal] = useState<boolean>(false);
  const optionsModalRef = useRef<HTMLDivElement>(null)

  const [isHoveringSiblingCounter, setIsHoveringSiblingCounter] = useState<boolean>(false);



  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleExpandSiblings = (e: React.MouseEvent) => {
    e.stopPropagation()
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
      onMouseEnter={() => handleHover(_id)} 
      onMouseLeave={handleUnHover} 
      onClick={(e) => handleNodeClick(_id, e)}
      className={
        `${LineageTreeStyles.nodeContent} 
        ${isParentHovered ? LineageTreeStyles.parentFocusedContent : null}
        ${(activeOfAggregatesId && activeOfAggregatesId !== _id) ? LineageTreeStyles.shaded: ""}
       `
      }
    >
      {activeOfAggregatesId === _id &&
        <ButtonWithHoverLabel
          ariaLabel={`show siblings for node ${_id}`}
          styles={`${LineageTreeStyles.siblingCounter}`}
          onClick={handleExpandSiblings}
          onMouseEnter={handleMouseEnterSiblingCounter}
          onMouseLeave={handleMouseLeaveSiblingCounter}
          label={"show siblings"}
        > 
        {isHoveringSiblingCounter 
          ? <FontAwesomeIcon icon={faPlus} className={`fadeInElement`}
        />
          : siblingCount}
        </ButtonWithHoverLabel>
      }
  
      {optionsModalState &&
        <div className={optionModalStyles.modal} ref={optionsModalRef}>
          <button aria-label={`more info`} className={optionModalStyles.modalBtn} onClick={handleMoreInfoClick}>More Info</button>
        </div>
      }
      <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
      <span className={`${LineageTreeStyles.nodeInfo} ${isParentHovered ? LineageTreeStyles.parentFocused: LineageTreeStyles.parentUnFocused}`}>
        <p className={LineageTreeStyles.nodeTitle}>{title}</p>
        <button>
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleOptionsClick}/>
        </button>
      </span>
      

      {(activeOfAggregatesId === _id && father) &&
          <div className={`${LineageTreeStyles.fatherContainer} fadeInElement`}>
            <LineageNode 
              image={father.image} 
              _id={father._id || ""} 
              title ={father.title || ""} 
              handleNodeClick={handleNodeClick}
              handleHover={handleHover} 
              handleUnHover={handleUnHover}
              isParentHovered={false}
            />
          </div>
        }
    </div>
  )
}

export default LineageAggregateNode

