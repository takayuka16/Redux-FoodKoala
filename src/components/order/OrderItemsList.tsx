import { Box, Typography } from "@mui/material";
import { useGetOrderItemsQuery } from "../../features/api/apiSlice";
import { OrderItems } from "../../types/orderItems.type";

export default function OrderItemsList({ ordercode }: { ordercode: string }) {
  const {
    data: OrderItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderItemsQuery(ordercode);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = OrderItems.map((item: OrderItems) => (
      <>
        <Typography>{item.name}</Typography>
        <Typography>{item.price}</Typography>
        <Typography>{item.quantity}</Typography>
      </>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Box>{content}</Box>;
}
