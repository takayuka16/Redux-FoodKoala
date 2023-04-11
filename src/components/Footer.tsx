import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/concept"
            sx={{
              mr: 2,
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
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
              fontWeight: 700,
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

// import { Link } from "react-router-dom";

// export const Footer = () => {
//   return (
//     <>
//       <footer>
//         <ul>
//           <Link to="/concept">
//             <li>コンセプト</li>
//           </Link>
//           <Link to="/inquiry_form">
//             <li>お問い合わせ</li>
//           </Link>
//         </ul>
//       </footer>
//     </>
//   );
// };
