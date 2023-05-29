const cors = require("cors");
const express = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeRouter = express.Router();

// Middlewares here
stripeRouter.use(express.json());
stripeRouter.use(cors());

// Routes here
stripeRouter.get("/", (req, res) => {
  res.send("stripe ok");
});

const platformTokenDiscount = {
  name: "500 platformToken",
  price: 400,
  quantity: 500,
  productOwner: "7frank",
  description:
    "will give you 500 token (with 20% off) to be able to do stuff on the platform",
};

const platformToken = {
  name: "100 platformToken",
  price: 100,
  quantity: 100,
  productOwner: "7frank",
  description: "will give you 100 token to be able to do stuff on the platform",
};

const products = {
  platformToken,
  platformTokenDiscount,
};

stripeRouter.get("/products", async (req, res) => {
  res.send(products);
});

stripeRouter.get("/create-checkout-session", async (req, res) => {
  const productName = req.query.p;

  const product = products[productName];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8080/payment/success",
    cancel_url: "http://localhost:8080/payment/cancel",
  });
  res.json({ id: session.id });
});

module.exports = { stripeRouter };
