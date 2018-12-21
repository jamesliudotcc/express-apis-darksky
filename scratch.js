var dotenv = require('dotenv').config();
var geocoder = require('simple-geocoder');
var request = require('request');

geocoder.geocode('Seattle, WA', (err, data) => {
  console.log(data);

  // res.render('result', { locationX: data.x, locationY: data.y });

  console.log(`${process.env.DARK_SKY_URL}${data.y},${data.x}`);
  request(
    `${process.env.DARK_SKY_URL}${data.y},${data.x}`,
    (err, response, body) => {
      if (err) {
        console.log('Error', err);
      } else {
        var currentTemp = JSON.parse(body);
        console.log(currentTemp);
        // res.render('results', { currentTemp: currentTemp });
      }
      // res.send('Error, check your logs');    // res.send('Error, check your logs');
    }
  );
});

// var geocoder = require('simple-geocoder');

// var coord = [];

// geocoder.geocode('Seattle WA', function(err, data) {
//   console.log(data.x);
// });
