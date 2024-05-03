import React from 'react'
import { useDispatch } from 'react-redux'
import placeholder from '../../../assets/placeholder.jpeg'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { Species } from '../types'
import CardStyles from '../styles/cardStyles.module.css'
type Props = {
  info: Species,
  handleClick: () => void
  catagory: "group" | "species" | "individual"
}
const ItemCard: React.FC<Props> = ({info, catagory, handleClick}) => {

  const dispatch = useDispatch();
  
  const toggleInfoCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleInfoCardOn({itemId: info.id, catagory}))
  }

  return (
    <div className={CardStyles.card} onClick={handleClick}>
      <img 
        srcSet={`${info?.images?.length ? `${info.images[0]}?w=${300}&h=${200}&fit=crop&auto=format&dpr=2` : placeholder}`}
        src={info.images[0] || placeholder}
        style={{ width: '300px', height: '200px' }}
      />
      <span className={CardStyles.cardInfo}>
        <p>{info.name}</p>
        <button onClick={(e) => toggleInfoCard(e)}>
          <FontAwesomeIcon icon={faInfo} />
        </button>
      </span> 
    </div>
  )
}

export default ItemCard