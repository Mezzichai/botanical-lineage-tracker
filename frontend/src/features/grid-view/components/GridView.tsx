import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import ItemCard from '../../../components/ItemCard'
import ListView from '../../../components/ListView'
import CardStyles from '../../../styles/cardAndListStyles.module.css'
import ItemCardInfo from '../../../components/ItemCardInfo'

const GridView = () => {
  const navigate = useNavigate({ from: '/' })

  const handleSpeciesClick = (id: string) => {
    navigate({ to: `/$speciesId`, params: {speciesId: id}})
  }

  const {
    data,
    isLoading,
  } = useGetSpecificSpeciesIndividualsQuery({})

  return (
    <>
    {(isLoading || !data) ? (
      <div className={CardStyles.listContainer}>
        loading...
      </div>
    ) : (
      <div className={CardStyles.listContainer}>
        <ListView catagory={'individual'}>
          {data.map((item, index: number) => (
            <ItemCard key={index + String(item.id)} handleClick={() => handleSpeciesClick(item.id)} info={item} catagory={'individual'}>
              <ItemCardInfo name={item.name}/>
            </ItemCard>
          ))}
        </ListView>
      </div>
    )}
  </>
  )
}

export default GridView