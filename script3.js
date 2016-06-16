
function createMap(data){

	var map = L.map('map');

	var layer = L.tileLayer('https://api.mapbox.com/styles/v1/lpwieck/ciph6pssk000vavnq9fz3rq6s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHB3aWVjayIsImEiOiJjaXBoNnA3cXgwMTB2dTluajhrNG1kMzM1In0.97mdVQfOB3TJ-KWt7JNuCw');

	map.addLayer(layer);

	map.setView([0,0], 3);

	var markers = [];

	_.each(data.features, function(feature) {

		var lat = feature.geometry.coordinates[1];
		var lon = feature.geometry.coordinates[0];

		var marker = L.circleMarker([lat, lon], {
			className: 'toponym',
			offset: Number(feature.properties.offset),
		});

		marker.bindPopup(feature.properties.toponym);

		markers.push(marker);

		map.addLayer(marker);
	});



// SLIDER

	var input = $('#slider');

	var max = _.last(data.features).properties.offset;
	input.attr('max', max);

	input.on('input', function() {

		var offset = Number(input.val());

		_.each(markers, function(marker) {
			
			if (marker.options.offset < offset) {
				map.addLayer(marker);
			}

			else {
				map.removeLayer(marker);
			}

		});

	});


	input.trigger('input');

}

//on page start

$(function(){
	$.getJSON('donq.geoJSON', function(data) {
		createMap(data);
	});
	
})