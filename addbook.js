import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { setDoc, doc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
//import {title, author, publisher, publicationYear, category, isbn} from './book.mjs';
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('addBook').addEventListener('submit', function() {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve book information from input fields
        const title = document.querySelector('input[name="title"]').value;
        const author = document.querySelector('input[name="author"]').value;
        const publisher = document.querySelector('input[name="publisher"]').value;
        const publicationYear = document.querySelector('input[name="publicationYear"]').value;
        const category = document.querySelector('input[name="category"]').value;
        const isbn = document.querySelector('input[name="isbn"]').value;
        //const rating = document.querySelector('input[name="rating"]:checked').value;
    

        const newBook = Book(title, author, publisher, publicationYear, category, isbn);

    // Add book to Firestore

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
    const booksContainer = document.getElementById('newBook');

    // Create HTML elements for the book
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <h3>${newBook.title}</h3>
        <p><strong>Title:</strong> ${newBook.title}</p>
        <p><strong>Author:</strong> ${newBook.author}</p>
        <p><strong>Publisher:</strong> ${newBook.publisher}</p>
        <p><strong>Publication Year:</strong> ${newBook.publicationYear}</p>
        <p><strong>Category:</strong> ${newBook.category}</p>
        <p><strong>ISBN:</strong> ${newBook.isbn}</p>
    `;

    // Append the book element to the books container
    booksContainer.appendChild(bookElement);
}

// Call fetchBooks() to load books when the page loads
window.addEventListener('load', fetchBooks);

});

