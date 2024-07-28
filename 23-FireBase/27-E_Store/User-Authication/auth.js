import {
    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged, signInWithEmailAndPassword
} from '../Utils/utils.js';
      
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user is logged in', user);
        const uid = user.uid;
    } else {
        window.location.href = "./signUp.html";
    }
})


//signUp function
document.getElementById('signUpBtn').addEventListener('click', () => {
    const email = document.getElementById('email-up').value;
    const password = document.getElementById('password-up').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('user created successfully');
            window.location.href = "./login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('signUpError').innerHTML = errorMessage;
        });
})

//signIn function
document.getElementById('signInBtn').addEventListener('click', () => {
    const email = document.getElementById('email-in').value;
    const password = document.getElementById('password-in').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('user signed in successfully');
            window.location.href = "./index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('signInError').innerHTML = errorMessage;
        });
})

