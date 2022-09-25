import { doc, getDoc } from "firebase/firestore";
import db from "../firebase.js";

async function getServiceDataMW(req, res, next) {
	const { serviceId } = req.body;

	try {
		const serviceRef = doc(db, "services", serviceId);
		const service = await getDoc(serviceRef);

		res.locals.service = {
			id: service.id,
			stripeId: service.data().stripeId,
		};
		next();
	} catch (e) {
		next(e);
	}
}

export default getServiceDataMW;
