import {
  auth,
  db,
  doc, 
  collection,
  getDocs,
  getDoc,
  onAuthStateChanged,
  signOut,
  deleteDoc,updateDoc
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
//-------------------------dynamic Card show on index page-------------------------------

       // Function to fetch events from Firestore and display them
        async function fetchEvents() {
            const eventsContainer = document.getElementById('eventsContainer');
            
            try {
                const eventsCollectionRef = collection(db, "events");
                const eventSnapshot = await getDocs(eventsCollectionRef);
                
                if (eventSnapshot.empty) {
                    eventsContainer.innerHTML = "<p class='text-center text-gray-600'>No events found.</p>";
                    return;
                }

                eventSnapshot.forEach(doc => {
                    const event = doc.data();
                    const eventId = doc.id;

                    const card = document.createElement('div');
                    card.className = 'relative bg-white shadow-lg rounded-lg overflow-hidden';

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full';
                    deleteButton.innerHTML = '&times;';
                    deleteButton.onclick = () => deleteEvent(eventId);

                    const editButton = document.createElement('button');
                    editButton.className = 'absolute top-2 right-12 bg-blue-500 text-white p-1 rounded-full';
                    editButton.innerHTML = 'Edit';
                    editButton.onclick = () => openEditModal(eventId, event);

                    const img = document.createElement('img');
                    img.className = 'card-img w-full';
                    img.src = event.eventImage || 'default-image.png';
                    
                    const cardBody = document.createElement('div');
                    cardBody.className = 'p-4';

                    const title = document.createElement('h2');
                    title.className = 'text-xl font-semibold text-gray-900';
                    title.textContent = event.eventTitle || 'No Title';
                    
                    const description = document.createElement('p');
                    description.className = 'mt-2 text-gray-600';
                    description.textContent = event.description || 'No Description';
                    
                    const location = document.createElement('p');
                    location.className = 'mt-2 text-gray-600';
                    location.textContent = `Location: ${event.eventLocation || 'Not Specified'}`;
                    
                    const dateTime = document.createElement('p');
                    dateTime.className = 'mt-2 text-gray-600';
                    dateTime.textContent = `Date: ${event.eventDate || 'Not Specified'} Time: ${event.eventTime || 'Not Specified'}`;

                    cardBody.appendChild(title);
                    cardBody.appendChild(description);
                    cardBody.appendChild(location);
                    cardBody.appendChild(dateTime);

                    card.appendChild(img);
                    card.appendChild(cardBody);
                    card.appendChild(deleteButton);
                    card.appendChild(editButton);

                    eventsContainer.appendChild(card);
                });

            } catch (error) {
                console.error("Error fetching events:", error);
                eventsContainer.innerHTML = "<p class='text-center text-red-600'>Failed to load events.</p>";
            }
        }

        // Function to delete an event
        async function deleteEvent(eventId) {
            try {
                await deleteDoc(doc(db, "events", eventId));
                alert('Event deleted successfully!');
                location.reload();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }

        // Function to open the edit modal
        function openEditModal(eventId, event) {
            const modal = document.getElementById('editModal');
            document.getElementById('editEventTitle').value = event.eventTitle || '';
            document.getElementById('editDescription').value = event.description || '';
            document.getElementById('editEventLocation').value = event.eventLocation || '';
            document.getElementById('editEventDate').value = event.eventDate || '';
            document.getElementById('editEventTime').value = event.eventTime || '';
            modal.style.display = 'block';

            // Set up form submission handler
            document.getElementById('editEventForm').onsubmit = async (e) => {
                e.preventDefault();
                try {
                    const updatedEvent = {
                        eventTitle: document.getElementById('editEventTitle').value,
                        description: document.getElementById('editDescription').value,
                        eventLocation: document.getElementById('editEventLocation').value,
                        eventDate: document.getElementById('editEventDate').value,
                        eventTime: document.getElementById('editEventTime').value
                    };

                    await updateDoc(doc(db, "events", eventId), updatedEvent);
                    alert('Event updated successfully!');
                    location.reload(); // Reload to see updated event
                } catch (error) {
                    console.error("Error updating event:", error);
                }
            };
        }

        // Function to close the modal
        function closeModal() {
            const modal = document.getElementById('editModal');
            modal.style.display = 'none';
        }

        // Event listeners for modal close button and cancel button
        document.getElementById('closeModal').onclick = closeModal;
        document.getElementById('cancelEdit').onclick = closeModal;

        // Fetch events when the page loads
        fetchEvents();


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

