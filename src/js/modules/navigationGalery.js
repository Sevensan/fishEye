// carousel navigation

const toLeft = document.getElementById('toLeft')
const toRight = document.getElementById('toRight')
toLeft.setAttribute('tabindex','0')
toRight.setAttribute('tabindex','0')
let count = 0
const carousel = document.getElementById('carouselImages')

toLeft.addEventListener('click', function () {
  toLeftNav()
})
toLeft.addEventListener('keypress', function (e) {
  if(e.key === "Enter"){
    toLeftNav()
  }
})
toRight.addEventListener('click', function () {
  toRightNav()
})
toRight.addEventListener('keypress', function (e) {
  if(e.key === "Enter"){
    toRightNav()
  }
})
const toLeftNav = () => {
  if (carousel) {
    if (count <= 0) {
      console.log('carousel client width : ', carousel.clientWidth)
      console.log('window screen width : ', window.screen.width)
      count = carousel.clientWidth - window.screen.width
      console.log('count : ', count)
      carousel.style.transform = 'translateX(-' + count + 'px)'
    } else {
      console.log('carousel client width : ', carousel.clientWidth)
      console.log('window screen width : ', window.screen.width)
      count -= window.screen.width
      console.log('count : ', count)
      carousel.style.transform = 'translateX(-' + count + 'px)'
    }
  }
}
const toRightNav = () => {
  if (carousel) {
    if (count >= carousel.clientWidth - window.screen.width) {
      console.log('on est au bout du carousel')
      count = 0
      carousel.style.transform = 'translateX(-0px)'
    } else {
      console.log('droite')
      count += window.screen.width
      console.log('carousel client width : ', carousel.clientWidth)
      console.log('window screen width : ', window.screen.width)
      console.log('count : ', count)
      // (document.getElementsByClassName("imgCarousel")[0].width + 16)
      carousel.style.transform = 'translateX(-' + count + 'px)'
    }
  }
}
const closeGalery = () => {
  Object.entries(imgs).map((item) => {
    document.getElementById('carouselImages').removeChild(item[1])
    return 'close slide'
  })
  document.getElementById('carouselImages').style.transform = 'translateX(-0px)'
  count = 0
  carouselContainer.style.display = 'none'
  carouselContainer.setAttribute('aria-hidden','true')
}

const closeButton = document.getElementById('closeButton')
closeButton.setAttribute('tabindex','0')
const carouselContainer = document.getElementById('carouselContainer')
const imgs = document.getElementsByClassName('imgCarousel')
closeButton.addEventListener('click', function () {
  closeGalery()
})


document.addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 37: toLeftNav()
    break
    case 39: toRightNav()
    break
    case 27: closeGalery()
    break
  }
})
closeButton.addEventListener('keypress', function (e) {
  if(e.key === 'Enter'){
    closeGalery()
  }
})
