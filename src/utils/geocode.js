const request = require('request');

const geocode = (address,callback) => {
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXZpaGFpYyIsImEiOiJja2tsa2ZuYTIxaXlkMnVwZ2gyYjM0Y3poIn0.zs4KkgbfRBDmQvSaJwoehA';
    request({url: url1, json: true},(error, response) => {
        if(error) {
           const error = 'unable to connect to mapbox services';
           callback(error,undefined);
        } else if(response.body.features[0] === undefined) {
            const error = 'unable to find location on mapbox';
            callback(error,undefined);
        }else{
            const data = {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            };
            callback(undefined,data);
        }
        
       
    });
};

module.exports = geocode