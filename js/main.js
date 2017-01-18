var app = angular.module('weather', []);
app.run(function($rootScope, storage) {
    $rootScope.currentYear = new Date().getFullYear();
    $rootScope.storage = storage;
	$rootScope.date = Date;
});