import { createSlice } from '@reduxjs/toolkit'
import { LeanLineageNode } from '../../types';

type initialState = {
  isOpen : boolean;
  isInfoCardNewOrEditing: boolean;
  catagory: "group" | "species" | "individual";
  itemId: string;

  //if the item info has serialization issues then just use id and fetch the info within the component
}

const initialState = {
  isOpen: false,
  isInfoCardNewOrEditing: false,
  parents: {mother: {}, father: {}},
  catagory: "",
  itemId: "",

}


const infoCardSlice = createSlice({
  name: "infoCard",
  initialState,
  reducers: {
    toggleInfoCardOff(state) {
      state.isOpen = false
      state.isInfoCardNewOrEditing = false
      state.catagory = ""
      state.itemId = ""
    },
    toggleInfoCardOn(state, actions) {
      state.isOpen = true
      state.isInfoCardNewOrEditing = actions.payload.isInfoCardNewOrEditing || false
      state.catagory = actions.payload.catagory
      state.itemId = actions.payload.itemId || ""
      state.parents = {mother: actions.payload.mother || {}, father: actions.payload.father || {}}
    },
    toggleInfoCardEditModeOn(state) {
      state.isInfoCardNewOrEditing = true
    },
    changeCatagories(state, actions) {
      state.catagory = actions.payload.catagory
    },
    
  }
})

export const {
  toggleInfoCardOn,
  toggleInfoCardOff,
  toggleInfoCardEditModeOn,
  changeCatagories
} = infoCardSlice.actions

export const selectIsInfoCardOpen = (state: { infoCard: { isOpen:boolean; }; }) => state.infoCard.isOpen;
export const selectIsInfoNewOrEditing = (state: { infoCard: { isInfoCardNewOrEditing: boolean; }; }) => state.infoCard.isInfoCardNewOrEditing;
export const selectCatagory = (state: { infoCard: { catagory: "group" | "species" | "individual"; }; }) => state.infoCard.catagory;
export const selectId = (state: { infoCard: { itemId: string }; }) => state.infoCard.itemId;
export const selectParents = (state: { infoCard: { parents: {father: LeanLineageNode, mother: LeanLineageNode} } }) => state.infoCard.parents;

export default infoCardSlice.reducer