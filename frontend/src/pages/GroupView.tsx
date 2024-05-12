
import '../App.css'
import { useGetSpecificSpeciesGroupsQuery } from '../api/apiSlice'
import ListView from '../components/ListView'
import { useNavigate, useParams } from '@tanstack/react-router'
import ItemCard from '../components/ItemCard'
import CardStyles from '../styles/cardAndListStyles.module.css'


const GroupView = () => {
  const { speciesIdParam, groupIdParam } = useParams({ strict: false})

  const navigate = useNavigate({ from: '/' })

  const handleGroupClick = (id: string) => {
    navigate({ to: `/$speciesId/groups/$groupId`, params: {speciesId: speciesIdParam, groupId: id}})
  }

  const {
    data,
    isLoading,
  } = useGetSpecificSpeciesGroupsQuery({speciesId: speciesIdParam})
  
  
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

export default GroupView