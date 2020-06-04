"use strict";


function inviaRichiesta(method,url, parametri="")
{
	return $.ajax({
	  url: url, 
	  type: method,
	  data: parametri,
	  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	  dataType: "json",
	  async: true, // default
	  timeout: 5000
	 });
}
function error(jqXHR, test_status, str_error) 
{
	if(jqXHR.status==0)
		alert("Connection refused or server timeout");
	else if(jqXHR.status==200)
		alert("formato di dati non corretto" + jqXHR.responseText);
	else
		alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}