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
        const iconeDelete = document.createElement("i")
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

    }
}

creationDOM(elements)


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
        console.log("on rentre dans la partie the div")
        corpsModale.classList.remove("corps-modale-on")
        corpsModale.classList.add("corps-modale-off")
        theDiv.classList.add("the-div-off")
    })
 })











 // ce code fonctionne et permet de cliquer sur la croix et fermer la modale


//  croix.addEventListener("click", ()=>{
//      corpsModale.classList.remove("corps-modale-on")
//      corpsModale.classList.add("corps-modale-off")
//  })



/**************************************************************************************/




// lienModale.addEventListener("click", (event) => {
//     event.preventDefault()
//     const modale = document.querySelector(event.target.getAttribute("href"))
//     console.log(modale)
//     modale.style.display = null
//     console.log(modale)
//     modale.addEventListener("click", (event)=>{
//         event.preventDefault()
//         modale.style.display = "none"
//     })
    
// })









// croix.addEventListener("click", ()=>{
//     corpsModale.classList.remove("corps-modale-on")
//     corpsModale.classList.add("corps-modale-off")
// })




/*

idée pour utiliser une seule fonction d'initialisation du DOM en fonction de la valeur de la balise Parent
pb --> impossible d'importer la fonction d'initialisation du DOM du fichier works sans erreur

const baliseLieuInsertion = document.querySelector(".affichage-photos-modale")
console.log(baliseLieuInsertion.className)
const baliseLieuInsertionClassName = baliseLieuInsertion.className

if (baliseLieuInsertionClassName === ".affichage-photos-modale"){
    console.log("coucou vous êtes bien sur la modale")
}else{
    console.log("vous êtes sur la gallerie")
}
*/







