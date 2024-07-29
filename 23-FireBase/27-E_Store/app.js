import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { addDoc, collection, db, deleteDoc, storage } from "./Utils/utils.js"; // Ensure storage is correctly imported
// Import Firebase SDKs
import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Initialize Firestore
// const db = getFirestore();
// Initialize Firebase

// Function to handle file upload
async function handleFileUpload() {
  const profilePic = document.getElementById("user_avatar").files[0];
  if (profilePic) {
    try {
      // Get the user's profile picture document reference
      const userId = "user1"; // Replace with actual user ID if authentication is used
      const picDocRef = doc(db, "profile-pics", userId);

      // Check if a profile picture already exists
      const docSnap = await getDoc(picDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.url) {
          // Delete the old file from storage
          const oldPicRef = ref(storage, data.url);
          await deleteObject(oldPicRef);
        }
      }

      // Create a reference to the storage location
      const picRef = ref(
        storage,
        `profile-pics/${userId}/${Date.now()}_${profilePic.name}`
      );

      // Upload the file
      const uploadBtn = document.getElementById("uploadBtn");
      uploadBtn.disabled = true;
      uploadBtn.innerText = "Uploading...";

      const snapshot = await uploadBytes(picRef, profilePic);
      console.log("Uploaded a blob or file!");

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);

      // Create or update the document with the new download URL
      await setDoc(picDocRef, { url: downloadURL }, { merge: true });

      console.log("Document updated in the DB");

      // Update the profile image src
      document.getElementById("profileImages").src = downloadURL;
      document.getElementById("menuImages").src = downloadURL;

      uploadBtn.innerText = "Uploaded";
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      uploadBtn.disabled = false;
    }
  } else {
    console.error("No file selected for upload.");
  }
}

// Event listener for file input change
document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", handleFileUpload);
  } else {
    console.error("Upload button not found.");
  }
});

// Retrieve and display the profile picture on page load
window.addEventListener("load", async () => {
  try {
    // Get the user's profile picture document reference
    const userId = "user1"; // Replace with actual user ID if authentication is used
    const picDocRef = doc(db, "profile-pics", userId);
    const docSnap = await getDoc(picDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const profileImg = document.getElementById("profileImages");
      const menuImg = document.getElementById("menuImages");

      // Update image sources if the URL is available
      if (data.url) {
        if (profileImg) {
          profileImg.src = data.url;
        } else {
          console.error("Profile image element not found.");
        }

        if (menuImg) {
          menuImg.src = data.url;
        } else {
          console.error("Menu image element not found.");
        }
      } else {
        console.log("No profile picture found.");
      }
    } else {
      console.log("No document found for user.");
    }
  } catch (error) {
    console.error("Error retrieving profile picture URL:", error);
  }
});

//----------------------------------------

// Handle Product Upload
document.getElementById("save").addEventListener("click", async () => {
  const title = document.getElementById("username").value.trim();
  const description = document.getElementById("about").value.trim();
  const picture = document.getElementById("file-upload").files[0];

  if (picture && title && description) {
    try {
      const pictureRef = ref(
        storage,
        `item-pics/${Date.now()}_${picture.name}`
      );
      const snapshot = await uploadBytes(pictureRef, picture);
      const pictureURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "items"), {
        title: title,
        description: description,
        pictureURL: pictureURL,
        timestamp: serverTimestamp(),
      });

      alert("Item added successfully!");
      document.getElementById("username").value = "";
      document.getElementById("about").value = "";
      document.getElementById("file-upload").value = "";
    } catch (error) {
      console.error("Error adding item:", error);
    }
  } else {
    alert("Please fill all fields.");
  }
});

// Load Items Function
async function loadItems() {
  const q = query(collection(db, "items"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const item = doc.data();
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.pictureURL}" alt="Item Picture">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <button class="delete-button" onclick="deleteItem('${doc.id}')">X</button>
      `;
      cardContainer.appendChild(card);
    });
  });
}

// Delete Item Function
async function deleteItem(id) {
  try {
    const itemRef = doc(db, "items", id);
    const docSnap = await getDoc(itemRef);
    if (docSnap.exists()) {
      const item = docSnap.data();
      if (item.pictureURL) {
        const picRef = ref(
          storage,
          `item-pics/${item.pictureURL.split("/").pop()}`
        );
        await deleteObject(picRef);
      }
      await deleteDoc(itemRef);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

// Load items on page load
window.addEventListener("load", loadItems);
