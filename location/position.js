
	function getLocation()
	{
		if (navigator.geolocation)
		{
		    navigator.geolocation.getCurrentPosition(showPosition);
		}
		else {
			alert("Sorry, geolocation is not supported by this browser.");
		}
	}
	function showPosition(position)
	{
	  	var whereAmI = "Latitude: " + position.coords.latitude;
	  	whereAmI += ", Longitude: " + position.coords.longitude; 
	  	alert(whereAmI);
	}

