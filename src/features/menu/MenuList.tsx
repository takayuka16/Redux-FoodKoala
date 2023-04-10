import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import * as React from "react";
import Button from "@mui/material/Button";
import { useGetMenusQuery } from "../api/apiSlice";

export const MenuList = () => {
  const {
    data: menus = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery("");

  const renderedMenu = menus.map((menu: any) => (
    <li key={menu.id}>{menu.name}</li>
  ));

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = <div>{renderedMenu}</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Header />
      <h1>メニュー一覧</h1>
      <div>
        {content}
        <Button variant="outlined">Hello World</Button>
      </div>
      <Footer />
    </>
  );
};
