const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bd8be9f15974911fe6e1cc949d5f954c&query="+latitude+","+longitude+"&units=m"

    request({url, json: true}, (error,{body} = {}) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location!")
        } else {
            const weather_description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const precip = body.current.precip
            const wind = body.current.feelslike
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature+ " degrees out and Feels like "+ wind +  "%. There is a "+body.current.precip+ "% chance of rain")
        }
    })
}

module.exports = forecast