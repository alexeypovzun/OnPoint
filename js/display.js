function pageDisplay(pageName) {
	document.getElementById("container").innerHTML='';
	var objWrapper = '.'+pageName+'_wrapper'; 
	var pageWrapper = document.querySelector(objWrapper);
	document.getElementById("container").appendChild(pageWrapper);
	document.getElementById("hidden").innerHTML='';
}