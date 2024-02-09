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
console.log(leToken)

formulaire.addEventListener("submit", async (event)=>{

    event.preventDefault()

    // l'objet FormData prend le formulaire et le formate pour qu'il soit exploitable
    const formData = new FormData(formulaire) 
  
    const reponse = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers : { "Authorization" : `Bearer ${leToken}`} ,
        body: formData
    })

    let reponseJson = await reponse.json()
    console.log(reponseJson)
})

