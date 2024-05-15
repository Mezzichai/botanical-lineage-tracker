import CardStyles from '../../../styles/cardAndListStyles.module.css'
import ListView from '../../../components/ListView'
import ItemCard from '../../../components/ItemCard'
import { LineageNode } from '../../../types'
import { useGetFlatIndividualsQuery } from '../../../api/apiSlice'
import { useParams } from '@tanstack/react-router'

const LineageListView = () => {
  const { speciesId } = useParams({ strict: false})

  const {
    data,
    isLoading,
  } = useGetFlatIndividualsQuery({speciesId: speciesId})

  const handleIndividualClick = () => {
    
  }

  if (isLoading || !data) {
    return <div className={CardStyles.listContainer}>Loading...</div>
  } 
  return (
    <ListView catagory='individual' styles={CardStyles.individualsListContainer}>
      {data.map((item: LineageNode, index: number) => (
        <ItemCard key={index + String(item.id)} handleClick={() => handleIndividualClick()} info={item} catagory={'individual'} imageDimensions={{width: 176}} sizeStyles={CardStyles.smallCardSize}/>
      ))}
    </ListView>
  )
}

export default LineageListView