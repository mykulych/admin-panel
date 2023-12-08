import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({page, pageSize}) => ({
        url: "users",
        params: {
          page,
          pageSize
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = newsApi;
