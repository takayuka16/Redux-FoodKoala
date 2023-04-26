import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetCouponByIdQuery } from "../../features/api/apiSlice";
import Cookies from "js-cookie";
import { Coupon } from "../../types/coupon.type";
import { useEditCouponMutation } from "../../features/api/apiSlice";

export default function CouponList() {
  const [couponIndex, setCouponIndex] = React.useState("");
  const userId = Cookies.get("user_id");
  const {
    data: coupon,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCouponByIdQuery(userId);

  const [updateCoupon] = useEditCouponMutation();

  const handleChange = (event: SelectChangeEvent) => {
    const couponIndex = event.target.value as string;
    console.log("coupon", couponIndex);
    setCouponIndex(couponIndex);
    updateCoupon({
      userId: userId,
      discount: coupon[couponIndex].discount,
      couponcode: coupon[couponIndex].couponcode,
    });
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
          value={couponIndex}
          label="クーポンを選択"
          onChange={handleChange}
        >
          {coupon.map((coupon: Coupon, index: number) => (
            <MenuItem value={index} key={index}>
              {coupon.couponcode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Box sx={{ minWidth: 120, mt: 2 }}>{content}</Box>
    </>
  );
}
