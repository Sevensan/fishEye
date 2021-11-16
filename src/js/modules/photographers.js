// import { getData } from "./getData.js"
import { filterByTag} from "./filterByTag.js"
let filter = null
const content = document.getElementById("content")

const getPhotographersProfile = (filter) => {
  filterByTag(filter).then(result => {
    const myDiv = document.createElement("div")
    myDiv.setAttribute("id","gridPhotographersProfiles")
    result.photographers.forEach(photographer => {
      if(content){
        myDiv.appendChild(createDivForPhotographer(photographer))
        content.appendChild(myDiv)
      }
    })
  })
}
const createDivForPhotographer = (photographer) => {
  const container = document.createElement("div")
  container.classList.add("container")
  const myDiv = document.createElement("a")
  myDiv.href=`/photographer.html?id=${photographer.id}`
  myDiv.appendChild(createPhotographerHeader(photographer))
  myDiv.appendChild(createPhotographerBody(photographer))
  container.appendChild(myDiv)
  container.appendChild(createPhotographerFooter(photographer))
  return container
}
const createPhotographerHeader = (photographer) => {
  const myDiv = document.createElement("div")
  const img = document.createElement("img")
  img.src = `/src/img/${photographer.name}/${photographer.portrait}`
  img.classList.add('photographerMiniature')
  myDiv.appendChild(img)
  return myDiv
}
const createPhotographerBody = (photographer) => {
  const myDiv = document.createElement("div")
  // CREATE TITLE
  const title = document.createElement("h6")
  title.innerHTML = photographer.name

  // CREATE CITY
  const city = document.createElement("p")
  city.classList.add("city")
  city.innerHTML = `${photographer.city}, ${photographer.country}`

  // CREATE PRICE
  const price = document.createElement("p")
  price.classList.add("price")
  price.innerHTML = `${photographer.price}€/jour`

  // CREATE TAGLINE
  const tagline = document.createElement('p')
  tagline.innerHTML = photographer.tagline

  //INSERT
  myDiv.append(title, city, price, tagline)
  return myDiv

}
const createPhotographerFooter = (photographer) => {
  const myDiv = document.createElement("div")
  myDiv.classList.add("flex")

  photographer.tags.forEach(tag => {
    const tagElem = document.createElement("p")
    tagElem.innerHTML = "#" + tag
    tagElem.classList.add("tag")
    myDiv.appendChild(tagElem)
    tagElem.addEventListener("click",function(){
      resetPhotographers()
      getPhotographersProfile(tag)
    })
  })
  return myDiv
}
const resetPhotographers = () => {
  const photographersProfiles = document.getElementById("gridPhotographersProfiles")
  content.removeChild(photographersProfiles)

}

try{
  getPhotographersProfile(filter)
} catch{
  console.error("couldn't get data")
}