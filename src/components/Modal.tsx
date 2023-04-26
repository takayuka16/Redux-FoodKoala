import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  addCartItem,
  getCartCount,
  getSubTotal,
  calculateTax,
  gettotal_amount,
} from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";
import type { Menu } from "../types/menus.type";
import ModalContent from "./ModalContent";
import { Modal } from "@mui/material";

export default function CartModal({
  item,
  price,
}: {
  item: Menu;
  price: number;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const cartData = localStorage.getItem("redux_localstorage_simple_cart");

  const handleOpen = () => {
    dispatch(
      addCartItem({
        id: item.id,
        shop_id: item.shop_id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
      })
    );
    dispatch(getCartCount(""));
    dispatch(getSubTotal(""));
    dispatch(calculateTax(""));
    dispatch(gettotal_amount(""));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color="inherit"
        variant="contained"
        sx={{ width: 370, mt: 2, mx: "auto" }}
        onClick={handleOpen}
      >
        <Typography variant="body1" color="text.secondary">
          カートに追加する ¥{price}
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        key={"modal"}
      >
        <ModalContent onClose={handleClose} cartData={cartData} />
      </Modal>
    </div>
  );
}
