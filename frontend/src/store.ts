import { configureStore } from "@reduxjs/toolkit";
import InfoCardSlice from "./features/InfoCard/InfoCardSlice";
import { apiSlice } from "./api/apiSlice";
import HeaderSlice from "./features/header/HeaderSlice";
const store = configureStore({
  reducer: {
    infoCard: InfoCardSlice,
    header: HeaderSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store