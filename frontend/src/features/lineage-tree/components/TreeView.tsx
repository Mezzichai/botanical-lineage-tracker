import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'

import {LeanLineageNode} from '../../../types'
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


  const dispatch = useDispatch()

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
      // <TransformWrapper
      //   initialScale={1}
      //   maxScale={2}
      //   minScale={.7}
      //   centerOnInit={true}
      //   centerZoomedOut={false}
      //   minPositionX={-1000}
      //   maxPositionX={1000}
      // >
      //   <TransformComponent wrapperClass={LineageTreeStyles.panContainer} contentClass={LineageTreeStyles.treeContainer}>
      //   </TransformComponent>
      // </TransformWrapper>
      <div className={LineageTreeStyles.treeContainer}>
          <LineageGeneration children={root} displayInfoCard={displayInfoCard} displayNewInfoCard={displayNewInfoCard}/>
      </div>
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