import Card from "@mui/material/Card";
import { Menu } from "../../types/menus.type";
import { useGetMenuByIdQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShopIcon from "../../components/shop/ShopIcon";
import CartModal from "../../components/Modal";

export default function SingleMenuPage() {
  const { itemId } = useParams();

  const {
    data: menuData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenuByIdQuery(itemId);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    const menu: Menu = menuData[0];
    content = (
      <Card variant="outlined" sx={{ maxWidth: 400 }} className="menu_card">
        <CardHeader
          avatar={<ShopIcon shopId={menu.shop_id} />}
          title={menu.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="300"
          image={menu.image_url}
          alt="メニュー画像"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
          <CartModal item={menu} price={menu.price} />
        </CardContent>
      </Card>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div className="menu_list">{content}</div>;
}
