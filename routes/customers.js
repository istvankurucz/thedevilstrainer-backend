import express from "express";

import stripe from "../stripe.js";

import getCustomerSubsMW from "../middlewares/customer/getCustomerSubsMW.js";
import getProductSubMW from "../middlewares/product/getProductSubMW.js";

const router = express.Router();

// Get the subscriptions of the customer
router.get("/:id/subscriptions", getCustomerSubsMW, getProductSubMW);

// Returns the Stripe customer-portal link
router.get("/:id/portal", async (req, res) => {
	const { id } = req.params;
	const returnUrl = process.env.CLIENT_URL + "/profile";

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: id,
		return_url: returnUrl,
	});

	res.json({ url: portalSession.url });
});

export default router;
