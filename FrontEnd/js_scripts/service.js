/******************************* fonction pour charger les images de l'API sur le site en dynamique *************************/


var reponse = await fetch("http://localhost:5678/api/works")
var elements = await reponse.json()
console.log(elements)

export async function recupDataWorks(elements){

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







/**************************************************** fonction pour sauver et stocker le token *******************************/

export function saveToken(token){
    const tokenSaved = window.localStorage.setItem('token', token)
    return tokenSaved
}










/***************************************************** fonction pour se connecter *********************************************/


export function seConnecter(){

    const email = document.getElementById("mailing")
    const motDePasse = document.getElementById("password")
    const connexion = document.querySelector(".se-connecter")


    connexion.addEventListener("click", async () => {

        if (email.value === "sophie.bluel@test.tld" && motDePasse.value === "S0phie"){


            /*Création de la charge utile pour le POST*/
            const charge = {
                "email": email.value,
                "password": motDePasse.value
            }
            const chargeUtile = JSON.stringify(charge)


            /*La charge utile est prête on envoie la requête POST à l'API*/
            const res = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            })

            /*Une fois la réponse de l'API on récupère le token qu'elle nous renvoie*/
            const reponse = await res.json() //convertit le corps de la réponse en json
            const extractToken = reponse.token


            /*On utlise la fonction crée dans le file fonctions.js pour sauvegarder le token dans le local Storage*/
            saveToken(extractToken)

            /*Affichage de la valeur du token*/
            const enLocal = window.localStorage.getItem("token")
            console.log("voici le stock en local :" + enLocal)

            /*Petit test pour vérifier si on a récupéré le token ou pas*/
            if (enLocal === "undefined") {
                console.log("bad for you")
            } else {
             
                document.location.href = "./index.html"
                const logger = document.querySelector(".lien-login") 
                logger.innerText = "Logout"

            }
        }else{
            console.log("email ou mot de passe incorrect")


            const popUp = document.querySelector(".pop-up-off")
            const paragraphePopUp = document.querySelector(".paragraphe-pop-up-off")
            popUp.classList.remove("pop-up-off")
            popUp.classList.add("pop-up-on")
            paragraphePopUp.classList.remove("paragraphe-pop-up-off")
            paragraphePopUp.classList.add("paragraphe-pop-up-on")

             
        }
            
            

        })


        /* Si la popup s'est déclenchée, à l'évènement "change" on fait en sorte qu'elle disparaisse */ 

        
        const popUpOut = document.querySelector(".pop-up-off")
        const paragraphePopUpOut = document.querySelector(".paragraphe-pop-up-off")

        popUpOut.addEventListener("click", ()=> {
            popUpOut.classList.remove("pop-up-on")
            popUpOut.classList.add("pop-up-off")
            paragraphePopUpOut.classList.remove("paragraphe-pop-up-on")
            paragraphePopUpOut.classList.add("paragraphe-pop-up-off")
        })


    }









/*************************************************** fonction création DOM dans la modale *****************************************/

export async function creationDOMmodaleEtDeleteWork(){

    const reponse = await fetch("http://localhost:5678/api/works")
    const elements = await reponse.json()

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
            let response = await fetch(`http://localhost:5678/api/works/${idImage}`,
                          {
                            method: "DELETE",
                            headers: {
                              accept: "*/*",
                              Authorization: `Bearer ${tokenPresent}`,
                            },
                          }
                        )
            let responseJson = await response.json() 
            console.log(responseJson)

        })

    }
}











/************************************* fonction pour vérifier si les champs du formulaires sont remplis ***********************/


export function verifierChamp(champ){
    if (champ.value ===""){
        throw new Error(`Le champ ${champ.id} est vide`)
    }
}










/************************************** fonction pour POSTER le travail sur l'API ******************************************/


export async function posterLeTravailSurApi(){
    const formData = new FormData(formulaire) 
    console.log(formData)
  
    const reponse = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers : { Authorization : `Bearer ${leToken}`} ,
        body: formData
    })

    console.log(reponse)
}





/**************************** fonction coucou à importer pour tester les imports *********************/

export function coucou(){
    console.log("coucoucoucoucoucoucoucoucoucoucoucou")
}