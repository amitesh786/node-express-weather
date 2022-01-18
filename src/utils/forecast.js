const request = require("request")

console.log('Weather code file reached...!!!')

const forecast = (latitude, longitude, callback) => {

	const url = 'http://api.weatherstack.com/current?access_key=143c888d8a643709d3777f764c4699fe&query=' + latitude + ',' + longitude + '&units=f'

	request( { url, json: true}, (error, { body } = {}) => {

		if (error) {
			console.log('Error unable to connect..!!!')
			callback('error unable to connect to location service...!!!', undefined);
		} else if (body.error) {
			console.log('Error unable to connect..!!!')
			callback('error unable to connect to location service... another try serach again !!!', undefined);
		} else {
			let messageText = body.current.weather_descriptions[0] + ' throughout the day.' + ' It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. The humidy is ' + body.current.humidity + '%.'
			callback(undefined, messageText);
		}
	})
}

module.exports = forecast
