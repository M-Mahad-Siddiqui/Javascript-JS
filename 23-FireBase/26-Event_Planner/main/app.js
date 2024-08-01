import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  signOut,
} from "./utils/utils.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid } = user;
    displayUserInfo();
  } else {
    window.location.href = "./auth/login.html";
  }
});

document.getElementById("logout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      window.location.href = "./auth/login.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

// retrive data from firebase and display it
async function displayUserInfo() {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();

      // Display user info
      document.getElementsByClassName("userEmail")[0].textContent =
        userInfo.floating_email || "N/A";
      document.getElementsByClassName("userFirstName")[0].textContent =
        userInfo.floating_first_name || "N/A";
      document.getElementsByClassName("userLastName")[0].textContent =
        userInfo.floating_last_name || "N/A";
      document.getElementsByClassName("userPhone")[0].textContent =
        userInfo.floating_phone || "N/A";
      document.getElementsByClassName("userRollNo")[0].textContent =
        userInfo.floating_rollNo || "N/A";

      if (userInfo.url) {
        document.getElementsByClassName("userProfilePic")[0].src = userInfo.url;
      }
    } else {
      console.log("No such document!");
    }
  } else {
    console.log("No user is signed in.");
  }
}

//-------------------------------LOGOUT----------------------------------
// document.getElementById("logout").addEventListener("click", () => {
//   auth.signOut();
//   window.location.href = "./auth/login.html";
// });

// JS for responsive menu
document.addEventListener("DOMContentLoaded", () => {
  const userMenuButton = document.getElementById("user-menu-button");
  const userDropdown = document.getElementById("user-dropdown");

  userMenuButton.addEventListener("click", () => {
    userDropdown.classList.toggle("hidden");
    userDropdown.classList.toggle("show");
  });

  // Handle clicks outside the dropdown to close it
  document.addEventListener("click", (e) => {
    if (
      !userDropdown.contains(e.target) &&
      !userMenuButton.contains(e.target)
    ) {
      userDropdown.classList.add("hidden");
      userDropdown.classList.remove("show");
    }
  });

  // Handle responsive menu
  const navButton = document.querySelector(
    '[data-collapse-toggle="navbar-user"]'
  );
  const navMenu = document.getElementById("navbar-user");

  navButton.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });
});

