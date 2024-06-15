import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'
<<<<<<< HEAD
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"
=======

>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
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
    console.log("id", id)
    dispatch(toggleInfoCardOn({itemId: id, catagory: "individual"}))
  }

<<<<<<< HEAD
  const displayNewInfoCard = (mother?: LeanLineageNode, father?: LeanLineageNode) => {
=======
  const displayNewInfoCard = (mother: LeanLineageNode, father: LeanLineageNode) => {
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
    dispatch(toggleInfoCardOn({mother, father, catagory: "individual", isInfoCardNewOrEditing: true}))
  }

  if (isLoading || !root) {
    return (<div className={CardStyles.listContainer}>Loading...</div>)
  }

  return (
    <>
      {root[0]?.id
      ? 
<<<<<<< HEAD
      <TransformWrapper
        initialScale={1}
        maxScale={2}
        minScale={.7}
        centerOnInit={true}
        centerZoomedOut={false}
        minPositionX={-1000}
        maxPositionX={1000}
      >
        <TransformComponent 
          wrapperClass={LineageTreeStyles.panContainer} 
          contentClass={LineageTreeStyles.treeContainer}
        >
            <LineageGeneration 
              children={root} 
              displayInfoCard={displayInfoCard} 
              displayNewInfoCard={displayNewInfoCard}
            />
        </TransformComponent>
      </TransformWrapper>
     
=======
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
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
      :  
      <div className={LineageTreeStyles.emptyTreeContainer}>
        <div>
          <div>No plants found!</div>
<<<<<<< HEAD
          <button onClick={() => displayNewInfoCard()}>
=======
          <button onClick={() => displayNewInfoCard({}, {})}>
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
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