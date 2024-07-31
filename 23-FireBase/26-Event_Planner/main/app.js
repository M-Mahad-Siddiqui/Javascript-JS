import { auth, onAuthStateChanged, signOut } from "./utils/utils.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid } = user;
  } else {
    window.location.href = "./auth/login.html";
  }
});

//-------------------------------LOGOUT----------------------------------
// document.getElementById("logout").addEventListener("click", () => {
//   auth.signOut();
//   window.location.href = "./auth/login.html";
// });

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


