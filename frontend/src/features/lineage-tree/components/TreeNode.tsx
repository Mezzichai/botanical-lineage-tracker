import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import optionModalStyles from '../../../styles/optionsModalStyles.module.css'

import image1 from '../../../assets/13947.jpg'

type Props = {
  name: string;
  image?: string;
  id: string;
  displayInfoCard?: (cardId: string) => void;
  isParentBeingHovered?: boolean;
   handleHover?: (_id:string) => void;
   handleUnHover?: () => void

}



const TreeNode: React.FC<Props> = ({name, id, image, displayInfoCard, isParentBeingHovered, handleHover=() => {}, handleUnHover}) => {

  const [optionsModalState, setOptionsModal] = useState<boolean>(false);
  const optionsModalRef = useRef<HTMLDivElement>(null)

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }


  const handleOptionsClick = () => {
    setOptionsModal(optionsModalState => !optionsModalState)
  }

  return (
    <span 
      onClick={displayInfoCard ? () => displayInfoCard(id) : () => {}}
      onMouseEnter={() => handleHover(id)} 
      onMouseLeave={handleUnHover} 
      className={
        `${LineageTreeStyles.nodeContent} 
        ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}`
      }
    >
      {optionsModalState &&
        <div className={optionModalStyles.modal} ref={optionsModalRef}>
          <button aria-label={`more info`} className={optionModalStyles.modalBtn} onClick={handleMoreInfoClick}>More Info</button>
        </div>
      }
    {!id ? (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{name}</p>
          <button onClick={() => handleOptionsClick()}>
          <FontAwesomeIcon icon={faInfo} />
        </button>
        </span>
      </>
    ) : (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{name}</p>
          <button>
            <FontAwesomeIcon icon={faInfo} onClick={handleOptionsClick}/>
          </button>
        </span>
      </>
    )}
    </span>
  )
}

export default TreeNode

