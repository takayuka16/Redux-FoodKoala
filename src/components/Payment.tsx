import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/joy";
import { useEditPaymentMutation } from "../features/api/apiSlice";
import Cookies from "js-cookie";

export default function Payment() {
  const userId = Cookies.get("user_id");
  const [value, setValue] = React.useState("現金");
  const [updatePayment] = useEditPaymentMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const payment = (event.target as HTMLInputElement).value;
    setValue(payment);
    updatePayment({ userId: userId, payment: payment });
  };

  return (
    <>
      <Box
        sx={{
          border: "solid 1px darkgray",
          borderRadius: 3,
          my: 3,
          padding: 2,
        }}
      >
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            お支払い方法
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="現金" control={<Radio />} label="現金" />
            <FormControlLabel
              value="クレジットカード"
              control={<Radio />}
              label="クレジットカード"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
}
