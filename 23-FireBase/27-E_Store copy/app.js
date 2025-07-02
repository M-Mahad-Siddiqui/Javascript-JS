import {
    auth,
    getDownloadURL,
    ref,
    signOut,
    storage,
    uploadBytes,
} from './Utils/utils.js';





 //------------logout acount -------------
        document.getElementById('logout').addEventListener('click', () => {
            signOut(auth).then(() => {
        console.log("User signed out");
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        });

        //------------delete account -------------
        document.getElementById('deleteBtn').addEventListener('click', () => {
            if (auth.currentUser) {
                auth.currentUser.delete().then(() => {
                    console.log("User deleted");
                }).catch((error) => {
                    console.error("Error deleting user:", error);
                });
            }
        });

// -------------------set profile images--------------------------

  
var file = document.getElementById('user_avatar').get(0).files[0];
document.getElementById('updateBtn').addEventListener('click', () => {
            if (!file) {
                alert('Please select a file');
                return;
            }

        
const userRef = ref(storage, `user/user${auth.currentUser.uid}`);
    uploadBytes(userRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            document.getElementById('profileImages').scr = downloadURL
        })
        
    });
})
