// create single photographer page
import { filterData } from './FilterMedia.js'
import { displayPhotograph } from './displayPhotograph.js'
import { getPhotographerById } from './getPhotographerById.js'
window.filterData = filterData
// set filter from select html value
const filter = null
const modal = document.getElementById('modal')
// photographer page content with galery
const singlePhotographer = (filter) => {
  // get data filtered, if there is no filter, return no filtered data
  filterData(filter).then(result => {
    // GET URL ID
    const url = window.location.href
    const urlId = url.substring(url.lastIndexOf('=') + 1)

   // create galery
    const medias = result.media.filter(item => item.photographerId == urlId)
    const galery = document.getElementById('galery')

    // bottom modal items
    const bottomModalLikes = document.getElementById('modalBottom__likes')
    const bottomModalPrice = document.getElementById('modalBottom__price')

    // create photographer section (header, body, contact form and bottom modal)
    const createDivForPhotographer = (photographer) => {
      const myDiv = document.createElement('div')
      myDiv.setAttribute('id', 'firstContent')
      myDiv.append(
        createHeaderPhotographer(photographer),
        createBodyPhotographer(photographer),
        createContact(photographer)
      )
      createBottomModal(photographer)
      return myDiv
    }
    // header
    const createHeaderPhotographer = (photographer) => {
      const myDiv = document.createElement('div')
      myDiv.classList.add('imgContainer')
      myDiv.setAttribute('role','img')
      const img = document.createElement('img')
      img.setAttribute('role','img')
      img.src = `/src/img/${photographer.name}/${photographer.portrait}`
      img.alt = photographer.name
      img.classList.add('photographerMiniature')
      myDiv.appendChild(img)
      return myDiv
    }
    // contact
    const createContact = (photographer) => {
      document.getElementById('photographerName').innerHTML = photographer.name
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
    const createBottomModal = (photographer) => {
      // like count
      let likes = 0
      medias.map(item => {
        likes = likes + item.likes
      })
      bottomModalLikes.innerHTML = likes
      bottomModalPrice.innerHTML = `${photographer.price}€ / jour`
    }
    // body (photographer info)
    const createBodyPhotographer = (photographer) => {
      const myDiv = document.createElement('div')
      myDiv.classList.add('textContainer')
      // CREATE TITLE
      const title = document.createElement('h2')
      title.setAttribute('role','text')
      title.innerHTML = photographer.name
      // CREATE CITY
      const city = document.createElement('p')
      city.setAttribute('role','text')
      city.innerHTML = photographer.city
      // CREATE TAGLINE
      const tagline = document.createElement('p')
      tagline.setAttribute('role','text')
      tagline.innerHTML = photographer.tagline

      // INSERT infos
      myDiv.append(title, city, tagline)
      return myDiv
    }
    // galery
    const createGalery = (medias) => {
      console.log(medias)
      const myDiv = document.createElement('div')
      myDiv.setAttribute('id', 'gridGalery')
      // iterate on every media to create photo or video block
      medias.forEach(media => {
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
          getPhotographerById(media.photographerId).then(resultat => {
            video.src = `src/img/${resultat.name}/${media.video}`
            video.title = media.alttext
          })
          video.setAttribute('controls', true)
          imgDiv.appendChild(video)
        } else {
          // if photo
          getPhotographerById(media.photographerId).then(resultat => {
            img.src = `src/img/${resultat.name}/${media.image}`
          })
          img.alt = media.alttext
          imgDiv.appendChild(img)
        }
        //img title
        title.innerHTML = media.alttext
        // likes
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
          displayPhotograph(media, medias)
        })
        // listen keyboard to display carousel
        imgDiv.addEventListener('keypress', function (e) {
          if(e.key === 'Enter'){
            displayPhotograph(media, medias)
          }
        })
        myDiv.appendChild(imgDiv)
      })
      return myDiv
    } // end galery
    result.photographers.forEach(photographer => {
      // GET PHOTOGRAPHER PROFILE
      const content = document.getElementById('singlePhotographerContent')
      if (photographer.id == urlId) {
        content.appendChild(createDivForPhotographer(photographer))
      }
    })
    galery.appendChild(createGalery(medias))
  })
}

// div for photographer content
const singlePhotographerContent = document.getElementById('singlePhotographerContent')
const galery = document.getElementById('galery')

// filter galery
const filterSort = document.getElementById('filter')
filterSort.addEventListener('change', function () {
  const firstContent = document.getElementById('firstContent')
  const gridGalery = document.getElementById('gridGalery')
  // switch case likes / date / alphabet
  switch (filterSort.value) {
    case 'likes' :
      singlePhotographerContent.removeChild(firstContent)
      galery.removeChild(gridGalery)
      singlePhotographer('likes')
      break
    case 'date' :
      singlePhotographerContent.removeChild(firstContent)
      galery.removeChild(gridGalery)
      singlePhotographer('date')
      break
    case 'alttext' :
      singlePhotographerContent.removeChild(firstContent)
      galery.removeChild(gridGalery)
      singlePhotographer('alttext')
  }
})
// close modal contact
const closeContactModal = () => {
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden','true')
}
const closeModal = document.getElementById('closeModal')
closeModal.addEventListener('click', function () {
  closeContactModal()
})
// on keyboard
document.addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 27: closeContactModal()
    break
  }
})
// display content
try {
  singlePhotographer(filter)
} catch (error) {
  console.error("couldn't get data", error)
}
