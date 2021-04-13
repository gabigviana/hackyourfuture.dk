const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const SITE_DOMAIN = 'http://localhost:3000';

const donationLabels = {
  "one-time": "One time donation to HackYourFuture",
  "monthly": "Monthly donation to HackYourFuture",
}

async function createDonation(dontationDetails) {
  console.log("got details", dontationDetails)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'dkk',
          product_data: {
            name: donationLabels[dontationDetails.type],
            images: ["https://hackyourfuture.dk/static/logo-dark.svg"],
          },
          unit_amount: dontationDetails.amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${SITE_DOMAIN}/donation/success`,
    cancel_url: `${SITE_DOMAIN}/donation/cancel`,
  });

  return ({ id: session.id })
}

export default async (req, res) => {
    try {
      const donation = await createDonation(req.body) 
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(donation))
    } catch (error) {
      console.log(error);
    }
  }
  