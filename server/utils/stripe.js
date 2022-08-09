require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createSession(req) {
  const product = await stripe.products.create({
    name: req.body.charityName,
    description: req.body.charityStatement,
    images: [req.body.charityLogo],
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: req.body.amount,
    currency: "usd",
  });

  process.env.NODE_ENV === "production"
    ? (cancelUrl = "https://abps-myrecipes.herokuapp.com/")
    : (cancelUrl = "https://example.com/cancelDev");
  process.env.NODE_ENV === "production"
    ? (successUrl =
        "https://example.com/successProd") /*"https://abps-myrecipes.herokuapp.com/success"*/
    : (successUrl = "https://example.com/successDev");

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,

    mode: "payment",
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        charity: req.body.charityName,
      },
    },
    metadata: {
      charity: req.body.charityName,
    },
    submit_type: "donate",
    payment_method_types: ["card"],
  });
  return session;
}

module.exports = createSession;
