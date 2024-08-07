import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDROf6RpmmOBLjHoQgRyMrmZZfyuVU8gqc",
	authDomain: "photosgallery-d176c.firebaseapp.com",
	projectId: "photosgallery-d176c",
	storageBucket: "photosgallery-d176c.appspot.com",
	messagingSenderId: "1071735205656",
	appId: "1:1071735205656:web:632e62a3503d940a6eb86d",
	measurementId: "G-90TXP31P67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const validateInputs = () => {
	// by using destructuring we can select multiple elements at once
	const [title, description, price] = document.querySelectorAll(".inputFields");
	if (!title.value || !description.value || !price.value) {
		console.log("Please fill all the fields");
		name.focus();
		return false;
	}
	return true;
};

document.getElementById("createForm").addEventListener("click", async (cardData) => {
	cardData.preventDefault();
		await insertData();
		await fetchData(); // Fetch and display
		clearInputs(); // Clear input fields after submission
});

const insertData = async () => {
	const [file, title, description, price] = document.querySelectorAll(".inputFields");
    const docRef = await addDoc(collection(db, "CRUD_Operation"), {
         url : await uploadImage(file),
		title: title.value,
		description: description.value,
		price: price.value
	});
	console.log("Document added with ID: ", docRef.id);
};

const uploadImage = async (file) => {
    const fileRef = ref(storage, `CRUD_Operation/${  file.name}`);
    await uploadBytes(fileRef, file[0]);
    const url = await getDownloadURL(fileRef);
    console.log("images uploaded with url is : ",url);
    return url;
}

//-------------------------dynamic Card show on index page-------------------------------
// Function to fetch data from FireStore and display them
async function fetchData() {
	const displayContainer = document.getElementById("displayContainer");

	try {
		const CardCollectionRef = collection(db, "CRUD_Operation");
		const cardSnapshot = await getDocs(CardCollectionRef);

		if (cardSnapshot.empty) {
			displayContainer.innerHTML = "<p class='text-center text-gray-600'>No card found.</p>";
			return;
		}

		cardSnapshot.forEach((doc) => {
			const cardData = doc.data();
			const cardId = doc.id;

			// Create card
			const card = document.createElement("div");
			card.className = "relative bg-white shadow-lg rounded-lg overflow-hidden";

			// Create delete buttons
			const deleteButton = document.createElement("button");
			deleteButton.className = "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full";
			deleteButton.innerHTML = "&times;";
			deleteButton.onclick = () => deleteCard(cardId);

			// Create edit button
			const editButton = document.createElement("button");
			editButton.className = "absolute top-2 right-12 bg-blue-500 text-white p-1 rounded-full";
			editButton.innerHTML = "Edit";
			editButton.onclick = () => openEditModal(cardId, cardData);

			// Create image
			const img = document.createElement("img");
			img.className = "card-img w-full";
            img.src = cardData.url || "default-image.png";

			// Create card body
			const cardBody = document.createElement("div");
			cardBody.className = "p-4";

			// Create title
			const title = document.createElement("h2");
			title.className = "text-xl font-semibold text-gray-900";
			title.textContent = cardData.title || "No Title";

			// Create description
			const description = document.createElement("p");
			description.className = "mt-2 text-gray-600";
			description.textContent = cardData.description || "No Description";

			// Create price
			const price = document.createElement("p");
			price.className = "mt-2 text-gray-600";
			price.textContent =` price : ${cardData.price || "Not priced mention"}`;

			cardBody.appendChild(title);
			cardBody.appendChild(description);
			cardBody.appendChild(price);

			// Append elements to the card
			card.appendChild(img);
			card.appendChild(cardBody);
			card.appendChild(deleteButton);
			card.appendChild(editButton);

			displayContainer.appendChild(card);
		});
	} catch (error) {
		console.error("Error fetching events:", error);
		displayContainer.innerHTML = "<p class='text-center text-red-600'>Failed to load cards.</p>";
	}
}

// Function to delete an event
async function deleteCard(cardId) {
	try {
		await deleteDoc(doc(db, "CRUD_Operation", cardId));
		console.log("card deleted successfully!");
		location.reload();
	} catch (error) {
		console.error("Error deleting card:", error);
	}
}

const clearInputs = () => {
	const [title, description, price] = document.querySelectorAll(".inputFields");
	title.value = "";
	description.value = "";
	price.value = "";
};

// Function to open the edit modal
function openEditModal(cardId, card) {
	const modal = document.getElementById("editModal");
	document.getElementById("editTitle").value = card.cardTitle || "";
	document.getElementById("editDescription").value = card.description || "";
	document.getElementById("editPrice").value = card.cardPrice || "";
	modal.style.display = "block";

	// Set up form submission handler
	document.getElementById("editCardForm").onsubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedCard = {
				cardTitle: document.getElementById("editTitle").value,
				description: document.getElementById("editDescription").value,
				cardPrice: document.getElementById("editPrice").value
			};

			await updateDoc(doc(db, "CRUD_Operation", cardId), updatedCard);
			console.log("card updated successfully!");
			location.reload(); // Reload to see updated card
		} catch (error) {
            
			console.error("Error updating card:", error);
		}
	};
}

// Function to close the modal
function closeModal() {
	const modal = document.getElementById("editModal");
	modal.style.display = "none";
}

// Event listeners for modal close button and cancel button
document.getElementById("closeModal").addEventListener("click", closeModal());
document.getElementById("cancelEdit").addEventListener("click", closeModal());


// Fetch events when the page loads
fetchEvents();