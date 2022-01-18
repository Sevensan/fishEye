import { filterData } from "../modules/FilterMedia.js"
import { Carousel } from "./Carousel.js"

export class Galery{
  constructor(medias, id){
    this._medias = medias
    this._id = id
  }
  get medias(){
    return this._medias
  }
  get photographer_id(){
    return this._id
  }
  // return wanted photographer object, take id (string) in parameter
  async getPhotographerById(){
    let getPhotographer = null
    await filterData().then(result => {
      result.photographers.map(photographer => {
        if (photographer.id == this.photographer_id) {
          getPhotographer = photographer
        }
        return `photographer id : ${photographer.id}`
      })
    })
    return getPhotographer
  }
  // galery
  createGalery(){
    const myDiv = document.createElement('div')
    myDiv.setAttribute('id', 'gridGalery')
    // iterate on every media to create photo or video block
    this.medias.forEach(media => {
      const carousel = new Carousel(media, this.medias)
      console.log(carousel)
      const imgDiv = document.createElement('a')
      imgDiv.classList.add('imgContainer')
      imgDiv.setAttribute('role','img')
      imgDiv.setAttribute('tabindex','0')
      const img = document.createElement('img')
      img.setAttribute('role','img')
      img.setAttribute('aria-label','display photograph')
      const video = document.createElement('video')
      video.setAttribute('role','listitem')
      const underImg = document.createElement('div')
      const title = document.createElement('h3')
      title.setAttribute('role','text')
      const fav = document.createElement('p')
      fav.setAttribute('role','text')
      fav.setAttribute('tabindex',0)
      fav.classList.add('photographLike')
      underImg.classList.add('flex', 'justify-content-between', 'align-items-center')
      //if video
      if (media.video) {
        this.getPhotographerById(media.photographerId).then(resultat => {
          video.src = `src/img/${resultat.name}/${media.video}`
          video.title = media.alttext
        })
        video.setAttribute('controls', true)
        imgDiv.appendChild(video)
        } else {
        // if photo
          this.getPhotographerById(media.photographerId).then(resultat => {
            img.src = `src/img/${resultat.name}/${media.image}`
          })
          img.alt = media.alttext
          imgDiv.appendChild(img)
        }
        //img title
        title.innerHTML = media.alttext
        // likes
        const bottomModalLikes = document.getElementById('modalBottom__likes')
        fav.innerHTML = media.likes
        fav.addEventListener('click',function(){
        fav.innerHTML++
        bottomModalLikes.innerHTML++
        })
        fav.addEventListener('keypress', function (e) {
        e.preventDefault()
        if(e.key === 'Enter'){
            fav.innerHTML++
            bottomModalLikes.innerHTML++
        }
        })
        // insert text under img
        underImg.append(title, fav)
        imgDiv.appendChild(underImg)
        img.addEventListener('click', function () {
        carousel.displayPhotograph(media, this.medias)
        })
        // listen keyboard to display carousel
        imgDiv.addEventListener('keypress', function (e) {
        if(e.key === 'Enter'){
          displayPhotograph(media, this.medias)
        }
        })
        myDiv.appendChild(imgDiv)
    })
    return myDiv
  } // end galery
}