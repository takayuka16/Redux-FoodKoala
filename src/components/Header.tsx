import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { config } from "../apikey";
import type { User } from "../types/users.type";
import CartIcon from "./cart/CartIcon";

const pages = [
  { name: "メニュー", path: "/items" },
  { name: "ショップ", path: "/shops" },
  { name: "お気に入り", path: "/favorites" },
  { name: "注文履歴", path: "order_history" },
];
const settings = [{ name: "マイページ", path: "/mypage" }];

export function Header() {
  const userId = Cookies.get("user_id");
  const url = config.SUPABASE_URL;
  const [userData, setUserData] = React.useState<User[]>();
  const [auth, setAuth] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  React.useEffect(() => {
    if (userId === undefined || null) {
      return;
    } else {
      setAuth(userId!);
      fetch(`${url}/users?id=eq.${userId}`, {
        headers: {
          apikey: `${config.SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, [url, userId]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    Cookies.remove("user_id");
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* パソコンのレイアウト */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/items">
              <img
                className="logo_img"
                src="/images/header_logo.png"
                alt="header-logo"
              />
            </Link>
          </Typography>
          {/* スマホのレイアウト */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={page.path} key={page.name}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
            }}
          >
            <img
              src="/images/header_logo.png"
              alt="header-logo"
              width={140}
              height={140}
            />
          </Typography>

          {/* パソコンのレイアウト */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.path} key={page.path}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mx: 2 }}>
            <CartIcon />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData === undefined ? (
                  <Avatar alt="未ログイン状態のアイコン" />
                ) : (
                  <Avatar src="/images/default_user_icon.png" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <Link to={`${setting.path}`} key={index}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
              {auth.length > 0 ? (
                <Link to="/login" key={"logout"}>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">ログアウト</Typography>
                  </MenuItem>
                </Link>
              ) : (
                <Link to="/login" key={"login"}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">ログイン</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
