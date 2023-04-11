import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import * as React from "react";
import { useGetMenusQuery } from "../api/apiSlice";
import MenuCard from "../../components/MenuCard";
import { Menu } from "../../types/menus.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const MenuList = () => {
  const {
    data: menus = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery("") as Data;

  interface Data {
    data: Menu[];
    isLoading: Boolean;
    isSuccess: Boolean;
    isError: Boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
  }

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = <MenuCard menuData={menus} />;
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Header />
      <div className="menu_list">{content}</div>
      <Footer />
    </>
  );
};
