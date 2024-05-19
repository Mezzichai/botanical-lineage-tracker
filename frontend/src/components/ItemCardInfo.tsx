import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import CardStyles from '../styles/cardAndListStyles.module.css'

type Props = {
 name: string;
 onClick?: () => void
}

const ItemCardInfo:React.FC<Props> = ({name, onClick}) => {
  return (
    <span className={CardStyles.cardInfo}>
      <p>{name}</p>
      <button onClick={onClick}>
        <FontAwesomeIcon icon={faInfo}/>
      </button>
  </span>
  )
}

export default ItemCardInfo