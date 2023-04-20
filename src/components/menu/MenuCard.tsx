import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { Menu } from "../../types/menus.type";
import { Link } from "react-router-dom";
import ShopIcon from "../shop/ShopIcon";

export default function MenuCard({ menuData }: { menuData: Menu[] }) {
  return (
    <>
      {menuData.map((menu) => (
        <Card variant="outlined" sx={{ maxWidth: 345 }} className="menu_card">
          <Link to={`/items/${menu.id}`}>
            <CardHeader
              avatar={<ShopIcon shopId={menu.shop_id} />}
              title={menu.name}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={menu.image_url}
              alt="メニュー画像"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {menu.description}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ))}
    </>
  );
}
