import {
    auth, storage,db,onAuthStateChanged
} from "./utils/utils.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        window.location.href = "./auth/login.html";
    }
});


