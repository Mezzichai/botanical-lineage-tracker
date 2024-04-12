import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'

import {useCallback, useState } from 'react'
import {  produce } from 'immer'
import {LineageNode} from '../types'




type Props = {
  displayInfoCard: (cardId: string) => void
  root: LineageNode[]
}

const LineageTree: React.FC<Props> = ({displayInfoCard, root}) => {
  const [widthTree, setWidthTree] = useState<LineageNode[]>(root)
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
            if (nodes.length > 2 && nodes[0]._id === ulParentId) {
              amountToAddToParents = newWidth - (nodes[0].width || oldWidth)
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


  return (
    <div className={LineageTreeStyles.treeContainer}>
      <LineageGeneration children={root} widthTree={widthTree} handleChangeWidths={handleChangeWidths} displayInfoCard={displayInfoCard}/>
    </div>
  )
}

export default LineageTree