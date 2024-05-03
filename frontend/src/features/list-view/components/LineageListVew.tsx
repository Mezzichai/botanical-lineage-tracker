import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardStyles from '../styles/cardAndListStyles.module.css.module.css'

const LineageListVew = () => {
  return (
    <div>
      <div>
        
        <div className={CardStyles.addItemContainer}>
          <button className={CardStyles.addBtn} onClick={handleNewSpecies}>
            <FontAwesomeIcon icon={faPlus} /> 
            Add species
          </button>
        </div>
      </div>
    </div>
  )
}

export default LineageListVew