// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDpyu8RrcOuMbwKPGzdNg7WATmUwEJsIvc",
  authDomain: "miniblog-cf406.firebaseapp.com",
  projectId: "miniblog-cf406",
  storageBucket: "miniblog-cf406.appspot.com",
  messagingSenderId: "975703210796",
  appId: "1:975703210796:web:43aa4bfa42268542c50a89"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };