const token = "5fee43aa-4a55-4915-a9df-db61b479bf22"
const urlBase = "http://146.59.242.125:3009/"
const addForm = document.querySelector('#addForm')
const listPromos = document.querySelector('#listPromos')
let promos = null

async function getPromos() {
    const response = await fetch(urlBase + "promos", {
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
        let data = {
            name: document.querySelector('#name').value,
            startDate: document.querySelector('#startDate').value,
            endDate: document.querySelector('#endDate').value,
            formationDescription: document.querySelector('#formationDescription').value,
        }
        const response = await fetch(urlBase + "promos", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "Application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            displayPromos() //refresh la liste des promos
            addForm.reset() //reinitialise le formulaire
        }
    })
}

async function displayPromos() {

    const promos = await getPromos()
    listPromos.innerHTML = ""

    promos.forEach(promo => {
        const promoDiv = document.createElement('div')
        promoDiv.className = 'promo-item'
        promoDiv.innerHTML = `
                <h3>${promo.name}</h3>
                <p>Date de début: ${promo.startDate}</p>
                <p>Date de fin: ${promo.endDate}</p>
                <p>Description: ${promo.formationDescription}</p>
                <button onclick="editPromo('${promo.id}')">Modifier</button>
                <button onclick="deletePromo('${promo.id}')">Supprimer</button>
            `
        listPromos.appendChild(promoDiv)
    })
}

async function editPromo(id) {
    const updateResponse = await fetch(urlBase + "promos/" + id, {
        method: "PUT",
        headers: {
            Authorization: "Bearer" + token,
            "Content-type": "Application/json"
        }
    })
}

async function deletePromo(id) {
    const response = await fetch(urlBase + "promos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "Application/json"
        }
    })

}


getPromos()
postPromos()
displayPromos()

// Fonction inscription

// Fonction modifier promo

//supprimer promo

//afficher liste promo (modal? liste déroulante?)