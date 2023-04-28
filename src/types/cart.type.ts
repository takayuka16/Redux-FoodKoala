import type { CartItems } from "./cartItems.type";

type LocalCart = {
  cartItems: CartItems[];
  total_count: number;
  tax: number;
  sub_amount: number;
  discount: number;
  discount_amount: number;
  total_amount: number;
};

type Cart = {
  id: number;
  user_id: number;
  discount: number;
  couponcode: string;
  payment_method: string;
  total_count: number;
  tax: number;
  sub_amount: number;
  total_amount: number;
};

export type { LocalCart, Cart };
