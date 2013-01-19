var Main = {
	fileSelection:{}
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
		alert("foot");
	});
	_("addflagbtn").addEventListener("click",function(){
		$("#addModal").modal();
	});
	_("pickerbtn").addEventListener("click",function(){
		filepicker.pick({},function(g){
			$("#section3").css("display","");
			smoothScrollTo("section3");
			$("#fileselection").text("You've selected \"" + g.filename + "\"!");
			fileSelection = g;
		},function(h){
			
		});
	});
});