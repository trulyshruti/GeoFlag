var poi = ""; 

function getPOI(address) {
	var url = "https://api.tomtom.com/lbs/geocoding/geocode?key=t8w38tejnc9yzwthkqg7ygcn&query=";
	url += address;
	poi = $.get("test.cgi",
   		function(data){
     		console.log(data);
   	});
}

