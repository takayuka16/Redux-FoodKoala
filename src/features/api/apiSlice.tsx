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
    getOrderHisorie: builder.query({
      query: (userId) => ({
        url: `/order_history?user_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getOrderItems: builder.query({
      query: (userId) => ({
        url: `/order_items?user_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getCartItemsById: builder.query({
      query: (userId) => ({
        url: `/cart_items?cart_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    getCartById: builder.query({
      query: (userId) => ({
        url: `/carts?user_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    editPayment: builder.mutation({
      query: ({ userId, payment }) => ({
        url: `/carts?user_id=eq.${userId}`,
        method: "PATCH",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
        body: {
          payment_method: payment,
        },
      }),
    }),
    getCouponById: builder.query({
      query: (userId) => ({
        url: `/coupon?user_id=eq.${userId}`,
        method: "GET",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      }),
    }),
    editCoupon: builder.mutation({
      query: ({ userId, discount, couponcode }) => ({
        url: `/carts?user_id=eq.${userId}`,
        method: "PATCH",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
        body: {
          discount: discount,
          couponcode: couponcode,
        },
      }),
    }),
    addNewOrder: builder.mutation({
      query: (order) => ({
        url: `/order_history`,
        method: "POST",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
        body: order,
      }),
    }),
    addNewOrderItems: builder.mutation({
      query: (orderItems) => ({
        url: "/order_items",
        method: "POST",
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
        body: orderItems,
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
  useGetOrderHisorieQuery,
  useGetOrderItemsQuery,
  useGetCartItemsByIdQuery,
  useGetCartByIdQuery,
  useEditPaymentMutation,
  useGetCouponByIdQuery,
  useEditCouponMutation,
  useAddNewOrderMutation,
  useAddNewOrderItemsMutation,
} = apiSlice;
