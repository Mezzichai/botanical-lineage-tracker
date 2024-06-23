
import '../App.css'
import { useGetSpecificGroupIndividualsQuery } from '../api/apiSlice'
import ListView from '../components/ListView'
import { useParams } from '@tanstack/react-router'
import ItemCard from '../components/ItemCard'
import CardStyles from '../styles/cardAndListStyles.module.css'


const SpecificGroupView = () => {
  const { speciesIdParam, groupIdParam } = useParams({ strict: false})


  const handleGroupClick = (id: string) => {
  }

  const {
    data,
    isLoading,
  } = useGetSpecificGroupIndividualsQuery({speciesId: speciesIdParam, groupId: groupIdParam})
  
  
  return (
  <>
    {(isLoading || !data) ? (
      <div className={CardStyles.listContainer}>
        loading...
      </div>
    ) : (
      <ListView catagory={'group'}>
        {data.map((item, index: number) => (
          <ItemCard key={index + String(item.id)} handleClick={() => handleGroupClick(item.id)} info={item} catagory={'group'}/>
        ))}
      </ListView>
    )}
  </>
  )
}

export default SpecificGroupView