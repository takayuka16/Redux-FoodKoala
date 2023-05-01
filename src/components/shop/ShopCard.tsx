import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Shop } from "../../types/shops.type";
import { Link } from "react-router-dom";
import ShopTop3Menu from "./Shop_top3_menu";

export default function ShopCard({ shopData }: { shopData: Shop[] }) {
  return (
    <>
      {shopData.map((shop) => (
        <Card variant="outlined" sx={{ maxWidth: 380 }} className="shop_card">
          <Link to={`/shops/${shop.id}`}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ width: 80, height: 80 }}
                  src={shop.image_url}
                  aria-label="shop_icon"
                ></Avatar>
              }
              title={shop.name}
              titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
            />
            <ShopTop3Menu shopId={shop.id} />
            <CardContent sx={{ pb: 0, height: 50 }}>
              <Typography variant="body2" color="text.secondary">
                {shop.description}
              </Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
