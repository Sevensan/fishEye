import { filterData } from "./FilterMedia.js"
import { getData } from "./getData.js"
import {getPhotographerById} from "./getPhotographerById.js"
window.filterData = filterData
export const displayPhotograph = async (media, medias) => {
  await filterData()
  const carouselContainer = document.getElementById("carouselContainer")
  console.log(media)

  let listOfMedias = []
  listOfMedias.push(media)
  medias.map(item => {
    console.log(item)
  })
  console.log(listOfMedias)
  listOfMedias.map(item => {
    if(item.image){
      const img = document.createElement("img")
      img.classList.add("imgCarousel")
      getPhotographerById(item.photographerId).then(resultat => {
        let src = `src/img/${resultat.name}/${item.image}`
        console.log(src)
        img.src = src
      })
      console.log(img)
      carouselContainer.appendChild(img)
      console.log(carouselContainer)

      if (item.id === media.id){
        console.log(item)
      }
    }
  })
  // const carousel = document.getElementById("carousel")
  // if(carousel !== null){
  //   carouselContainer.removeChild(carousel)
  // }
  // let container = document.createElement("div")
  // container.setAttribute("id", "carousel")
  // let img = document.createElement("img")
  // getPhotographerById(media.photographerId).then(resultat => {
  //   img.src = `src/img/${resultat.name}/${media.image}`
  // })
  // container.appendChild(img)
  // carouselContainer.appendChild(container)
  // carouselContainer.style.display = "block"
}

document.getElementById("carouselHider").addEventListener("click", function(){
    document.getElementById("carouselContainer").style.display = "none"
})
