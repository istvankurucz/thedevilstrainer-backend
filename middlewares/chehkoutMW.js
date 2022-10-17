import stripe from "../stripe.js";

async function chehkoutMW(req, res, next) {
	const { products } = res.locals;
	// console.log("Requested products:\n", req.body.products);
	// console.log("Fetched products:\n", products);

	try {
		const session = await stripe.checkout.sessions.create({
			customer: res.locals.customer.id,
			mode: "payment",
			line_items: products.map((product) => ({
				/*price_data: {
					currency: product.currency,
					product_data: {
						name: product.name,
					},
					unit_amount: product.price,
				},*/
				price: product.priceId,
				quantity: product.quantity,
			})),
			success_url: `${process.env.CLIENT_URL}/profile`,
			cancel_url: `${process.env.CLIENT_URL}/`,
		});

		res.json({ customerId: session.customer, url: session.url });
		// res.locals.session = session;
		// next();
	} catch (e) {
		console.log(e);
		res.end(e);
	}
}

export default chehkoutMW;
