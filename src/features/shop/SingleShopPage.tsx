import { useParams } from "react-router-dom";
import { useGetShopByIdQuery } from "../api/apiSlice";
import { Shop } from "../../types/shops.type";

export const SingleShopPage = () => {
  const { shopId } = useParams();

  const {
    data: shopData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopByIdQuery(shopId);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    const shop: Shop = shopData[0];
    content = (
      <div className="shop">
        <h1>{shop.name}</h1>
        <img src={shop.image_url} alt="ショップ画像" />
        <p>{shop.description}</p>
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
};
