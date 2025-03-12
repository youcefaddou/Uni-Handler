const token = "5fee43aa-4a55-4915-a9df-db61b479bf22"
const urlBase = "http://146.59.242.125:3009/"
const addForm = document.querySelector('#addForm')
const listPromos = document.querySelector('#listPromos')
const editModal = document.querySelector('#editModal')
const closeModal = document.querySelector('.close')
const editForm = document.querySelector('#editForm')

async function getPromos() {
    const response = await fetch(urlBase + "promos/", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    })
    const data = await response.json()
    return data
}

function postPromos() {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const data = {
            name: document.querySelector('#name').value,
            startDate: document.querySelector('#startDate').value,
            endDate: document.querySelector('#endDate').value,
            formationDescription: document.querySelector('#formationDescription').value,
        }

        const response = await fetch(urlBase + "promos", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            displayPromos()
            addForm.reset() //reinitialiser le formulaire
        }
    })
}

async function displayPromos() {
    const promos = await getPromos()
    listPromos.innerHTML = ""

    promos.forEach(promo => {
        
        const formatStartDate = promo.startDate.split('T')[0]
        const formatEndDate = promo.endDate.split('T')[0]
        const promoDiv = document.createElement('div')
        promoDiv.className = 'promo-item'
        promoDiv.innerHTML = `
            <h3>${promo.name}</h3>
            <p>ID de la Promo: ${_id}</p>
            <p>Date de début: ${formatStartDate}</p>
            <p>Date de fin: ${formatEndDate}</p>
            <p>Description: ${promo.formationDescription}</p>
            <button onclick="editPromo('${promo._id}')">Modifier</button>
            <button onclick="deletePromo('${promo._id}')">Supprimer</button>
            <a href="./youcefstudent.html?promoId=${promo._id}">Liste des étudiants</a>

        `
        listPromos.appendChild(promoDiv)
    })
}

async function editPromo(_id) {
    const response = await fetch(urlBase + "promos/" + _id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    })

    if (response.ok) {
        const promo = await response.json()

        //verif que startDate et endDate sont definis
        if (!promo.startDate || !promo.endDate) {
            console.error("Les dates de la promotion sont manquantes")
            return
        }

        // formater les dates au format yyyy-MM-dd
        const formattedStartDate = promo.startDate.split('T')[0]
        const formattedEndDate = promo.endDate.split('T')[0]

        //remplir le formulaire avec les détails de la promotion
        document.querySelector('#editId').value = promo._id
        document.querySelector('#editName').value = promo.name
        document.querySelector('#editStartDate').value = formattedStartDate
        document.querySelector('#editEndDate').value = formattedEndDate
        document.querySelector('#editFormationDescription').value = promo.formationDescription

        editModal.style.display = 'block'
    } 

    // fermer la modal lorsque l'utilisateur clique sur la croix
    closeModal.onclick = () => {
        editModal.style.display = 'none'
    }

    //fermer la modal lorsque l'user clique en dehors 
    window.onclick = (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none'
        }
    }
}

editForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const _id = document.querySelector('#editId').value
    const updatedData = {
        name: document.querySelector('#editName').value,
        startDate: document.querySelector('#editStartDate').value,
        endDate: document.querySelector('#editEndDate').value,
        formationDescription: document.querySelector('#editFormationDescription').value,
    }

    const updateResponse = await fetch(urlBase + "promos/" + _id, {
        method: 'PUT',
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })

    if (updateResponse.ok) {
        await displayPromos(); // rafraichir la liste des promos
        editModal.style.display = 'none'
    } else {
        console.error("Erreur lors de la mise à jour de la promo")
    }
})

async function deletePromo(_id) {
    const url = urlBase + "promos/" + _id;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json"
        }
    })

    if (response.ok) {
        displayPromos() //rafraîchir la liste des promos
    }
}

displayPromos()
postPromos()