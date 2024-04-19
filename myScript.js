
const firebaseConfig = {
    apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
    authDomain: "imajdoch.github.io",
    projectId: "ssefinalproject",
    storageBucket: "ssefinalproject.appspot.com",
    messagingSenderId: "706635744855",
    appId: "1:706635744855:web:c6a8a54603d38269a60512",
    measurementId: "G-FEWQLQ3PH8"
};

firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", signIn);
btnSignup.addEventListener("click", signUp);
btnLogout.addEventListener("click", logout);

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user information to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      // Add other user information as needed
    });
      
      onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
      } else {
        console.log('User is signed out');
      }
    });

    window.location.href = "mainpage.html";
  } catch (error) {
    console.error("Sign-in error:", error.message);
  }
};


export const signUp = async () => {
    const txtEmail = document.getElementById("newEmail");
    const txtPassword = document.getElementById("newPassword");

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

export const createUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

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
