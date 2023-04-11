import { useGetShopsQuery } from "../api/apiSlice";
import ShopCard from "../../components/ShopCard";

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
    content = <ShopCard shopData={shops} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div className="shop_list">{content}</div>
    </>
  );
};
