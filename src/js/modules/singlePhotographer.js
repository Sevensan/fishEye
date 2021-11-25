import { filterData } from "./FilterMedia.js"
import {displayPhotograph} from "./displayPhotograph.js"
import {getPhotographerById} from "./getPhotographerById.js"
window.filterData = filterData
// set filter select value
let filter = null
//start photographer page content
const singlePhotographer = (filter) => {
  filterData(filter).then(result => {
    // GET URL ID
    const url = window.location.href
    const urlId = url.substring(url.lastIndexOf('=')+1)

    // create photographer section
    const createDivForPhotographer = (photographer) => {
      const myDiv = document.createElement("div")
      myDiv.setAttribute("id", "firstContent")
      myDiv.append(
        createHeaderPhotographer(photographer),
        createBodyPhotographer(photographer),
        createContact(photographer),
      )
      createBottomModal(photographer)
        return myDiv
      }
      const createHeaderPhotographer = (photographer) => {
        const myDiv = document.createElement("div")
        myDiv.classList.add("imgContainer")
        const img = document.createElement("img")
        img.src = `/src/img/${photographer.name}/${photographer.portrait}`
        img.classList.add('photographerMiniature')
        myDiv.appendChild(img)
        return myDiv
      }
      const createContact = (photographer) => {
        document.getElementById("photographerName").innerHTML = photographer.name
        // CREATE CONTACT BUTTON
        const button = document.createElement("a")
        button.classList.add("btn-contact")
        button.innerText = "Contactez-moi"
        button.addEventListener("click",function(){
          document.getElementById("modal").style.display = "block"
        })
        return button
      }
      const createBottomModal = (photographer) => {
        const bottomModalLikes = document.getElementById("modalBottom__likes")
        const bottomModalPrice = document.getElementById("modalBottom__price")
        bottomModalLikes.innerHTML = photographer.id
        bottomModalPrice.innerHTML = `${photographer.price}€ / jour`
      }
      const createBodyPhotographer = (photographer) => {
        const myDiv = document.createElement("div")
        myDiv.classList.add("textContainer")
        // CREATE TITLE
        const title = document.createElement("h6")
        title.innerHTML = photographer.name
        // CREATE CITY
        const city = document.createElement("p")
        city.innerHTML = photographer.city
        // CREATE TAGLINE
        const tagline = document.createElement('p')
        tagline.innerHTML = photographer.tagline

        //INSERT
        myDiv.append(title, city, tagline)
        return myDiv
      }
      const createGalery = (medias) => {
        console.log(medias)
        const myDiv = document.createElement("div")
        myDiv.setAttribute("id", "gridGalery")
        medias.forEach(media => {
          const imgDiv = document.createElement("div")
          imgDiv.classList.add("imgContainer")
          const img = document.createElement("img")
          const video = document.createElement("video")
          const underImg = document.createElement("div")
          const title = document.createElement("h6")
          const fav = document.createElement("p")
          underImg.classList.add("flex", "justify-content-between", "align-items-center")
          if(media.video){
            getPhotographerById(media.photographerId).then(resultat => {
              video.src = `src/img/${resultat.name}/${media.video}`
            })
            video.setAttribute("controls", true)
            imgDiv.appendChild(video)
          } else {
            getPhotographerById(media.photographerId).then(resultat => {
              img.src = `src/img/${resultat.name}/${media.image}`
            })
            img.alt = media.alttext
            imgDiv.appendChild(img)
          }
          title.innerHTML = media.alttext
          fav.innerHTML = media.likes
          underImg.append(title, fav)
          imgDiv.appendChild(underImg)
          imgDiv.addEventListener("click", function(){
            displayPhotograph(media, medias)
          })
          myDiv.appendChild(imgDiv)
        })
        return myDiv
      }
      result.photographers.forEach(photographer => {
        // GET PHOTOGRAPHER PROFILE
        const content = document.getElementById("singlePhotographerContent")
        if(photographer.id == urlId){
          content.appendChild(createDivForPhotographer(photographer))
        }
      })
    let medias = result.media.filter(item => item.photographerId == urlId)
    const galery = document.getElementById("galery")
    galery.appendChild(createGalery(medias))
  })
}
let singlePhotographerContent = document.getElementById("singlePhotographerContent")
let galery = document.getElementById("galery")
const filterSort = document.getElementById("filter")
filterSort.addEventListener("change", function(){
  let firstContent = document.getElementById("firstContent")
  let gridGalery = document.getElementById("gridGalery")
  switch(filterSort.value){
    case 'likes' :
    singlePhotographerContent.removeChild(firstContent)
    galery.removeChild(gridGalery)
    singlePhotographer('likes')
    break
    case 'date' :
    singlePhotographerContent.removeChild(firstContent)
    galery.removeChild(gridGalery)
    singlePhotographer('date')
    break
    case 'alttext' :
    singlePhotographerContent.removeChild(firstContent)
    galery.removeChild(gridGalery)
    singlePhotographer('alttext')
  }
})
  const modal = document.getElementById("modal")
  const closeModal = document.getElementById("closeModal")
  closeModal.addEventListener("click", function(){
    modal.style.display = "none"
  })

try{
  singlePhotographer(filter)
} catch(error){
  console.error("couldn't get data", error)
}
