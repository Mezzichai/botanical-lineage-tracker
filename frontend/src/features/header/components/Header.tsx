import React from 'react'
import headerStyles from "../styles/headerStyles.module.css";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetSpecificGroupInfoQuery, useGetSpecificSpeciesInfoQuery } from '../../../api/apiSlice';


const Header: React.FC = () => {
  const { speciesId, groupId} = useParams({ strict: false});


  const {data: specificSpeciesInfo} = useGetSpecificSpeciesInfoQuery({speciesId: speciesId}, {skip: !(speciesId && !groupId)});
  const {data: specificGroupInfo} = useGetSpecificGroupInfoQuery({speciesId: speciesId, groupId: groupId || ""}, {skip: !(speciesId && groupId)});
  const navigate = useNavigate({ from: '/' });

  const handleGoBack = () => {
    if (speciesId && groupId) {
      navigate({ to: `/$speciesId`, params: {speciesId}});
    } else if (speciesId) {
      navigate({ to: `/`});
    }
  };
  
  return (
    <>
      <div className={headerStyles.viewHeader}>
        <div className={headerStyles.plantName}>
          {(speciesId || groupId) ?
            <FontAwesomeIcon icon={faChevronLeft} onClick={handleGoBack}/>
          : null}
          {!speciesId ? 
            "Species" :
          specificSpeciesInfo ? 
            specificSpeciesInfo.name : 
          specificGroupInfo ?
            specificGroupInfo.name :
            null
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