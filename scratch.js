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

        forecastArray = result.daily.data.map(day => {
          var timezone = result.timezone;
          return {
            timeStamp: moment.tz(day.time * 1000, timezone).format('dddd'),
            condition: day.summary,
            tempHi: day.temperatureHigh,
            tempLo: day.temperatureLow,
            emoji: day.summary.toLowerCase().includes('snow')
              ? '❄️'
              : day.summary.toLowerCase().includes('rain')
              ? '☔️️️️'
              : day.summary.toLowerCase().includes('sun')
              ? '☀️'
              : day.summary.toLowerCase().includes('cloud')
              ? '☁️'
              : '☔️',
          };
        });
        console.log(forecastArray);

        // forecastIcon = forecastArray.map(forecast => {
        //   if (forecast.condition.toLowerCase().includes('fog')) {
        //     return 'fog';
        //   }
        // });
        // console.log(forecastIcon);
      }
    }
  );
});

// Moment timezone working
//console.log(moment.tz(1545379200 * 1000, 'America/Los_Angeles').format('dddd'));
