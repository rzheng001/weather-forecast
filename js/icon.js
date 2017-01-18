function Icon() {}
Icon.getConditionIcon = function(code) {
	if ((code >= 0 && code <= 47) || code == 3200) return "wi wi-yahoo-" + code;
    return undefined;
};
Icon.getSunrise = function() { return "wi wi-fw wi-sunrise"; };
Icon.getSunset = function() { return "wi wi-fw wi-sunset"; };
Icon.getVisibility = function() { return "glyphicon wi-fw glyphicon-eye-open"; };
Icon.getBarometer = function() { return "wi wi-fw wi-barometer"; };
Icon.getHumidity = function() { return "wi wi-fw wi-humidity"; };
Icon.getFeltTemp = function() { return "wi wi-fw wi-thermometer"; };
Icon.getWind = function() { return "wi wi-fw wi-strong-wind"; };
Icon.getCompass = function() { return "wi wi-fw wi-wind-direction"; };