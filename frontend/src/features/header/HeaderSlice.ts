import { createSlice } from '@reduxjs/toolkit'
import { LeanLineageNode } from '../../types'
import { isObjectLiteral } from '../../utils/isObjectLiteral'

type initialState = {
  filters: {
    isClone: boolean, 
    needsWater: boolean,
    needsFertilizer: boolean,
    hasArtificialConditions: boolean,
    mother: LeanLineageNode,
    father: LeanLineageNode,
    waterRange: {minWater?: number, maxWater?: number},
    ageRange: {minAge?: number, maxAge?: number},
    lightRange: {minLight?: number, maxLight?: number},
  },
  query: ""
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
      console.log(actions.payload[key])
      state.filters[key] = actions.payload[key]
    },
    clearFilters(state) {
      state.filters = initialState.filters
    },
    changeQuery(state, actions) {
      state.query = actions.payload.query
    }
  }
})

function selectFlatEntriesFromFilters(filters) {
  const flatEntries: string[] = [];
  function recurseForFlatEntries(entries) {
    entries.forEach((entry)=> {
      if (isObjectLiteral(entry[1])) {
        return recurseForFlatEntries(Object.entries(entry[1]))
      } else {
        flatEntries.push(entry)
      }
    });
  }
  recurseForFlatEntries(Object.entries(filters))
  console.log(flatEntries)

  console.log(flatEntries.map(pair => pair[0] + "=" + pair[1]).join("&"))
  return flatEntries.map(pair => pair[0] + "=" + pair[1]).join("&")
}

export const {
    changeFilters,
    clearFilters,
    changeQuery
} = headerSlice.actions

export const selectFilters = (state: { header: initialState}) => state.header.filters;
export const selectQueryParamNoramalizedFilters = (state: { header: { filters: unknown } }) => selectFlatEntriesFromFilters(state.header.filters)
export const selectQuery = (state: { header: { query: unknown } }) => state.header.query;


export default headerSlice.reducer