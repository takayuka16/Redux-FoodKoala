import React from "react";
import { useGetShopsQuery } from "../api/apiSlice";
import ShopCard from "../../components/shop/ShopCard";
import { Pagination } from "@mui/material";

export const ShopList = () => {
  const [page, setPage] = React.useState(0);
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
    let pagingData;
    if (shops.length >= 6) {
      pagingData = shops.slice(page * 6, page * 6 + 6);
    } else {
      pagingData = shops;
    }
    content = (
      <>
        <ShopCard shopData={pagingData} />
        <Pagination
          count={shops.length / 6}
          sx={{ mt: 3 }}
          onChange={(e, value) => setPage(value - 1)}
        />
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div className="shop_list">{content}</div>
    </>
  );
};
