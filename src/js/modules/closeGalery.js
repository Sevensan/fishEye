const carouselHider = document.getElementById("carouselHider")
console.log(carouselHider)
const imgs = document.getElementsByClassName("imgCarousel")
carouselHider.addEventListener("click", function(){
  console.log("close the galery")
  for(let item in imgs){
    console.log(typeof imgs[item])
    if(typeof imgs[item] === 'object'){
      document.getElementById("carouselImages").removeChild(imgs[item])
    }
  }
  carouselHider.style.display = "none"
})