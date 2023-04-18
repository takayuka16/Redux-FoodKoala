import { Box, Button, Container, TextField, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export const InquiryForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        mt: 2,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: 350,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ width: 350 }}>
          お問い合わせフォーム
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="お名前"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoFocus
          />
          <TextareaAutosize
            minRows={10}
            maxRows={10}
            minLength={30}
            maxLength={30}
            required
            name="contents"
            id="contents"
            placeholder="お問い合わせ内容を記載してください(最大300文字)"
            style={{ width: 800, marginTop: 20 }}
          />
          <Button
            type="submit"
            fullWidth
            color="inherit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            お問い合わせ内容を送信する
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
