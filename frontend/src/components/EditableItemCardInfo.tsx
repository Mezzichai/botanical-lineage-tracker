import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import CardStyles from '../styles/cardAndListStyles.module.css'
import { useParams } from "@tanstack/react-router";
import { useGetQueriedIndividualsQuery } from "../api/apiSlice";
import SearchAndSelect from "../features/SearchAndSelect/SearchAndSelect";
import useSearchAndSelect from "../features/SearchAndSelect/useSearchAndSelect";
type Props = {
  name: string,
  handleChangeNode: (item: {name: string, id: string}) => void,
}



const EditableItemCardInfo: React.FC<Props> = ({name, handleChangeNode}) => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const { speciesId } = useParams({ strict: false})

  const toggleSearch = () => {
    setIsSearching(prev => !prev)
    changeQuery(name)
  }

  const {
    query: parentQuery, 
    changeQuery: changeQuery, 
    toggleDropDown: toggleParentDropDown,
    dropDown: dropDown,
    handleSelectItem: handleSelectParent
  } = useSearchAndSelect(name, handleChangeNode)

  const {data: queryResults} = useGetQueriedIndividualsQuery({speciesId: speciesId, query: parentQuery}, {skip: Boolean(!parentQuery)});


  return ( 
    <span className={`${CardStyles.cardInfo}`}>
      {isSearching ? (
        <SearchAndSelect 
          data={queryResults} 
          toggleDropDown={toggleParentDropDown} 
          dropDownState={dropDown} 
          handleChangeQuery={changeQuery} 
          query={parentQuery} 
          handleChangeSelected={handleSelectParent}
        />
      ) : (
        <p>{parentQuery}</p>
      )}
      <button className={CardStyles.editButton} onClick={toggleSearch}>
        <FontAwesomeIcon icon={isSearching ? faCheck :faEdit}/>
      </button>
    </span>
  )
}

export default EditableItemCardInfo
