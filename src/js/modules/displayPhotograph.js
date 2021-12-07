import { filterData } from "./FilterMedia.js"
import {getPhotographerById} from "./getPhotographerById.js"
window.filterData = filterData

export const displayPhotograph = async (media, medias) => {
  await filterData()
  const carouselContainer = document.getElementById("carouselContainer")
  console.log(media)

  let listOfMedias = []
  listOfMedias.push(media)
  medias.map(item => {
    if(item.id !== media.id){
      listOfMedias.push(item)
    }
  })
  console.log(listOfMedias)
  const carouselImages = document.getElementById("carouselImages")
  listOfMedias.map(item => {
    if(item.image){
      const img = document.createElement("img")
      img.style.zIndex = 1
      img.classList.add("imgCarousel")
      getPhotographerById(item.photographerId).then(resultat => {
        let src = `src/img/${resultat.name}/${item.image}`
        img.src = src
        img.alt = resultat.name
      })
      carouselImages.appendChild(img)
      carouselContainer.appendChild(carouselImages)

      if (item.id === media.id){
        console.log(item)
      }
    }
  })
  carouselContainer.style.display = "flex"
}

