var Main = {
	fileSelection:"",
	coords:{lat:0,lon:0},
	timeBegin:"",
	timeEnd:"",
	accessToken:"",
	uid: 0,
	requestSent: false
}
var _ = function(e){return document.getElementById(e);}
function smoothScrollTo(e){
	var elm = document.getElementById(e);
	if(elm == null) return;
	var prev = window.pageYOffset;
	var xnew = Math.ceil(elm.offsetTop - (elm.offsetTop - window.pageYOffset) / 2);
	window.scrollTo(0, xnew);
	if(Math.abs(xnew - elm.offsetTop) > 1 && window.pageYOffset != prev){
		setTimeout(function(){smoothScrollTo(e);},80);
	}
}
window.addEventListener("load",function(){
	filepicker.setKey(KEY_FILEPICKER);
	window.scrollTo(0,0);
	
	_("startbtn").addEventListener("click",function(){
		_("section2").style.display = "";
		smoothScrollTo("section2");
	});
	_("addflagbtn").addEventListener("click",function(){
		GeoLo.getLocation(function(coords){
			var ifr = GeoLo.getMap("gmap", coords.latitude, coords.longitude);
			Main.coords.lat = coords.latitude;
			Main.coords.lon = coords.longitude;
			$("#addModal").modal();
			_("markbtn").addEventListener("click",function(){
				//Send ajax
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						try{
							var x = JSON.parse(xhr.responseText);
						}catch(e){
							console.log("Parse Error");
							Main.requestSent = false;
							return;
						}
						if(x.status == 200){
							$("#addModal").modal("hide");
							_("section4").style.display = "";
							smoothScrollTo("section4");
							_("fbid").innerHTML = Main.uid;
						}
						Main.requestSent = false;
					}
				};
				xhr.open("POST","server/?token=" + Main.accessToken, true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				if(!Main.requestSent){
					xhr.send("action=add&lat=" + Main.coords.lat + "&lng=" + Main.coords.lon + "&fileName=" 
						+ encodeURIComponent(Main.fileSelection.filename) 
						+ "&url=" + encodeURIComponent(Main.fileSelection.url) 
						+ ((Main.timeBegin != null && Main.timeBegin != "") ? "&startTime=" + Main.timeBegin : "") 
						+ ((Main.timeEnd != null && Main.timeEnd != "") ? "&endTime=" + Main.timeEnd : ""));
					Main.requestSent = true;
				}
			});
			_("addressSearchBtn").addEventListener("click",function(){
				GeoLo.getAddress(_("locationName").value,function(coords){
					if(coords.longitude != 0 && coords.latitude != 0){
						GeoLo.getMap("gmap", coords.latitude, coords.longitude);
						Main.coords.lat = coords.latitude;
						Main.coords.lon = coords.longitude;
					}
				});
			});
			_("timeBtn").addEventListener("click",function(){
				var x = prompt("Enter valid time: (YYYY-mm-dd HH:mm:ss|YYYY-mm-dd HH:mm:ss)");
				if(x != null){
					var y = x.split("|");
					if(y == null || y.length < 2){
						alert("Invalid input!");
					}else{
						Main.timeBegin = y[0];
						Main.timeEnd = y[1];
						alert("Saved!");
					}
				}
			});
		})
	});
	_("finishRetBtn").addEventListener("click",function(){
		smoothScrollTo("section1");
		_("section2").style.display = "none";
		_("section3").style.display = "none";
		_("section4").style.display = "none";
		$("#fileselection").text("");
		Main = {
			fileSelection:"",
			coords:{lat:0,lon:0},
			timeBegin:"",
			timeEnd:"",
			accessToken:Main.accessToken,
			requestSent: false
		}
	});
	_("pickerbtn").addEventListener("click",function(){
		filepicker.pick({},function(g){
			$("#section3").css("display","");
			smoothScrollTo("section3");
			$("#fileselection").text("You've selected \"" + g.filename + "\"!");
			Main.fileSelection = g;
		},function(h){
			
		});
	});
});