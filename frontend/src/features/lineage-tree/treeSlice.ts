import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 'idle',
  entities: {}
}

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {

  }
})

export const {} = treeSlice.actions
export default treeSlice.reducer