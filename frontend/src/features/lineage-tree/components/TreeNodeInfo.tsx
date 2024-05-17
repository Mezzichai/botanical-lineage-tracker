import React from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

type Props = {
 name: string;
 onClick: () => void
}

const TreeNodeInfo:React.FC<Props> = ({name, onClick}) => {
  return (
    <span className={`${LineageTreeStyles.nodeInfo}`}>
      <p className={LineageTreeStyles.nodeTitle}>{name}</p>
      <button onClick={onClick}>
        <FontAwesomeIcon icon={faInfo}/>
      </button>
  </span>
  )
}

export default TreeNodeInfo