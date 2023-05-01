import * as React from "react";
import { useGetMenusQuery } from "../api/apiSlice";
import MenuCard from "../../components/menu/MenuCard";
import { Menu } from "../../types/menus.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Pagination } from "@mui/material";

export const MenuList = () => {
  const [page, setPage] = React.useState(0);
  const {
    data: menus = [],
    isLoading: isMenuLoading,
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

  if (isMenuLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    let pagingData;
    if (menus.length >= 6) {
      pagingData = menus.slice(page * 6, page * 6 + 6);
    } else {
      pagingData = menus;
    }
    content = (
      <>
        <MenuCard menuData={pagingData} />
        <Pagination
          count={menus.length / 6}
          sx={{ mt: 3 }}
          onChange={(e, value) => setPage(value - 1)}
        />
      </>
    );
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <div className="menu_list">{content}</div>;
};
