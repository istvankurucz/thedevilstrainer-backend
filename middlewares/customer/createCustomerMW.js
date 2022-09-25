import stripe from "../../stripe.js";

async function createCustomerMW(req, res, next) {
	const { user } = req.body;

	if (!res.locals.customer) {
		try {
			const customer = await stripe.customers.create({
				name: user.name,
				email: user.email,
			});

			res.locals.customer = customer;
			console.log("Customer created.");
			next();
		} catch (e) {
			next(e);
		}
	} else next();
}

export default createCustomerMW;
