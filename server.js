import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// Routes
import subscriptionRoute from "./routes/subscriptions.js";
import customerRoute from "./routes/customers.js";

// Firebase
import { getDocs, collection } from "firebase/firestore";
import db from "./firebase.js";

// Custom MWs
import getCustomerMW from "./middlewares/customer/getCustomerMW.js";
import createCustomerMW from "./middlewares/customer/createCustomerMW.js";
import getProductsMW from "./middlewares/product/getProductsMW.js";
import chehkoutMW from "./middlewares/chehkoutMW.js";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/subscriptions", subscriptionRoute);
app.use("/customers", customerRoute);

// Buy custom products
app.post("/checkout", getCustomerMW, createCustomerMW, getProductsMW, chehkoutMW);

// Fetch products
app.get("/products", async function (req, res) {
	try {
		const products = await getDocs(collection(db, "products/partner/products"));
		res.json(
			products.docs.map((product) => ({
				id: product.id,
				category: product.data().category,
				name: product.data().name,
				link: product.data().link,
				photo: product.data().photo,
			}))
		);
	} catch (e) {
		res.end(e);
	}
});

// Fetch services
app.get("/services", async (req, res) => {
	try {
		const services = await getDocs(collection(db, "services"));

		res.json(
			services.docs.map((service) => ({
				id: service.id,
				stripeId: service.data().stripeId,
			}))
		);
	} catch (e) {
		res.end(e);
	}
});

// Fetch countries
app.get("/countries", async (req, res) => {
	try {
		const response = await fetch("https://restcountries.com/v3.1/all");
		const countries = await response.json();
		res.json(countries.map((country) => country.name.common).sort());
	} catch (e) {
		res.end(e);
	}
});

app.use((err, req, res, next) => {
	res.end("Error...");
	console.log(err);
});

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`));
