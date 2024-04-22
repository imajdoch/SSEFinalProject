import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { setDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDLhWz4KLKNNuDrNhhtLY8Xrzy75RZ7LTE",
    authDomain: "ssefinalproject.firebaseapp.com",
    projectId: "ssefinalproject",
    storageBucket: "ssefinalproject.appspot.com",
    messagingSenderId: "706635744855",
    appId: "1:706635744855:web:c6a8a54603d38269a60512",
    measurementId: "G-FEWQLQ3PH8"
};

// Initialize Firebase Firestore
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// JavaScript for handling image upload and book addition
document.getElementById('addBook').addEventListener('submit', function(event) {
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
});

document.getElementById('addBook').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve book information from input fields
    const title = document.querySelector('input[name="bktitle"]').value;
    const author = document.querySelector('input[name="bkauthor"]').value;
    const publisher = document.querySelector('input[name="bkpublisher"]').value;
    const publicationYear = document.querySelector('input[name="bkpublicationYear"]').value;
    const category = document.querySelector('input[name="bkcategory"]').value;
    const isbn = document.querySelector('input[name="bkisbn"]').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Add book to Firestore
    setDoc(doc(db, "books", title), {
        title: title,
        author: author,
        publisher: publisher,
        publicationYear: publicationYear,
        category: category,
        isbn: isbn,
        rating: rating
    })
    .then(() => {
        console.log("Document successfully written!");
        alert("Book added successfully!");
        // Reset form fields after successful addition
        document.getElementById('addBook').reset();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Failed to add book. Please try again later.");
    });
});

// Function to fetch books from Firestore
/*
function fetchBooks() {
    db.collection("books").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const book = doc.data();
            displayBook(book);
        });
    });
}
*/
async function fetchBooks() {
    const booksCollectionRef = collection(db, "books");
    const querySnapshot = await getDocs(booksCollectionRef);
    querySnapshot.forEach((doc) => {
        const book = doc.data();
        displayBook(book);
    });
}


// Function to display a book on the main page
function displayBook(book) {
    const booksContainer = document.getElementById('booksContainer');

    // Create HTML elements for the book
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <img src="${book.imageUrl}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Rating:</strong> ${book.rating}</p>
    `;

    // Append the book element to the books container
    booksContainer.appendChild(bookElement);
}

// Call fetchBooks() to load books when the page loads
window.addEventListener('load', fetchBooks);

