const token = "5fee43aa-4a55-4915-a9df-db61b479bf22"
const urlBase = "http://146.59.242.125:3009/"
const addStudentForm = document.querySelector('#addStudentForm')
const listStudents = document.querySelector('#listStudents')
const editStudentModal = document.querySelector('#editStudentModal')
const closeModal = document.querySelector('.close')
const editStudentForm = document.querySelector('#editStudentForm')

let currentPromoId = null 

//fonction pour récupérer une promotion par son ID
async function getPromoById(promoId) {
    const response = await fetch(urlBase + `promos/${promoId}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    })
    const data = await response.json()
    return data
}

//fonction pour afficher les étudiants d'une promotion
async function displayStudents(promoId) {
    const promo = await getPromoById(promoId)
    listStudents.innerHTML = ""

    if (promo.students && promo.students.length > 0) {
        for (const student of promo.students) {
            const studentDiv = document.createElement('div')
            studentDiv.className = 'student-item'

            //construire l'URL de l'avatar
            const avatarUrl = `${urlBase}promos/${promoId}/students/${student._id}/avatar`

            //charger l'avatar de manière asynchrone
            const avatarSrc = await fetchAvatar(avatarUrl)

            //créer une balise img pour l'avatar
            const avatarImg = document.createElement('img')
            avatarImg.src = avatarSrc
            avatarImg.alt = "Avatar"
            avatarImg.width = 50

            //ajouter l'image au DOM
            studentDiv.innerHTML = `
                <h3>${student.firstName} ${student.lastName}</h3>
                <p class="age">Âge: ${student.age}</p>
                <p class="avatarimage">Avatar: </p>
            `
            studentDiv.querySelector('.avatarimage').appendChild(avatarImg)
            const editButton = document.createElement('button')
            editButton.textContent = "Modifier"
            editButton.onclick = () => editStudent(promoId, student._id)

            const deleteButton = document.createElement('button')
            deleteButton.textContent = "Supprimer"
            deleteButton.onclick = () => deleteStudent(promoId, student._id)

            studentDiv.appendChild(editButton)
            studentDiv.appendChild(deleteButton)

            listStudents.appendChild(studentDiv)
        }
    } else {
        listStudents.innerHTML = "<p>Aucun étudiant dans cette promotion.</p>"
    }
}

async function fetchAvatar(avatarUrl) {
    const response = await fetch(avatarUrl, {
        headers: {
            Authorization: "Bearer " + token,
            Accept: "image/jpeg", //specifier le type de contenu attendu
        },
    })
    //convertir la réponse en blob (binaire)
    const blob = await response.blob()
    // Créer une URL pour l'image
    return URL.createObjectURL(blob) //methode statique qui crée une chaine qui contient l'URL de l'objet blob
}

function postStudent(promoId) {
    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName').value
        const lastName = document.querySelector('#lastName').value
        const age = document.querySelector('#age').value;
        const avatarFile = document.querySelector('#avatar').files[0]
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('age', age)
        formData.append('avatar', avatarFile)
        const response = await fetch(urlBase + `promos/${promoId}/students`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,

            },
            body: formData
        })

        if (response.ok) {
            const result = await response.json()
            displayStudents(promoId) // rafraichir la liste des étudiants
            addStudentForm.reset() // reinit le formulaire
        } else {
            const errorData = await response.json() //lire le message d'erreur de l'API
        }
    })
}

//fonction pour modifier un étudiant
async function editStudent(promoId, studentId) {
    const promo = await getPromoById(promoId)
    const student = promo.students.find(s => s._id === studentId)

    if (student) {
        // Remplir le formulaire de modification avec les détails de l'étudiant
        document.querySelector('#editStudentId').value = student._id
        document.querySelector('#editFirstName').value = student.firstName
        document.querySelector('#editLastName').value = student.lastName
        document.querySelector('#editAge').value = student.age

        editStudentModal.style.display = 'block'


        closeModal.onclick = () => {
            editStudentModal.style.display = 'none'
        }
        window.onclick = (e) => {
            if (e.target === editStudentModal) {
                editStudentModal.style.display = 'none'
            }
        }
    }
}
//ecouteur pour le formulaire de modif
editStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const promoId = currentPromoId
    const studentId = document.querySelector('#editStudentId').value
    const formData = new FormData()
    formData.append('firstName', document.querySelector('#editFirstName').value)
    formData.append('lastName', document.querySelector('#editLastName').value)
    formData.append('age', document.querySelector('#editAge').value)
    formData.append('avatar', document.querySelector('#editAvatar').files[0])

    const response = await fetch(urlBase + `promos/${promoId}/students/${studentId}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    })

    if (response.ok) {
        displayStudents(promoId) // Rafraîchir la liste des étudiants
        editStudentModal.style.display = 'none'
    }
})

async function deleteStudent(promoId, studentId) {
    const response = await fetch(urlBase + `promos/${promoId}/students/${studentId}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    })

    if (response.ok) {
        displayStudents(promoId) //rafraichir la liste des étudiants
    }
}
//Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    currentPromoId = urlParams.get('promoId') //recupérer l'ID de la promotion depuis l'URL
    if (currentPromoId) {
        displayStudents(currentPromoId)
        postStudent(currentPromoId) 
    } 
})