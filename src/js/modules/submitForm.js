// log data on submit

const submitBtn = document.getElementById('submitContactForm')
submitBtn.addEventListener('click',function(event){
  event.preventDefault()
  const prenom = document.getElementById('prenom').value
  const nom = document.getElementById('nom').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value
  console.log('prenom : ', prenom)
  console.log('nom : ', nom)
  console.log('email : ', email)
  console.log('message : ', message)
})


