import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
    authDomain: "imajdoch.github.io",
    projectId: "ssefinalproject",
    storageBucket: "ssefinalproject.appspot.com",
    messagingSenderId: "706635744855",
    appId: "1:706635744855:web:c6a8a54603d38269a60512",
    measurementId: "G-FEWQLQ3PH8"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const txtEmail = document.getElementById("uname");
const txtPassword = document.getElementById("psw");
const lblAuthState = document.getElementById("authState");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

 export const signIn = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      window.location.href = "mainpage.html";
  } catch (error) {
      console.error("Sign-in error:", error.message);
  }
}

const signUp = async () => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
    } catch (error) {
        console.error("Sign-up error:", error.message);
    }
}

 export const logout = async () => {
    await signOut(auth);
}

btnLogin.addEventListener("click", signIn);
btnSignup.addEventListener("click", signUp);
btnLogout.addEventListener("click", logout);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        showApp();
        showLoginState(user);

        hideLoginError();
        hideLinkError();
    } else {
        showLoginForm();
        lblAuthState.innerHTML = `You're not logged in.`;
    }
});
