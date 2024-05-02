import React from 'react'
import TreeNode from '../../lineage-tree/components/TreeNode'
import LineageTreeStyles from '../../lineage-tree/styles/LineageTreeStyle.module.css'
import MiniLineageTreeStyles from '../styles/MiniLineageTreeStyles.module.css'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import placeholder from '../../../assets/placeholder.jpeg'
import { Parent } from '../../../types'

type Props = {
  mother?: Parent
  father?: Parent
  child: {
    image: string,
    name: string
  }
  handleChangeParents: () => void
}

const MiniLineageTree:React.FC<Props> = ({mother, father, child, handleChangeParents}) => {
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
                _id={mother?.id || ""} 
                name={mother?.name || "???"} 
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
                _id={father?.id || ""} 
                name ={father?.name || "???"} 
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
                  name ={child?.name || "???"} 
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