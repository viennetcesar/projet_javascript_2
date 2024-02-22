import {seConnecter} from "./service.js"


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

seConnecter()
















