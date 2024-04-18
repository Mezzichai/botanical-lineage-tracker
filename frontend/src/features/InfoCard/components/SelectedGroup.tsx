import { faCheck, faChevronDown, faChevronRight, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SelectedGroupStyles from '../styles/SelectedGroupStyles.module.css'

type Props = {
  selectedGroup: string
}

const SelectedGroup: React.FC<Props> = ({selectedGroup}) => {
  const [isGroupBeingChanged, setIsGroupBeingChanged] = useState(false)
  const [groupDropDownState, setGroupDropDownState] = useState(false)
  const [group, setGroup] = useState(selectedGroup)
  const [groupQuery, setGroupQuery] = useState("")
  const [groupQueryResult, setGroupQueryResult] = useState(["dwdw", "131f", "advvac", ".[pwopo"])
  const [hoveredResultIndex, setHoveredResultIndex] = useState(0)



  const handleGroupSelect = (e) => {
    setGroup(e.target.dataset.id)
    setGroupDropDownState(false)
  }



  const handleKeyDown = (e) => {
    console.log(e.target);
  
    if (groupDropDownState) {
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
          if (prevIndex+1 >= groupQueryResult.length) {
            return prevIndex
          } else {
            return prevIndex + 1
          }
        })
      }
    }
  };

  // const handleGroupChange = (e) => {
  //   if (groupQueryResult.length <= 1 && group === groupQueryResult[0] && group.length < e.target.value) {
  //     return
  //   } else {
  //     setGroup(e.target.value)
  //   }
  // }

  return (
    <span className={SelectedGroupStyles.group}>
      {!isGroupBeingChanged ? (
        <span>({group})</span>
      ) : (
        <div className={SelectedGroupStyles.selectionContainer} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
          <div className={SelectedGroupStyles.groupSelectionControls}>
            <div 
              className={`${SelectedGroupStyles.groupInput} ${groupDropDownState ? SelectedGroupStyles.active : ""}`} 
              onFocus={() => setGroupDropDownState(true)}
            >
              {group}
            </div>
            <button className={SelectedGroupStyles.dropDownButton} onClick={() => setGroupDropDownState(prevState => !prevState)}>
              <FontAwesomeIcon icon={groupDropDownState ? faChevronDown : faChevronRight} />
            </button>
          </div>
          {groupDropDownState &&
            <ul onClick={(e) => handleGroupSelect(e)} >
              {groupQueryResult.map((group, index)=>
                <li className={hoveredResultIndex === index ? SelectedGroupStyles.activeResult : ""} data-id={group}>{group}</li>
              )}
            </ul>
          }
        </div>
      )}
      
      <button aria-label={`change-groups`} className={`${SelectedGroupStyles.changeGroupsBtn} ${isGroupBeingChanged ? SelectedGroupStyles.check : ""}`} onClick={() => setIsGroupBeingChanged(prevState => !prevState)}>
        <FontAwesomeIcon icon={isGroupBeingChanged ? faCheck : faGear} />
      </button>
    </span>
  )
}

export default SelectedGroup