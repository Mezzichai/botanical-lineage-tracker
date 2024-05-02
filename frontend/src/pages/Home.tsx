
import HomeStyles from '../features/home/styles/HomeStyles.module.css'
import '../App.css'
import SpeciesCard from '../features/home/components/SpeciesCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { useDispatch } from 'react-redux'
import { useGetSpeciesQuery } from '../api/apiSlice'
import { Species } from '../types'
const Home = () => {
  const dispatch = useDispatch();
  
  const handleNewSpecies = () => {
    dispatch(toggleInfoCardOn({isInfoCardNewOrEditing: true, catagory: "species"}));
  };

  const {
    data ,
    isLoading,
  } = useGetSpeciesQuery({})
  
  
  return (
  <>
    <div className={HomeStyles.homeContainer}>
      <div className={HomeStyles.speciesContainer}>
        {(!isLoading && data) && (
          data.map((species: Species, index: number) => (
            <SpeciesCard info={species} key={index + String(species.id)}/>
          ))
        )}

        <div className={HomeStyles.btnCardContainer}>
          <button className={HomeStyles.addBtn} onClick={handleNewSpecies}>
            <FontAwesomeIcon icon={faPlus} /> 
            Add species
          </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home