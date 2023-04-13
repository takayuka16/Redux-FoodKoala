import Avatar from "@mui/material/Avatar";
import { useGetShopByIdQuery } from "../features/api/apiSlice";
import { Link } from "react-router-dom";

export default function ShopIcon({ shopId }: { shopId: number }) {
  const {
    data: shopData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopByIdQuery(shopId);

  let content;

  if (isLoading) {
    content = <></>;
  } else if (isSuccess) {
    content = (
      <Link to={`/shops/${shopData[0].id}`}>
        <Avatar aria-label="shop_icon" sx={{ width: 50, height: 50 }}>
          <img
            src={shopData[0].image_url}
            alt="shop_icon"
            className="shop_icon"
          />
        </Avatar>
      </Link>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
}
