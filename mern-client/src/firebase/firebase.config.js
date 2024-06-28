// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDoAjhoawn-RR4kvzq0wjas3LboUZb5Pg",
  authDomain: "mern-book-inventory-7a0e8.firebaseapp.com",
  projectId: "mern-book-inventory-7a0e8",
  storageBucket: "mern-book-inventory-7a0e8.appspot.com",
  messagingSenderId: "818445699937",
  appId: "1:818445699937:web:c8be08c5f9a08dba219320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app