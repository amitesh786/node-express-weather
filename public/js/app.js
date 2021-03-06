console.log('Client Side JS js loaded')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	const url = '/weather?address= ' + searchInput.value 
	
	fetch(url)
	.then((res) => {
		res.json().then( (data)=> {

			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})
