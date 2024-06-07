import { createSlice } from '@reduxjs/toolkit'
import { isObjectLiteral } from '../../utils/isObjectLiteral'

type Filters = {
  isClone: boolean, 
  needsWater: boolean,
  needsFertilizer: boolean,
  hasArtificialConditions: boolean,
  mother: {motherName: string, motherId: string},
  father: {fatherName: string, fatherId: string},
  waterRange: {minWater?: number, maxWater?: number},
  ageRange: {minAge?: number, maxAge?: number},
  lightRange: {minLight?: number, maxLight?: number}
}

type FilterEntry = [string, string | number | boolean | FilterEntry];

type FlatEntry = [string, string | number | boolean];


type initialState = {
  filters: Filters
  query: string
}

const initialState = {
  filters: {
    isClone: false, 
    needsWater: false,
    needsFertilizer: false,
    hasArtificialConditions: false,
    mother: {},
    father: {},
    waterRange: {minWater: 0, maxWater: 0},
    ageRange: {minAge: 0, maxAge: 0},
    lightRange: {minLight: 0, maxLight: 0},
  },
  query: ""
}


const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    changeFilters(state, actions) {
      const key = Object.keys(actions.payload)[0];
      state.filters[key as keyof Filters] = actions.payload[key]
    },
    clearFilters(state) {
      state.filters = initialState.filters
    },
    changeQuery(state, actions) {
      state.query = actions.payload.query
    }
  }
})

function selectFlatEntriesFromFilters(filters: Filters): [string, string | number | boolean][] {
  const flatEntries: [string, string | number | boolean][] = [];
  function recurseForFlatEntries(entries: FilterEntry[] | FlatEntry[]) {
    entries.forEach(([key, value]) => {
      if (isObjectLiteral(value)) {
        recurseForFlatEntries(Object.entries(value) as FilterEntry[]);
      } else {
        flatEntries.push([key, value as string | number | boolean]);
      }
    });
  }
  recurseForFlatEntries(Object.entries(filters) as FilterEntry[]);
  return flatEntries
}


function selectQueryParams(filters: initialState) {
    const flatEntries = selectFlatEntriesFromFilters(filters.filters)
    flatEntries.push(["query", filters.query])
    return flatEntries.map(pair => pair[0] + "=" + pair[1]).join("&")

}


function countTruthyFilters(filters: Filters) {
  const flatEntries = selectFlatEntriesFromFilters(filters);
  return flatEntries.reduce((acc, entry) => {
    if (entry[0] === "motherName" || entry[0] === "fatherName") {
      return acc
    }
    if (entry[1]) {
      return acc += 1
    }
    return acc
  }, 0)
}

export const {
    changeFilters,
    clearFilters,
    changeQuery
} = headerSlice.actions

export const selectFilters = (state: { header: initialState }) => state.header.filters;
export const selectAppliedFilterCount = (state: { header: initialState }) => countTruthyFilters(state.header.filters)
export const selectQueryParamNoramalizedFilters = (state: { header: initialState }) => selectQueryParams(state.header)

export const selectQuery = (state: { header: { query: string } }) => state.header.query;


export default headerSlice.reducer