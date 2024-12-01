// Array to store contacts
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Display contacts on homepage
function displayContacts() {
    const tableBody = document.querySelector("#contactsTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add new contact
function addContact(contact) {
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    window.location.href = "index.html";
}

// Edit contact
function editContact(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "edit.html";
}

// Save edited contact
function saveEditedContact(index, contact) {
    contacts[index] = contact;
    localStorage.setItem("contacts", JSON.stringify(contacts));
    window.location.href = "index.html";
}

// Delete contact
function deleteContact(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
    }
}

// On document load
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.html")) {
        displayContacts();
    } else if (window.location.pathname.endsWith("add.html")) {
        document.querySelector("#contactForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const contact = {
                name: document.querySelector("#name").value,
                email: document.querySelector("#email").value,
                phone: document.querySelector("#phone").value,
            };
            addContact(contact);
        });
    } else if (window.location.pathname.endsWith("edit.html")) {
        const index = localStorage.getItem("editIndex");
        const contact = contacts[index];
        document.querySelector("#editName").value = contact.name;
        document.querySelector("#editEmail").value = contact.email;
        document.querySelector("#editPhone").value = contact.phone;

        document.querySelector("#editForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const updatedContact = {
                name: document.querySelector("#editName").value,
                email: document.querySelector("#editEmail").value,
                phone: document.querySelector("#editPhone").value,
            };
            saveEditedContact(index, updatedContact);
        });
    }
});
