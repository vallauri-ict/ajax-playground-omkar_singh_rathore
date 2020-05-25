"use strict";

function signIn(clientId,redirect_uri,scope,url){
     
    // the actual url to which the user is redirected to 
    url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
    +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
    +"&access_type=offline";
    // this line makes the user redirected to the url
    window.location = url;
 }

function setToken(client_id,client_secret,redirect_uri,code,scope)
{
    if(localStorage.getItem("accessToken")==null)
    {
        let ris= inviaRichiesta(
            "POST",
            "https://www.googleapis.com/oauth2/v4/token",
            {
                code: code,
                redirect_uri: redirect_uri,
                client_secret: client_secret,
                client_id: client_id,
                scope: scope,
                grant_type: "authorization_code",
            },
            false
        );
        ris.done(function(resultData){
                localStorage.setItem("accessToken",resultData.access_token);
               localStorage.setItem("refreshToken",resultData.refreshToken);
               localStorage.setItem("expires_in",resultData.expires_in);
               window.history.pushState({}, document.title, "index.html");
        });
        ris.fail(error);
    }
}

function signOut()
{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expires_in");
    setTimeout(function(){
        alert("sei logout ora");
        window.location="index.html";
    },3000);
    
}
function inviaRichiesta(method, url, parameters = "", async = true) {
    return $.ajax({ 
        type: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        timeout: 5000,
        async: async
    });
}
function error(jqXHR, text_status, string_error) {  
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}