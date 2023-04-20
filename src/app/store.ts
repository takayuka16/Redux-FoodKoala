import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import useCartReducer from "../features/cart/CartSlice";
import { save, load } from "redux-localstorage-simple";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: useCartReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(save({ states: ["cart"] })),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
