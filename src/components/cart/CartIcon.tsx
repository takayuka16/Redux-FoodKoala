import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ModalContent from "../ModalContent";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartIcon() {
  const [open, setOpen] = React.useState(false);

  const cartData = localStorage.getItem("redux_localstorage_simple_cart");

  let currentCart;
  let cartItems = [];
  if (cartData !== null) {
    currentCart = JSON.parse(cartData);
    cartItems = currentCart.cartItems;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="cart" onClick={handleOpen}>
        {cartItems.length === 0 ? (
          <StyledBadge badgeContent={0} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        ) : (
          <StyledBadge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        )}
      </IconButton>
      <ModalContent open={open} onClose={handleClose} />
    </>
  );
}
