var _ = function(e){return document.getElementById(e);};
var accessToken = "";
function onLoaded(){
	var task = function(){
		GeoLo.getLocation(function(e){
			var tas = task;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				setTimeout(tas, 10000);
			};
			xhr.open("POST","server/?token=" + accessToken, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("action=check&lat=" + e.latitude + "&lng=" + e.longitude);
		}
	};
	if(accessToken != ""){
		setTimeout(task, 1000);
	}else{
		setTimeout(function(){
			onLoaded();
		},5000);
	}
});

window.addEventListener("load",function(){
	onLoaded();
});