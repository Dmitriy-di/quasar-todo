import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCjhNmYUzoZt_rtcjue298YnkaRjO_n8JY",
	authDomain: "quasartodo-67531.firebaseapp.com",
	projectId: "quasartodo-67531",
	storageBucket: "quasartodo-67531.appspot.com",
	messagingSenderId: "94009329711",
	appId: "1:94009329711:web:ce98869c9a391ee4f85eda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
	db
}