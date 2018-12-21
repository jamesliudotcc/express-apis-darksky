var dotenv = require('dotenv').config();
var geocoder = require('simple-geocoder');
var moment = require('moment-timezone');
var request = require('request');

geocoder.geocode('Seattle, WA', (err, data) => {
  request(
    `${process.env.DARK_SKY_URL}${data.y},${data.x}`,
    (err, response, body) => {
      if (err) {
        console.log('Error', err);
      } else {
        var result = JSON.parse(body);
        var timezone = result.timezone;
        forecastArray = result.daily.data.map(day => {
          return {
            timeStamp: moment.tz(day.time * 1000, timezone).format('dddd'),
            condition: day.summary,
            tempHi: day.temperatureHigh,
            tempLo: day.temperatureLow,
          };
        });
        console.log(forecastArray[4]);
      }
    }
  );
});

// Moment timezone working
//console.log(moment.tz(1545379200 * 1000, 'America/Los_Angeles').format('dddd'));
