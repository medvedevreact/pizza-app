// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX8pcM9SYQCIYIwovbMbI4g-8wgY2npxA",
  authDomain: "pizza-app-otp.firebaseapp.com",
  projectId: "pizza-app-otp",
  storageBucket: "pizza-app-otp.firebasestorage.app",
  messagingSenderId: "983825970516",
  appId: "1:983825970516:web:10171b0eff4274567f04c1",
  measurementId: "G-817EQZF6JH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
