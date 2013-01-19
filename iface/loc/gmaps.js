
var latit = 0;
var longit = 0;

function setLat (lati) {
	latit = lati;
}

function setLon (longi) {
	longit = longi;
}

var mapOptions = {
    center: new google.maps.LatLng(latit, longit),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById('map'), mapOptions);

var markerOptions = {
    position: new google.maps.LatLng(37.7831, -122.4039)
};
var marker = new google.maps.Marker(markerOptions);
marker.setMap(map);
