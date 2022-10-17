import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// Firebase
import { getDocs, collection } from "firebase/firestore";
import db from "./firebase.js";

// Routes
import subscriptionRoute from "./routes/subscriptions.js";
import customerRoute from "./routes/customers.js";

// Custom MWs
// import getCustomerMW from "./middlewares/customer/getCustomerMW.js";
// import createCustomerMW from "./middlewares/customer/createCustomerMW.js";
// import getProductsMW from "./middlewares/product/getProductsMW.js";
// import chehkoutMW from "./middlewares/chehkoutMW.js";
import { getMeals, mealType } from "./dietDB.js";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/subscriptions", subscriptionRoute);
app.use("/customers", customerRoute);

// Buy custom products
// app.post("/checkout", getCustomerMW, createCustomerMW, getProductsMW, chehkoutMW);

// Get the daily meal of the user
app.post("/meal", (req, res) => {
	const { day, goal, food } = req.body;

	const dailyMeal = mealType(goal, food)[day - 1];
	res.json(getMeals(dailyMeal));
});

// Fetch products of our partners
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
				productId: service.data().productId,
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
