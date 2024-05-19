
import '../App.css'
import { useGetSpeciesQuery } from '../api/apiSlice'
import ListView from '../components/ListView'
import { useNavigate, useParams } from '@tanstack/react-router'
import ItemCard from '../components/ItemCard'
import CardStyles from '../styles/cardAndListStyles.module.css'
import ItemCardInfo from '../components/ItemCardInfo'

const Species = () => {
  const { speciesIdParam, groupIdParam } = useParams({ strict: false})

  const navigate = useNavigate({ from: '/' })
  const handleSpeciesClick = (id: string) => {
    navigate({ to: `/$speciesId`, params: {speciesId: id}})
  }

  const {
    data,
    isLoading,
  } = useGetSpeciesQuery({speciesId: speciesIdParam})
  
  
  return (
  <>
    {(isLoading || !data) ? (
      <div className={CardStyles.listContainer}>
        loading...
      </div>
    ) : (
      <ListView catagory={'species'} styles={CardStyles.speciesListContainer}>
        {data.map((item, index: number) => (
          <ItemCard key={index + String(item.id)} sizeStyles={CardStyles.largeCardSize} handleClick={() => handleSpeciesClick(item.id)} id={item.id} image={item.images[0]} imageDimensions={{width: 320}}>
            <ItemCardInfo name={item.name}/>
          </ItemCard>
        ))}
      </ListView>
  )}
  </>
  )
}

export default Species