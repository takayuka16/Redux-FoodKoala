import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";

export default function Concept() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          mt: 2,
        }}
      >
        <Container>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            いつまでも「おいしい」に包まれた世界へ
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            FoodKoalaは廃棄寸前の食品専門のテイクアウト予約サービス。
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            捨てられるはずの「おいしい」を食卓に届け、「おいしい」に包まれた未来を守ります。
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/waste.concept.png"
                alt="concept_foodloss"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  食品ロス削減に貢献！
                </Typography>
                <Typography>
                  日本国内における食品ロスは年間520万トン。
                  うち、事業系による食品ロスは275万トン。※2020年度
                  FoodKoalaの利用で、
                  食品廃棄物削減の社会貢献をすることができます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/eat.concept.png"
                alt="concept_delicioius"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  おいしい店舗がたくさん！
                </Typography>
                <Typography>
                  Food Koalaの登録店舗のジャンルは様々。
                  気になっていたお店のお試しにもご利用いただけます。
                  あなたのお気に入りなお店も見つかるかも！
                  おいしく楽しい食事の時間を提供します。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/money.concept.png"
                alt="concept_environment"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  環境への配慮でお得に！
                </Typography>
                <Typography>
                  廃棄予定の食品を販売しているため、
                  すべてのメニューが通常よりお得な金額となっております。
                  さらに、容器の持参で 地球にやさしくお得な割引も行っています。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 2,
          mb: 0,
        }}
      >
        <Container>
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
          >
            ご利用方法
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 4, mt: 0 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/search.concept.png"
                alt="concept_search"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  <FontAwesomeIcon icon={fa1} />
                  &nbsp;商品を探す
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/cart.concept.png"
                alt="concept_cart"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  <FontAwesomeIcon icon={fa2} />
                  &nbsp;商品を予約する
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <CardMedia
                component="img"
                image="/images/concept/get.concept.png"
                alt="concept_get"
                sx={{ width: 250, height: 250, objectFit: "cover", mx: "auto" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  <FontAwesomeIcon icon={fa3} />
                  &nbsp;お店で商品を受け取る
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Stack
        sx={{ pt: 4, mt: 4 }}
        direction="row"
        spacing={4}
        justifyContent="center"
      >
        <Button
          color="inherit"
          variant="contained"
          onClick={() => navigate("/signUp")}
        >
          会員登録はこちら
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => navigate("/items")}
        >
          商品一覧はこちら
        </Button>
      </Stack>
    </>
  );
}
