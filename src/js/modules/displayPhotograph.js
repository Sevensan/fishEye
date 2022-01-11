import { filterData } from './FilterMedia.js'
import { getPhotographerById } from './getPhotographerById.js'
window.filterData = filterData
// display photos carousel
// parameters : clicked media & list of photographer medias
export const displayPhotograph = async (media, medias) => {
  await filterData()
  const carouselContainer = document.getElementById('carouselContainer')
  console.log(media)

  const listOfMedias = []
  listOfMedias.push(media)
  medias.map(item => {
    if (item.id !== media.id) {
      listOfMedias.push(item)
    }
    return `list of medias : ${listOfMedias}`
  })
  console.log(listOfMedias)
  const carouselImages = document.getElementById('carouselImages')
  listOfMedias.map(item => {
    if (item.image) {
      const img = document.createElement('img')
      img.setAttribute('role','img')
      img.style.zIndex = 1
      img.classList.add('imgCarousel')
      getPhotographerById(item.photographerId).then(resultat => {
        const src = `src/img/${resultat.name}/${item.image}`
        img.src = src
        img.alt = resultat.name
      })
      carouselImages.appendChild(img)
      carouselContainer.appendChild(carouselImages)

      if (item.id === media.id) {
        console.log(item)
      }
    }
    return `carousel images : ${carouselImages}`
  })
  carouselContainer.style.display = 'flex'
  carouselContainer.setAttribute('aria-hidden','false')
}
