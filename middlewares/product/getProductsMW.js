import { collection, query, where, documentId, getDocs } from "firebase/firestore";
import db from "../../firebase.js";
import sortById from "../../utils/sortById.js";

async function getProductsMW(req, res, next) {
	const { products } = req.body;
	const productIds = products.map((product) => product.id);

	try {
		const q = query(collection(db, "products/custom/products"), where(documentId(), "in", productIds));
		const result = await getDocs(q);
		const data = result.docs
			.map((product) => ({
				id: product.id,
				name: product.data().name,
				productId: product.data().productId,
				priceId: product.data().priceId,
				/*price: product.data().price.amount,
				currency: product.data().price.currency,*/
			}))
			.sort(sortById);

		res.locals.products = data.map((product, i) => ({
			name: product.name,
			/*price: product.price,
			currency: product.currency,*/
			productId: product.productId,
			priceId: product.priceId,
			quantity: products[i].quantity,
		}));

		next();
	} catch (e) {
		next(e);
	}
}

export default getProductsMW;
