import { Box, Paper, Container, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useGetOrderHisorieQuery } from "../api/apiSlice";
import Cookies from "js-cookie";
import OrderItemsList from "../../components/order/OrderItemsList";

export default function OrderCompleted() {
  const userId = Cookies.get("user_id");
  const {
    data: orderHistory,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderHisorieQuery(userId);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          ご注文ありがとうございました!
        </Typography>
        <Box sx={{ my: 2 }}>
          <OrderItemsList ordercode={orderHistory[0].ordercode} />
          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <PlaceIcon />
            <Typography>お店へのアクセスはこちら</Typography>
          </Box>
          <iframe
            title="shop_map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1620.2499744702093!2d139.70209411744383!3d35.689312900000026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d9c8bc1bfbb%3A0xcb44f68a614c714a!2z5qCq5byP5Lya56S-44Op44Kv44K544OR44O844OI44OK44O844K6!5e0!3m2!1sja!2sjp!4v1678233520521!5m2!1sja!2sjp"
            width="400"
            height="280"
            loading="lazy"
          ></iframe>
        </Box>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          my: 5,
          width: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/images/foodkoala_logo.png"
          alt="Food Koalaのロゴ"
          className="logo_icon"
        />
        {content}
      </Paper>
    </Container>
  );
}
