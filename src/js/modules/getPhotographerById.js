import { filterData } from './FilterMedia.js'
// return wanted photographer object, take id (string) in parameter
export const getPhotographerById = async (id) => {
  let getPhotographer = null
  await filterData().then(result => {
    result.photographers.map(photographer => {
      if (photographer.id === id) {
        getPhotographer = photographer
      }
      return `photographer id : ${photographer.id}`
    })
  })
  return getPhotographer
}
