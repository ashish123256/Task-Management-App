// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { VITE_FIREBASE_API_KEY } from "./baseUrl";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-12eaa.firebaseapp.com",
  projectId: "mern-estate-12eaa",
  storageBucket: "mern-estate-12eaa.appspot.com",
  messagingSenderId: "300890837420",
  appId: "1:300890837420:web:f54d1c3730e86f3a7faa09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);