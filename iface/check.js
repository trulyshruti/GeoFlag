var _ = function(e){return document.getElementById(e);};
var accessToken = "";
function onLoaded(){
	var task = function(){
		GeoLo.getLocation(function(e){
			var tas = task;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					try{
						var x = JSON.parse(xhr.responseText);
						
					}catch(e){console.log("Egad! Error. Parsing. Data.");return;}
					if(x.length == 0){
						setTimeout(tas, 5000);
						return;
					}else{
						_("hero").className = "hero-unit green-hero";
						_("fname").innerHTML = x[0].fileName;
						_("linkaddr").innerHTML = "You have just unlocked <a href=\""
							+ x[0].url + "\">" + x[0].fileName + "</a>";
					}
				}
			};
			xhr.open("POST","server/?token=" + accessToken, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("action=check&lat=" + e.latitude + "&lng=" + e.longitude);
		})
	};
	if(accessToken != ""){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				try{
					var x = JSON.parse(xhr.responseText);
				}catch(e){
					console.log("Parse Error");
					_("opend").innerHTML = "Network Error";
					return;
				}
				_("opend").innerHTML = "";
				for(var i = 0; i < x.length; i++){
					var litem = document.createElement("li");
					var filen = document.createElement("a");
					filen.href = x[i].url;
					if(x[i].self){
						filen.className="selfowned";
					}
					filen.appendChild(document.createTextNode(x[i].fileName));
					litem.appendChild(filen);
					if(x[i].self){
						litem.appendChild(document.createTextNode(" (Uploaded by me)"));
					}
					_("opend").appendChild(litem);
				}
				if(i == 0){
					_("opend").appendChild(document.createTextNode("None yet. Ganbarinasai!"));
				}
			}
		};
		xhr.open("POST","server/?token=" + accessToken, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("action=checkold");
		task();
	}else{
		setTimeout(function(){
			onLoaded();
		},500);
	}
};

window.addEventListener("load",function(){
	onLoaded();
	_("opend").innerHTML = "Loading...";
});