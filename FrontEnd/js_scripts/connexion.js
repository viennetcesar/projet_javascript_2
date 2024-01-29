
// import Work from "./works" /*quand on met les accolades c'est parcequ'il y a plusieurs types de classes pour spécifier*/

const reponse = await fetch("http://localhost:5678/api/works")
const elements = await reponse.json()


function saveToken(token){
    const tokenSaved = window.localStorage.setItem('token', token)
    return tokenSaved
}


/***************************************************************************************************************/


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


















