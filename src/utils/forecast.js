const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/7795001cf06e21b124ea565691177529/${lat},${long}?units=si`

  request({ url, json: true }, (error, { body }) => {
      if (error) {
          callback('Unable to connect to weather service!', undefined)
      } else if (body.error) {
          callback('Unable to find location', undefined)
      } else {
          callback(undefined, body.daily.data[0].summary +
            ' It is currently ' + body.currently.temperature +
            '°C out. The high today is '+ body.daily.data[0].temperatureHigh +
            '°C and the low is ' +body.daily.data[0].temperatureLow +
            '°C There is a ' + body.currently.precipProbability +
            '% chance of rain.')
      }
  })
}

module.exports = forecast
