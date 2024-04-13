import React from 'react'
import { LineageNode } from '../../lineage-tree/types'
import TreeNode from '../../lineage-tree/components/TreeNode'
import LineageTreeStyles from '../../lineage-tree/styles/LineageTreeStyle.module.css'
import MiniLineageTreeStyles from '../styles/MiniLineageTreeStyles.module.css'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'

type Props = {
  root: LineageNode[]
}

// todo: make items smaller
const MiniLineageTree:React.FC<Props> = ({root}) => {
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
                image={root[0]?.image} 
                _id={root[0]._id || ""} 
                title ={root[0].title || ""} 
              />
            </div>
            <div className={`${LineageTreeStyles.fatherContainer}  fadeInElement`}>
              <span className={InfoCardStyles.group}>
                (
                  <span>focus node</span>
                )
              </span>
              <TreeNode 
                image={root[0]?.father?.image} 
                _id={root[0].father?._id || ""} 
                title ={root[0].father?.title || ""} 
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
                  image={root[0].children[0].image} 
                  _id={root[0].children[0]._id || ""} 
                  title ={root[0].children[0].title || ""} 
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