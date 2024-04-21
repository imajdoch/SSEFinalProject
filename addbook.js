import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { setDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// JavaScript for handling image upload and book addition
document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Handle image upload
    const fileInput = document.getElementById('bookImage');
    const uploadedImage = document.getElementById('uploadedImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            uploadedImage.innerHTML = ''; // Clear previous image
            uploadedImage.appendChild(img);
        }

        reader.readAsDataURL(fileInput.files[0]);
    }

    // Retrieve book information from input fields
    const title = document.getElementById('bktitle').value;
    const author = document.getElementById('bkauthor').value;
    const publisher = document.getElementById('bkpublisher').value;
    const publicationYear = document.getElementById('bkpublicationYear').value;
    const category = document.getElementById('bkcategory').value;
    const isbn = document.getElementById('bkisbn').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
        authDomain: "ssefinalproject.firebaseapp.com",
        projectId: "ssefinalproject",
        storageBucket: "ssefinalproject.appspot.com",
        messagingSenderId: "706635744855",
        appId: "1:706635744855:web:c6a8a54603d38269a60512",
        measurementId: "G-FEWQLQ3PH8"
    };
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the Firestore database
    const db = firebase.firestore();

    // Add book to Firestore
    db.collection("books").add({
        title: title,
        author: author,
        publisher: publisher,
        publicationYear: publicationYear,
        category: category,
        isbn: isbn,
        rating: rating
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Book added successfully!");
        // Reset form fields after successful addition
        document.getElementById('addBookForm').reset();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Failed to add book. Please try again later.");
    });
});
