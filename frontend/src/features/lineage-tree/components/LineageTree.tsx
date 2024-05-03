import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'

import {useCallback, useState } from 'react'
import {  produce } from 'immer'
import {LineageNode} from '../../../types'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from 'react-redux'
import { toggleInfoCardOn } from '../../InfoCard/InfoCardSlice'




type Props = {
  root: LineageNode[]
}

const LineageTree: React.FC<Props> = ({root}) => {
  const [widthTree, setWidthTree] = useState<LineageNode[]>(root)


  const dispatch = useDispatch()

  const handleChangeWidths = useCallback((newWidth: number, ulParentId: string, oldWidth: number) => {
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
              amountToAddToParents = newWidth - Math.max(nodes[0].width || oldWidth, 580)
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
                  if (doubleNodesExistBetweenGenerations && nodes[0].width && nodes[0].widthUpdateHistory) {
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

  const displayNewInfoCard = (mother: LineageNode | undefined, father: LineageNode | undefined) => {
    dispatch(toggleInfoCardOn({mother, father, catagory: "individual", isInfoCardNewOrEditing: true}))
  }

  return (
    <TransformWrapper
      initialScale={1}
      maxScale={2}
      minScale={.7}
      centerOnInit={true}
      minPositionX={-1000}
      maxPositionX={1000}
    >
      <TransformComponent wrapperClass={LineageTreeStyles.panContainer} contentClass={LineageTreeStyles.treeContainer}>
        <LineageGeneration children={root} widthTree={widthTree} handleChangeWidths={handleChangeWidths} displayInfoCard={displayInfoCard} displayNewInfoCard={displayNewInfoCard}/>
      </TransformComponent>
    </TransformWrapper>

    

  )
}

export default LineageTree