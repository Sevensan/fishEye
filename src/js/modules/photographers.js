import { getData } from "./getData.js"
try{
  getData().then(result => {
    console.log(result)
    let photographers = {}
    const container = document.createElement("div")
    container.classList.add("container")
    const main = document.getElementById("content")
    main.appendChild(container)
    result.photographers.map(photograph => {
      photographers[photograph.id] = photograph
      const listOfPhotographers = () => {
        const pContainer = document.createElement("div")
        pContainer.classList.add("photographer"+photograph.id, "photographer")
        container.appendChild(pContainer)
        const title = document.createElement("h6")
        title.innerHTML = photograph.name
        const city = document.createElement("p")
        city.innerHTML = photograph.city
        const country = document.createElement("p")
        country.innerHTML = photograph.country
        const price = document.createElement("p")
        price.innerHTML = photograph.price
        const img = document.createElement("img")
        img.src = photograph.portrait
        pContainer.append(title, city, country, price, img)
        photograph.tags.forEach(tag => {
          const tagElem = document.createElement("p")
          tagElem.innerHTML = "#" + tag
          pContainer.appendChild(tagElem)
        })
      }
      listOfPhotographers()
    })
    console.log(photographers)
  })
} catch{
    console.error(getData())
}