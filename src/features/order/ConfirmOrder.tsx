import Cookies from "js-cookie";
import { useGetCartItemsByIdQuery } from "../api/apiSlice";
import { useGetCartByIdQuery } from "../api/apiSlice";
import CartItemsList from "../../components/cart/CartItemsList";
import { Box, Container } from "@mui/material";
import Payment from "../../components/Payment";
import CouponList from "../../components/CouponList";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAddNewOrderItemsMutation } from "../api/apiSlice";
import { useAddNewOrderMutation } from "../api/apiSlice";

export default function ConfirmOrder() {
  const userId = Cookies.get("user_id");
  const {
    data: cartItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartItemsByIdQuery(userId);

  const {
    data: cartData,
    isLoading: isCartLoading,
    isSuccess: isCartSuccess,
    isError: isCartError,
    error: cartError,
  } = useGetCartByIdQuery(userId);

  const [addNewOrder] = useAddNewOrderMutation();
  const [addNewOrderItems] = useAddNewOrderItemsMutation();

  //注文確定ボタンを押すとcart_itemsとcartsの内容をorder-itemsおよびorder_historyにPOSTする
  // const confirmOrder = async () => {
  //   addNewOrder({
  //     cartId:
  //   });
  //   addNewOrderItems({
  //     cartItems,
  //   });
  // };

  let content;

  if (isLoading || isCartLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess && isCartSuccess) {
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
              totalCount: cartData[0].total_count,
              tax: cartData[0].tax,
              subAmount: cartData[0].sub_amount,
              totalAmount: cartData[0].total_amount,
            }}
          />
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
          <CouponList />
          <Payment />
          <Button
            variant="contained"
            fullWidth
            color="inherit"
            // onClick={confirmOrder}
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
