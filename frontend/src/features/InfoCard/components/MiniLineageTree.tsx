import React from 'react'
import TreeNode from '../../lineage-tree/components/TreeNode'
import LineageTreeStyles from '../../lineage-tree/styles/LineageTreeStyle.module.css'
import MiniLineageTreeStyles from '../styles/MiniLineageTreeStyles.module.css'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import placeholder from '../../../assets/placeholder.jpeg'
import { LineageNode } from '../../lineage-tree/types'

type Props = {
  mother?: LineageNode
  father?: LineageNode
  child: {
    image: string,
    title: string
  }
}

const MiniLineageTree:React.FC<Props> = ({mother, father, child}) => {
  return (
    <div className={MiniLineageTreeStyles.microTreeContainer}>
      <ul>
        <li>
          <div className={MiniLineageTreeStyles.parentsContainer}>
            <div>
              <span className={InfoCardStyles.group}>
                (
                  <span>focus node</span>
                )
              </span>
              <TreeNode 
                image={mother?.image || placeholder} 
                _id={mother?._id || ""} 
                title ={mother?.title || "???"} 
              />
            </div>
            <div className={`${LineageTreeStyles.fatherContainer} fadeInElement`}>
              <span className={InfoCardStyles.group}>
                (
                  <span>focus node</span>
                )
              </span>
              <TreeNode 
                image={father?.image || placeholder} 
                _id={father?._id || ""} 
                title ={father?.title || "???"} 
              />
            </div>
          </div>
          <ul>
            <li>
              <div>
                <span className={InfoCardStyles.group}>
                  (
                    <span>focus node</span>
                  )
                </span>
                <TreeNode 
                  image={child?.image || placeholder} 
                  _id={""} 
                  title ={child?.title || "???"} 
                />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default MiniLineageTree