const request = require('request');

const geocode = (address, callback) => {
  const parsedAdress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${parsedAdress}.json?access_token=pk.eyJ1Ijoib25pa2l0aW4xMjMiLCJhIjoiY2syZ200dWhqMDBuazNjbzAyMTZ6a3MyMyJ9.oOarVu6MBahH8MskJRFfng&limit=1`;

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the service', undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else if (!body.features.length) {
      callback('Unable to find such location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
};

module.exports = geocode;