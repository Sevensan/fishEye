import { getData } from "./getData.js"

export const filterData = (filter) => {
    let data = {}
    console.log(filter)
    getData().then(result =>{
      console.log(result.media)
      if(filter === 'likes'){
        console.log("LIKEEEES")
        data = result.media.sort(function(a,b){
          return b.likes - a.likes
        })
        console.log(data)
      }
      if(filter === 'date'){
        console.log("DAAAAAAAATE")
        data = result.media.sort(function(a,b){
          return parseInt((a.date.match(/\d+/g)[0] + a.date.match(/\d+/g)[1] + a.date.match(/\d+/g)[2]),10) - parseInt((b.date.match(/\d+/g)[0] + b.date.match(/\d+/g)[1] + b.date.match(/\d+/g)[2]),10)
        })
        console.log(data)
      }
      if(filter === 'alttext'){
        console.log("ALTTEEEEEXT")
        data = result.media.sort(function(a,b){
          return a.alttext.localeCompare(b.alttext)
        })
        console.log(data)
      }
    })
    return data
}

// export const filterData = (string) => {
//   console.log(string)
// }