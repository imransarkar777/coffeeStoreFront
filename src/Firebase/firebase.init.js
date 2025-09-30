// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4-jg8wQH0upi4wkWT-M7VxzZQ1irIfsw",
  authDomain: "coffee-store-app-dbae6.firebaseapp.com",
  projectId: "coffee-store-app-dbae6",
  storageBucket: "coffee-store-app-dbae6.firebasestorage.app",
  messagingSenderId: "744567462381",
  appId: "1:744567462381:web:de07f61d7ee4d5d7ceefe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);