import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'

import {useCallback, useEffect, useState } from 'react'
import {  produce } from 'immer'
import {LeanLineageNode, LineageNode} from '../../../types'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from 'react-redux'
import { toggleInfoCardOn } from '../../InfoCard/InfoCardSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useGetNestedIndividualsQuery } from '../../../api/apiSlice'
import { useParams } from '@tanstack/react-router'
import CardStyles from '../../../styles/cardAndListStyles.module.css'


const TreeView: React.FC = () => {
  const { speciesId } = useParams({ strict: false})

  const {
    data: root,
    isLoading,
  } = useGetNestedIndividualsQuery({speciesId: speciesId})

  const [widthTree, setWidthTree] = useState<LineageNode[]>()
  

  useEffect(() => {
    if (root && !isLoading) {
      setWidthTree(root)
    }
  }, [root, isLoading])

  const dispatch = useDispatch()

  const handleChangeWidths = useCallback((newWidth: number, ulParentId: string, oldWidth: number) => {
    console.log(widthTree)
    setWidthTree(
      produce(prevState => {

        let amountToAddToParents: number;
        //needed to determine whether a parent containers should grow
        let doubleNodesExistBetweenGenerations = false

        //needed to reset widths when pruning the tree
        function removeChildrenWidthHistory(nodes: LineageNode[]) {
          if (nodes.length > 2) {
            nodes[0].width = 0
            nodes[0].widthUpdateHistory = []
          }
          nodes.forEach(node => {
            removeChildrenWidthHistory(node.children)
          }) 
        }
        
        function cascadeWidthUpdates(nodes:LineageNode[]) {
          if (nodes.length > 2 && nodes[0].id === ulParentId) {
            amountToAddToParents = newWidth - Math.max(nodes[0].width || oldWidth, 568)
            console.log(amountToAddToParents)
            removeChildrenWidthHistory(nodes)
            nodes[0].width = newWidth
            return true
          }
          for (let i = 0; i < nodes.length; i++) {
            const isParent = cascadeWidthUpdates(nodes[i].children)
            if (isParent) {
              if (nodes.length === 2) {
                doubleNodesExistBetweenGenerations = true
              }

              //fix issue with subtracting when not needed
              if (nodes.length > 2) {
                if (amountToAddToParents < 0 && nodes[0].widthUpdateHistory) {

                  for (let i = 0; i < nodes[0].widthUpdateHistory.length; i++) {
                    if (nodes[0].widthUpdateHistory[i].updaterId === ulParentId) {
                      amountToAddToParents = nodes[0].widthUpdateHistory
                        .slice(i)
                        .reduce((acc, width) => acc -= width.amount, 0);

                      nodes[0].widthUpdateHistory = nodes[0].widthUpdateHistory.slice(0,i)
                      break
                    }
                  }
                }
                if (nodes[0].width && nodes[0].widthUpdateHistory) {
                  nodes[0].width+=amountToAddToParents

                  if (amountToAddToParents > 0) {
                    nodes[0].widthUpdateHistory.push({updaterId: ulParentId, amount: amountToAddToParents})
                  }
                }
              }
              return true
            }
          }
        }
        cascadeWidthUpdates(prevState)
      })
    )
  }, [])

  const displayInfoCard = (id: string) => {
    dispatch(toggleInfoCardOn({itemId: id, catagory: "individual"}))
  }

  const displayNewInfoCard = (mother: LeanLineageNode, father: LeanLineageNode) => {
    dispatch(toggleInfoCardOn({mother, father, catagory: "individual", isInfoCardNewOrEditing: true}))
  }

  if (isLoading || !root) {
    return (<div className={CardStyles.listContainer}>Loading...</div>)
  }

  return (
    <>
      {root[0]?.id
      ? 
      <TransformWrapper
        initialScale={1}
        maxScale={2}
        minScale={.7}
        centerOnInit={true}
        centerZoomedOut={false}
        minPositionX={-1000}
        maxPositionX={1000}
      >
        <TransformComponent wrapperClass={LineageTreeStyles.panContainer} contentClass={LineageTreeStyles.treeContainer}>
          <LineageGeneration children={root} widthTree={widthTree || root} handleChangeWidths={handleChangeWidths} displayInfoCard={displayInfoCard} displayNewInfoCard={displayNewInfoCard}/>
        </TransformComponent>
      </TransformWrapper>
      :  
      <div className={LineageTreeStyles.emptyTreeContainer}>
        <div>
          <div>No plants found!</div>
          <button onClick={() => displayNewInfoCard({}, {})}>
            <FontAwesomeIcon icon={faPlus}/>
            Create a root plant
          </button>
        </div>
      </div>
      }
    </>
  )
}

export default TreeView