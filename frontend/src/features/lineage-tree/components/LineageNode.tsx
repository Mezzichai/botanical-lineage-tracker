import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import optionModalStyles from '../../../styles/optionsModalStyles.module.css'

import image1 from '../../../assets/13947.jpg'

type Props = {
  title: string;
  image?: string;
  _id: string;
  handleNodeClick: (id: string, e?: React.MouseEvent) => void;
  handleHover: (id: string) => void;
  handleUnHover: () => void;
  isParentHovered: boolean;
}



const LineageNode: React.FC<Props> = ({title, _id, image, handleNodeClick, handleHover, handleUnHover, isParentHovered}) => {

  const [optionsModalState, setOptionsModal] = useState<boolean>(false);
  const optionsModalRef = useRef<HTMLDivElement>(null)

  const handleMoreInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation()
  }


  const handleOptionsClick = () => {
    setOptionsModal(optionsModalState => !optionsModalState)
  }

  return (
    <div 
      onMouseEnter={() => handleHover(_id)} 
      onMouseLeave={handleUnHover} 
      onClick={(e) => handleNodeClick(_id, e)}
      className={
        `${LineageTreeStyles.nodeContent} 
        ${isParentHovered ? LineageTreeStyles.parentFocusedContent : null}`
      }
    >
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
    </div>
  )
}

export default LineageNode

