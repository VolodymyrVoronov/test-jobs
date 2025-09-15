import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IJobResponse } from "../types";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.arbeitnow.com/api/" }),
  endpoints: (builder) => ({
    getJobs: builder.query<IJobResponse, number | void>({
      query: (page = 1) => `job-board-api?page=${page}`,
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;
