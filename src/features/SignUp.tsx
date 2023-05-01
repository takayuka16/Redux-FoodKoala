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
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  phone_number: string;
  password: string;
};

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

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^(^[0-9]*)$/, "数字は使用できません")
    .required("氏名は入力必須項目です"),
  email: yup
    .string()
    .lowercase()
    .email("正しいメールアドレスの形式で入力してください")
    .required("メールアドレスは入力必須項目です"),
  zipcode: yup.string().max(7).min(7).required("郵便番号は入力必須項目です"),
  address: yup.string().required("住所は入力必須項目です"),
  phone_number: yup
    .string()
    .max(11)
    .min(11)
    .required("電話番号は入力必須項目です"),
  password: yup
    .string()
    .matches(/(?=.*[a-z])/, "小文字を含めてください")
    .matches(/(?=.*[A-Z])/, "大文字を含めてください")
    .matches(/(?=.*[0-9])/, "数字を含めてください")
    .min(8, "パスワードは8文字以上16文字以下で入力してください")
    .max(16, "パスワードは8文字以上16文字以下で入力してください")
    .required("パスワードは必須項目です"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const url = config.SUPABASE_URL;
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    zipcode: "",
    address: "",
    phone_number: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    React.useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async () => {
    await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${config.SUPABASE_ANON_KEY}`,
        Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ユーザー登録に成功しました", data.message());
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //パスワードと確認用パスワードが等しいか確認
  const checkPassword = (confirmPassword: string) => {
    if (values.password === confirmPassword) {
      setConfirmPasswordMessage("");
      setConfirmPassword(false);
    } else {
      setConfirmPasswordMessage("確認用パスワードが間違っています");
      setConfirmPassword(true);
    }
  };

  //郵便番号から住所を検索
  const searchAddress = async () => {
    await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${values.zipcode}`
    )
      .then((res) => res.json())
      .then((data) =>
        setValues({
          ...values,
          address: `${
            data.results[0].address1 +
            data.results[0].address2 +
            data.results[0].address3
          }`,
        })
      )
      .catch((error) => console.log("郵便番号検索に失敗しました", error));
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  value={values.name}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  id="name"
                  label="氏名"
                  autoFocus
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id="email"
                  label="メールアドレス"
                  name="email"
                  value={values.email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  name="zipcode"
                  error={!!errors.zipcode}
                  helperText={errors.zipcode?.message}
                  value={values.zipcode}
                  label="郵便番号(ハイフン不要)"
                  id="zipcode"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                  }
                />
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={searchAddress}
                >
                  郵便番号で住所を検索
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  name="address"
                  value={values.address}
                  label="住所"
                  id="address"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                  name="phone_number"
                  value={values.phone_number}
                  type="tel"
                  label="電話番号"
                  id="phonenumber"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  name="password"
                  value={values.password}
                  label="パスワード"
                  type="password"
                  id="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={confirmPassword}
                  helperText={confirmPasswordMessage}
                  name="confirmed_password"
                  label="確認用パスワード"
                  type="password"
                  id="confirmed_password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    checkPassword(e.currentTarget.value);
                  }}
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
