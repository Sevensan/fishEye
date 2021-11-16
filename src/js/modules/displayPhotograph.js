import { filterData } from "./Filter.js"
import {getPhotographerById} from "./getPhotographerById.js"
window.filterData = filterData
export const displayPhotograph = async (media) => {
  await filterData()
  const carouselContainer = document.getElementById("carouselContainer")
  const carousel = document.getElementById("carousel")
  if(carousel !== null){
    carouselContainer.removeChild(carousel)
  }
  getPhotographerById(media.photographerId).then(resultat => {
    document.querySelectorAll(".carousel img")[0].src  = `src/img/${resultat.name}/${media.image}`
  })
  let container = document.createElement("div")
  container.setAttribute("id", "carousel")
  let img = document.createElement("img")
  getPhotographerById(media.photographerId).then(resultat => {
    img.src = `src/img/${resultat.name}/${media.image}`
  })
  container.appendChild(img)
  carouselContainer.appendChild(container)
  carouselContainer.style.display = "block"
}

document.getElementById("carouselHider").addEventListener("click", function(){
    document.getElementById("carouselContainer").style.display = "none"
})
