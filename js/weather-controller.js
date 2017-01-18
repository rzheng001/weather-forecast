app.controller("weatherController", function($scope, weather) {
	$scope.search = $scope.storage.local.get("search");
	$scope.theme = $scope.storage.local.get("theme", "theme-light");
	$scope.isSearching = false;
	$scope.switchTheme = function() {
		$scope.theme = $scope.theme == "theme-light" ? "theme-dark" : "theme-light";
		$scope.storage.local.save("theme", $scope.theme);
	}
	$scope.getWeather = function() { 
		if ($scope.search) search($scope.search); 
		else $scope.getLocalWeather();
	};
	$scope.getLocalWeather = function() {
		weather.getLocalZipCode(function(zipcode) {
			if (zipcode) {
				$scope.search = zipcode;
				search(zipcode);
			}
		});
	};
	function search(keyword) {
		// determine if a search is in progress
		if ($scope.isSearching) return;
		$scope.isSearching = true;
		$scope.storage.local.save("search", keyword);
		// reset current data
		$scope.weather = undefined;
		$scope.searchStatus = undefined;
		weather.getWeather(keyword, function(status, response) {
			// search has completed
			$scope.isSearching = false;	
			if (status) {
				if (response) $scope.weather = response;
				else $scope.searchStatus = "No forecast available for the specified location!";
			}
			else $scope.searchStatus = response + ".\nYahoo weather api can get very unreliable!\nPlease try again!";
		});
	}
	$scope.icon = Icon;
	$scope.getSpeedUnit = function() { return $scope.weather.units.speed; };
	$scope.getPressureUnit = function() { return $scope.weather.units.pressure; };
	$scope.getDistanceUnit = function() { return $scope.weather.units.distance; };
	$scope.getTempUnit = function() { return $scope.weather.units.temperature; };
	$scope.getCardinalDirection = function() { return weather.getCardinalDirection($scope.weather.wind.direction).initial; }
	$scope.getPressureIconRotation = function() { 
		switch($scope.weather.atmosphere.rising) {
			case 0: return 90; // steady
			case 2: return 180; // falling
			default: return 0; // rising
		}
	}
});