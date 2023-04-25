import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CartItems } from "../../types/cartItems.type";
import { Cart } from "../../types/cart.type";
import { config } from "../../apikey";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartIcon() {
  const userId = Cookies.get("user_id");
  const navigate = useNavigate();
  const url = config.SUPABASE_URL;

  const cartData = localStorage.getItem("redux_localstorage_simple_cart");

  let cartItems: CartItems[] = [];
  let currentCart: Cart = {
    cartItems: cartItems,
    totalCount: 0,
    tax: 0,
    subAmount: 0,
    totalAmount: 0,
  };
  if (cartData !== null) {
    currentCart = JSON.parse(cartData);
    cartItems = currentCart.cartItems;
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
      alert("データをcart_itemsへ保存しました");
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
        total_count: currentCart.totalCount,
        tax: currentCart.tax,
        sub_amount: currentCart.subAmount,
        total_amount: currentCart.totalAmount,
      }),
    }).catch((error) => {
      console.error(error);
      return;
    });
    alert("データをcartsテーブルに保存しました");
  }

  const handleClick = async () => {
    if (userId === undefined || userId === null) {
      navigate("/login");
    } else {
      await postCartItems(userId);
      await postCart(userId);
      navigate("/confirm_order");
    }
  };

  return (
    <>
      <IconButton aria-label="cart" onClick={handleClick}>
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
    </>
  );
}
