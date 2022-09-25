import stripe from "../../stripe.js";

function getProductSubMW(req, res) {
	const { subs } = res.locals;
	let found = false;

	try {
		subs.forEach(async (subId, i) => {
			const subscription = await stripe.subscriptions.retrieve(subId);
			if (subscription.items.data[0].price.product === "prod_MLsPFkZEoAEG5m") {
				found = true;
				res.json(subscription);
			}

			if (i === subs.length - 1 && !found) res.json(null);
		});
	} catch (e) {
		res.end(e);
	}
}

export default getProductSubMW;
