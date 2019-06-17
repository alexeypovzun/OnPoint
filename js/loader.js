function pageLoader(pageName)
{
	var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function() {
		    if (xhr.readyState==4 && xhr.status==200) {
		            document.getElementById("hidden").innerHTML=xhr.responseText;
		        }
		    }
   		xhr.open("GET",'tpl/'+pageName+'.html',true);
    	xhr.send();
}