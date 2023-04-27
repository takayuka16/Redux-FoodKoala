import { Box, Typography } from "@mui/material";
import { useGetOrderItemsQuery } from "../../features/api/apiSlice";
import { OrderItems } from "../../types/orderItems.type";
import Avatar from "@mui/material/Avatar";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function OrderItemsList({ ordercode }: { ordercode: string }) {
  const {
    data: orderItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderItemsQuery(ordercode);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReceiptLongIcon />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            key={"modal-title"}
          >
            注文リスト
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            pt: 1,
            pb: 2,
            border: "1px solid darkgray",
            borderRadius: 2,
          }}
        >
          {orderItems.map((item: OrderItems) => (
            <Box
              id="modal-modal-description"
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
              }}
              key={`item-${item.id}`}
            >
              <Avatar
                aria-label="item_icon"
                variant="square"
                sx={{ width: 70, height: 70, ml: 5 }}
                key={`icon-${item.id}`}
              >
                <img
                  src={item.image_url}
                  alt="item_icon"
                  className="item_icon"
                  key={`img-${item.image_url}`}
                />
              </Avatar>
              <Box sx={{ mx: 3 }} key={`box1-${item.id}`}>
                <Typography key={`name-${item.id}`}>{item.name}</Typography>
                <Typography key={`price-${item.id}`}>{item.price}円</Typography>
              </Box>
              <Box key={`box2-${item.id}`} sx={{ ml: 1 }}>
                <Typography key={`quantity-${item.id}`}>
                  {item.quantity}個
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Box>{content}</Box>;
}
