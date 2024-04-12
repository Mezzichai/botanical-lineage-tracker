import React from 'react'
import SearchBarStyles from '../styles/searchBarStyles.module.css'

const SearchFilters = () => {
  return (
    <div className={SearchBarStyles.filters}>
      <div className={SearchBarStyles.checkboxFilters}>
        <div>
          <input type={"checkbox"} id={"clone"}/>
          <label htmlFor={"clone"}>Clone</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs water"}/>
          <label htmlFor={"needs-water"}>Needs water</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs-fertilizer"}/>
          <label htmlFor={"needs-fertilizer"}>Needs fertilizer</label>
        </div>
        <div>
          <input type={"checkbox"} id={"artificial-conditions"}/>
          <label htmlFor={"artificial-conditions"}>Artificial conditions</label>
        </div>
      </div>

      <div className={SearchBarStyles.textInputFilters}> 
        <div className={SearchBarStyles.descendentFilter}>
          Descendent of: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              placeholder='search parent'
            />
            and
            <input
              className={SearchBarStyles.filterSearchInput}
              placeholder='search parent'
            />
          </div>
        </div>

        <div className={SearchBarStyles.descendentFilter}>
          Water Frequency Range: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='min frequency'
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='max frequency'
            />
          </div>
        </div>
      </div>

      <div className={SearchBarStyles.textInputFilters} id={SearchBarStyles.ageAndLightFilter}> 
        <div className={SearchBarStyles.descendentFilter}>
          Age Range: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='min years'
            />
            and
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='max years'
            />
          </div>
        </div>

        <div className={SearchBarStyles.descendentFilter}>
          Peak Hours of Light Range: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='max hours'
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type={"number"}
              min={0}
              placeholder='min hours'
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchFilters