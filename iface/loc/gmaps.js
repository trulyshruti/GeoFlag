
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

new google.maps.Map(document.getElementById('map'), mapOptions);
