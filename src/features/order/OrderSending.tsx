import Cookies from "js-cookie";
import { useAddNewOrderItemsMutation } from "../api/apiSlice";
import { useAddNewOrderMutation } from "../api/apiSlice";
import {
  useGetCartByIdQuery,
  useGetCartItemsByIdQuery,
  useDeleteCartItemsMutation,
  useDeleteCartMutation,
} from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartItems } from "../../types/cartItems.type";
import { LocalCart } from "../../types/cart.type";
import { persistor } from "../../app/store";
import { useCallback, useEffect, useRef } from "react";

export default function OrderSending() {
  const navigate = useNavigate();
  const userId = Cookies.get("user_id");
  let ordered_at = useRef<Date>();
  let ordercode = useRef<string>();
  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useGetCartItemsByIdQuery(userId);
  const {
    data: cartData = [],
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetCartByIdQuery(userId);
  const currentCart = useSelector<any, LocalCart>((state) => state.cart);

  const [addNewOrder, { isError: isOrderError }] = useAddNewOrderMutation();
  const [addNewOrderItems, { isError: isOrderItemError }] =
    useAddNewOrderItemsMutation();
  const [deleteCartItems, { isError: isDeleteCartItemsError }] =
    useDeleteCartItemsMutation();
  const [deleteCart, { isError: isDeleteCartError }] = useDeleteCartMutation();

  //6. localStorageからデータを削除
  const deleteLocalCart = useCallback(() => {
    persistor.purge();
    localStorage.clear();
    console.log("localStorageからデータを削除しました");
    navigate("/order_completed");
  }, [navigate]);

  //5. cart_itemsおよびcartsテーブルからデータを削除
  const deleteCartContents = useCallback(async () => {
    await deleteCartItems(userId);
    if (isDeleteCartItemsError) {
      alert("cart_itemsデータの削除に失敗しました");
      navigate("/confirm_order");
    }
    console.log("cart_itemsからデータを削除しました");
    await deleteCart(userId);
    if (isDeleteCartError) {
      alert("cartsデータの削除に失敗しました");
      navigate("/confirm_order");
    }
    console.log("cartsからデータを削除しました");
    deleteLocalCart();
  }, [
    deleteCart,
    deleteCartItems,
    deleteLocalCart,
    isDeleteCartError,
    isDeleteCartItemsError,
    navigate,
    userId,
  ]);

  //4. order_itemsテーブルにデータを送信
  const postOrderItems = useCallback(async () => {
    await cartItems.map((item: CartItems, index: number) =>
      addNewOrderItems({
        shop_id: item.shop_id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        quantity: currentCart.cartItems[index].quantity,
        order_code: ordercode.current,
      })
    );
    if (isOrderItemError) {
      alert("order_itemsデータの送信に失敗しました");
      navigate("/confirm_order");
    }
    console.log("order_itemsにデータを送信しました");
    deleteCartContents();
  }, [
    addNewOrderItems,
    cartItems,
    currentCart.cartItems,
    deleteCartContents,
    isOrderItemError,
    navigate,
  ]);

  // 3. orderテーブルにデータを送信
  const postOrder = useCallback(async () => {
    await addNewOrder({
      user_id: Number(userId),
      payment_method: cartData[0].payment_method,
      couponcode: cartData[0].couponcode,
      ordered_at: ordered_at.current,
      order_code: ordercode.current,
      total_count: currentCart.total_count,
      sub_amount: Math.floor(currentCart.sub_amount),
      discount: Math.floor(currentCart.discount_amount),
      tax: Math.floor(currentCart.tax),
      total_amount: Math.floor(currentCart.total_amount),
    });
    if (isOrderError) {
      alert("orderデータの送信に失敗しました");
      navigate("/confirm_order");
    }
    console.log("orderデータを送信しました");
    postOrderItems();
  }, [
    addNewOrder,
    cartData,
    currentCart.discount_amount,
    currentCart.sub_amount,
    currentCart.tax,
    currentCart.total_amount,
    currentCart.total_count,
    isOrderError,
    navigate,
    postOrderItems,
    userId,
  ]);

  // 2.ランダムな10文字を生成（注文コード）
  const orderCode = useCallback(async () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 1; i <= 10; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    ordercode.current = str;
    console.log("注文コードを作成しました:", ordercode);
    postOrder();
  }, [postOrder]);

  // 1.注文した日付を取得
  const orderDate = useCallback(async () => {
    const date = new Date();
    ordered_at.current = date;
    console.log("注文日付：", ordered_at);
    orderCode();
  }, [orderCode]);

  useEffect(() => {
    if (userId === undefined || userId === null) {
      navigate("/login");
    } else if (isLoading || isCartLoading) {
      return;
    } else if (isError || isCartError) {
      alert("カートデータ取得に失敗しました");
    } else {
      orderDate();
    }
  }, [
    isCartError,
    isCartLoading,
    isError,
    isLoading,
    navigate,
    orderDate,
    userId,
  ]);

  return <div>注文中...</div>;
}
