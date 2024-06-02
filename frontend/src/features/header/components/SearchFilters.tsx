import { useDispatch, useSelector } from 'react-redux'
import SearchBarStyles from '../styles/searchBarStyles.module.css'
import { changeFilters, selectFilters } from '../HeaderSlice';
import SearchAndSelect from '../../SearchAndSelect/SearchAndSelect';
import useSearchAndSelect from '../../SearchAndSelect/useSearchAndSelect';
import { LeanLineageNode } from '../../../types';
import { useGetQueriedIndividualsQuery } from '../../../api/apiSlice';
import { useParams } from '@tanstack/react-router';

const SearchFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { speciesId } = useParams({ strict: false})

  const handleFilterChange = <T,>(fieldOfFilters: T) => {
    dispatch(changeFilters(fieldOfFilters))
  };


  const changeMother = (item: LeanLineageNode) => {
    handleFilterChange({mother: {motherId: item.id, motherName: item.name}})
  }

  const changeFather = (item: LeanLineageNode) => {
    handleFilterChange({father: {fatherId: item.id, fatherName: item.name}})
  }

  const {
    query: motherQuery, 
    changeQuery: changeMotherQuery, 
    toggleDropDown: toggleMotherDropDown,
    dropDown: motherDropDown,
    handleSelectItem: handleSelectMother
  } = useSearchAndSelect(filters.mother.motherName, changeMother)

  const {
    query: fatherQuery, 
    changeQuery: changeFatherQuery, 
    toggleDropDown: toggleFatherDropDown, 
    dropDown: fatherDropDown,
    handleSelectItem: handleSelectFather
  } = useSearchAndSelect(filters.father.fatherName, changeFather)

  const {data: motherQueryResults} = useGetQueriedIndividualsQuery({speciesId: speciesId, query: motherQuery}, {skip: Boolean(!motherQuery)});
  const {data: fatherQueryResults} = useGetQueriedIndividualsQuery({speciesId: speciesId, query: fatherQuery}, {skip: Boolean(!fatherQuery)});



  return (
    <div className={SearchBarStyles.filters}>
      <div className={SearchBarStyles.checkboxFilters}>
        <div>
          <input type={"checkbox"} id={"clone"} value={filters.isClone ? 1 : 0} onChange={() => handleFilterChange({isClone: !filters.isClone})}/>
          <label htmlFor={"clone"}>Clone</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs water"} value={filters.needsWater ? 1 : 0} onChange={() => handleFilterChange({hasArtificialConditions: !filters.needsWater})}/>
          <label htmlFor={"needs-water"}>Needs water</label>
        </div>
        <div>
          <input type={"checkbox"} id={"needs-fertilizer"} value={filters.needsFertilizer ? 1 : 0} onChange={() => handleFilterChange({hasArtificialConditions: !filters.needsFertilizer})}/>
          <label htmlFor={"needs-fertilizer"}>Needs fertilizer</label>
        </div>
        <div>
          <input type={"checkbox"} id={"artificial-conditions"} value={filters.hasArtificialConditions ? 1 : 0} onChange={() => handleFilterChange({hasArtificialConditions: !filters.hasArtificialConditions})}/>
          <label htmlFor={"artificial-conditions"}>Artificial conditions</label>
        </div>
      </div>

      <div className={SearchBarStyles.textInputFilters}> 
        <div className={SearchBarStyles.descendentFilter}>
          Descendent of: 
          <div className={SearchBarStyles.inputs}> 
            <SearchAndSelect 
              placeholder={'search parent'} 
              data={motherQueryResults} 
              handleChangeQuery={changeMotherQuery} 
              toggleDropDown={toggleMotherDropDown} 
              dropDownState={motherDropDown} 
              query={motherQuery} 
              handleChangeSelected={handleSelectMother}
              styles={SearchBarStyles.filterSearchDivInput}
            />
            {/* <input
              className={SearchBarStyles.filterSearchInput}
              value={filters.mother.motherName}
              onChange={(e) => handleFilterChange({father: {...filters.father, fatherName: e.target.value}})}
            /> */}
            and
              <SearchAndSelect 
                placeholder={'search parent'} 
                data={fatherQueryResults} 
                handleChangeQuery={changeFatherQuery} 
                toggleDropDown={toggleFatherDropDown} 
                dropDownState={fatherDropDown} 
                query={fatherQuery} 
                handleChangeSelected={handleSelectFather}
                styles={SearchBarStyles.filterSearchDivInput}
              />
            {/* <input
              className={SearchBarStyles.filterSearchInput}
              value={filters.mother.fatherName}
              onChange={(e) => handleFilterChange({mother: {...filters.mother, motherName: e.target.value}})}
            /> */}
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
              value={filters.waterRange.minWater}
              onChange={(e) => handleFilterChange({waterRange: {...filters.waterRange, waterMin: e.target.value}})}
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='max frequency'
              value={filters.waterRange.maxWater}
              onChange={(e) => handleFilterChange({waterRange: {...filters.waterRange, waterMax: e.target.value}})}
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
              value={filters.ageRange.minAge}
              onChange={(e) => handleFilterChange({ageRange: {...filters.ageRange, ageMin: e.target.value}})}
            />
            and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='max years'
              value={filters.ageRange.maxAge}
              onChange={(e) => handleFilterChange({ageRange: {...filters.ageRange, ageMax: e.target.value}})}
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
              value={filters.lightRange.minLight}
              onChange={(e) => handleFilterChange({lightRange: {...filters.lightRange, lightMin: e.target.value}})}
            />
             and
            <input
              className={SearchBarStyles.filterSearchInput}
              type="number"
              min={0}
              placeholder='min hours'
              value={filters.lightRange.maxLight}
              onChange={(e) => handleFilterChange({lightRange: {...filters.lightRange, lightMax: e.target.value}})}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchFilters