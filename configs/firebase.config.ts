// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu9xcWoXFUOdlqrpb1_i1qjaUroT9RYLs",
  authDomain: "el-pizza.firebaseapp.com",
  projectId: "el-pizza",
  storageBucket: "el-pizza.firebasestorage.app",
  messagingSenderId: "332308988498",
  appId: "1:332308988498:web:d2657972e12f954d2b558b",
  measurementId: "G-LD17F39DPE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
