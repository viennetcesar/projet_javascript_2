import {coucou, recupDataWorks, creationDOMmodaleEtDeleteWork} from "./service.js"

coucou()

const reponse = await fetch("http://localhost:5678/api/works")
const elements = await reponse.json()


recupDataWorks(elements)


/*Filtre bouton "Tous" */
const tous = document.querySelector(".tous")

tous.addEventListener("click", function(){
    recupDataWorks(elements)
})




/*filtre "Objets" */

const objets = document.querySelector(".objets")

objets.addEventListener("click", function(){
    const objetsFiltres = elements.filter(function(elements){
        return elements.category.name === "Objets"
    })
    document.querySelector(".gallery").innerHTML = ""
    recupDataWorks(objetsFiltres)
})



/*filtre "Appartements*/

const appartements = document.querySelector(".appartements")

appartements.addEventListener("click", function(){
    const appartementsFiltres = elements.filter(function(elements){
        return elements.category.name === "Appartements"
    })
    document.querySelector(".gallery").innerHTML = ""
    recupDataWorks(appartementsFiltres)
})



/*filtre "Hôtels et restaurants*/

const hotels = document.querySelector(".hotels")


hotels.addEventListener("click", function(){
    const hotelsFiltres = elements.filter(function(elements){
        return elements.category.name === "Hotels & restaurants"
    })
    document.querySelector(".gallery").innerHTML = ""
    recupDataWorks(hotelsFiltres)
})


/************** Après la connexion ******************************************************/

let tokenLocal = window.localStorage.getItem("token")

// console.log("Avant de logout le token vaut : " + tokenLocal)

if (tokenLocal != null) {
    const logger = document.querySelector(".lien-login")
    const mesFiltes = document.querySelector(".mes-filtres")
    const mesProjets = document.querySelector(".mes-projets")

    logger.innerText = "Logout"
    mesFiltes.innerHTML = ""


    const barreEdition = document.querySelector(".barre-edition-off")
    const svg = document.querySelector(".svg-off")
    const modeEdition = document.querySelector(".mode-edition-off")
    const publierLesChangements = document.querySelector(".publier-les-changements-off")
    
    const projetsConnecte = document.querySelector(".projets-connecte-off")
    const svgConnecte = document.querySelector(".svg-connecte-off")
    const modifierConnecte = document.querySelector(".modifier-connecte-off")
    

    barreEdition.classList.remove("barre-edition-off")
    barreEdition.classList.add("barre-edition-on")
    svg.classList.remove("svg-off")
    svg.classList.add("svg-on")
    modeEdition.classList.remove("mode-edition-off")
    modeEdition.classList.add("mode-edition-on")
    publierLesChangements.classList.remove("publier-les-changements-off")
    publierLesChangements.classList.add("publier-les-changements-on")

    
    projetsConnecte.classList.remove("projets-connecte-off")
    projetsConnecte.classList.add("projets-connecte-on")
    svgConnecte.classList.remove("svg-connecte-off")
    svgConnecte.classList.add("svg-connecte-on")
    modifierConnecte.classList.remove("modifier-connecte-off")
    modifierConnecte.classList.add("modifier-connecte-on")
    

} else {
    console.log("le token a été supprimé du local storage")

}




/*Au clic sur logout l'event listeneur réinitialise la page projet en non loggué*/


const logger = document.querySelector(".lien-login")

logger.addEventListener("click", ()=>{
        const tokenLocal = window.localStorage.removeItem("token")
        console.log("le clic log out donne au token une valeur de : " + tokenLocal)

        
        if (tokenLocal === null){
            const barreEdition = document.querySelector(".barre-edition-on")
            const modeEdition = document.querySelector(".mode-edition-on")
            const publierLesChangements = document.querySelector(".publier-les-changements-on")

            barreEdition.innerHTML = ""
            modeEdition.innerHTML = ""
            publierLesChangements.innerHTML = ""

            const projetsConnecte = document.querySelector(".projets-connecte-on")
            const svgConnecte = document.querySelector(".svg-connecte-on")
            const modifierConnecte = document.querySelector(".modifier-connecte-on")

            projetsConnecte.innerHTML = ""
            svgConnecte.innerHTML = ""
            modifierConnecte.innerHTML = ""

        }

        console.log("le clic sur logout tranforme la valeur du tokent en : " + tokenLocal)

     
    }
    
    
)

  


creationDOMmodaleEtDeleteWork()





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




/*************************************************** fonction fileReader() *******************************************/


