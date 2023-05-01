import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItems } from "../../types/cartItems.type";
import { LocalCart } from "../../types/cart.type";
import { Modal } from "@mui/material";
import ModalContent from "../ModalContent";
import { useSelector } from "react-redux";

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
  const cartData = useSelector<any, LocalCart>((state) => state.cart);

  let cartItems: CartItems[] = [];

  if (cartData) {
    cartItems = cartData.cartItems;
  }

  const handleOpen = async () => {
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="shoppincart-modal"
        aria-describedby="shoppingcart-modal"
        key={"modal"}
        sx={{
          overflowX: "scroll",
        }}
      >
        <ModalContent onClose={handleClose} cartData={cartData} />
      </Modal>
    </>
  );
}
