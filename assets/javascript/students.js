const token = "5fee43aa-4a55-4915-a9df-db61b479bf22"
const urlBase = "http://146.59.242.125:3009/"
const addStudentForm = document.querySelector('#addStudentForm')
const listStudents = document.querySelector('#listStudents')
// const idPromos = '67d1546096da0cc9b3dc540b'
const editStudentModal = document.querySelector('#editStudentModal');
const closeModal = document.querySelector('.close');
const editStudentForm = document.querySelector('#editStudentForm');
let currentPromoId = null;



// Fonction pour récupérer une promotion par son ID
async function getPromoById(promoId) {
    const response = await fetch(urlBase + `promos/${promoId}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const data = await response.json();
    return data;
}

// Fonction pour afficher les étudiants d'une promotion
async function displayStudents(promoId) {
    const promo = await getPromoById(promoId);
    listStudents.innerHTML = "";

    if (promo.students && promo.students.length > 0) {
        promo.students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student-item';
            studentDiv.innerHTML = `
                <h3>${student.firstName} ${student.lastName}</h3>
                <p>Âge: ${student.age}</p>
                <p>Avatar: <img src="${urlBase}promos/${promoId}/students/${student._id}/avatar" alt="Avatar" width="50"></p>
                <button onclick="editStudent('${promoId}', '${student._id}')">Modifier</button>
                <button onclick="deleteStudent('${promoId}', '${student._id}')">Supprimer</button>
            `;
            listStudents.appendChild(studentDiv);
        });
    } else {
        listStudents.innerHTML = "<p>Aucun étudiant dans cette promotion.</p>";
    }
}

// Fonction pour ajouter un étudiant
function postStudent(promoId) {
    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const age = document.querySelector('#age').value;
        const avatarFile = document.querySelector('#avatar').files[0];

        // Vérification des champs obligatoires
        if (!firstName || !lastName || !age || !avatarFile) {
            console.error("Tous les champs sont obligatoires, y compris l'avatar.");
            return;
        }

        // Vérification du fichier avatar
        if (!avatarFile.type.startsWith('image/')) {
            console.error("Veuillez sélectionner un fichier image valide.");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);
        formData.append('avatar', avatarFile);

        const response = await fetch(urlBase + `promos/${promoId}/students`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Étudiant ajouté avec succès :", result);
            displayStudents(promoId); // Rafraîchir la liste des étudiants
            addStudentForm.reset(); // Réinitialiser le formulaire
        } else {
            const errorData = await response.json(); // Lire le message d'erreur de l'API
            console.error("Erreur lors de l'ajout de l'étudiant :", errorData);
        }
    });
}

// Fonction pour modifier un étudiant
async function editStudent(promoId, studentId) {
    const promo = await getPromoById(promoId);
    const student = promo.students.find(s => s._id === studentId);

    if (student) {
        // Rempli le formulaire de modification avec les détails de l'étudiant
        document.querySelector('#editStudentId').value = student._id;
        document.querySelector('#editFirstName').value = student.firstName;
        document.querySelector('#editLastName').value = student.lastName;
        document.querySelector('#editAge').value = student.age;

        // Affiche la modal
        editStudentModal.style.display = 'block';
    } else {
        console.error("Étudiant non trouvé");
    }

    // Ferme la modal lorsque l'utilisateur clique sur la croix
    closeModal.onclick = () => {
        editStudentModal.style.display = 'none';
    };

    // Ferme la modal lorsque l'utilisateur clique en dehors de celle-ci
    window.onclick = (e) => {
        if (e.target === editStudentModal) {
            editStudentModal.style.display = 'none';
        }
    };
}

// Écouteur pour le formulaire de modification
editStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const promoId = currentPromoId;
    const studentId = document.querySelector('#editStudentId').value;

    const formData = new FormData();
    formData.append('firstName', document.querySelector('#editFirstName').value);
    formData.append('lastName', document.querySelector('#editLastName').value);
    formData.append('age', document.querySelector('#editAge').value);
    formData.append('avatar', document.querySelector('#editAvatar').files[0]);

    const response = await fetch(urlBase + `promos/${promoId}/students/${studentId}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    });

    if (response.ok) {
        displayStudents(promoId); // Rafraîchi la liste des étudiants
        editStudentModal.style.display = 'none'; // Ferme la modal
    } else {
        console.error("Erreur lors de la mise à jour de l'étudiant");
    }
});

// Fonction pour supprimer un étudiant
async function deleteStudent(promoId, studentId) {
    const response = await fetch(urlBase + `promos/${promoId}/students/${studentId}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    if (response.ok) {
        displayStudents(promoId); // Rafraîchi la liste des étudiants
    } else {
        console.error("Erreur lors de la suppression de l'étudiant");
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentPromoId = urlParams.get('promoId'); // Récupére l'ID de la promotion depuis l'URL

    if (currentPromoId) {
        displayStudents(currentPromoId); // Affiche les étudiants de la promotion
        postStudent(currentPromoId); // Configure l'écouteur d'événement pour l'ajout
    } else {
        console.error("ID de la promotion manquant dans l'URL");
    }
});


