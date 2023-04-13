import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { config } from "../apikey";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const url = config.SUPABASE_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        apikey: `${config.SUPABASE_ANON_KEY}`,
        Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ユーザー登録が完了しました", data);
        navigate("/login");
      })
      .catch((error) => console.error("ログインに失敗しました", error.text()));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/images/foodkoala_logo.png"
            alt="Food Koalaのロゴ"
            className="logo_icon"
          />
          <Typography component="h1" variant="h5">
            新規ユーザー登録
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="姓"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="名"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="zipcode"
                  label="郵便番号"
                  id="zipcode"
                  autoComplete="123-4567"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="住所"
                  id="address"
                  autoComplete="東京都新宿区"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  type="tel"
                  label="電話番号"
                  id="phonenumber"
                  autoComplete="090-1234-5678"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              新規登録する
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  すでにアカウントをお持ちですか？
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// XML HTTP Requestバージョン
// const xhr = new XMLHttpRequest();
// xhr.open("GET", `${url}/users?email=${email}&password=${password}`, true);
//     xhr.setRequestHeader("apikey", `${config.SUPABASE_ANON_KEY}`);
//     xhr.setRequestHeader("Authorization", `Bearer ${config.SUPABASE_ANON_KEY}`);
//     xhr.send();

//     xhr.onreadystatechange = async function () {
//       if (xhr.status === 200 && xhr.readyState === 4) {
//         try {
//           console.log(xhr.responseText);
//           const response = await JSON.parse(xhr.responseText);
//           const data = response.json();
//           if (data.length > 0) {
//             Cookies.set("user_id", data[0].id);
//             navigate("/items");
//           } else {
//             throw new Error("ユーザーが見つかりませんでした");
//           }
//         } catch (error: any) {
//           console.error("ログインに失敗しました", error.text());
//         }
//       }
//     };
