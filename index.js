// Require node modules that you need
var dotenv = require('dotenv').config();
var geocoder = require('simple-geocoder');
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var request = require('request');

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');
require('dotenv').config();

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));

// Declare routes
app.get('/', function(req, res) {
  res.render('home');
});

app.post('/', function(req, res) {
  console.log(req.body.input);
  geocoder.geocode(req.body.input, (err, data) => {
    console.log(data);

    // res.render('result', { locationX: data.x, locationY: data.y });

    request(
      `${process.env.DARK_SKY_URL}${data.y},${data.x}`,
      (err, response, body) => {
        if (err) {
          console.log('Error', err);
          res.send('Error, check your logs');
        } else {
          var result = JSON.parse(body);
          currentTemperature = result.currently.temperature;
          currentCondition = result.currently.summary.toLowerCase();
          forecastArray = [];
          console.log(currentTemperature);
          res.render('result', {
            now: { temp: currentTemperature, condition: currentCondition },
            forecast: forecastArray,
          });
        }
      }
    );
  });
});

// Listen on PORT 3000
app.listen(3000, function() {
  console.log(
    "I'm listening to the smooth sounds of port 3000 in the morning. ☕"
  );
});
