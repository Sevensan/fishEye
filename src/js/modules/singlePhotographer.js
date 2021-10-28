import { getData } from "./getData.js"
// import { filterData } from "./Filter.js"

try{
    getData().then(result => {

      // GET URL ID
      const url = window.location.href
      const urlId = url.substring(url.lastIndexOf('=')+1)
      const createDivForPhotographer = (photographer) => {
        const myDiv = document.createElement("div")
        myDiv.append(
          createHeaderPhotographer(photographer),
          createBodyPhotographer(photographer),
          createFooterPhotographer(photographer)
          )
          return myDiv
      }

      const createHeaderPhotographer = (photographer) => {
          const myDiv = document.createElement("div")
          const img = document.createElement("img")
          img.src = `/src/img/${photographer.name}/${photographer.portrait}`
          img.classList.add('photographerMiniature')
          myDiv.appendChild(img)
          return myDiv
      }

      const createBodyPhotographer = (photographer) => {
          const myDiv = document.createElement("div")
          // CREATE TITLE
          const title = document.createElement("h6")
          title.innerHTML = photographer.name

          // CREATE CITY
          const city = document.createElement("p")
          city.innerHTML = photographer.city

          // CREATE TAGLINE
          const tagline = document.createElement('p')
          tagline.innerHTML = photographer.tagline

          //INSERT
          myDiv.append(title, city, tagline)

          return myDiv
      }

      const createFooterPhotographer = (photographer) => {
          const myDiv = document.createElement("div")
          myDiv.classList.add("flex")

          photographer.tags.forEach(tag => {
            const tagElem = document.createElement("p")
            tagElem.innerHTML = "#" + tag
            myDiv.appendChild(tagElem)
          })
          return myDiv
      }

      const createGalery = (medias) => {
          const myDiv = document.createElement("div")
          myDiv.classList.add("gridGalery")
          medias.forEach(media => {
            const imgDiv = document.createElement("div")
            const img = document.createElement("img")
            const underImg = document.createElement("div")
            const title = document.createElement("h6")
            const fav = document.createElement("p")
            underImg.classList.add("flex", "justify-content-between", "align-items-center")

            img.src = `src/img/${getPhotographerById(media.photographerId).name}/${media.image}`
            img.alt = media.alttext
            title.innerHTML = media.alttext
            fav.innerHTML = media.likes
            underImg.append(title, fav)
            imgDiv.append(img, underImg)
            myDiv.appendChild(imgDiv)
          })
          return myDiv
      }
      const getPhotographerById = (id) => {
          let getPhotographer = null
          result.photographers.map(photographer => {
            if(photographer.id === id){
              console.log("photographer : ",photographer)
              getPhotographer = photographer
            }
          })
          console.log("getphotographer : ",getPhotographer)
          return getPhotographer
      }
      result.photographers.forEach(photographer => {
        // GET PHOTOGRAPHER PROFILE
        const content = document.getElementById("singlePhotographerContent")
        if(photographer.id == urlId){
          content.appendChild(createDivForPhotographer(photographer))
        }
      })
      let medias = result.media.filter(item => item.photographerId == urlId)
      const galery = document.getElementById("galery")
      galery.appendChild(createGalery(medias))



      })
    } catch{
      console.error("couldn't get data")
    }