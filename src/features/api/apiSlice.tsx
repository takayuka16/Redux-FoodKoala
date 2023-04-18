import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../apikey.js";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.SUPABASE_URL,
  }),
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getMenuById: builder.query({
      query: (itemId) => ({
        url: `/items?id=eq.${itemId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getMenuByShopId: builder.query({
      query: (shopId) => ({
        url: `/items?shop_id=eq.${shopId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getShops: builder.query({
      query: () => ({
        url: "/shops",
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getShopById: builder.query({
      query: (shopId) => ({
        url: `/shops?id=eq.${shopId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getOrderHisories: builder.query({
      query: (userId) => ({
        url: `/order_history?user_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenuByIdQuery,
  useGetMenuByShopIdQuery,
  useGetShopsQuery,
  useGetShopByIdQuery,
  useGetOrderHisoriesQuery,
} = apiSlice;
