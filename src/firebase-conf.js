// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjFYQm1nXgXC_NFIbjM2qUFWKBl2HzLyE",
  authDomain: "social-network-c87de.firebaseapp.com",
  projectId: "social-network-c87de",
  storageBucket: "social-network-c87de.appspot.com",
  messagingSenderId: "721577973977",
  appId: "1:721577973977:web:4e3d0bacedc068459986c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const dataBase = getFirestore(app);