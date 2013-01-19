
var url = "";
var urlStart = "https://maps.google.com/maps/myplaces?hl=en&amp;ctz=300&amp;ie=UTF8&amp;ll=";
var urlEnd = "&spn=0.008754,0.017681&ctz=300&t=m&z=16&iwloc=A";

var iframeCode = "";
var iWidth = "<iframe width=\">";
var iHeight = "\" height=\"";
var iUrl = " frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"";
var iLink = "\"></iframe><br /><small><a href=\"";
var iStyle = "\" style=\"color:#0000FF;text-align:left\">View Larger Map</a></small>";

function setUrlByLL(latitude, longitude) {
	var ll = "" + latitude + ", " + longitude;
	url = urlStart + ll + urlEnd;
}

function setIframe (url, width, height) {
	iframeCode = iWidth + width + iHeight + height + iURL + url + iLink + url + iStyle;
}


