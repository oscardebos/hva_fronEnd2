// Controller voor het menu
(function () {

	'use strict';
	
	// Controller voor de homepage
	AMSTERDAMFRISBEE.controller('homeController', ['$scope', 'model_tournament', 'model_globals',  function($scope, model_tournament, model_globals){

		console.log("> Start home controller");

		// Breadcrumbs
		//model_globals.setBreadCrumbs(false);
		
		// TournamentInformation
		var temp = model_tournament.getFromLocal("TournamentInformation");
		if(temp != false){ $scope.tournamentInformation = temp;}

		console.log(temp);
	
		model_tournament.getTournamentInformation().then(
			function(response){
				$scope.tournamentInformation = response;
			},
			function(){
				console.log("- Laden niet gelukt");
			}
		);


		// TournamentPools
		var temp = model_tournament.getFromLocal("TournamentPools");
		if(temp){ $scope.tournamentPools = temp; }

		model_tournament.getTournamentPools().then(
			function(response){
				$scope.tournamentPools = response;
			},function(){
				console.log("- Laden niet gelukt");
			}
		);

	}]);

})();