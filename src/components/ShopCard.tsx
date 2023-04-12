import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Shop } from "../types/shops.type";
import { Link } from "react-router-dom";

export default function ShopCard({ shopData }: { shopData: Shop[] }) {
  return (
    <>
      {shopData.map((shop) => (
        <Card variant="outlined" sx={{ maxWidth: 345 }} className="shop_card">
          <Link to={`/shops/${shop.id}`}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={shop.name}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="350"
              image={shop.image_url}
              alt="メニュー画像"
            />
            <CardContent>
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
