import type { CartItems } from "./cartItems.type";

type Cart = {
  cartItems: CartItems[];
  totalCount: number;
  tax: number;
  subAmount: number;
  totalAmount: number;
};

export type { Cart };
