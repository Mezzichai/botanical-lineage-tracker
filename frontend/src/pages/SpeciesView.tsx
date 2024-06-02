
import '../App.css'
import { useGetSpeciesQuery } from '../api/apiSlice'
import ListView from '../components/ListView'
import { useNavigate, useParams } from '@tanstack/react-router'
import ItemCard from '../components/ItemCard'
import CardStyles from '../styles/cardAndListStyles.module.css'
import ItemCardInfo from '../components/ItemCardInfo'
import { useDispatch } from 'react-redux'
import { changeCatagories, toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'

const Species = () => {
  const { speciesIdParam, groupIdParam } = useParams({ strict: false})
  const dispatch = useDispatch()
  const navigate = useNavigate({ from: '/' })
  const handleSpeciesClick = (id: string) => {
    navigate({ to: `/$speciesId`, params: {speciesId: id}})
    dispatch(changeCatagories({catagory: "species"}))

  }

  const {
    data,
    isLoading,
  } = useGetSpeciesQuery({speciesId: speciesIdParam})
  const handleInfoClick = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(toggleInfoCardOn({catagory: "species", itemId: id}))
  }
  
  return (
  <>
    {(isLoading || !data) ? (
      <div className={CardStyles.listContainer}>
        loading...
      </div>
    ) : (
      <ListView catagory={'species'} styles={CardStyles.speciesListContainer}>
        {data.map((item, index: number) => (
          <ItemCard 
            key={index + String(item.id)} 
            sizeStyles={CardStyles.largeCardSize} 
            handleClick={() => handleSpeciesClick(item.id)} 
            id={item.id} 
            image={item?.images?.length ? item.images[0] : undefined} 
            imageDimensions={{width: 320}}
          >
            <ItemCardInfo 
              id={item.id} 
              onClick={handleInfoClick} 
              name={item.name}
            />
          </ItemCard>
        ))}
      </ListView>
  )}
  </>
  )
}

export default Species