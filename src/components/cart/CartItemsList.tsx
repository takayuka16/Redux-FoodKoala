import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar/Avatar";
import {
  increment,
  decrement,
  getSubTotal,
  gettotal_amount,
  getCartCount,
  calculateTax,
} from "../../features/cart/CartSlice";
import { removeCartItem } from "../../features/cart/CartSlice";
import Divider from "@mui/material/Divider/Divider";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton/IconButton";
import { CartItems } from "../../types/cartItems.type";
import { useDispatch } from "react-redux";
import { LocalCart } from "../../types/cart.type";

export default function CartItemsList({
  cartItems,
  currentCart,
}: {
  cartItems: CartItems[];
  currentCart: LocalCart;
}) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ mb: 3, overflowX: "scroll" }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        key={"modal-title"}
      >
        注文リスト
      </Typography>
      {cartItems.length === 0 ? (
        <Typography id="modal-modal-description" sx={{ mt: 2 }} key={"no-item"}>
          カートに商品がありません
        </Typography>
      ) : (
        cartItems.map((item: CartItems) => (
          <Box
            id="shoppincart-modal-contents"
            sx={{
              my: 5,
              display: "flex",
              alignItems: "center",
            }}
            key={`item-${item.id}`}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Avatar
                aria-label="item_icon"
                variant="square"
                sx={{ width: 90, height: 90 }}
                key={`icon-${item.id}`}
              >
                <img
                  src={item.image_url}
                  alt="item_icon"
                  className="item_icon"
                  key={`img-${item.image_url}`}
                />
              </Avatar>
            </Box>
            <Box sx={{ mx: 3, flexGrow: 2 }} key={`box1-${item.id}`}>
              <Typography key={`name-${item.id}`}>{item.name}</Typography>
              <Typography key={`price-${item.id}`}>{item.price}円</Typography>
            </Box>
            <Box
              key={"item-count-box"}
              sx={{
                mr: 5,
                border: "1px solid black",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                width: 35,
              }}
            >
              <Box key={`box2-${item.id}`} sx={{ ml: 1 }}>
                <Typography key={`quantity-${item.id}`}>
                  {item.quantity}個
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(increment(item));
                    dispatch(getCartCount(""));
                    dispatch(getSubTotal(""));
                    dispatch(calculateTax(""));
                    dispatch(gettotal_amount(""));
                  }}
                >
                  <ArrowDropUpIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(decrement(item));
                    dispatch(getCartCount(""));
                    dispatch(getSubTotal(""));
                    dispatch(calculateTax(""));
                    dispatch(gettotal_amount(""));
                  }}
                >
                  <ArrowDropDownIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
            <Box key={"delete-button-box"} sx={{ flexGrow: 1 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  dispatch(removeCartItem(item));
                  dispatch(getCartCount(""));
                  dispatch(getSubTotal(""));
                  dispatch(calculateTax(""));
                  dispatch(gettotal_amount(""));
                }}
                key={`delete-${item.id}`}
              >
                削除
              </Button>
            </Box>
          </Box>
        ))
      )}
      <Divider sx={{ mt: 5 }} />
      <Typography component="p" variant="h6" sx={{ textAlign: "right", my: 2 }}>
        小計：{currentCart.sub_amount}円
      </Typography>
    </Box>
  );
}
