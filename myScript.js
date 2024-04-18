
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
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
connectAuthEmulator(auth, "http://localhost:9099");

const txtEmail = document.getElementById("uname");
const txtPassword = document.getElementById("psw");
const lblAuthState = document.getElementById("authState");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");
const modal = document.getElementById("forgotPasswordModal");

const openModal = () => {
    modal.style.display = "block";
}

const closeModal = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
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

/*
const signIn = async () => {
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
*/

const signIn = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  // Function to validate email format
  function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  // Function to validate password length
  function validatePassword(password) {
      return password.length >= 10; 
  }

  // Validate email and password inputs
  if (!validateEmail(email)) {
      console.error("Invalid email format");
      return;
  }

  if (!validatePassword(password)) {
      console.error("Password must be at least 10 characters long");
      return;
  }

  try {
      // Proceed with sign-in attempt
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      window.location.href = "mainpage.html";
  } catch (error) {
      console.error("Sign-in error:", error.message);
  }
}



const resetPassword = () => {
    const email = document.getElementById("resetEmail").value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset email sent successfully");
            closeModal();
        })
        .catch((error) => {
            console.error("Password reset error:", error.message);
        });
}

const login = () => {
    signIn();
}

const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}

const createAccount = async () => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(`There was an error: ${error}`);
        showLoginError(error);
    }
}

const monitorAuthState = async () => {
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
}

const logout = async () => {
    await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword);
btnSignup.addEventListener("click", createAccount);
btnLogout.addEventListener("click", logout);

monitorAuthState();
