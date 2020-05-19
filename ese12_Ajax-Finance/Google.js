"use strict";

function signIn(clientId,redirect_uri,scope,url){
     
    // the actual url to which the user is redirected to 
    url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
    +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
    +"&access_type=offline";

    // this line makes the user redirected to the url
    window.location = url;
    $("#Navbar img").prop("src","img/login.png");
 }

 function ControlAccessToken()
 {
     if(localStorage.getItem("accessToken")==null)
     {
         //you haven't had login before.
         let web= inviaRichiesta("GET","http://localhost:3000/web");
         web.done(function(data){
             let clientId=data[0]["client_id"];
             let redirect_uri=_redirect_uri;
             let scope=_scope;
             let url="";
             setToken(clientId,redirect_uri,scope,url);
         });
         web.fail(error);
     }
 }

function setToken(client_id,client_secret,redirect_uri,code,scope)
{
    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) 
        {
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");
        }
  });
}

function signOut()
{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expires_in");
    $("#Navbar img").prop("src","img/logout.png");
    window.location.reload="index.html";
}