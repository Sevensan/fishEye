import { getData } from "./getData.js"
export const filterByTag = async (filter) => {
  console.log(filter)
  let data = {}
  await getData().then(result =>{
    if(filter !== null){
      data.photographers = result.photographers.filter(item => item.tags.includes(filter))
    } else{
      data = result
    }
  })
    console.log(data)
    return data
}