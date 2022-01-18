console.log('App js loaded')

// fetch('https://puzzle.mead.io/puzzle')
// 	.then((res) => {
// 		res.json().then( (data)=> {
// 			console.log(data);
// 		})
// 	})

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	const url = 'http://localhost:3200/weather?address= ' + searchInput.value 
	
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
