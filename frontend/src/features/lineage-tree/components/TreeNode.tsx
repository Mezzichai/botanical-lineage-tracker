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
  displayInfoCard?: (cardId: string) => void
}



const TreeNode: React.FC<Props> = ({title, _id, image, displayInfoCard}) => {

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
      onClick={displayInfoCard ? () => displayInfoCard(_id) : () => {}}
      className={
        `${LineageTreeStyles.nodeContent}`
      }
    >
      {optionsModalState &&
        <div className={optionModalStyles.modal} ref={optionsModalRef}>
          <button aria-label={`more info`} className={optionModalStyles.modalBtn} onClick={handleMoreInfoClick}>More Info</button>
        </div>
      }
    {!_id ? (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{title}</p>
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleOptionsClick}/>
          </button>
        </span>
      </>
    ) : (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{title}</p>
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleOptionsClick}/>
          </button>
        </span>
      </>
    )}
    </span>
  )
}

export default TreeNode

