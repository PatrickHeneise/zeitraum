/** spatio-temporal query library for Couchbase
  *
  * copyright 2013 patrick heneise
  *
  * @author Patrick Heneise, @PatrickHeneise
  */

var sparta = require('sparta'),
  async = require('async'),
  baseview;

exports.query = function (error, callback, server, ddoc, view, lat, lon, radius, from_date, to_date) {
  var bbox = sparta.boundingBox(lat, lon, radius).toString();

  // server could be an address or a baseview object
  if (Object.prototype.toString.call(server) === "[object Object]") {
    baseview = server;
  } else {
    // just check if the protocol is set, otherwise baseview runs into errors.
    if (server.substring(1, 4) !== 'http') {
      server = 'http://' + server;
    }
    baseview = require('baseview')(server);
  }

  // this is where the magic happens.
  baseview.spatial(ddoc, view, {bbox: bbox}, function (err, points) {
    if (!err) {
      var resultset = [],
        date_time = from_date.split(' '),
        date = date_time[0].split('-'),
        time = date_time[1].split(':');

      // transform YYYY-MM-DD HH:mm:ss to a date array
      from_date = new Date(
        parseInt(date[0], 10),
        parseInt(date[1], 10) - 1,
        parseInt(date[2], 10),
        parseInt(time[0], 10),
        parseInt(time[1], 10),
        parseInt(time[2], 10)
      );

      if (to_date) {
        date_time = to_date.split(' ');
        date = date_time[0].split('-');
        time = date_time[1].split(':');
        to_date = new Date(
          parseInt(date[0], 10),
          parseInt(date[1], 10) - 1,
          parseInt(date[2], 10),
          parseInt(time[0], 10),
          parseInt(time[1], 10),
          parseInt(time[2], 10)
        );
      }

      async.forEach(points.rows, function (point, done) {
        var d = new Date(
          parseInt(point.value[0], 10),
          parseInt(point.value[1], 10) - 1,
          parseInt(point.value[2], 10),
          parseInt(point.value[3], 10),
          parseInt(point.value[4], 10),
          parseInt(point.value[5], 10)
        );

        if (!to_date) {
          if (d >= from_date) {
            resultset.push(point.id);
          }
        } else {
          if (d >= from_date && d <= to_date) {
            resultset.push(point.id);
          }
        }
        done();
      }, function (err) {
        if (err) {
          // callback with an error just in case
          error(err);
        } else {
          // return the resultset after forEach is done
          callback(resultset);
        }
      });
    } else {
      error(err);
    }
  });
};