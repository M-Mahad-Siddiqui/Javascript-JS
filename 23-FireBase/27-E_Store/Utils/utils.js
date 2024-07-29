import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBj0HT4W4aARblxeg9-jgehUpzhGCdlR8I",
    authDomain: "e-store-a0ade.firebaseapp.com",
    projectId: "e-store-a0ade",
    storageBucket: "e-store-a0ade.appspot.com",
    messagingSenderId: "354313090658",
    appId: "1:354313090658:web:54b4d2dbe442568264833b",
    measurementId: "G-3VPMX53SC0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    addDoc, auth, collection, createUserWithEmailAndPassword, db, deleteDoc, deleteUser, doc, getDoc, getDocs, getDownloadURL, onAuthStateChanged, ref, setDoc, signInWithEmailAndPassword,
    signOut, storage, updateDoc, uploadBytes
};

