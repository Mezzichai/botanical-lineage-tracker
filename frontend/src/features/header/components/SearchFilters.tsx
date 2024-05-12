import { useDispatch, useSelector } from 'react-redux'
import SearchBarStyles from '../styles/searchBarStyles.module.css'
import { selectFilters } from '../HeaderSlice';

const SearchFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);



  const handleFilterChange = (e) => {

  };

  return (
    <div className={SearchBarStyles.filters}>
      <div className={SearchBarStyles.checkboxFilters}>
        <div>
          <input type={"checkbox"} id={"clone"} onChange={e => handleFilterChange(e)}/>
          <label htmlFor={"clone"}>Clone</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs water"} onChange={e => handleFilterChange(e)}/>
          <label htmlFor={"needs-water"}>Needs water</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs-fertilizer"} onChange={e => handleFilterChange(e)}/>
          <label htmlFor={"needs-fertilizer"}>Needs fertilizer</label>
        </div>
        <div>
          <input type={"checkbox"} id={"artificial-conditions"} onChange={e => handleFilterChange(e)}/>
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
              value={""}
              onChange={e => handleFilterChange(e)}
            />
            and
            <input
              className={SearchBarStyles.filterSearchInput}
              placeholder='search parent'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
          </div>
        </div>

        <div className={SearchBarStyles.descendentFilter}>
          Water Frequency Range: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='min frequency'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='max frequency'
              value={""}
              onChange={e => handleFilterChange(e)}
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
              type="number"
              min={0}
              placeholder='min years'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
            and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='max years'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
          </div>
        </div>

        <div className={SearchBarStyles.descendentFilter}>
          Peak Hours of Light Range: 
          <div className={SearchBarStyles.inputs}> 
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='max hours'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='min hours'
              value={""}
              onChange={e => handleFilterChange(e)}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchFilters