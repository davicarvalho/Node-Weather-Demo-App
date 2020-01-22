
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = search.value
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      message2.innerHTML = ''
      message1.innerHTML = 'Loading...'
      if(data.error){
        message1.innerHTML = data.error;
      }else{
        message1.innerHTML = data.address;
        message2.innerHTML = data.forecastData;
      }
    })
  })
})
