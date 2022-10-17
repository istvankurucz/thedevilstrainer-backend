import stripe from "../stripe.js";

async function subscribeMW(req, res, next) {
	const { service } = res.locals;

	try {
		// const product = await stripe.products.retrieve(service.productId);

		const session = await stripe.checkout.sessions.create({
			customer: res.locals.customer.id,
			mode: "subscription",
			line_items: [
				{
					price: service.priceId,
					quantity: 1,
				},
			],
			success_url: `${process.env.CLIENT_URL}/profile`,
			cancel_url: `${process.env.CLIENT_URL}/`,
		});

		res.json({ customerId: session.customer, url: session.url });
	} catch (e) {
		console.log(e);
		res.end(e);
	}
}

export default subscribeMW;
