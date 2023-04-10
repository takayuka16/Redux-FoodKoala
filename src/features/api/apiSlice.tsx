import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://phxagaomodkoqjnhgobq.supabase.co/rest/v1",
  }),
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
        headers: {
          apikey: `${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoeGFnYW9tb2Rrb3Fqbmhnb2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NDcwMjQsImV4cCI6MTk5NDQyMzAyNH0.626hXzD7822SHE8A6tshtvUlKUg0h2gMxh2lBOm5uvY"}`,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoeGFnYW9tb2Rrb3Fqbmhnb2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NDcwMjQsImV4cCI6MTk5NDQyMzAyNH0.626hXzD7822SHE8A6tshtvUlKUg0h2gMxh2lBOm5uvY"}`,
        },
      }),
    }),
  }),
});

export const { useGetMenusQuery } = apiSlice;
