import CardStyles from '../../../styles/cardAndListStyles.module.css'
import ListView from '../../../components/ListView'
import ItemCard from '../../../components/ItemCard'
import { LineageNode } from '../../../types'
import { useGetFlatIndividualsQuery } from '../../../api/apiSlice'
import { useParams } from '@tanstack/react-router'
import ItemCardInfo from '../../../components/ItemCardInfo'
import { useSelector } from 'react-redux'
import { selectQueryParamNoramalizedFilters } from '../../header/HeaderSlice'

const LineageListView = () => {
  const { speciesId } = useParams({ strict: false})
  const filtersQueryParams = useSelector(selectQueryParamNoramalizedFilters)

  const {
    data,
    isLoading,
  } = useGetFlatIndividualsQuery({speciesId: speciesId, queryParams: filtersQueryParams})

  const handleIndividualClick = () => {
    
  }

  if (isLoading || !data) {
    return <div className={CardStyles.listContainer}>Loading...</div>
  } 
  return (
    <ListView catagory='individual' styles={CardStyles.individualsListContainer} sizeStyles={CardStyles.smallCardSize}>
      {data.map((item: LineageNode, index: number) => (
        <ItemCard 
          key={index + String(item.id)} 
          handleClick={() => handleIndividualClick()} 
          id={item.id} image={item.images[0]} 
          imageDimensions={{width: 176}} 
          sizeStyles={CardStyles.smallCardSize}
        >
          <ItemCardInfo name={item.name}/>
        </ItemCard>
      ))}
    </ListView>
  )
}

export default LineageListView