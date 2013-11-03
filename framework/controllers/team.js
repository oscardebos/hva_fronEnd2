// Controller voor de team page
AMSTERDAMFRISBEE.controller('teamController', ['$scope', '$routeParams', 'model_tournament', 'model_globals',  function($scope, $routeParams, model_tournament, model_globals){

	console.log("> Start team controller");
	
	$scope.teamId = $routeParams.id;

	console.log($routeParams);


	//	Team information
	var temp = model_tournament.getFromLocal("TournamentTeamInformation_"+$scope.teamId);
	if(temp != false){ $scope.teamInfo = temp;} console.log(temp);

	model_tournament.getTournamentTeamInformation($scope.teamId).then(function(response){
		$scope.teamInfo = response;
	},function(){
		console.log("- Laden niet gelukt");
	});

	// Team games
	var temp = model_tournament.getFromLocal("TournamentTeamGames_"+$scope.teamId);
	if(temp != false){ $scope.games = temp.objects; }

	model_tournament.getTournamentTeamGames($scope.teamId).then(function(response){
	$scope.games = response.objects;
	},function(){
		console.log("- Laden niet gelukt");
	});

	// Functions
	$scope.betterTime = function(time){
		return moment(time).format("MM-DD-YYYY / HH:mm");
	}

}]);