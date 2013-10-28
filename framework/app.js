//	Benoem de applicatie (module).

	/* Een meer beschrijvende naam voor je applicatie zou beter zijn  (dus niet FRAMEWORK) */
	
	var FRAMEWORK = angular.module('FRAMEWORK', []);

//	De rest van de applicatie stop ik in een naamloze functie.
	(function () {

		'use strict';


		//	Stel een router in en bepaal welke view en controller gebruikt moeten worden.
			FRAMEWORK.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
							
				//	Home
					$routeProvider.when('/', { templateUrl: '/templates/home.html', controller: 'homeController' });
				
				//	Default
					$routeProvider.otherwise({redirectTo: '/'});
				
				//	# fix
					$locationProvider.html5Mode(true);

			}]);



		//	Controller voor de homepage
			FRAMEWORK.controller('homeController', ['$scope', '$routeParams', '$http',  function($scope, $routeParams, $http){

				console.log("Home controller");

				$scope.hello = "Hello you idiot.";

				//	JSON call om een accesstoken op te vragen.
					/*
					 * NIET NODIG, ACCESS TOKEN IS 3 JAAR GELDIG.
					$http({
						method: 'JSONP',
						url: 'https://www.leaguevine.com/oauth2/token/?client_id=989b40c8262c33f2c29f0c150a3c45&client_secret=f0aa631222f1387fe32b4d4aadc2fa&grant_type=client_credentials&scope=universal&callback=JSON_CALLBACK'
					}).
					success(function(data) {
						console.log(data);
					}).
					error(function(data) {
						console.log("niet gelukt");
					});
					*/


				//	Get call
					$http({
						method: 'JSONP',
						url: 'https://api.leaguevine.com/v1/tournaments/?sport=ultimate&access_token=339f2de5ce&callback=JSON_CALLBACK'
					}).
					success(function(response) {
						console.log(response);
						$scope.leagues = response.objects;
					}).
					error(function() {
						console.log("Get call niet gelukt");
					});

			}]);

	})();
