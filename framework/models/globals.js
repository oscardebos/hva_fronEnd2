/*
 *	In this file we register all the global variables.
 */

(function () {

	'use strict'; 

	AMSTERDAMFRISBEE.provider('model_globals', function() {

		console.log("* Init globals");

		// Auth keys
		this.gl_authKeys = {
			accessToken: '339f2de5ce',
			clientId: '989b40c8262c33f2c29f0c150a3c45',
			tournamentId: '19389',
			userAccessToken: false
		};

		// All images of the framework
		this.gl_images = {
		}

		// All text of the framework
		this.gl_text = {
		};

		// All urls of the framework
		this.gl_urls = {
			tournaments: 'https://api.leaguevine.com/v1/tournaments/',
			pools: 'https://api.leaguevine.com/v1/pools/',
			games: 'https://api.leaguevine.com/v1/games/',
			team: 'https://api.leaguevine.com/v1/teams/',
			gameScores: 'https://api.leaguevine.com/v1/game_scores/',
			user: 'https://api.leaguevine.com/v1/players/me/'
		};

		//	Breadcrumb
		var breadcrumbs = false;

		this.$get = function(localStorageService) {

			var self = this;

			return {
				getAuthKey: function(index) {
					return self.gl_authKeys[index];
				},
				setAuthKey: function(index){

				},
				getImage: function(index) {
					return self.gl_images[index];
				},
				getText: function(index) {
					return self.gl_text[index];
				},
				getUrl: function(index) {
					return self.gl_urls[index];
				},
				setBreadCrumbs: function(_breadcrumbs){
					breadcrumbs = _breadcrumbs;
				},
				getBreadCrumbs: function(){
					return breadcrumbs;
				}
			}
		};

	});

})();