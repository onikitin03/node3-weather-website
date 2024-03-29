const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f13837071b6a9567f3cbf718994979fd/${latitude},${longitude}?units=si`;

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain. The pressure is ${body.daily.data[0].pressure}`);
    }
  });
};

module.exports = forecast;