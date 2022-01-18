const request = require("request")

console.log('Geocode file reached...!!!')

const geoCode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdGVzaDc4NiIsImEiOiJja3llN2Y5MG8wYm1wMm9xcHV0YXAzazNhIn0.ae_BqfGt_CCnxAoANYsbvw&limit=1'

	request( { url, json: true}, (error, {body} = {}) => {

		if (error) {
			console.log('Error unable to connect..!!!')
			callback('error unable to connect to location service...!!!', undefined);
		} else if (body.features.length === 0) {
			console.log('Error unable to connect..!!!')
			callback('error unable to connect to location service... another try serach again !!!', undefined);
		} else {
			console.log('Successfull connect..!!!')
			callback(undefined, {
				'latitude' : body.features[0].center[1],
				'longitude' : body.features[0].center[0],
				'location' : body.features[0].place_name
			});
		}
	})
}

module.exports = geoCode
