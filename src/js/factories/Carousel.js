import { getPhotographerById } from "../modules/getPhotographerById.js"
export class Carousel{
  constructor(media, medias){
    this._media = media
    this._medias = medias
  }
  get media(){
    return this._media
  }
  get medias(){
    return this._medias
  }
  async displayPhotograph(){
    await filterData()
    const carouselContainer = document.getElementById('carouselContainer')
    console.log(this.media)

    const listOfMedias = []
    listOfMedias.push(this.media)
    this.medias.map(item => {
      if (item.id !== this.media.id) {
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

        if (item.id === this.media.id) {
          console.log(item)
        }
      }
      return `carousel images : ${carouselImages}`
    })
    carouselContainer.style.display = 'flex'
    carouselContainer.setAttribute('aria-hidden','false')
  }
}