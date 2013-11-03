// Controller voor het menu
(function () {

	'use strict';
	
	AMSTERDAMFRISBEE.controller('menuController', ['$scope', '$rootScope', 'model_loader', 'model_globals', 'model_user',  function($scope, $rootScope, model_loader, model_globals, model_user){

		console.log("> Start menu controller");
		
		$scope.clientId = model_globals.getAuthKey('clientId');

		$scope.getLoaderClass = function(){
			if(model_loader.getLoadingStatus()){
				return "";
			}else{
				return "hidden";
			}
		}


		// is user logged in?
		var temp = model_user.getFromLocal("user");
		if(temp != false){ $scope.user = temp; }

		model_user.getCurrentUser().then(
			function(response){
				$scope.user = response;
			},
			function(){
				console.log("niet gelukt");
			}
		);

		if(model_user.getCurrentUser() == false){
			console.log("geen login");
		}


		$scope.getBreadCrumbs = function(){
			var breadcrumbs = model_globals.getBreadCrumbs();
			if(breadcrumbs){
				return breadcrumbs;
			}else{
				return false;
			}
		}

		

	}]);

})();