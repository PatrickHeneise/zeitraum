# ZeitRaum (Tempus Spatium)

ZeitRaum is a library to retrieve document ids filtered by time and geolocation.

# database spatial view
``` js
    function (doc) {
      if(doc.loc) {
        var date_time = doc.eventStartDateTime.split(' ');
        var date = date_time[0].split('-');
        var time = date_time[1].split(':');
        emit({type: "Point", coordinates: doc.loc}, date.concat(time));
      }
    }
```

# usage
npm install zeitraum


``` js
  var zeitraum = require('./zeitraum'),
    lat = 41.387,
    lon = 2.170054,
    server = '127.0.0.1:8092',
    r = 50,
    startDate = "2013-01-01 00:00:00",
    endDate = "2013-01-31 23:59:59",
    success = function (success) {
      console.log('success', success);
    },
    error = function (error) {
      console.log('error', error);
    };

    zeitraum.query(error, success, server, 'spatiotemporal', 'index', lat, lon, r, startDate, endDate);
  
```

# test
``` js
    make test
```

---------------------------------------
copyright (c) 2013 patrick heneise

MIT License (MIT)

**made with love in barcelona**