// avec window je rends la portée de ma fonction globale
window.afficheImageDownloaded = function afficheImageDownloaded(){

    const imageARemplir = document.querySelector(".image-a-remplir") // récupère la balise vide dans laquelle placer l'image téléchargée
    const imageDownloaded = document.getElementById("image-chargement-input").files[0] //récupère le premier file de la balise input file
    const reader = new FileReader() // crée un objet fileReader

    //récupère les éléments à cacher quand on download la photo
    const rectangleSvgAjoutPhoto = document.querySelector(".rectangle-svg-ajout-photo")
    const boutonFile = document.querySelector(".bouton-file")
    const formatJpg = document.querySelector(".format-jpg")

    // l'attribut result contient une URL de données qui représente les données du fichier.
    reader.addEventListener("load", ()=>{
        imageARemplir.src = reader.result   
    }, false)

    if (imageDownloaded){
        reader.readAsDataURL(imageDownloaded)

        // mettre en forme la balise image à remplir
        imageARemplir.classList.remove("image-a-remplir-off")
        imageARemplir.classList.add("image-a-remplir-on")

        // cacher les éléments présents pour laisser la place à l'image
        rectangleSvgAjoutPhoto.classList.remove("rectangle-svg-ajout-photo")
        boutonFile.classList.remove("bouton-file")
        formatJpg.classList.remove("format-jpg")

        rectangleSvgAjoutPhoto.classList.add("rectangle-svg-ajout-photo-off")
        boutonFile.classList.add("bouton-file-off")
        formatJpg.classList.add("format-jpg-off")
    }
}


// let tableau = []

// for (let elem of elements){
//     let categ = elem.category.name
//     tableau.push(categ)
// }

// let tableauCategoriesUniques = [... new Set(tableau)]
// // le tableau contient à présent sans aucun doublon les catégories de l'API


// // Récupère le champ Select html afin de remplir dynamiquement les catégories pour avoir
// // exactement les même que celles contenues dans l'API 
// const selection = document.getElementById("categorie")

// for (let i=0; i<selection.length; i++){
//     selection[i].value = tableauCategoriesUniques[i]
//     selection[i].textContent = tableauCategoriesUniques[i]
// }



// Le code qui suit permet de récupérer le numéro de la catégorie sur l'API et de la proposer dans une liste déroulante

let tableauNumeroCategorie = []

 for (let item of elements){
    let categNumero = item.category.id
    tableauNumeroCategorie.push(categNumero)
 }

 let tableauNumeroCategorieUnique = [... new Set(tableauNumeroCategorie)]
 // le tableau contient à présent sans aucun doublon les id des catégories


 const selection = document.getElementById("categorie")

 for (let j=0; j<selection.length; j++){
    selection[j].value = tableauNumeroCategorieUnique[j]
    selection[j].textContent = tableauNumeroCategorieUnique[j] 
    parseInt(selection[j].textContent)
    console.log("le type du merdier est : " + typeof(selection[j].textContent))
 }









/******************************************Construction de la Modale POST *********************************************/


const boutonAjouterPhoto = document.querySelector(".bouton-ajouter-photo")
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



/************************************Partie POST FormData requête POST*******************************/

const formulaire = document.querySelector(".formulaire")
const boutonSoumettre = document.querySelector(".bouton-soumettre")
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

    console.log(reponse)
})


/********************************************************************************************** */


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
const rectangleSvgAjoutPhoto = document.querySelector(".rectangle-svg-ajout-photo")
const boutonFile = document.querySelector(".bouton-file")
const formatJpg = document.querySelector(".format-jpg")

imageARemplir.addEventListener("click", ()=>{

    rectangleSvgAjoutPhoto.classList.remove("rectangle-svg-ajout-photo-off")
    boutonFile.classList.remove("bouton-file-off")
    formatJpg.classList.remove("format-jpg-off")

    rectangleSvgAjoutPhoto.classList.add("rectangle-svg-ajout-photo")
    boutonFile.classList.add("bouton-file")
    formatJpg.classList.add("format-jpg")

    imageARemplir.classList.remove("image-a-remplir-on")
    imageARemplir.classList.add("image-a-remplir-off")
})




/****************************** Revenir en arrière sur la modale précédente en fermant la modale POST *******/

const svgFlecheBack = document.querySelector(".svg-fleche-back")
const cadreModalePostOn = document.querySelector(".cadre-modale-post")

svgFlecheBack.addEventListener("click", ()=>{

    cadreModalePostOn.classList.remove("cadre-modale-post-on")
    cadreModalePostOn.classList.add("cadre-modale-post-off")
})


const croix2 = document.querySelector(".croix2")

croix2.addEventListener("click", ()=>{

    cadreModalePostOn.classList.remove("cadre-modale-post-on")
    cadreModalePostOn.classList.add("cadre-modale-post-off")
})