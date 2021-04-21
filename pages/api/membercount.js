const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function countMembers() {
    const customers = await stripe.customers.list({
        limit: 100,
        });
        console.log(customers)
  return (customers.data.length)
}

export default async (req, res) => {
    const count = await countMembers()
    if (count) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify({count}))
    }
    else {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({error:"Could not count members"}))
    }
  }
  