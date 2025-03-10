const token = "5fee43aa-4a55-4915-a9df-db61b479bf22"
const urlBase = "http://146.59.242.125:3009/"
const addForm = document.querySelector('#addForm')

async function getPromos() {
   const response = await fetch(urlBase + "promos", {
    method:"GET",
    headers: {
        Authorization : "Bearer " + token
    }
   })
   const data = await response.json()
   console.log(data);
}


addForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    let data = {
        name : document.querySelector('#name').value,
        startDate : document.querySelector('#startDate').value,
        endDate: document.querySelector('#endDate').value,
        formationDescription : document.querySelector('#formationDescription').value,
    }
    data = JSON.stringify(data)
    const response = await fetch(urlBase + "promos", {
        method:"POST",
        headers: {
            Authorization : "Bearer " + token,
            "Content-type": "Application/json"
        },
        body: data
       })
       getPromos()
})

getPromos()


// Fonction inscription

// Fonction modifier promo

//supprimer promo

//afficher liste promo (modal? liste déroulante?)