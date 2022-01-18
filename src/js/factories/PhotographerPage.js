import { Photographer } from "./Photographer.js"

export class PhotographerPage extends Photographer{
  constructor(data, medias){
    super(data)
    this._medias = medias
  }
  get medias(){
    return this._medias
  }
  // header
  createHeaderPhotographer(){
    console.log(this.photographer_name)
    const myDiv = document.createElement('div')
    myDiv.classList.add('imgContainer')
    myDiv.setAttribute('role','img')
    const img = document.createElement('img')
    img.setAttribute('role','img')
    img.src = `/src/img/${this.photographer_name}/${this.photographer_picture}`
    img.alt = this.photographer_name
    img.classList.add('photographerMiniature')
    myDiv.appendChild(img)
    return myDiv
  }
  // contact
  createContact(){
    document.getElementById('photographerName').innerHTML = this.photographer_name
    // CREATE CONTACT BUTTON
    const button = document.createElement('button')
    button.setAttribute('role','button')
    button.setAttribute('aria-label','contact button')
    button.classList.add('btn-contact')
    button.innerText = 'Contactez-moi'
    button.addEventListener('click', function () {
        modal.style.display = 'block'
        modal.setAttribute('aria-hidden','false')
        document.getElementById('prenom').focus()
    })
    return button
  }
  // bottom modal
  createBottomModal(){
    // like count
    let likes = 0
    this.medias.map(item => {
        likes = likes + item.likes
    })
    // bottom modal items
    const bottomModalLikes = document.getElementById('modalBottom__likes')
    const bottomModalPrice = document.getElementById('modalBottom__price')
    bottomModalLikes.innerHTML = likes
    bottomModalPrice.innerHTML = `${this.photographer_price}€ / jour`
  }

  // body (photographer info)
  createBodyPhotographer(){
    const myDiv = document.createElement('div')
    myDiv.classList.add('textContainer')
    // CREATE TITLE
    const title = document.createElement('h2')
    title.setAttribute('role','text')
    title.innerHTML = this.photographer_name
    // CREATE CITY
    const city = document.createElement('p')
    city.setAttribute('role','text')
    city.innerHTML = this.photographer_city
    // CREATE TAGLINE
    const tagline = document.createElement('p')
    tagline.setAttribute('role','text')
    tagline.innerHTML = this.photographer_tagline

    // INSERT infos
    myDiv.append(title, city, tagline)
    return myDiv
  }
}