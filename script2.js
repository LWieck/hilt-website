
function createMap(data){

	var map = L.map('map');

	var layer = L.tileLayer.provider('CartoDB.DarkMatter');

	map.addLayer(layer);

	map.setView([0,0], 3);

	var markers = [];

	_.each(data.features, function(feature) {

		var lat = feature.geometry.coordinates[1];
		var lon = feature.geometry.coordinates[0];

		var marker = L.circleMarker([lat, lon], {
			className: 'toponym'
		});

		marker.bindPopup(feature.properties.toponym);

		markers.push(marker);

		map.addLayer(marker);
	});

}

//on page start

$(function(){
	$.getJSON('donq.geoJSON', function(data) {
		createMap(data);
	});
	
})