//	Benoem de applicatie (module).

	/* Een meer beschrijvende naam voor je applicatie zou beter zijn  (dus niet FRAMEWORK) */
	
	var FRAMEWORK = angular.module('FRAMEWORK', []);

//	De rest van de applicatie stop ik in een naamloze functie.
	(function () {

		'use strict';

		//	Globals
			var globals = {
				accessToken: '339f2de5ce',
				tournamentId: '19389'
			}


		//	Stel een router in en bepaal welke view en controller gebruikt moeten worden.
			FRAMEWORK.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
							
				//	Home
					$routeProvider.when('/', { templateUrl: '/templates/home.html', controller: 'homeController' });

				//	Pool page
					$routeProvider.when('/pool/:id', { templateUrl: '/templates/pool.html', controller: 'poolController' });
				
				//	Team page
					$routeProvider.when('/team/:id', { templateUrl: '/templates/team.html', controller: 'teamController' });

				//	Game page
					$routeProvider.when('/game/:id', { templateUrl: '/templates/game.html', controller: 'gameController' });
				
				//	Default
					$routeProvider.otherwise({redirectTo: '/'});
				
				//	# fix
					$locationProvider.html5Mode(true);

			}]);









		//	Controller voor het menu
			FRAMEWORK.controller('menuController', ['$scope', '$rootScope',  function($scope, $rootScope){

				console.log("> Start menu controller");
				
				$scope.mainMenu = {
					'Home': {
						url: '/', 
						class: ''
					},
					'Teamnaam': {
						url: '/team/teamId', class: ''
					}
				}
				
				/* currentPage kan je makkelijker achterhalen door bijvoorbeeld de volgende functie te gebruiken
				
				$scope.isActive = function(route) {
					return route === $location.path();
				};
				
				en dan kan je vervolgens in je template bijvoorbeeld dit gebruiken
				
				<nav ng-class="menu">
					<a ng-class="{active:isActive('/home')}" href="#/home">Home</a>
					<a ng-class="{active:isActive('/pools')}" href="#/pools">Home</a>
				</nav>
				
				*/

				$rootScope.$watch('currentPage', function(newValue, oldValue) {
					
					if(typeof(oldValue) != "undefined" && oldValue !== null){
						// Old value class to ''
						if(typeof($scope.mainMenu[oldValue]) != "undefined" && oldValue !== null){
							$scope.mainMenu[oldValue].class = '';
						}
					}
					
					if(typeof(newValue) != "undefined" && newValue !== null){
						if(newValue != 'none'){
							// New value class to 'active'
							if(typeof($scope.mainMenu[newValue]) != "undefined" && newValue !== null){
								$scope.mainMenu[newValue].class = 'active';
							}
						}
					}

				});



				//	Login
				



			}]);


		//	Controller voor de homepage
			FRAMEWORK.controller('homeController', ['$scope', '$rootScope', '$routeParams', '$http',  function($scope, $rootScope, $routeParams, $http){

				console.log("> Start home controller");

				$rootScope.currentPage = 'Home';

				//	Tournament informatie
					$http({
						method: 'JSONP',
						url: 'https://api.leaguevine.com/v1/tournaments/19389/?access_token=339f2de5ce&callback=JSON_CALLBACK'
					}).
					success(function(response) {
						console.log(response);
						$scope.tournamentInfo = response;
					}).
					error(function() {
						console.log("Get tournament informatie niet gelukt");
					});


				//	Pools
					$http({
						method: 'JSONP',
						url: 'https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=339f2de5ce&callback=JSON_CALLBACK'
					}).
					success(function(response) {
						console.log(response);
						$scope.tournamentPools = response;
					}).
					error(function() {
						console.log("Get pools niet gelukt");
					});

			}]);


		//	Controller voor de team page
			FRAMEWORK.controller('teamController', ['$scope', '$rootScope', '$routeParams', '$http',  function($scope, $rootScope, $routeParams, $http){

				console.log("> Start team controller");
				console.log($routeParams.id);
				var teamId = $routeParams.id;
				$rootScope.currentPage = 'none';

				//	Team information
					$http({
						method: 'JSONP',
						url: 'https://api.leaguevine.com/v1/teams/'+teamId+'/?access_token=339f2de5ce&callback=JSON_CALLBACK'
					}).
					success(function(response) {
						console.log(response);
						$scope.teamInfo = response;
					}).
					error(function() {
						console.log("Get pools niet gelukt");
					});

				//	Team games
					$http({
						method: 'JSONP',
						url: 'https://api.leaguevine.com/v1/games/?tournament_id=19389&team_ids=%5B'+teamId+'%5D&access_token=339f2de5ce&callback=JSON_CALLBACK'
					}).
					success(function(response) {
						console.log(response);
						$scope.games = response.objects;
					}).
					error(function() {
						console.log("Get pools niet gelukt");
					});


				//	Functions
					$scope.betterTime = function(time){
						return moment(time).format("MM-DD-YYYY / HH:mm");
					}

			}]);

		
		//	Controller voor de team page
			FRAMEWORK.controller('poolController', ['$scope', '$rootScope', '$routeParams', '$http',  function($scope, $rootScope, $routeParams, $http){

				console.log("> Start pool controller");
				$scope.poolId = $routeParams.id;
				$rootScope.currentPage = 'none';

				//	Pool information
					$http({
						method: 'GET',
						url: 'https://api.leaguevine.com/v1/pools/'+$scope.poolId+'/',
						headers: {'Content-Type': 'application/json'},
						params: {
							access_token: globals.accessToken
						}
					}).
					success(function(response) {
						console.log(response);
						$scope.poolInformation = response;
					}).
					error(function() {
						console.log("Get pool information niet gelukt");
					});

				//	Pool games
					$http({
						method: 'GET',
						url: 'https://api.leaguevine.com/v1/games/',
						params: {
							access_token: globals.accessToken,
							tournament_id: globals.tournamentId,
							pool_id: $scope.poolId
						}
					}).
					success(function(response) {
						console.log(response);
						$scope.games = response.objects;
					}).
					error(function() {
						console.log("Get games niet gelukt");
					});


				//	Functions
					$scope.betterTime = function(time){
						return moment(time).format("MM-DD-YYYY / HH:mm");
					}

			}]);


		//	Game controller
			FRAMEWORK.controller('gameController', ['$scope', '$rootScope', '$routeParams', '$http',  function($scope, $rootScope, $routeParams, $http){
				console.log("> Start game controller");
				$scope.gameId = $routeParams.id;

				//	Game information
					$http({
						method: 'GET',
						url: 'https://api.leaguevine.com/v1/games/'+$scope.gameId+'/',
						headers: {'Content-Type': 'application/json'},
						params: {
							access_token: globals.accessToken
						}
					}).
					success(function(response) {
						console.log(response);
						$scope.gameInformation = response;
					}).
					error(function() {
						console.log("Get game information laden niet gelukt");
					});

				//	Game scores
					$http({
						method: 'GET',
						url: 'https://api.leaguevine.com/v1/game_scores/',
						headers: {'Content-Type': 'application/json'},
						params: {
							access_token: globals.accessToken,
							game_id: $scope.gameId
						}
					}).
					success(function(response) {
						console.log(response.objects);
						$scope.gameHistory = response.objects;
					}).
					error(function() {
						console.log("Get game scores laden niet gelukt");
					});


				//	Functions
					$scope.betterTime = function(time){
						return moment(time).format("MM-DD-YYYY / HH:mm");
					}

			}]);

	})();
