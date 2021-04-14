const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const SITE_DOMAIN = process.env.STRIPE_RETURN_DOMAIN;

const donationLabels = {
  "one-time": "One time donation to HackYourFuture",
  "monthly": "Monthly donation to HackYourFuture until you stop it",
}

async function createSubscriptionDonation(dontationDetails) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'dkk',
          recurring:{interval:"month"},
          product_data: {
            name: donationLabels[dontationDetails.type],
            images: ["https://hackyourfuture.dk/static/logo-dark.svg"],
          },
          unit_amount: dontationDetails.amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${SITE_DOMAIN}/donation-success`,
    cancel_url: `${SITE_DOMAIN}/donate`,
  });

  return ({ id: session.id })
}
async function createOneTimeDonation(dontationDetails) {
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
    success_url: `${SITE_DOMAIN}/donation-success`,
    cancel_url: `${SITE_DOMAIN}/donate`,
  });

  return ({ id: session.id })
}

export default async (req, res) => {
    try {
      let donation = false
      if (req.body.type === "one-time") {
        donation = await createOneTimeDonation(req.body) 
      }
      else if (req.body.type === "monthly") {
        donation = await createSubscriptionDonation(req.body) 
      }
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(donation))
    } catch (error) {
      console.log(error);
    }
  }
  