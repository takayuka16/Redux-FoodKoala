import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Footer() {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ justifyContent: "end" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/concept"
            sx={{
              mr: 5,
              flexGrow: 0,
              fontFamily: "monospace",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Concept
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/inquiry_form"
            sx={{
              mr: 2,
              flexGrow: 0,
              fontFamily: "monospace",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            お問い合わせ
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
