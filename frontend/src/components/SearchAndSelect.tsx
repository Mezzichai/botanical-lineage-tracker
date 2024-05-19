import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SearchAndSelectStyles from '../styles/searchAndSelectStyles.module.css'


type Props = {
  data: {id: string, name: string, images: string[]}[],
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void,
  query: string,
  handleChangeSelected: (item: {id: string, name: string, image: string}) => void
}
const SearchAndSelect:React.FC<Props> = ({data, handleChangeQuery, query, handleChangeSelected}) => {
  const [hoveredResultIndex, setHoveredResultIndex] = useState(0)
  const [dropDownState, setDropDownState] = useState(true)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (dropDownState) {
      if (e.key === 'ArrowUp') {
        setHoveredResultIndex(prevIndex => {
          if (prevIndex === 0) {
           return prevIndex
          } else {
            return prevIndex - 1
          }
        })
      }
      else if (e.key === 'ArrowDown') {
        setHoveredResultIndex(prevIndex => {
          if (prevIndex+1 >= data.length) {
            return prevIndex
          } else {
            return prevIndex + 1
          }
        })
      }
    }
  };

  const handleSelect = (id: string, name: string, image: string) => {
    handleChangeSelected({id, name, image})
    setDropDownState(false)
  }

  return (
  <div className={SearchAndSelectStyles.selectionContainer} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
    <div className={SearchAndSelectStyles.selectionControls}>
      <input
        className={SearchAndSelectStyles.input}
        onChange={handleChangeQuery}
        type='text'
        value={query}
      />
      <button className={SearchAndSelectStyles.dropDownButton} onClick={() => setDropDownState(prevState => !prevState)}>
        <FontAwesomeIcon icon={dropDownState ? faChevronDown : faChevronRight}/>
      </button>
    </div>
    {dropDownState &&
      <ul className={SearchAndSelectStyles.resultContainer}>
        {data.length && query ? (
          data.map((element, index)=>
            <li 
              className={hoveredResultIndex === index ? SearchAndSelectStyles.activeResult : ""} 
              data-id={element.id} 
              onClick={() => handleSelect(element.id, element.name, element.images[0])}
            >
              {element.name}
            </li>
          )
        ) : (
          <li>No Results!</li>
        )}
      </ul>
    }
  </div>
  )
}

export default SearchAndSelect