// Listener for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        // Check if the user is the admin based on email
        if (user.email === "admin@gmail.com") {
            // User is signed in and is the admin, enable the button to add new books
            document.getElementById("addBookButton").disabled = false;
        } else {
            // User is signed in but is not the admin, disable the button to add new books
            document.getElementById("addBookButton").disabled = true;
            // Inform the user that only the admin can add books
            alert("Only admin can add books.");
        }
    } else {
        console.log('User is signed out');
        // User is signed out, perform necessary actions
    }
}, (error) => {
    // Handle any errors that occur during authentication state change
    console.error("Authentication state change error:", error);
    // Inform the user about the error
    alert("Error occurred during authentication. Please try again later.");
});
