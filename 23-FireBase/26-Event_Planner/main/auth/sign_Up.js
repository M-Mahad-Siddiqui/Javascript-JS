import {
  auth,
  createUserWithEmailAndPassword,
  db, // Ensure you import db
  doc,
  getDownloadURL,
  ref,
  setDoc,
  storage,
  uploadBytes,
} from "../utils/utils.js";

// 1 create acount => createUserWithEmailAndPassword
//2 uplaod images => ref, uploadBytes, getDownloadURL
//3 set complete data into firestore => doc, setDoc,

// Get the form element
const signUpForm = document.getElementById("signUpForm");
const signUpError = document.getElementById("signUpError");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Create a FormData object from the form
  const formData = new FormData(signUpForm);

  // Log form data to the console
  // formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  // });

  // Create an object from the form data
  const userInfo = Object.fromEntries(formData.entries()); // {email: 'abc@gmail.com', password: '123456', name: 'abc', file: File { ... }}
  console.log("userinfo=>", userInfo);

  // Get the file input
  const fileInput = document.getElementById("fileUpload");
  if (fileInput.files.length === 0) {
    signUpError.textContent = "Please upload a file.";
    return;
  }

  // Upload the file and create user
  try {
    // Create the user account
    document.getElementById("signUpBtn").disabled = true;
    document.getElementById("signUpBtn").innerText = "Signing up..."; // Disable the button and change the text
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInfo.floating_email,
      userInfo.floating_password
    );
    console.log(
      "Sign-up successful",
      userCredential.user.uid,
      "with email =>",
      userCredential.user.email
    );

    // Upload the image
    const file = fileInput.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("images File uploaded successfully");

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", url);

    // Add the image URL to the user object
    userInfo.url = url;

    // Save user data to FireStore
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, userInfo);
    console.log("User object data saved to Firestore");
    window.location.href = "../index.html";
    document.getElementById("signUpBtn").disabled = false;
    document.getElementById("signUpBtn").innerText = "Sign up"; // Re-enable the button and change the text
    
  } catch (error) {
    const errorMessage = error.message;
    signUpError.textContent = errorMessage; // Display the error message
    document.getElementById("signUpBtn").disabled = false; // Re-enable the button
    document.getElementById("signUpBtn").innerText = "Sign up";
  }
});
