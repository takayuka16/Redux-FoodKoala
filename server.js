const express = require("express");
const cors = require("cors");
const app = express();
const port = 4242;

const stripe = require("stripe")("sk_test_09l3shTSTKHYCzzZZsiLl2vA");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  return 1400;
};

app.get("/", async (req, res) => {
  res.end("server is function");
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "jpy",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port, () => console.log(`Node server listening on port ${port}`));
