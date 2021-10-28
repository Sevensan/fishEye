import { getData } from "./getData.js"

export const filterData = (filter) => {
    let data = null
    console.log(filter)
    getData().then(result =>{
      console.log(result.media)
      data = result.media.sort((a,b)=>{
        if(filter === 'likes'){
          return (a.date > b.date)
        }
        return a.price.localeCompare(b.price)
      })
      console.log(data)
    })
    console.log(data)
    return data
}

// export const filterData = (string) => {
//   console.log(string)
// }