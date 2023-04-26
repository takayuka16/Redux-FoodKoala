import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetCartItemsByIdQuery } from "../api/apiSlice";
import { useGetCartByIdQuery } from "../api/apiSlice";
import CartItemsList from "../../components/cart/CartItemsList";
import { Box, Container } from "@mui/material";
import Payment from "../../components/order/Payment";
import CouponList from "../../components/order/CouponList";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAddNewOrderItemsMutation } from "../api/apiSlice";
import { useAddNewOrderMutation } from "../api/apiSlice";
import { CartItems } from "../../types/cartItems.type";
import Divider from "@mui/material/Divider/Divider";
import { useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const userId = Cookies.get("user_id");
  const [buttonState, setButtonState] = useState(false);

  const {
    data: cartItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartItemsByIdQuery(userId);

  const {
    data: cartData = [],
    isLoading: isCartLoading,
    isSuccess: isCartSuccess,
    isError: isCartError,
    error: cartError,
  } = useGetCartByIdQuery(userId);

  const [addNewOrder, { isLoading: isOrderLoading, isError: isOrderError }] =
    useAddNewOrderMutation();
  const [
    addNewOrderItems,
    { isLoading: isOrderItemLoading, isError: isOrderItemError },
  ] = useAddNewOrderItemsMutation();

  // 購入確定ボタンがクリックされた際、データの送信が完了するまではボタンをdisabledにする
  useEffect(() => {
    if (isOrderLoading || isOrderItemLoading) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [isOrderItemLoading, isOrderLoading]);

  // 1.注文した日付を取得
  let ordered_at: Date;
  const orderDate = async () => {
    const date = new Date();
    ordered_at = date;
    console.log("注文日付：", ordered_at);
  };

  // 2.ランダムな10文字を生成（注文コード）
  let ordercode: string;
  const orderCode = async () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 1; i <= 10; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    ordercode = str;
    console.log("注文コードを作成しました:", ordercode);
  };

  //注文確定ボタンを押すとcart_itemsとcartsのデータをorder-itemsおよびorder_historyにPOSTする
  const confirmOrder = async () => {
    await orderDate();
    await orderCode();

    await addNewOrder({
      user_id: Number(userId),
      payment_method: cartData[0].payment_method,
      discount: cartData[0].discount,
      couponcode: cartData[0].couponcode,
      ordered_at: ordered_at,
      sub_amount: cartData[0].sub_amount,
      ordercode: ordercode,
      total_amount: cartData[0].total_amount,
      tax: cartData[0].tax,
      total_count: cartData[0].total_count,
    });

    await cartItems.map((item: CartItems) =>
      addNewOrderItems({
        shop_id: item.shop_id,
        price: item.price,
        quantity: item.quantity,
        ordercode: ordercode,
        image_url: item.image_url,
        name: item.name,
      })
    );

    if (isOrderError || isOrderItemError) {
      alert("データの送信に失敗しました");
    }

    navigate("/order_completed");
  };

  let content;

  if (isLoading || isCartLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess && isCartSuccess) {
    const coupon = (cartData[0].sub_amount * cartData[0].discount) / 100;

    content = (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 550,
            border: "solid 1px black",
            borderRadius: 3,
            my: 5,
            mx: 3,
            padding: 3,
          }}
        >
          <CartItemsList
            cartItems={cartItems}
            currentCart={{
              cartItems: cartItems,
              total_count: cartData[0].total_count,
              tax: cartData[0].tax,
              sub_amount: cartData[0].sub_amount,
              total_amount: cartData[0].total_amount,
            }}
          />
          <CouponList />
          <Typography
            component="div"
            variant="body1"
            sx={{ textAlign: "right", mt: 1, color: "red" }}
          >
            お値引き: -{coupon}円
          </Typography>
          <Typography
            component="div"
            variant="body1"
            sx={{ textAlign: "right", mt: 1 }}
          >
            消費税: {cartData[0].tax}円
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Typography
            component="p"
            variant="h6"
            sx={{ textAlign: "right", mb: 1, mt: 2 }}
          >
            合計：{cartData[0].total_amount - coupon}円
          </Typography>
        </Box>
        <Box
          sx={{
            width: 350,
            border: "solid 1px black",
            borderRadius: 3,
            my: 5,
            mx: 3,
            padding: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            お支払い詳細
          </Typography>
          <Payment />
          <Button
            variant="contained"
            fullWidth
            color="inherit"
            onClick={confirmOrder}
            sx={{ my: 3 }}
            disabled={buttonState}
          >
            注文を確定する
          </Button>
        </Box>
      </Container>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else if (isCartError) {
    content = <div>{cartError.toString()}</div>;
  }

  return <>{content}</>;
}
