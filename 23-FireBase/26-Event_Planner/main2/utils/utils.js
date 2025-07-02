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
  apiKey: "AIzaSyDPw5-zPnzFVIXjrGv7p8CzxFKxl02qmjI",
  authDomain: "event-planner-c2ac2.firebaseapp.com",
  projectId: "event-planner-c2ac2",
  storageBucket: "event-planner-c2ac2.appspot.com",
  messagingSenderId: "232072173504",
  appId: "1:232072173504:web:ff3658ffdd33982506da25",
  measurementId: "G-X3G1GFR4E9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteDoc,
  deleteUser,
  doc,
  getDoc,
  getDocs,
  getDownloadURL,
  onAuthStateChanged,
  ref,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  storage,
  updateDoc,
  uploadBytes,
};
