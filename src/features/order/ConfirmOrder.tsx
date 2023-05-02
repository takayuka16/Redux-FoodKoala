import Cookies from "js-cookie";
import { Box, Container } from "@mui/material";
import Payment from "../../components/order/Payment";
import { useNavigate } from "react-router-dom";
import ConfirmOrderList from "../../components/order/ConfirmOrderList";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const userId = Cookies.get("user_id");

  const confirmOrder = async () => {
    navigate("/order_sending");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 600,
          border: "solid 1px black",
          borderRadius: 3,
          my: 5,
          mx: 3,
          padding: 3,
        }}
      >
        <ConfirmOrderList userId={userId} />
        <Payment onClick={confirmOrder} />
      </Box>
    </Container>
  );
}
