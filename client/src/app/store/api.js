import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ page, pageSize }) => ({
        url: "users",
        params: {
          page,
          pageSize,
        },
      }),
      providesTags: ["Users"],
    }),
    createUser: build.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: ({ id, ...payload }) => ({
        url: "users/" + id,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    removeUser: build.mutation({
      query: (userId) => ({
        url: "users/" + userId,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = api;
