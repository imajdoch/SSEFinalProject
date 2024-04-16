
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
  authDomain: "ssefinalproject.firebaseapp.com",
  projectId: "ssefinalproject",
  storageBucket: "ssefinalproject.appspot.com",
  messagingSenderId: "706635744855",
  appId: "1:706635744855:web:c6a8a54603d38269a60512",
  measurementId: "G-FEWQLQ3PH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//password characters
function validatePassword() {
  const password = document.getElementById("password").value;
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{10,}$/;
  if (!regex.test(password)) {
    alert("Password must be at least 10 characters long and contain at least one capital letter and one special character.");
    return false;
  }
  return true;
}
