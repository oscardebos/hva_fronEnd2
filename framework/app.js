// Benoem de applicatie (module).
var AMSTERDAMFRISBEE = angular.module('AMSTERDAMFRISBEE', ['LocalStorageModule', 'ngResource']);


// Router
(function () {

	'use strict';

	// Stel een router in en bepaal welke view en controller gebruikt moeten worden.
	AMSTERDAMFRISBEE.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
					
		// Home
		$routeProvider.when('/', { templateUrl: '/views/home.html', controller: 'homeController' });

		// Pool page
		$routeProvider.when('/pool/:id', { templateUrl: '/views/pool.html', controller: 'poolController' });
		
		// Team page
		$routeProvider.when('/team/:id', { templateUrl: '/views/team.html', controller: 'teamController' });

		// Game page
		$routeProvider.when('/game/:id', { templateUrl: '/views/game.html', controller: 'gameController' });
		
		// Default
		$routeProvider.otherwise({redirectTo: '/'});
		
		// # fix
		$locationProvider.html5Mode(true);

	}]);

})();
