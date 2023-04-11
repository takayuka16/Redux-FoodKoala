import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useGetShopsQuery } from "../api/apiSlice";
import type { Shop } from "../../types/shops.type";

export const ShopList = () => {
  const {
    data: shops,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsQuery("");

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    const renderedShoplist = shops.map((shop: Shop) => (
      <div className="shop">
        <h2>{shop.name}</h2>
        <img src={shop.image_url} alt="ショップ画像" />
      </div>
    ));
    content = renderedShoplist;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <head>
        <title>ショップ一覧</title>
      </head>
      <Header />
      <h1>ショップ一覧</h1>
      {content}
      <Footer />
    </>
  );
};
