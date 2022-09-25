import express from "express";

import stripe from "../stripe.js";

import subscribeMW from "../middlewares/subscribeMW.js";
import createCustomerMW from "../middlewares/customer/createCustomerMW.js";
import getCustomerMW from "../middlewares/customer/getCustomerMW.js";
import getServiceDataMW from "../middlewares/getServiceDataMW.js";

const router = express.Router();

// Get the subscription based on the given ID
router.get("/:id", async (req, res) => {
	try {
		const subscription = await stripe.subscriptions.retrieve(req.params.id);
		res.json(subscription);
	} catch (e) {
		console.log(e);
		res.end(e);
	}
});

// Subscribe to the plan
router.post("/new", getCustomerMW, createCustomerMW, getServiceDataMW, subscribeMW);

export default router;
