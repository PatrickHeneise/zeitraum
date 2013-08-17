var zeitraum = require('./zeitraum'),
  lat = 41.387,
  lon = 2.170054,
  server = require('baseview')({
    url: 'http://xyz.compute.amazonaws.com:8092',
    bucket: 'Locations'
  }),
  r = 50,
  startDate = "2013-01-01 00:00:00",
  endDate = "2013-01-31 23:59:59",
  success = function (success) {
    console.log('success', success);
  },
  error = function (error) {
    console.log('error', error);
  };

zeitraum.query(error, success, server, 'Events', 'byLocationAndTime', lat, lon, r, startDate, endDate);