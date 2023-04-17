type OrderHistory = {
  cart_id: number;
  user_id: number;
  order_code: string;
  ordered_at: string;
  discount: number;
  couponcode: string;
  subtotal: number;
  total: number;
  payment_method: string;
  chopstick: number;
  folk: number;
  spoon: number;
  oshibori: number;
};

export type { OrderHistory };
