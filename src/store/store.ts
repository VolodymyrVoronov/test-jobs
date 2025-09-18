import { configureStore } from "@reduxjs/toolkit";

import { jobApi } from "../services/jobApi";

import appReducer from "./appSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    theme: themeReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
