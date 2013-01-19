
    $(document).ready(function() { 

	}); 

    function getLat(address, callback) {
        if (address) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                var result = 0;
				if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
						var lati = results[0].geometry.location.lat();
						result = lati;
                    }
				}
				callback(result);
            });
        }
        else {
			callback(0);
    	}
    }

    function getLon(address,callback) {
        if (address) {
			var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
				var result = 0;
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
						var longi = results[0].geometry.location.lng();
						result = longi;
                    }
				}
				callback(result);
            });
        	}
        else {
			callback(0);
		}
    }

    function findMe() {
    	getLocation();
    }

    function isThere(yourLoc, otherLoc) {
    	getLat(yourLoc, function(yourLat) {
			getLat(otherLoc, function(otherLat) {
				getLon(yourLoc, function(yourLon) {
					getLon(otherLoc, function(otherLon) {

							var isLat = (yourLat === otherLat);
							var isLon = (yourLon === otherLon);

							finish();
						});
					});
				});
			});
    }

    function finish(){
    	console.log();
    }




