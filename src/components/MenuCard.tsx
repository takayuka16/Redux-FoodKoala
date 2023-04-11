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
import ShareIcon from "@mui/icons-material/Share";
import type { Menu } from "../types/menus.type";

export default function MenuCard({ menuData }: { menuData: Menu[] }) {
  return (
    <>
      {menuData.map((menu) => (
        <Card variant="outlined" sx={{ maxWidth: 345 }} className="menu_card">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
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
              {menu.discription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
