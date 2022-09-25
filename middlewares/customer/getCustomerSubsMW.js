import stripe from "../../stripe.js";

async function getCustomerSubsMW(req, res, next) {
	try {
		const subscriptions = await stripe.subscriptions.list({
			customer: req.params.id,
		});

		if (subscriptions.data.length) {
			res.locals.subs = subscriptions.data.map((sub) => sub.id);
			next();
		} else {
			res.json([]);
		}
	} catch (e) {
		console.log(e);
		res.end(e);
	}
}

export default getCustomerSubsMW;
