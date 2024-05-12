import React from 'react'
import LineageTreeStyles from '../../lineage-tree/styles/LineageTreeStyle.module.css'
import TreeNode from '../../lineage-tree/components/TreeNode'
import MiniLineageTreeStyles from '../styles/MiniLineageTreeStyles.module.css'
import placeholder from '../../../assets/placeholder.jpeg'
import { LeanLineageNode } from '../../../types'
import { useDispatch } from 'react-redux'
import { toggleInfoCardOn } from '../InfoCardSlice'

type Props = {
  mother?: LeanLineageNode
  father?: LeanLineageNode
  child: {
    id: string,
    image: string,
    name: string
  }
  handleChangeParents: () => void
}

const MiniLineageTree:React.FC<Props> = ({mother, father, child, handleChangeParents}) => {
  const dispatch = useDispatch()
  const displayInfoCard = (id?: string) => {
    dispatch(toggleInfoCardOn({itemId: id}))
  }
  return (
    <div className={MiniLineageTreeStyles.microTreeContainer}>
      <ul>
        <li>
          <div className={MiniLineageTreeStyles.parentsContainer}>
            <div>
              {/* <span className={InfoCardStyles.group}>
                (
                  <span>focus node</span>
                )
              </span> */}
              <TreeNode
                displayInfoCard={mother?.id ? () => displayInfoCard(mother.id) : () => {}} 
                image={mother?.image || placeholder} 
                id={mother?.id || ""} 
                name={mother?.name || "???"} 
                styles={MiniLineageTreeStyles.smallContainer}
              />
            </div>
            <div className={`${LineageTreeStyles.fatherContainer} fadeInElement`}>
              {/* <span className={InfoCardStyles.group}>
                (
                  <span>focus node</span>
                )
              </span> */}
              <TreeNode 
                displayInfoCard={father?.id ? () => displayInfoCard(father.id) : () => {}} 
                image={father?.image} 
                id={father?.id || ""} 
                name ={father?.name || "???"} 
              />
            </div>
          </div>
          <ul>
            <li>
              <div>
                {/* <span className={InfoCardStyles.group}>
                  (
                    <span>focus node</span>
                  )
                </span> */}
                <TreeNode 
                  displayInfoCard={child?.id ? () => displayInfoCard(child.id) : () => {}} 
                  image={child.image} 
                  id={child?.id || ""} 
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