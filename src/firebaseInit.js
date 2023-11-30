
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-sx7sz5OO3S1HnQsShfVBJtRYaPMhYzs",
  authDomain: "buy-busy--by-adarsh.firebaseapp.com",
  projectId: "buy-busy--by-adarsh",
  storageBucket: "buy-busy--by-adarsh.appspot.com",
  messagingSenderId: "313493122891",
  appId: "1:313493122891:web:576c634be5662c842402ce"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db};
export default auth;