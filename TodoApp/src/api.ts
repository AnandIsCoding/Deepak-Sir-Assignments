// src/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),

  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    // GET all todos
    getTodos: builder.query({
      query: () => `/todos`,
      providesTags: ["Todos"],
    }),

    // ADD todo
    addTask: builder.mutation({
      query: (task) => ({
        url: `/todos`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Todos"],
    }),

    // DELETE
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

    // TOGGLE completed
    toggleTask: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: { completed: !todo.completed },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskMutation,
} = api;
