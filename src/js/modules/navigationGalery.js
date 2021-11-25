const toLeft = document.getElementById("toLeft")
const toRight = document.getElementById("toRight")
let count = 0
const carousel = document.getElementById("carouselImages")

console.log("taille écran",window.screen.width)
toLeft.addEventListener("click", function(){
  if(carousel){
    console.log("taille carousel",(carousel.clientWidth - window.screen.width))
    console.log("count",count)
    if(count <= 0){
      console.log("hey mais T tro à goche",carousel.clientWidth - window.screen.width)
      count = carousel.clientWidth - window.screen.width
      carousel.style.transform = 'translateX(-' + count + 'px)'
    } else {
      count -= window.screen.width
      // (document.getElementsByClassName("imgCarousel")[0].width + 16)
      carousel.style.transform = 'translateX(-' + count + 'px)'
    }
  }
})
toRight.addEventListener("click", async function(){
  if(carousel){
    console.log("taille carousel",(carousel.clientWidth - window.screen.width))
    console.log("count",count)
    if(count >= (carousel.clientWidth - window.screen.width)){
      count = 0
      carousel.style.transform = 'translateX(-0px)'
    } else {
      count += window.screen.width
          // (document.getElementsByClassName("imgCarousel")[0].width + 16)
      carousel.style.transform = 'translateX(-' + count + 'px)'
    }
  }
})

const closeButton = document.getElementById("closeButton")
const carouselContainer = document.getElementById("carouselContainer")
const imgs = document.getElementsByClassName("imgCarousel")
closeButton.addEventListener("click", function(){
  Object.entries(imgs).map(item => {
    document.getElementById("carouselImages").removeChild(item[1])
  })
  document.getElementById("carouselImages").style.transform = 'translateX(-0px)'
  console.log(document.getElementById("carouselImages").style.transform = 'translateX(-0px)')
  count = 0
  carouselContainer.style.display = "none"
})