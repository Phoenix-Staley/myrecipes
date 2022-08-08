require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createSession(req) {
  const product = await stripe.products.create({
    name: req.body.charityName,
    description: "DonationDesc",
    images: ["https://example.com/t-shirt.png"],
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: req.body.amount,
    currency: "usd",
  });

  const session = await stripe.checkout.sessions.create({
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",

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
