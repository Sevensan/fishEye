// create single photographer page
import { filterData } from './FilterMedia.js'
import { PhotographerPage } from '../factories/PhotographerPage.js'
import { Galery } from '../factories/Galery.js'
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
    const galeryDiv = document.getElementById('galery')

    result.photographers.forEach(data => {
      const photographer = new PhotographerPage(data, medias)
      console.log(photographer.photographer_name)
    // create photographer section (header, body, contact form and bottom modal)
    const createDivForPhotographer = () => {
      const myDiv = document.createElement('div')
      myDiv.setAttribute('id', 'firstContent')
      myDiv.append(
        photographer.createHeaderPhotographer(),
        photographer.createBodyPhotographer(),
        photographer.createContact(),
        )
      photographer.createBottomModal()
      return myDiv
    }

      // GET PHOTOGRAPHER PROFILE
      const content = document.getElementById('singlePhotographerContent')
      if (photographer.photographer_id == urlId) {
        content.appendChild(createDivForPhotographer())
      }
    })
    const galery = new Galery(medias, urlId)
    galeryDiv.appendChild(galery.createGalery())
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
