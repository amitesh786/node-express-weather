const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// heroku port access bydefault 3200
const port = process.env.PORT || 3200

// Define paths for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// hbs register partial
hbs.registerPartials(partialsPath)

// Setup static dir to store
app.use(express.static(publicDirPath))

// Setup routes for app express
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Amitesh'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Amitesh'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help me',
		name: 'Amitesh'
	})
})

app.get('/weather', (req, res) => {

	if(!req.query.address) {
		return res.send({
			error: 'You must provide a address...!!!'
		})
	}

	geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({error})
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
	
			if (error) {
				return res.send({error})
			}

			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			})

		});
	});

})

app.get('/products', (req, res) => {

	if(!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	res.send({
		product: '[]',
	})
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Amitesh',
		errorMsg: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Amitesh',
		errorMsg: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
