import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import CardStyles from '../styles/cardAndListStyles.module.css'
import { useParams } from "@tanstack/react-router";
import { useGetQueriedIndividualsQuery } from "../api/apiSlice";
import SearchAndSelect from "../features/SearchAndSelect/SearchAndSelect";
import { LeanLineageNode } from "../types";
type Props = {
  name: string,
  handleChangeNode: (item: LeanLineageNode) => void,
}



const EditableItemCardInfo: React.FC<Props> = ({name, handleChangeNode}) => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [parentQuery, setParentQuery] = useState<string>(name)

  const { speciesId } = useParams({ strict: false})

  const {data: queryResults} = useGetQueriedIndividualsQuery({speciesId: speciesId, query: parentQuery}, {skip: Boolean(!parentQuery)});

  const toggleSearch = () => {
    setIsSearching(prev => !prev)
  }

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentQuery(event.target.value)
  }

  return ( 
    <span className={`${CardStyles.cardInfo}`}>
      {isSearching ? (
        <SearchAndSelect data={queryResults} handleChangeQuery={changeQuery} query={parentQuery} handleChangeSelected={handleChangeNode}/>
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
