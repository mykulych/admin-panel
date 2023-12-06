import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NEWS_API_URL,
  }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({search, country, category, page, pageSize}) => ({
        url: "top-headlines",
        params: {
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
          q: search,
          country,
          category,
          page,
          pageSize
        },
      }),
    }),
  }),
});

export const { useGetArticlesQuery } = newsApi;
