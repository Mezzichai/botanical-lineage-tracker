import React from 'react'
import { useDispatch } from 'react-redux'
import placeholder from '../assets/placeholder.jpeg'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { Species } from '../types'
import CardStyles from '../styles/cardAndListStyles.module.css'
type Props = {
  info: Species;
  handleClick: () => void;
  catagory: "group" | "species" | "individual";
  sizeStyles: string;
  hovered?: boolean;
  handleHover?: (id:string) => void;
  handleUnHover?: () => void;
  imageDimensions: {width: number, height?: number};
}

const ItemCard: React.FC<Props> = ({info, catagory, handleClick, sizeStyles, imageDimensions, handleHover = ()=>{}, handleUnHover = ()=>{}}) => {

  const dispatch = useDispatch();
  
  const toggleInfoCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleInfoCardOn({itemId: info.id, catagory}))
  }

  return (
    <div 
      className={`${CardStyles.cardContent} ${sizeStyles}`}
      onClick={handleClick}
      onMouseEnter={() => handleHover(info.id)} 
      onMouseLeave={handleUnHover} 
    >
      <img 
        srcSet={`${info?.images?.length ? `${info.images[0]}?w=${imageDimensions.width}&h=${imageDimensions.height || "auto"}&fit=crop&auto=format&dpr=2` : placeholder}`}
        src={info.images[0] || placeholder}
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
