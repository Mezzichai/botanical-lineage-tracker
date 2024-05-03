
import HomeStyles from '../features/home/styles/HomeStyles.module.css'
import '../App.css'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { useDispatch } from 'react-redux'
import { useGetSpeciesQuery } from '../api/apiSlice'
import ListView from '../components/ListView'
import { useNavigate } from '@tanstack/react-router'

const Species = () => {
  const navigate = useNavigate({ from: '/' })

  const handleSpeciesClick = (id: string) => {
    navigate({ to: `/$speciesId`, params: {speciesId: id}})
  }

  const {
    data ,
    isLoading,
  } = useGetSpeciesQuery({})
  
  
  return (
  <>
    {isLoading ? (
      <div className={HomeStyles.homeContainer}>
        loading...
      </div>
    ) : (
      <div className={HomeStyles.homeContainer}>
        <ListView handleItemClick={handleSpeciesClick} items={data} />
      </div>
    )}
  </>


  )
}

export default Species