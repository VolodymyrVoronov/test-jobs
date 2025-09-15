import { configureStore } from "@reduxjs/toolkit";

import { jobApi } from "../services/jobApi";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
