// Alle publieke toernooi informatie
(function () {

	'use strict'; 

	AMSTERDAMFRISBEE.provider('model_tournament', function () {

		console.log("* Init tournament model/provider");


		this.$get = function(localStorageService, model_globals, $q, $http, model_loader) {

			return {
				
				getTournamentInformation: function(){

					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('tournaments')+model_globals.getAuthKey('tournamentId')+"/",
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentInformation", response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;

				},

				getTournamentPools: function(){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('pools'),
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId')
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentPools", response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},

				getTournamentPoolInfomation: function(poolId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('pools')+poolId+"/",
						params: {
							access_token: model_globals.getAuthKey('accessToken')
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentPoolInfomation_"+poolId, response); defer.resolve(response); }).
					error(function() { model_loader.minus();  defer.reject(); });

					return defer.promise;
				},

				getTournamentPoolGames: function(poolId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('games'),
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId'),
							pool_id: poolId
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentPoolGames_"+poolId, response); defer.resolve(response); }).
					error(function() { model_loader.minus();  defer.reject(); });

					return defer.promise;
				},

				getTournamentTeamInformation: function(teamId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('team')+teamId+"/",
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId')
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentTeamInformation_"+teamId, response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},

				getTournamentTeamGames: function(teamId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('games'),
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId'),
							team_ids: '['+teamId+']'
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentTeamGames_"+teamId, response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},


				getTournamentGameInformation: function(gameId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('games')+gameId+"/",
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId')
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentGameInformation_"+gameId, response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},


				getTournamentGameHistory: function(gameId){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'GET',
						url: model_globals.getUrl('gameScores'),
						params: {
							access_token: model_globals.getAuthKey('accessToken'),
							tournament_id: model_globals.getAuthKey('tournamentId'),
							game_id: gameId
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentGameHistory_"+gameId, response); defer.resolve(response); }).
					error(function() { model_loader.minus(); defer.reject(); });

					return defer.promise;
				},

				postGameScore: function(gameId, team1Score, team2Score, isFinal){
					var defer = $q.defer();
					var self = this;

					model_loader.plus();

					$http({
						method: 'POST',
						url: model_globals.getUrl('gameScores'),
						headers: {
							'Content-Type': 'application/json',
                            'Authorization': 'bearer 82996312dc'
						},
						data: {
							"game_id": gameId,
							"team_1_score": team1Score,
							"team_2_score": team2Score,
							"is_final": isFinal,
						}
					}).
					success(function(response) { model_loader.minus(); self.saveInLocal("TournamentGameInformation_"+gameId, response); defer.resolve(response); }).
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