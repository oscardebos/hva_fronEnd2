/*
 *	In this file we handle the user
 */

(function () {

	'use strict'; 

	AMSTERDAMFRISBEE.provider('model_user', function() {

		console.log("* Init user");

		// Auth keys
		//var userAccessToken = false;
		var user = false;


		this.$get = function(localStorageService, model_globals, $q, $http, model_loader) {

			return {
				getCurrentUser: function() {
					
					var defer = $q.defer();
					var self = this;

					
					if(user != false){
						return user;
					}

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('user'),
						params: {
							access_token: '339f2de5ce'
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("user", response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},
				getFromLocal: function(index){

					var defer = $q.defer();

					if(localStorageService.isSupported() === false){
						return false;
					}else{
						var data = localStorageService.get(index);
						if(data == null){
							return false;
						}else{
							return data;
						}
						
					}

					return defer.promise;

				},
				saveInLocal: function(index, data){

					if(localStorageService.isSupported() === false){
						return false;
					}else{
						
						if(localStorageService.add(index, data)){
							return true;
						}else{
							return false;
						}
						
					}

				}
			}
		};

	});

})();