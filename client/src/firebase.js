// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mernestate945.firebaseapp.com",
  projectId: "mernestate945",
  storageBucket: "mernestate945.appspot.com",
  messagingSenderId: "620644416779",
  appId: "1:620644416779:web:7d15962670fbe4bb3df60e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
