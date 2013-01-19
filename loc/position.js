
	var myLocation;

	function getLocation()
	{
		if (navigator.geolocation)
		{
		    navigator.geolocation.getCurrentPosition(findPosition);
		}
		else {
			alert("Sorry, geolocation is not supported by this browser.");
		}
	}

	function findPosition(position)
	{
		var whereAmI = "Latitude: " + position.coords.latitude;
	  	whereAmI += ", Longitude: " + position.coords.longitude; 
	  	// alert(whereAmI);
	  	myLocation = whereAmI;
	}

