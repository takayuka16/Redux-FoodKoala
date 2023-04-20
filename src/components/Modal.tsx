import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addCartItem } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";
import type { Menu } from "../types/menus.type";
import ModalContent from "./ModalContent";

export default function CartModal({
  item,
  price,
}: {
  item: Menu;
  price: number;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    dispatch(addCartItem(item));
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
      <ModalContent open={open} onClose={handleClose} />
    </div>
  );
}
