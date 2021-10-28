import { getData } from "./getData.js"

try{
  getData().then(result => {
    console.log(result)
    result.photographers.forEach(photographer => {
      console.log(photographer)
      const content = document.getElementById("content")
      if(content){
        content.appendChild(createDivForPhotographer(photographer))
      }
    })
  })
} catch{
  console.error("couldn't get data")
}

const createDivForPhotographer = (photographer) => {
  const myDiv = document.createElement("a")
  myDiv.href=`/photographer.html?id=${photographer.id}`
  myDiv.appendChild(createPhotographerHeader(photographer))
  myDiv.appendChild(createPhotographerBody(photographer))
  myDiv.appendChild(createPhotographerFooter(photographer))
  return myDiv
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
  city.innerHTML = photographer.city

  // CREATE TAGLINE
  const tagline = document.createElement('p')
  tagline.innerHTML = photographer.tagline

  //INSERT
  myDiv.append(title, city, tagline)

  return myDiv

}


const createPhotographerFooter = (photographer) => {
  const myDiv = document.createElement("div")
  myDiv.classList.add("flex")

  photographer.tags.forEach(tag => {
    const tagElem = document.createElement("p")
    tagElem.innerHTML = "#" + tag
    myDiv.appendChild(tagElem)
  })
  return myDiv
}