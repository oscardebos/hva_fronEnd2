var FRAMEWORK = FRAMEWORK || {};

(function () {

	'use strict';


	//	[ Application Controller ]

		FRAMEWORK.controller = {
			init: function(){

				//	Log
					console.log("> Init application");


				//	Start routing
					FRAMEWORK.router.init();

			}
		};



	//	[ Router ]
		FRAMEWORK.router = {

			browserHash: window.location.hash.slice(2),

			init: function(){

				//	Self
					self = this;

				//	Log
					console.log("> Init router");

				//	Define routes
					routie({
						'/': function() {
							
							//	Log
								console.log("> Route is /");

							//	Render page
								self.renderPage(
									'#home-template', 
									{title: "Home", body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
									0
								);

						},
						'/page1': function() {

							//	Log
								console.log("> Route is /page1");

							//	Render page
								self.renderPage(
									'#page1-template', 
									{title: "Page 1", body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
									1
								);
						}
					});


				//	Choose page
					routie("/"+this.browserHash);

					
			},

			renderPage: function(templateId, context, menuItem){

				//	Log
					console.log("> Render page with pageId: " + templateId);

				
				//	Select template
					var templateHome = qwery(templateId)[0].innerHTML;
					var template = Handlebars.compile(templateHome);
				
				
				//	Generate html
					var html = template(context);
				

				//	Append html to #content
					qwery('#content')[0].innerHTML = html;


				//	Remove all active menu items
					var activeMenuItems = qwery('#main-menu .nav .active');
					for (var i = activeMenuItems.length - 1; i >= 0; i--) {
						activeMenuItems[i].classList.remove('active');
					}

				
				//	Add active to right menu item
					var targetMenuItem = qwery('#main-menu .nav > li');
					targetMenuItem[menuItem].classList.add('active');

			}

		};




	// 	[ Start application ]
		domready(function () {

			//	Log
				console.log("> Dom is ready, start de applicatie.");

			//	Start application init
				FRAMEWORK.controller.init();

			//	Log alles
				console.log(FRAMEWORK);

		});

})();