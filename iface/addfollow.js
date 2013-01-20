var $_ = function(e){return document.getElementById(e);}
window.addEventListener("load",function(){
	$_("subscribebtn").addEventListener("click",function(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				try{
					var x = JSON.parse(xhr.responseText);
				}catch(e){
					console.log("Parse Error");
					$_("errormsg").innerHTML = "Communication Failed!";
					$_("successalert").style.display = "none";
					$_("erroralert").style.display = "";
					return;
				}
				if(x.status == 200){
					$_("successalert").style.display = "";
					$_("erroralert").style.display = "none";
				}else{
					$_("successalert").style.display = "none";
					$_("erroralert").style.display = "";
					$_("errormsg").innerHTML = "Something went wrong. Please check the ID.";
				}
			}
		};
		xhr.open("POST","server/?token=" + accessToken, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("action=addfan&id=" + $_("uid").value);
	});
});