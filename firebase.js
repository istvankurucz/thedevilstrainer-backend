import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { /*addDoc, collection,*/ getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { readString } from "react-papaparse";
// import gyakorlatok from "./assets/gyakorlatok.csv";

const firebaseConfig = {
	apiKey: "AIzaSyCiCZHrrfWTEq3m3thvFrKSX3CLfSyxBdc",
	authDomain: "thedevilstrainer-e0a02.firebaseapp.com",
	projectId: "thedevilstrainer-e0a02",
	storageBucket: "thedevilstrainer-e0a02.appspot.com",
	messagingSenderId: "314577137528",
	appId: "1:314577137528:web:8b2b2cb91af3263db5a28d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/*async function getLocalData(file) {
	try {
		const res = await fetch(file);
		const fileData = await res.text();

		const data = readString(fileData);
		// console.log(data);

		data.data.forEach(async (exercise) => {
			try {
				await addDoc(collection(db, "exercises"), {
					name: exercise[0],
					muscle: exercise[1],
					place: exercise[2],
					danger: exercise[3],
				});

				console.log("Exercise added.");
			} catch (e) {
				console.log("Error adding the exercise.\n", e);
			}
			// console.log(exercise);
		});

		// return data;
	} catch (e) {
		console.log("Error reading the text file.\n", e);
	}
}*/

//getLocalData(gyakorlatok);

export default db;
export { auth, storage };
