const reponse = await fetch("http://localhost:5678/api/works")
const elements = await reponse.json()
console.log(elements)

/*Création d'une classe utilisable partout*/
// export default class Work{
    function recupDataWorks(elements){

        for (let i=0; i<elements.length; i++){
    
            const figure = elements[i]
            const gallery = document.querySelector(".gallery")
            const baliseFigure = document.createElement("figure")
            const category = elements[i].category
            baliseFigure.dataset.id = elements[i].id
            const categoryId = elements[i].categoryId
            const baliseImage = document.createElement("img")
            baliseImage.src = elements[i].imageUrl
            const textePhoto = document.createElement("p")
            textePhoto.innerText = elements[i].title
            const userId = elements[i].userId
    
            gallery.appendChild(baliseFigure)
            baliseFigure.appendChild(baliseImage)
            baliseFigure.appendChild(textePhoto)
        }
    }




/***************************************************************************************************************/


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

console.log("Avant de logout le token vaut : " + tokenLocal)

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




/*reprendre cette partie*/


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

  



