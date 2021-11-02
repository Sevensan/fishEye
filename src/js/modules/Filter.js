import { getData } from "./getData.js"

export const filterData = async (filter) => {
    let data = {}
    console.log(filter)
    await getData().then(result =>{
      console.log(result)
      switch (filter) {
        case 'likes' :
          data.media = result.media.sort(function(a,b){
            return b.likes - a.likes
          })
          data.photographers = result.photographers
        break
        case 'date' :
          data.media = result.media.sort(function(a,b){
            return parseInt((a.date.match(/\d+/g)[0] + a.date.match(/\d+/g)[1] + a.date.match(/\d+/g)[2]),10) - parseInt((b.date.match(/\d+/g)[0] + b.date.match(/\d+/g)[1] + b.date.match(/\d+/g)[2]),10)
        })
        data.photographers = result.photographers
        break
        case 'alttext' :
          data.media = result.media.sort(function(a,b){
            return a.alttext.localeCompare(b.alttext)
          })
          data.photographers = result.photographers
        break
        default: data = result
      }
    })
    console.log(data)
    return data
}