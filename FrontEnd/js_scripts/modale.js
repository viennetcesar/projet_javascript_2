// import { recupDataWorks } from "./works"
// problème message d'erreur avec type MIME interdit

const reponse = await fetch("http://localhost:5678/api/works")
const elements = await reponse.json()


function creationDOM(elements){

    for (let i=0; i<elements.length; i++){
        const figure = elements[i]
        const affichagePhotosModale = document.querySelector(".affichage-photos-modale")
        const baliseFigure = document.createElement("figure")
        baliseFigure.classList.add("figure-modale")
        baliseFigure.dataset.id = elements[i].id
        const categoryId = elements[i].categoryId
        const imageModale = document.createElement("img")
        imageModale.src = elements[i].imageUrl
        imageModale.classList.add("image-modale")
        const iconeDelete = document.createElement("i") //création de l'icône
        iconeDelete.classList.add("fa-regular")
        iconeDelete.classList.add("fa-trash-can")
        iconeDelete.classList.add("svg-delete")
       
        const textePhoto = document.createElement("p")
        textePhoto.innerText = "éditer"
        const userId = elements[i].userId

        affichagePhotosModale.appendChild(baliseFigure)
        baliseFigure.appendChild(imageModale)
        baliseFigure.appendChild(iconeDelete)
        baliseFigure.appendChild(textePhoto)

        // ensuite on code la suppression directement dans cette fonction

        iconeDelete.addEventListener("click", async (event)=>{
            console.log("vous venez de cliquer sur l'icône de suppression")
            event.preventDefault()
            const idImage = figure.id
            const tokenPresent = window.localStorage.getItem("token")
            console.log("en cliquant sur la poubelle j'ai récupéré mon token : " + tokenPresent)
            // jusqu'ici tout fonctionne
            let response = await fetch(`http://localhost:5678/api/works/${idImage}`,
                          {
                            method: "DELETE",
                            headers: {
                              accept: "*/*",
                              Authorization: `Bearer ${tokenPresent}`,
                            },
                          }
                        )
            let responseJson = await response.json() // converti le corps de la réponse en json
            console.log(responseJson)

        })

    }
}

creationDOM(elements)
// étant donné que quand je supprime un élément en cliquant sur l'icône poubelle
// il se supprime dans l'API, la fontion creationDOM est relancée automatiquement
// et récupère seulement ce qui se trouve encore dans l'API


const lienModale = document.querySelector(".lien-modale") // récupère tout le corps de la modale qui est relié au lien
const corpsModale = document.getElementById("corps-modale")
const croix = document.querySelector(".croix")



/*ce code fonctionne et permet d'ouvrir la modale en cliquant sur "modifier" et fermer ma modale en cliquant
n'importe où sur l'écran */

 lienModale.addEventListener("click", ()=>{
    console.log("le corps modale est récupéré")
    corpsModale.classList.remove("corps-modale-off")
    corpsModale.classList.add("corps-modale-on")
    const theDiv = document.createElement("div")
    theDiv.classList.add("the-div")
    document.body.appendChild(theDiv)
    console.log(theDiv)


    theDiv.addEventListener("click", ()=>{
        corpsModale.classList.remove("corps-modale-on")
        corpsModale.classList.add("corps-modale-off")
        theDiv.classList.add("the-div-off")
    })
 })









 /***********************************************poster une photos sur l'API sans utiliser les objets FormData *****/

// const recuperationToken = window.localStorage.getItem("token")

// const donneesImage = {
//     "image":  "./assets/images/structures-thermopolis.png" ,
//     "title": "structures-thermopolis",
//     "category": "8",
//   }

// const chargePost = JSON.stringify(donneesImage)

// console.log("la charge : " + chargePost)

// let requetePost = fetch("http://localhost:5678/api/works", 
// {
//     method: "POST",
//     headers: {  accept : "application/json",
//                 "Content-Type": "multipart/form-data",
//                 Authorization: `Bearer ${recuperationToken}`
//             },
//     body: chargePost
    
// })

// let reponseRequete = await requetePost.json()
// console.log(reponseRequete)







 // ce code fonctionne et permet de cliquer sur la croix et fermer la modale


//  croix.addEventListener("click", ()=>{
//      corpsModale.classList.remove("corps-modale-on")
//      corpsModale.classList.add("corps-modale-off")
//  })



/**************************************************************************************/









