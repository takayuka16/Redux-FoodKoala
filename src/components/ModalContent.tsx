import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { config } from "../apikey";
import { CartItems } from "../types/cartItems.type";
import type { LocalCart } from "../types/cart.type";
import CartItemsList from "./cart/CartItemsList";
import { forwardRef } from "react";

const ModalContent = forwardRef(function ModalContent(
  { onClose, cartData }: any,
  ref
) {
  const navigate = useNavigate();
  const url = config.SUPABASE_URL;
  const userId = Cookies.get("user_id");

  let cartItems: CartItems[] = [];
  let currentCart: LocalCart = {
    cartItems: cartItems,
    total_count: 0,
    tax: 0,
    sub_amount: 0,
    total_amount: 0,
    discount: 0,
    discount_amount: 0,
  };
  if (cartData) {
    currentCart = cartData;
    cartItems = cartData.cartItems;
  }

  async function postCartItems(userId: string) {
    cartItems.map(async (item) => {
      await fetch(`${url}/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          cart_id: Number(userId),
          shop_id: item.shop_id,
          item_id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
        }),
      }).catch((error) => {
        console.error(error);
        return;
      });
    });
  }

  async function postCart(userId: string) {
    await fetch(`${url}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${config.SUPABASE_ANON_KEY}`,
        Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        user_id: Number(userId),
        total_count: currentCart.total_count,
        tax: Math.floor(currentCart.tax),
        sub_amount: Math.floor(currentCart.sub_amount),
        total_amount: Math.floor(currentCart.total_amount),
      }),
    }).catch((error) => {
      console.error(error);
      return;
    });
  }

  const handleClick = async () => {
    if (userId === undefined || userId === null) {
      navigate("/login");
      onClose();
    } else {
      await postCartItems(userId);
      await postCart(userId);
      navigate("/confirm_order");
      onClose();
    }
  };

  return (
    <Box
      sx={{
        width: "40vw",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflowX: "scroll",
      }}
    >
      <CartItemsList cartItems={cartItems} currentCart={currentCart} />
      <Button
        variant="contained"
        color="inherit"
        fullWidth
        sx={{ mb: 5 }}
        onClick={handleClick}
        key={`click-btn`}
      >
        注文へ進む
      </Button>
    </Box>
  );
});

export default ModalContent;
