import stripe from "../stripe.js";

async function checkoutMW(req, res) {
	const { service } = res.locals;

	try {
		const product = await stripe.products.retrieve(service.stripeId);

		const session = await stripe.checkout.sessions.create({
			customer: res.locals.customer.id,
			mode: "subscription",
			line_items: [
				{
					price: product.default_price,
					quantity: 1,
				},
			],
			success_url: `${process.env.CLIENT_URL}/profile`,
			cancel_url: `${process.env.CLIENT_URL}/`,
		});

		res.json({ customerId: session.customer, url: session.url });
	} catch (e) {
		res.end(e);
	}
}

export default checkoutMW;
