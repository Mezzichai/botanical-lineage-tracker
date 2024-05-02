import React from 'react'
import headerStyles from "../styles/headerStyles.module.css";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import { useParams } from '@tanstack/react-router';

const Header: React.FC = () => {

  const { speciesNameParam, groupNameParam } = useParams({ strict: false})

  return (
    <>
      <div className={headerStyles.viewHeader}>
        <div className={headerStyles.plantName}>
          {(speciesNameParam || groupNameParam) ?
            <FontAwesomeIcon icon={faChevronLeft}/>
          : null}
          {speciesNameParam ? 
            speciesNameParam : 
          groupNameParam ?
            groupNameParam :
          "Species"
          }
        </div>
        <SearchBar />
      </div> 
      {/* <div className={headerStyles.left}>
        <button className={headerStyles.icon}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={headerStyles.title}>Keeper++</div>
      </div>

      <div className={headerStyles.center}>
        <SearchBar/>
      </div>

      <div className={headerStyles.right}>
    
      </div> */}
    </>
  )
}


export default Header