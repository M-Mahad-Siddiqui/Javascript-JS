import {
    auth,
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from './Utils/utils.js'; // Ensure deleteUser is imported

// Function to manage redirection based on authentication state
const handleRedirection = () => {
    const currentPage = window.location.pathname;
    const isLoggedIn = auth.currentUser !== null; // Check if user is logged in

    if (isLoggedIn && (currentPage === '/index.html' || currentPage === '/login.html')) {
        window.location.href = "dash.html";
    } else if (!isLoggedIn && (currentPage !== '/index.html' && currentPage !== '/login.html')) {
        window.location.href = "signIn.html";
    }
};

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    if (localStorage.getItem('redirectHandled') !== 'true') {
        localStorage.setItem('redirectHandled', 'true');
        handleRedirection();
    }
});

// Sign Up function
document.getElementById('signUpBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email-up').value;
    const password = document.getElementById('password-up').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // alert('User created successfully');
            window.location.href = "dash.html";
        })
        .catch((error) => {
            document.getElementById('signUpError').innerText = error.message;
        });
});

// Sign In function
document.getElementById('signInBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email-in').value;
    const password = document.getElementById('password-in').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('User signed in successfully');
            window.location.href = "dash.html";
        })
        .catch((error) => {
            document.getElementById('signInError').innerText = error.message;
        });
});

// Logout function
document.getElementById('logout')?.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("User signed out");
        localStorage.removeItem('redirectHandled'); // Clear redirect flag on logout
        window.location.href = "signIn.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

// Check for initial redirection needs
if (localStorage.getItem('redirectHandled') !== 'true') {
    handleRedirection();
}

// Delete user function
document.getElementById('deleteBtn')?.addEventListener('click', async () => {
    try {
        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
            // Clear redirect flag on deletion
            localStorage.removeItem('redirectHandled');
            // Redirect after successful account deletion
            window.location.href = "signIn.html";
        } else {
            console.warn('No user is currently signed in.');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        // Optionally, handle the error by notifying the user or taking other actions
    }
});


//  //------------logout acount -------------
//         document.getElementById('logout').addEventListener('click', () =>
// {
  //             signOut(auth).then(() => {
  //         console.log("User signed out");
  //             }).catch((error) => {
  //                 console.error("Error signing out:", error);
  //             });
  //         });

  //         //------------delete account -------------
  //         document.getElementById('deleteBtn').addEventListener('click', () => {
  //             if (auth.currentUser) {
  //                 auth.currentUser.delete().then(() => {
  //                     console.log("User deleted");
  //                 }).catch((error) => {
  //                     console.error("Error deleting user:", error);
  //                 });
  //             }
  //         });
