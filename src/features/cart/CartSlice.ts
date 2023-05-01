import { createSlice } from "@reduxjs/toolkit";
import { LocalCart } from "../../types/cart.type";
import { createEntityAdapter } from "@reduxjs/toolkit";

const useCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total_count: 0,
    sub_amount: 0,
    discount: 0,
    discount_amount: 0,
    tax: 0,
    total_amount: 0,
  } as LocalCart,

  reducers: {
    addCartItem: (state, action) => {
      let cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].quantity += 1;
      } else {
        let tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    getCartItems: (state, action) => {
      return {
        ...state,
      };
    },
    getCartCount: (state, action) => {
      let cartCount = state.cartItems.reduce((total, item) => {
        return item.quantity + total;
      }, 0);
      state.total_count = cartCount;
    },
    getSubTotal: (state, action) => {
      state.sub_amount = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    removeCartItem: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    increment: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[index].quantity += 1;
    },
    decrement: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[index].quantity <= 0) {
        state.cartItems[index].quantity = 0;
      } else {
        state.cartItems[index].quantity -= 1;
      }
    },
    editDiscount: (state, action) => {
      state.discount = action.payload;
    },
    getDiscount_amount: (state, action) => {
      state.discount_amount = (state.sub_amount * state.discount) / 100;
    },
    calculateTax: (state, action) => {
      let totalTax = (10 / 100) * (state.sub_amount - state.discount_amount);
      state.tax = totalTax;
    },
    gettotal_amount: (state, action) => {
      state.total_amount = state.sub_amount - state.discount_amount + state.tax;
    },
  },
});

const cartsAdapter = createEntityAdapter<LocalCart>();

export const {
  addCartItem,
  getCartItems,
  removeCartItem,
  getCartCount,
  getSubTotal,
  increment,
  decrement,
  calculateTax,
  gettotal_amount,
  editDiscount,
  getDiscount_amount,
} = useCartSlice.actions;
export default useCartSlice.reducer;

export const {
  selectAll: selectCartsData,
  selectEntities: selectCartEntities,
} = cartsAdapter.getSelectors<any>((state) => state.cart);
