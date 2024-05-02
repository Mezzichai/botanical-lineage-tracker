import React from 'react'
import HomeStyles from '../styles/HomeStyles.module.css'
import { useDispatch } from 'react-redux'
import { toggleInfoCardOn } from '../../InfoCard/InfoCardSlice'
import { Species } from '../../../types'
import placeholder from '../../../assets/placeholder.jpeg'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  info: Species
}
const SpeciesCard: React.FC<Props> = ({info}) => {
  const navigate = useNavigate({ from: '/' })

  const dispatch = useDispatch();
  const toggleInfoCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleInfoCardOn({itemId: info.id, catagory: "species"}))
  }

  const handleSpeciesClick = () => {
    navigate({ to: `/$speciesId`, params: {speciesId: info.id}})
  }
  console.log(info)
  return (
    <div className={HomeStyles.speciesCard} onClick={handleSpeciesClick}>
      <img 
        srcSet={`${info?.images?.length ? `${info.images[0]}?w=${300}&h=${200}&fit=crop&auto=format&dpr=2` : placeholder}`}
        src={info.images[0] || placeholder}
        style={{ width: '300px', height: '200px' }}
      />
      <span className={HomeStyles.speciesCardInfo}>
        <p className={HomeStyles.speciesCardTitle}>{info.name}</p>
        <button onClick={(e) => toggleInfoCard(e)}>
          <FontAwesomeIcon icon={faInfo} />
        </button>
      </span> 
    </div>
  )
}

export default SpeciesCard