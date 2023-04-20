import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import type { Menu } from "../types/menus.type";
import Avatar from "@mui/material/Avatar/Avatar";
import { removeCartItem } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalContent({ open, onClose }: any) {
  const dispatch = useDispatch();
  const cartData = localStorage.getItem("redux_localstorage_simple_cart");

  let currentCart;
  let cartItems = [];
  if (cartData !== null) {
    currentCart = JSON.parse(cartData);
    cartItems = currentCart.cartItems;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          注文リスト
        </Typography>
        {cartItems.length === 0 ? (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            カートに商品がありません
          </Typography>
        ) : (
          cartItems.map((item: Menu) => (
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                aria-label="item_icon"
                variant="square"
                sx={{ width: 60, height: 60, ml: 5 }}
              >
                <img
                  src={item.image_url}
                  alt="item_icon"
                  className="item_icon"
                />
              </Avatar>
              <Typography sx={{ mr: 5, ml: 15 }}>
                <div>{item.name}</div>
                <div>{item.price}円</div>
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => dispatch(removeCartItem(item))}
              >
                削除
              </Button>
            </Typography>
          ))
        )}
        <Button variant="contained" color="inherit" fullWidth sx={{ my: 5 }}>
          購入へ進む
        </Button>
      </Box>
    </Modal>
  );
}
