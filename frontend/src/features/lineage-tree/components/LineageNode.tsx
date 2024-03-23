import React from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import image1 from '../../../assets/13947.jpg'

type Child = {
  title: string;
  image?: string;
  children: Child[];
}

type Props = {
  children: Child[]
}


const handleNodeClick = () => {

}

const LineageNode:React.FC<Props> = ({children}) => {
  return  (
    <ul className={LineageTreeStyles.childrenContainer}>
      {children.map((node) => (
        <li className={LineageTreeStyles.child}>
          <div className={LineageTreeStyles.nodeContent} onClick={handleNodeClick}>
            <img src={node.image || image1} className={LineageTreeStyles.nodeImage}/>
            <span className={LineageTreeStyles.nodeInfo}>
              <p className={LineageTreeStyles.nodeTitle}>{node.title}</p>
              <FontAwesomeIcon icon={faGear}/>
            </span>
          </div>
          {node.children.length ? <LineageNode children={node.children}/> : null}
        </li>
      ))}
    </ul> 
  )
}

export default LineageNode

