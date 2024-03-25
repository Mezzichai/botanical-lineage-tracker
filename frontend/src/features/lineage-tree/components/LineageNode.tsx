import React, { useRef, useState } from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import optionModalStyles from '../../../styles/optionsModalStyles.module.css'

import image1 from '../../../assets/13947.jpg'

type Child = {
  title: string;
  image?: string;
  children: Child[];
  _id: string
}

type Props = {
  children: Child[]
}




const LineageNode:React.FC<Props> = ({children}) => {
  const [optionsModalState, setOptionsModal] = useState<boolean>(false);
  const optionsModalRef = useRef<HTMLDivElement>(null)

  const handleNodeClick = () => {

  }

  const handleMoreInfoClick = () => {
    
  }

  const handleOptionsClick = () => {
    setOptionsModal(optionsModalState => !optionsModalState)
  }

  return  (
    <ul className={LineageTreeStyles.childrenContainer}>
      {children.map((node, index) => (
        <li className={LineageTreeStyles.child} key={node._id + index}>
          <div className={LineageTreeStyles.nodeContent} onClick={handleNodeClick}>
            {optionsModalState &&
            <div className={optionModalStyles.modal} ref={optionsModalRef}>
              <button aria-label={`more info`} className={optionModalStyles.modalBtn} onClick={handleMoreInfoClick}>More Info</button>
            </div>
            }
            <img src={node.image || image1} className={LineageTreeStyles.nodeImage}/>
            <span className={LineageTreeStyles.nodeInfo}>
              <p className={LineageTreeStyles.nodeTitle}>{node.title}</p>
              <button>
                <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleOptionsClick}/>
              </button>
            </span>
          </div>
          {node.children.length ? <LineageNode children={node.children}/> : null}
        </li>
      ))}
    </ul> 
  )
}

export default LineageNode

