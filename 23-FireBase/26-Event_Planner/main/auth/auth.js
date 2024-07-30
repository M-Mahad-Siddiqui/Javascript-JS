import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../utils/utils.js";

// Function to handle sign-up (if applicable)
const handleSignUp = () => {
  const signUpForm = document.getElementById("signUpForm");
  const signUpError = document.getElementById("signUpError");

  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(signUpForm);

      const email = formData.get("floating_email");
      const password = formData.get("floating_password");
      const confirmPassword = formData.get("repeat_password");
      const firstName = formData.get("floating_first_name");
      const lastName = formData.get("floating_last_name");
      const phone = formData.get("floating_phone");
      const rollNo = formData.get("floating_rollNo");

      // Validation
      if (password !== confirmPassword) {
        signUpError.textContent = "Passwords do not match.";
        return;
      }

      // Create user with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Sign-up successful", userCredential.user);
        })
        .catch((error) => {
          signUpError.textContent = error.message;
        });
    });
  } else {
    console.error("Sign-up form element not found");
  }
};

// Function to handle sign-in
const handleSignIn = () => {
  const emailInput = document.getElementById("email-in");
  const passwordInput = document.getElementById("password-in");
  const signInError = document.getElementById("signInError");
  const signInBtn = document.getElementById("signInBtn");

  if (signInBtn) {
    signInBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default form submission

      const email = emailInput.value;
      const password = passwordInput.value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          // Handle successful sign-in, e.g., redirect or show user info
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Sign-in error:", errorMessage);
          signInError.innerText = errorMessage;
        });
    });
  } else {
    console.error("Sign-in button element not found");
  }
};

// Ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  handleSignIn(); // Call handleSignIn if this is a sign-in page
});
