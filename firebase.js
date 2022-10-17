import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

export default db;
export { auth, storage };
