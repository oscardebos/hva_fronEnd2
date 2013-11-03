/*
 *	In this file we track the loading status
 */

(function () {

	'use strict'; 

	AMSTERDAMFRISBEE.provider('model_loader', function() {

		console.log("* Init globals");

		// Auth keys
		var pending = 0;

		this.$get = function() {

			return {
				getLoadingStatus: function(){
					if(pending == 0){
						return false;
					}else{
						return true;
					}
				},
				plus: function(){
					pending++;
				},
				minus: function(){
					pending--;
				}
			}
		};

	});

})();