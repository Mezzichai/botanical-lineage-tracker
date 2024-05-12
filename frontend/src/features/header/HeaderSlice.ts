import { createSlice } from '@reduxjs/toolkit'
import { LeanLineageNode } from '../../types'

type initialState = {
  filters: {
    isClone: boolean, 
    needsWater: boolean,
    needsFertilizer: boolean,
    hasArtificialConditions: boolean,
    mother: LeanLineageNode,
    father: LeanLineageNode,
    waterFrequencyRange: {low?: number, high?: number},
    ageRange: {low?: number, high?: number},
    lightRange: {low?: number, high?: number},
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
    waterFrequencyRange: {},
    ageRange: {},
    lightRange: {},
  },
  query: ""
}


const headerSlice = createSlice({
  name: "infoCard",
  initialState,
  reducers: {
    changeFilters(state, actions) {
      state.filters = actions.payload.query
    },
    clearFilters(state) {
      state.filters = initialState.filters
    },
    changeQuery(state, actions) {
      state.query = actions.payload.query
    }
  }
})

export const {
    changeFilters,
    clearFilters,
    changeQuery
} = headerSlice.actions

export const selectFilters = (state: { filters: initialState }) => state.filters;
export const selectQuery = (state: { query: string}) => state.query;


export default headerSlice.reducer