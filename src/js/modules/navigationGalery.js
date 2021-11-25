const toLeft = document.getElementById("toLeft")
const toRight = document.getElementById("toRight")
let count = 0
const carousel = document.getElementById("carouselImages")
toLeft.addEventListener("click", function(){
  console.log(carousel)
  if(carousel){
    console.log(document.getElementsByClassName("imgCarousel")[0].width)
    console.log('je vais à gauche')
    count -= (document.getElementsByClassName("imgCarousel")[0].width + 16)
    carousel.style.transform = 'translateX(-' + count + 'px)'
  }
  console.log(count)
  console.log(carousel.style.transform)
})
toRight.addEventListener("click", async function(){
  console.log(carousel)
  console.log(document.getElementsByClassName("imgCarousel")[0].width)
  if(carousel){
        console.log('je vais à droite')
        count += (document.getElementsByClassName("imgCarousel")[0].width + 16)
      carousel.style.transform = 'translateX(-' + count + 'px)'
  }
  console.log(count)
  console.log(carousel.style.transform)
})