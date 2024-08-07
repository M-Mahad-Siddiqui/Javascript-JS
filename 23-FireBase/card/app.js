import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDROf6RpmmOBLjHoQgRyMrmZZfyuVU8gqc",
    authDomain: "photosgallery-d176c.firebaseapp.com",
    projectId: "photosgallery-d176c",
    storageBucket: "photosgallery-d176c.appspot.com",
    messagingSenderId: "1071735205656",
    appId: "1:1071735205656:web:632e62a3503d940a6eb86d",
    measurementId: "G-90TXP31P67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
    const displayContainer = document.getElementById("displayContainer");

    const validateInputs = () => {
        const [file, title, description, price] = document.querySelectorAll(".inputFields");
        if (!file.value || !title.value || !description.value || !price.value) {
            alert("Please fill all the fields");
            return false;
        }
        return true;
    };

    const createForm = document.getElementById("createForm");
    if (createForm) {
        createForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (validateInputs()) {
                await insertData();
                await fetchData();
                clearInputs();
            }
        });
    }

    const insertData = async () => {
        const [file, title, description, price] = document.querySelectorAll(".inputFields");
        const docRef = await addDoc(collection(db, "CRUD_Operation"), {
            url: await uploadImage(file.files[0]),
            title: title.value,
            description: description.value,
            price: price.value
        });
        console.log("Document added with ID: ", docRef.id);
    };

    const uploadImage = async (file) => {
        const fileRef = ref(storage, `CRUD_Operation/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        console.log("Image uploaded with URL: ", url);
        return url;
    };

    async function fetchData() {
        if (!displayContainer) {
            console.error("Error: displayContainer element not found.");
            return;
        }

        displayContainer.innerHTML = "";

        try {
            const cardCollectionRef = collection(db, "CRUD_Operation");
            const cardSnapshot = await getDocs(cardCollectionRef);

            if (cardSnapshot.empty) {
                displayContainer.innerHTML = "<p class='text-center text-gray-600'>No card found.</p>";
                return;
            }

            const fragment = document.createDocumentFragment();
            cardSnapshot.forEach((doc) => {
                const cardData = doc.data();
                const cardId = doc.id;

                const card = document.createElement("div");
                card.className = "relative bg-white shadow-lg rounded-lg overflow-hidden";

                const deleteButton = document.createElement("button");
                deleteButton.className = "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full";
                deleteButton.innerHTML = "&times;";
                deleteButton.onclick = () => deleteCard(cardId);

                const editButton = document.createElement("button");
                editButton.className = "absolute top-2 right-12 bg-blue-500 text-white p-1 rounded-full";
                editButton.innerHTML = "Edit";
                editButton.onclick = () => openEditModal(cardId, cardData);

                const img = document.createElement("img");
                img.className = "card-img w-full";
                img.src = cardData.url || "default-image.png";

                const cardBody = document.createElement("div");
                cardBody.className = "p-4";

                const title = document.createElement("h2");
                title.className = "text-xl font-semibold text-gray-900";
                title.textContent = cardData.title || "No Title";

                const description = document.createElement("p");
                description.className = "mt-2 text-gray-600";
                description.textContent = cardData.description || "No Description";

                const price = document.createElement("p");
                price.className = "mt-2 text-gray-600";
                price.textContent = `Price: ${cardData.price || "Not priced mentioned"}`;

                cardBody.appendChild(title);
                cardBody.appendChild(description);
                cardBody.appendChild(price);

                card.appendChild(img);
                card.appendChild(cardBody);
                card.appendChild(deleteButton);
                card.appendChild(editButton);

                fragment.appendChild(card);
            });
            requestAnimationFrame(() => displayContainer.appendChild(fragment));
        } catch (error) {
            console.error("Error fetching events:", error);
            displayContainer.innerHTML = "<p class='text-center text-red-600'>Failed to load cards.</p>";
        }
    }

    async function deleteCard(cardId) {
        try {
            await deleteDoc(doc(db, "CRUD_Operation", cardId));
            console.log("Card deleted successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    }

    const clearInputs = () => {
        const [file, title, description, price] = document.querySelectorAll(".inputFields");
        file.value = "";
        title.value = "";
        description.value = "";
        price.value = "";
    };

    function openEditModal(cardId, card) {
        const modal = document.getElementById("editModal");
        if (!modal) return;

        document.getElementById("editTitle").value = card.title || "";
        document.getElementById("editDescription").value = card.description || "";
        document.getElementById("editPrice").value = card.price || "";
        modal.style.display = "block";

        const editCardForm = document.getElementById("editCardForm");
        const closeModalButton = document.getElementById("closeModal");
        const cancelEditButton = document.getElementById("cancelEdit");

        if (!editCardForm || !closeModalButton || !cancelEditButton) return;

        editCardForm.onsubmit = async (e) => {
            e.preventDefault();
            try {
                const updatedCard = {
                    title: document.getElementById("editTitle").value,
                    description: document.getElementById("editDescription").value,
                    price: document.getElementById("editPrice").value,
                };

                await updateDoc(doc(db, "CRUD_Operation", cardId), updatedCard);
                console.log("Card updated successfully!");
                closeModal();
                fetchData();
            } catch (error) {
                console.error("Error updating card:", error);
            }
        };

        closeModalButton.addEventListener("click", closeModal);
        cancelEditButton.addEventListener("click", closeModal);
    }

    function closeModal() {
        const modal = document.getElementById("editModal");
        if (modal) modal.style.display = "none";
    }

    fetchData();
});
