import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetCouponByIdQuery } from "../features/api/apiSlice";
import Cookies from "js-cookie";
import { Coupon } from "../types/coupon.type";

export default function CouponList() {
  const [value, setValue] = React.useState("");
  const userId = Cookies.get("user_id");
  const {
    data: coupon,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCouponByIdQuery(userId);

  const handleChange = (event: SelectChangeEvent) => {
    const coupon = event.target.value as string;
    setValue(coupon);
  };

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">クーポンを選択</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="クーポンを選択"
          onChange={handleChange}
        >
          {coupon.map((coupon: Coupon) => (
            <MenuItem value={20}>{coupon.couponcode}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Box sx={{ minWidth: 120, my: 2 }}>{content}</Box>
    </>
  );
}
