import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import MiniLineageTreeStyles from '../styles/MiniLineageTreeStyles.module.css'
import LineageTreeStyles from '../../lineage-tree/styles/LineageTreeStyle.module.css'

import { useParams } from "@tanstack/react-router";
import { useGetQueriedIndividualsQuery } from "../../../api/apiSlice";
type Props = {
  name: string;
}



const EditableTreeNode: React.FC<Props> = ({name}) => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [parentQuery, setParentQuery] = useState<string>(name)

  const { speciesId } = useParams({ strict: false})

  const {data: queryResults} = useGetQueriedIndividualsQuery({speciesId: speciesId, query: parentQuery});

  const toggleSearch = () => {
    setIsSearching(prev => !prev)
  }

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentQuery(event.target.value)
  }

  return ( 
    <span className={`${LineageTreeStyles.nodeInfo}`}>
      {isSearching ? (
        <div>
        <input
          className={MiniLineageTreeStyles.searchInput}
          type="text"
          value={parentQuery}
          onChange={(e) => changeQuery(e)}
        />
        <div className={MiniLineageTreeStyles.resultsContainer}>
          {/* {queryResults.map(node => (
            
          ))} */}
        </div>
      </div>
      ) : (
        <p className={LineageTreeStyles.nodeTitle}>{parentQuery}</p>
      )}
      <button onClick={toggleSearch}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    </span>
  )
}

export default EditableTreeNode

