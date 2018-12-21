var dotenv = require('dotenv').config();
var geocoder = require('simple-geocoder');
var request = require('request');
var moment = require('moment');
require.config({
  paths: {
    moment: './node_modules/moment',
  },
});
define(['./node_modules/moment-timezones'], function(moment) {
  moment()
    .tz('America/Los_Angeles')
    .format();
});

/*
geocoder.geocode('Seattle, WA', (err, data) => {
  request(
    `${process.env.DARK_SKY_URL}${data.y},${data.x}`,
    (err, response, body) => {
      if (err) {
        console.log('Error', err);
      } else {
        var result = JSON.parse(body);
        console.log(result.daily.data[0].summary);
      }
    }
  );
});
*/
console.log(momentTimezone('America/Los_Angeles').format());
