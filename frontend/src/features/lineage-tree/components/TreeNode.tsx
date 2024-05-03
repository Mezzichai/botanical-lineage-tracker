import React from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

import image1 from '../../../assets/13947.jpg'

type Props = {
  name: string;
  image?: string;
  id: string;
  displayInfoCard: (id: string) => void;
  isParentBeingHovered?: boolean;
  handleHover?: (_id:string) => void;
  handleUnHover?: () => void;
}



const TreeNode: React.FC<Props> = ({name, id, image, displayInfoCard, isParentBeingHovered, handleHover=() => {}, handleUnHover}) => {
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
    {!id ? (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{name}</p>
          <button onClick={() => displayInfoCard(id)}>
          <FontAwesomeIcon icon={faInfo} />
        </button>
        </span>
      </>
    ) : (
      <>
        <img src={image || image1} className={LineageTreeStyles.nodeImage}/>
        <span className={`${LineageTreeStyles.nodeInfo} `}>
          <p className={LineageTreeStyles.nodeTitle}>{name}</p>
          <button onClick={() => displayInfoCard(id)}>
            <FontAwesomeIcon icon={faInfo}/>
          </button>
        </span>
      </>
    )}
    </span>
  )
}

export default TreeNode

