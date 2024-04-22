import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { setDoc, doc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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

class Book {
    title;
    author;
    publisher;
    publicationYear;
    category;
    isbn;
    rating;
    img;

    constructor(title, author, publisher, publicationYear, category, isbn, rating, img)
    {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.category = category;
        this.isbn = isbn;
        this.rating = rating;
        this.img = img;
    }

    getTitle()
    {
        return title;
    }

    getAuthor()
    {
        return author;
    }

    getPublisher()
    {
        return publisher;
    }

    getPublicationYear()
    {
        return publicationYear;
    }

    getCategory()
    {
        return category;
    }

    getISBN()
    {
        return isbn;
    }

    getRating()
    {
        return rating;
    }

    getImg()
    {
        return img;
    }

}
