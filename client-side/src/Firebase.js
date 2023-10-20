// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ctop-marketplace.firebaseapp.com",
  projectId: "mern-ctop-marketplace",
  storageBucket: "mern-ctop-marketplace.appspot.com",
  messagingSenderId: "339837413306",
  appId: "1:339837413306:web:2e1c7823718f0eb7a19f83",
  measurementId: "G-ZCL0WJRKH1"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);