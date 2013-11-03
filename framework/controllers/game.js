// Game controller
AMSTERDAMFRISBEE.controller('gameController', ['$scope', '$routeParams', 'model_tournament', 'model_globals',  function($scope, $routeParams, model_tournament, model_globals){
	
	console.log("> Start game controller");
	
	$scope.gameId = $routeParams.id;
	$scope.isFinal = false;

	$scope.submitButtonText = "Submit new score";
	$scope.submitButtonClass = "btn btn-default";

	$scope.feedback = {
		success: false,
		error: false
	};



	//	Game information
	var temp = model_tournament.getFromLocal("TournamentGameInformation_"+$scope.gameId);
	if(temp != false){ $scope.gameInformation = temp; } console.log(temp);

	model_tournament.getTournamentGameInformation($scope.gameId).then(function(response){
		$scope.gameInformation = response; console.log($scope.gameInformation);
	},function(){
		console.log("- Laden niet gelukt");
	});

	// Game history
	var temp = model_tournament.getFromLocal("TournamentGameHistory_"+$scope.gameId);
	if(temp != false){ $scope.gameHistory = temp.objects; }

	model_tournament.getTournamentGameHistory($scope.gameId).then(function(response){
		$scope.gameHistory = response.objects;
	},function(){
		console.log("- Laden niet gelukt");
	});

	// Functions
	$scope.betterTime = function(time){
		return moment(time).format("MM-DD-YYYY / HH:mm");
	}

	$scope.changeScore = function(teamNumber, isPlus){
		if(isPlus){
			$scope.gameInformation['team_'+teamNumber+'_score']++;
		}else{
			$scope.gameInformation['team_'+teamNumber+'_score']--;
		}
	}


	$scope.submitScore = function(){

		if($scope.submitButtonClass != "btn btn-default disabled"){

			$scope.submitButtonText = "Submitting";
			$scope.submitButtonClass = "btn btn-default disabled";
			model_tournament.postGameScore($scope.gameId, $scope.gameInformation.team_1_score, $scope.gameInformation.team_2_score, $scope.isFinal).then(function(response){
				
				$scope.submitButtonText = "Submit new score";
				$scope.submitButtonClass = "btn btn-default";

				$scope.feedback.success = true;
			},function(){
				$scope.submitButtonText = "Submit new score";
				$scope.submitButtonClass = "btn btn-default";
				$scope.feedback.error = true;
			});

		}

	}

	$scope.clearFeedback = function(){
		$scope.feedback = {
			success: false,
			error: false
		};
	}


}]);