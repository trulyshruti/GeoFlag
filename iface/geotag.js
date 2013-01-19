var Main = {
	fileSelection:{}
}
function smoothScrollTo(e){
	var elm = document.getElementById(e);
	if(elm == null) return;
	var xnew = Math.ceil(elm.offsetTop - (elm.offsetTop - window.pageYOffset) / 2);
	window.scrollTo(0, xnew);
	if(Math.abs(xnew - elm.offsetTop) -1){
		setTimeout(function(){smoothScrollTo(e);},80);
	}
}
window.addEventListener("load",function(){
	filepicker.setKey(KEY_FILEPICKER);
	window.scrollTo(0,0);
	$("#startbtn").bind("click",function(){
		$("#section2").css("display","");
		smoothScrollTo("section2");
	});
	$("#addflagbtn").bind("click",function(){
		$("#addModal").modal();
	});
	$("#pickerbtn").bind("click",function(){
		filepicker.pick({},function(g){
			$("#section3").css("display","");
			smoothScrollTo("section3");
			$("#fileselection").text("You've selected \"" + g.filename + "\"!");
			fileSelection = g;
		},function(h){
			
		});
	});
});