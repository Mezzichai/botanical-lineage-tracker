import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import CardStyles from '../styles/cardAndListStyles.module.css'

type Props = {
 name: string;
 onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
 id: string
}

const ItemCardInfo:React.FC<Props> = ({name, onClick, id}) => {
  return (
    <span className={CardStyles.cardInfo}>
      <p>{name}</p>
      <button onClick={(e) => onClick(e, id)} aria-label={`item-${id}-info`}>
        <FontAwesomeIcon icon={faInfo}/>
      </button>
  </span>
  )
}

export default ItemCardInfo