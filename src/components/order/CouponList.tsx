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
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider/Divider";
import { useDispatch } from "react-redux";
import {
  getDiscount_amount,
  gettotal_amount,
  calculateTax,
  editDiscount,
} from "../../features/cart/CartSlice";

export default function CouponList({
  discountAmount,
  tax,
  totalAmount,
}: {
  discountAmount: number;
  tax: number;
  totalAmount: number;
}) {
  const [couponIndex, setCouponIndex] = React.useState("");
  const userId = Cookies.get("user_id");
  const dispatch = useDispatch();
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
    const discount = coupon[couponIndex].discount;
    console.log("coupon", couponIndex);
    setCouponIndex(couponIndex);
    updateCoupon({
      userId: userId,
      discount: discount,
      couponcode: coupon[couponIndex].couponcode,
    });
    dispatch(editDiscount(discount));
    dispatch(getDiscount_amount(""));
    dispatch(calculateTax(""));
    dispatch(gettotal_amount(""));
  };

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    content = (
      <>
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
        <Typography
          component="div"
          variant="body1"
          sx={{ textAlign: "right", mt: 1, color: "red" }}
        >
          お値引き: -{Math.floor(discountAmount)}円
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{ textAlign: "right", mt: 1 }}
        >
          消費税: {Math.floor(tax)}円
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Typography
          component="p"
          variant="h6"
          sx={{ textAlign: "right", mb: 1, mt: 2 }}
        >
          合計：{Math.floor(totalAmount)}円
        </Typography>
      </>
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
