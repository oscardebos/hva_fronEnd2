var GEOJUSTUS = GEOJUSTUS || {};

(function () {

	'use strict';


	//	[ Application init ]

		GEOJUSTUS.application = {
			init: function() {

				//	Log
					console.log("> Init application");

				//	Genereer een google maps kaart
					GEOJUSTUS.mapFunctions.generateMap(kaartOpties, 'map_canvas');

				//	Start geolocation op
					GEOJUSTUS.geoFunctions.init();

			}
		};



	//	[ Variables ]

		var SANDBOX = "SANDBOX";
		var LINEAIR = "LINEAIR";
		var GPS_AVAILABLE = 'GPS_AVAILABLE';
		var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
		var POSITION_UPDATED = 'POSITION_UPDATED';
		var REFRESH_RATE = 5000;
		
		var currentPosition, currentPositionMarker, customDebugging, debugId, map, interval, intervalCounter, updateMap;
		currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false;
		var locatieRij = [], markerRij = [];

		// Geef de opties voor de google maps kaart op, kijk voor een overzicht van alle opties op:
		// https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
		var kaartOpties = {
			center: new google.maps.LatLng(52.35955620231157, 4.908019635968003),
			zoom: 15,
			disableDefaultUI: false,
			draggable: true,
			scrollwheel: true,
			mapTypeControl: false,
			navigationControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		// Geef de opties voor de vorm van de markers, kijk voor een overzicht van alle opties op:
		// https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerShape
		var locatieMarker = {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: 'GhostWhite',
			fillOpacity: .4,
			strokeColor: 'FireBrick',
			strokeOpacity: 1,
			strokeWeight: 1,
			scale: 12
	  	};
	  	
	  	var positieMarker = {
			path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			fillColor: 'FireBrick',
			fillOpacity: .7,
			strokeColor: 'Black',
			strokeOpacity: 1,
			strokeWeight: 1,
			scale: 4
	  	};

	  	// Geef een opsomming van de locaties die in de tour gebruikt worden. Het is afhankelijk
		// van het tourtype of deze in volgorde of willekeurig worden gerendered. Als het tourtype
		// lineair is wordt onderstaande volgorde aangehouden.
		var locaties = [
			['Jan Bommerhuis', 'http://www.google.com', 30, 52.35981828737461, 4.909543130688462],
			['Theo Thijssenhuis', 'http://icanhasgeo.nl/map.html#TTH', 50, 52.35955620231157, 4.908019635968003],
			['Koninklijk Instituut voor de Tropen', 'http://icanhasgeo.nl/map.html#KIT', 10, 52.36228181098596, 4.920969341091904],
			['Crea', 'http://icanhasgeo.nl/map.html#CREA', 30, 52.36322525173981, 4.912826154522691]
		];

		//	Kies de tourtype
		var tourType = LINEAIR;







	//	[ Map functions ]

		GEOJUSTUS.mapFunctions = {

			generateMap: function(myOptions, canvasId){
				
				//	Generate map
					console.log("> Start google maps");
					map = new google.maps.Map(document.getElementById(canvasId), myOptions);

				//	Set current marker with default center (before checking location of the user)
					currentPositionMarker = new google.maps.Marker({
						position: kaartOpties.center,
						map: map,
						icon: positieMarker,
						title: 'U bevindt zich hier..'
					});


				//	Vul maps met voorgedefinierde locaties
					console.group("Locaties vullen, tourtype is: "+tourType);

					var routeList = [];

					for (var i = 0; i < locaties.length; i++) {
						//	Log locatie
							console.log(locaties[i]);

						//	Voeg toe aan routelist
							var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
	  						routeList.push(markerLatLng);
							
							markerRij[i] = {};
							for (var attr in locatieMarker) {
								markerRij[i][attr] = locatieMarker[attr];
							}
							markerRij[i].scale = locaties[i][2]/3;

							var marker = new google.maps.Marker({
								position: markerLatLng,
								map: map,
								icon: markerRij[i],
								title: locaties[i][0]
							});


						//	Trek een zwarte lijn als het tourType linear is
							if(tourType == LINEAIR){
								var route = new google.maps.Polyline({
									clickable: false,
									map: map,
									path: routeList,
									strokeColor: 'Black',
									strokeOpacity: .6,
									strokeWeight: 3
								});

							}
					}

					console.groupEnd();

			},
		}







	//	[ Geo functions ]

		GEOJUSTUS.geoFunctions = {

			init: function(){
				
				if(geo_position_js.init()){
					console.log("> Geo positie init succesvol");

					//	Start iterating position				
						
						interval = self.setInterval(function(){
							GEOJUSTUS.geoFunctions.getCurrentPosition();
							if(currentPosition != false){
								GEOJUSTUS.geoFunctions.checkLocations();
							}
						}, REFRESH_RATE);
						
						
				}
				else{
					console.error("X Geo positie init onsuccesvol");
				}

			},

			getCurrentPosition: function(){
				geo_position_js.getCurrentPosition(
					function(data){ 
						
						//	Succesvol locatie opgehaald
							console.log("> localisatie is gelukt"); console.log(data);

						//	Uppdate de google maps current positie
							currentPosition = data;
							var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
							map.setCenter(newPos);
							currentPositionMarker.setPosition(newPos);

					}, 
					function(data){ 
						//	Onsuccesvol locatie opgehaald, console de error.
							console.error("Er ging iets mis met de localisatie"); 
							console.error(data); 
					}
				);
			},


			checkLocations: function(){
				//	Itereer door alle voorgedefinierde locaties om te kijken of de persoon binnen de opgegeven straal is
					for (var i = 0; i < locaties.length; i++) {

						var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

						if(GEOJUSTUS.geoFunctions.calculateDistance(locatie, currentPosition)<locaties[i][2]){
							
							// Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
							if(window.location!=locaties[i][1]){
								// TODO: Animeer de betreffende marker
									window.location = locaties[i][1];
									console.log("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
							}
						}

					}
			},

			calculateDistance: function(p1, p2){
				var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
				var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
				return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
			}
		}





	// 	[ Kickstart de applicatie zodra window geladen is ]
		window.onload = function() {

			//	Log
				console.log("> Window is geladen, start de applicatie.");

			//	Start application init
				GEOJUSTUS.application.init();

			//	Log alles
				console.log(GEOJUSTUS);
		}

})();