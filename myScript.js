import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { setDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

var firebaseConfig = {
    apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
    authDomain: "ssefinalproject.firebaseapp.com",
    projectId: "ssefinalproject",
    storageBucket: "ssefinalproject.appspot.com",
    messagingSenderId: "706635744855",
    appId: "1:706635744855:web:c6a8a54603d38269a60512",
    measurementId: "G-FEWQLQ3PH8"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore();

// Example usage
console.log(auth);
console.log(firestore);

// Function to sign in user
export const signIn = async () => {
    const txtEmail = document.getElementById("uname");
    const txtPassword = document.getElementById("psw");

    const email = txtEmail.value;
    const password = txtPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
console.log('User:', user);
console.log('Before setDoc');
await setDoc(doc(firestore, 'users', user.uid), {
    email: user.email,
    // Add other user information as needed
});
console.log('After setDoc');

        // Redirect to main page after successful login
        window.location.href = "mainpage.html";
    } catch (error) {
        console.error("Sign-in error:", error.message);
        // Handle sign-in error
    }
};

// Function to sign up user
// Function to sign up user
export const signUp = async () => {
    const txtEmail = document.getElementById("newEmail");
    const txtPassword = document.getElementById("newPassword");

    const email = txtEmail.value;
    const password = txtPassword.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
        // Redirect to main page after successful sign-up
        window.location.href = "mainpage.html";
    } catch (error) {
        console.error("Sign-up error:", error.message);
        // Handle sign-up error
    }
};

try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully");
    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email: email,
        // Add other user information as needed
    });
    // Redirect to main page after successful sign-up
    window.location.href = "mainpage.html";
} catch (error) {
    console.error("Sign-up error:", error.code, error.message);
    // Handle sign-up error
}
document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");
    signUpButton.addEventListener("click", signUp);
});


// Function to log out user
export const logout = async () => {
    try {
        await signOut(auth);
        // Redirect to login page after logout
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout error:", error.message);
        // Handle logout error
    }
};

// Listener for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        // User is signed in, perform necessary actions
    } else {
        console.log('User is signed out');
        // User is signed out, perform necessary actions
    }
});
