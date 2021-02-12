const request = require('request');

const forecast = (data,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=50f99f6cd7dc052ec79e3a5695fb7414&query='+ data.latitude + ','+ data.longitude;
    request({url: url, json: true},(error, response) => {

    if(error){
       const error = 'unable to connect to weather services';
       callback(error,undefined);
    } else if(response.body.error) {
       const error = 'unable to find location weatherstack';
       callback(error,undefined);
    } else {
        const info = {
           temperature: response.body.current.temperature,
           rain: response.body.current.precip,
           weather_descriptions: response.body.current.weather_descriptions[0],
           location:data.location
        }
        callback(undefined,info);
        
    }
    })
};

module.exports = forecast