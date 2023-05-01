import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetOrderHisorieQuery } from "../api/apiSlice";
import Cookies from "js-cookie";
import type { OrderHistory } from "../../types/orderHistory.type";
import { Container } from "@mui/material";

export default function OrderHistoryList() {
  const [userId, setUserId] = React.useState("");

  const {
    data: orderHistory = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderHisorieQuery(userId);

  React.useEffect(() => {
    if (Cookies.get("user_id") === undefined || null) {
      return;
    } else {
      setUserId(Cookies.get("user_id")!);
    }
  }, []);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    //ordered_atを日付け型に変換
    const newOrderDate: Date[] = [];
    for (let i = 0; i <= orderHistory.length - 1; i++) {
      const orderDate = new Date(orderHistory[i].ordered_at);
      newOrderDate.push(orderDate);
    }

    content = orderHistory.map((order: OrderHistory, index: number) => (
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 660,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`
                ${newOrderDate[index].getFullYear()}年
                ${newOrderDate[index].getMonth() + 1}月
                ${newOrderDate[index].getDate()}日 
                ${newOrderDate[index].getHours()}:
                ${newOrderDate[index].getMinutes()}`}
              secondary={
                <React.Fragment>
                  <Container
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      height: 50,
                    }}
                  >
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {`注文コード: ${order.order_code}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {`お支払い方法: ${order.payment_method}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {`注文個数: `}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {`合計: ${order.total}円`}
                    </Typography>
                  </Container>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Box>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>{content}</>;
}
