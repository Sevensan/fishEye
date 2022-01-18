import { Photographer } from "./Photographer.js"
export class PhotographerProfile extends Photographer{
  constructor(data){
    super(data)
    this._country = data.country
    this._tags = data.tags
  }

  get photographer_country(){
    return this._country
  }
  get photographer_tags(){
    return this._tags
  }
  createPhotographerProfileHeader(){
    const myDiv = document.createElement('div')
    const img = document.createElement('img')
    img.setAttribute('role','img')
    img.src = `/src/img/${this.photographer_name}/${this.photographer_picture}`
    img.classList.add('photographerMiniature')
    img.alt = this.photographer_name
    myDiv.appendChild(img)
    return myDiv
  }
  createPhotographerProfileBody(){
    const myDiv = document.createElement('div')
    // CREATE TITLE
    const title = document.createElement('a')
    title.setAttribute('role','link')
    title.setAttribute('aria-label','photographer page')
    title.href = `/photographer.html?id=${this.photographer_id}`
    title.innerHTML = this.photographer_name

    // CREATE CITY
    const city = document.createElement('p')
    city.setAttribute('role','text')
    city.setAttribute('aria-label','city')
    city.classList.add('city')
    city.innerHTML = `${this.photographer_city}, ${this.photographer_country}`

    // CREATE PRICE
    const price = document.createElement('p')
    price.setAttribute('role','text')
    price.setAttribute('aria-label','price')
    price.classList.add('price')
    price.innerHTML = `${this.photographer_price}€/jour`

    // CREATE TAGLINE
    const tagline = document.createElement('p')
    tagline.setAttribute('role','text')
    tagline.setAttribute('aria-label','tagline')
    tagline.innerHTML = this.photographer_tagline

    // INSERT
    myDiv.append(title, city, price, tagline)
    return myDiv
  }
  createPhotographerProfileFooter(){
    const myDiv = document.createElement('div')
    myDiv.classList.add('flex')

    this.photographer_tags.forEach(tag => {
      const tagElem = document.createElement('p')
      tagElem.setAttribute('role','navigation')
      tagElem.setAttribute('aria-label', 'filter photographers')
      tagElem.innerHTML = '#' + tag
      tagElem.classList.add('tag')
      myDiv.appendChild(tagElem)
      tagElem.addEventListener('click', function () {
        resetPhotographers()
        getPhotographersProfile(tag)
      })
    })
    return myDiv
  }
}