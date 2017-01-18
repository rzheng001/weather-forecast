app.service("weather", ["$http", function($http) {
  var url = "https://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&q=";
  function parseJSON(json) {
    if (!json.query.results) return undefined;
    json = json.query.results.channel;
    var w = {};
    w.units = json.units;
    w.location = json.location;
    w.location.lat = json.item.lat;
    w.location.lng = json.item.long;
    w.wind = json.wind;
    w.atmosphere = json.atmosphere;
    w.astronomy = json.astronomy;
    w.condition = json.item.condition;
    w.condition.pubDate = json.item.pubDate;
    w.forecast = json.item.forecast;
    return w;
  }
  this.getWeather = function(location, callback) {
    var query = "select * from weather.forecast where woeid in (select woeid from geo.places where text='" + location + "' limit 1)";
    query = encodeURIComponent(query);
    $http({
      method: "GET",
      url: url + query
    }).then(function(response) {
      // query is successful!
      var error;
      // if is array, query and sub-query return
      if (response.data.query.diagnostics.url.length !== undefined) { 
        // check for server error for weather.forecast request
        error = response.data.query.diagnostics.url[1].error;
        if (!error) error = response.data.query.diagnostics.url[1]["http-status-message"];
      }
      if (error) callback(false, error);
      else callback(true, parseJSON(response.data));
    }, function(response) {
      // an error has occurred with the request
      callback(false, response.statusText);
    });
  };
  this.getCardinalDirection = function(deg) {
    if (deg >= 0 && deg < 45) return { initial: "NNE", name: "North-Northeast"};
    else if (deg == 45) return { initial: "NE", name: "Northeast"};
    else if(deg < 90) return { initial: "ENE", name: "East-Northeast"};
    else if(deg == 90) return { initial: "E", name: "East"};
    else if(deg < 120) return { initial: "ESE", name: "East-Southeast"};
    else if(deg == 120) return { initial: "SE", name: "Southeast"};
    else if(deg < 180) return { initial: "SSE", name: "South-Southeast"};
    else if(deg == 180) return { initial: "S", name: "South"};
    else if(deg < 225) return { initial: "SSW", name: "South-Southwest"};
    else if(deg == 225) return { initial: "SW", name: "Southwest"};
    else if(deg < 270) return { initial: "WSW", name: "West-Southwest"};
    else if(deg == 270) return { initial: "W", name: "West"};
    else if(deg < 315) return { initial: "WNW", name: "West-Northwest"};
    else if(deg == 315) return { initial: "NW", name: "Northwest"};
    else if(deg < 360) return { initial: "NNE", name: "North-Northeast"};
    else return { initial: "N", name: "North"};
  };
  // retrieve user's geolocation (zipcode) from googleapi
  this.getLocalZipCode = function(callback) {
    if (callback && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(e) {
        var latlng = e.coords.latitude + ',' + e.coords.longitude;
        $http({
          method: "GET",
          url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng
        }).then(function(response) {
          // success
          callback(response.data.results[0]["address_components"].find(function(x) { return x.types == "postal_code"; })["short_name"]); 
        }, function(response) {
          // error
          callback(undefined);
        });
      },
      function(error) {
        // connection error
        callback(undefined);
      });
    }
  };
  return this;
}]);

