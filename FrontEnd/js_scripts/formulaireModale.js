

/********************** Un fetch pour récupérer proprement le nom des catégories pour les compléter
 *********************** sans erreur dans le formulaire POST *********************************************/

const reponse = await fetch("http://localhost:5678/api/works")
const elements = await reponse.json()
console.log(elements)

let tableau = []

for (let elem of elements){
    let categ = elem.category.name
    tableau.push(categ)
}

let tableauCategoriesUniques = [... new Set(tableau)]
// le tableau contient à présent sans aucun doublon les catégories de l'API


// Récupère le champ Select html afin de remplir dynamiquement les catégories pour avoir
// exactement les même que celles contenues dans l'API 
const selection = document.getElementById("categorie")

for (let i=0; i<selection.length; i++){
    selection[i].value = tableauCategoriesUniques[i]
    selection[i].textContent = tableauCategoriesUniques[i]
}










/******************************************Construction de la Modale POST *********************************************/


const boutonAjouterPhoto = document.querySelector(".bouton-ajouter-photo")
const corpsModale = document.getElementById("corps-modale") //on récup la modale pour positionner par dessus le formulaire d'envoi
const theDiv = document.querySelector(".the-div")

boutonAjouterPhoto.addEventListener("click", (event)=>{
    event.preventDefault()
    const cadreModalePost = document.querySelector(".cadre-modale-post")
    cadreModalePost.classList.remove("cadre-modale-post-off")
    cadreModalePost.classList.add("cadre-modale-post-on")

    // on créee une div transparente pour cliquer dessus et fermer la modale POST
    const theDiv2 = document.createElement("div") 
    theDiv2.classList.add("the-div2")
    document.body.appendChild(theDiv2)

    theDiv2.addEventListener("click", ()=>{
        cadreModalePost.classList.remove("cadre-modale-post-on")
        cadreModalePost.classList.add("cadre-modale-post-off")
        theDiv2.classList.add("the-div2-off")
    })
})



/************************************Partie POST FormData*******************************/

const formulaire = document.querySelector(".formulaire")
const leToken = window.localStorage.getItem("token")

formulaire.addEventListener("submit", async (event)=>{

    event.preventDefault()

    // l'objet FormData prend le formulaire et le formate pour qu'il soit exploitable
    const formData = new FormData(formulaire) 
    console.log(formData)
  
    const reponse = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers : { Authorization : `Bearer ${leToken}`} ,
        body: formData
    })
    .then(res => res.json())
    .then(res => console.log(res))
})



/*****************afficher l'input POST quand on clique sur le bouton "ajouter photo" *******/

// const boutonPostAjouterPhoto = document.querySelector(".rectangle-bouton-post-ajouter-photo")
// const file = document.getElementById("file")
// const divFilePost = document.getElementById("div-file-post")

// boutonPostAjouterPhoto.addEventListener("click", ()=>{
//     console.log("je viens de cliquer")
    

// })



/* Message d'erreur si le formulaire n'est pas totalement rempli */

const recupFormulaire = document.querySelectorAll(".formulaire input")
const messageErreurAffichage = document.querySelector(".message-erreur-affichage")

function verifierChamp(champ){
    if (champ.value ===""){
        throw new Error(`Le champ ${champ.id} est vide`)
    }
}

formulaire.addEventListener("submit", (event)=>{
    
    try{
        event.preventDefault()

        let photoFormulaire = document.getElementById("image-chargement-input")
        verifierChamp(photoFormulaire)

        let titreFormulaire = document.getElementById("titre")
        verifierChamp(titreFormulaire)

        let categorieFormulaire = document.getElementById("categorie")
        verifierChamp(categorieFormulaire)

    }catch(error){
        messageErreurAffichage.innerText = error.message
    }
})


messageErreurAffichage.addEventListener("click", ()=>{
    messageErreurAffichage.innerText = ""
})





/*************************** remplir image après download ****************************/
/*code direct dans la page html dans une balise script */

/*faire apparaître à nouveau les éléments cachés en cliquant sur la photo downloadée*/

const imageARemplir = document.querySelector(".image-a-remplir")
const svgAjoutPhoto = document.querySelector(".svg-ajout-photo")
const boutonFile = document.querySelector(".bouton-file")
const formatJpg = document.querySelector(".format-jpg")

imageARemplir.addEventListener("click", ()=>{

    svgAjoutPhoto.classList.remove("rectangle-svg-ajout-photo-off")
    boutonFile.classList.remove("bouton-file-off")
    formatJpg.classList.remove("format-jpg-off")

    svgAjoutPhoto.classList.add("rectangle-svg-ajout-photo")
    boutonFile.classList.add("bouton-file")
    formatJpg.classList.add("format-jpg")

    imageARemplir.classList.remove("image-a-remplir-on")
    imageARemplir.classList.add("image-a-remplir-off")
})

