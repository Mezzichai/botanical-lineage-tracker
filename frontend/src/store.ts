import { configureStore } from "@reduxjs/toolkit";
import InfoCardSlice from "./features/InfoCard/InfoCardSlice";
import { apiSlice } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    infoCard: InfoCardSlice,
    [apiSlice.reducerPath]: apiSlice.reducer

  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store