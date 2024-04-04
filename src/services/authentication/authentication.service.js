import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsVF3rVYNn75_8HBzKrj88e692OZLTbgo",
  authDomain: "mealstogo-ccf49.firebaseapp.com",
  projectId: "mealstogo-ccf49",
  storageBucket: "mealstogo-ccf49.appspot.com",
  messagingSenderId: "126082072918",
  appId: "1:126082072918:web:47e421ea7beba4ccbfd6f7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerRequest = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
