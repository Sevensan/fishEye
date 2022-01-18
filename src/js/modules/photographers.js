// create photographers in homepage
import { filterByTag } from './filterByTag.js'
import { PhotographerProfile } from '../factories/PhotographerProfile.js'
const filter = null
const content = document.getElementById('content')

const getPhotographersProfile = (filter) => {
  filterByTag(filter).then(result => {
    const myDiv = document.createElement('div')
    myDiv.setAttribute('id', 'gridPhotographersProfiles')
    result.photographers.forEach(photographer => {
      if (content) {
        // create photographer div with photographer object in parameter
        const photographerProfile = new PhotographerProfile(photographer)
        // creation of photographer div, divided in several functions : header, body, footer
        const createDivForPhotographer = () => {
          const container = document.createElement('div')
          container.classList.add('container')
          const myDiv = document.createElement('div')
          myDiv.appendChild(photographerProfile.createPhotographerProfileHeader())
          myDiv.appendChild(photographerProfile.createPhotographerProfileBody())
          container.appendChild(myDiv)
          container.appendChild(photographerProfile.createPhotographerProfileFooter())
          return container
        }
        console.log(photographerProfile)
        myDiv.appendChild(createDivForPhotographer(photographerProfile))
        content.appendChild(myDiv)
      }
    })
  })
}

// call creation of photographers profiles
try {
  getPhotographersProfile(filter)
} catch {
  console.error("couldn't get data")
}
