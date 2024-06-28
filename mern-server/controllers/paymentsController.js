const stripe = require("../configs/stripe");

async function createCheckoutSession(req, res) {
  const { price, bookTitle } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: bookTitle,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const charges = await stripe.charges.list({
      limit: 100,
    });
    res.json(charges.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCheckoutSession,
  getOrders,
};
