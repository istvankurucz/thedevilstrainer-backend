import stripe from "../../stripe.js";

async function getCustomerMW(req, res, next) {
	const { customerId } = req.body;

	if (customerId) {
		try {
			const customer = await stripe.customers.retrieve(customerId);

			res.locals.customer = customer;
			console.log("Customer fetched.");
			next();
		} catch (e) {
			next(e);
		}
	} else next();
}

export default getCustomerMW;
