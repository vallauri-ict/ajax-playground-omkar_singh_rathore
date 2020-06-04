"use strict"

$(document).ready(function() {	
	let _username = $("#usr")
	let _password = $("#pwd")
	let _lblErrore = $("#lblError")
	
	// all'avvio apriamo subito il jumbotron
	$(".jumbotron").trigger("click");
    _lblErrore.hide();

	$("#btnLogin").on("click", controllaLogin)
	
	// il submit deve partire anche senza click 
	// ma con il solo tasto INVIO
	$(document).on('keydown', function(event) {	
	   if (event.keyCode == 13)  
		   controllaLogin();
	});
	$("#registrati").on("click",function(){
		window.location="_registrazione.html"
	})
	
	
	function controllaLogin(){
		
        _username.removeClass("is-invalid");  // bordo rosso textbox
		_username.prev().removeClass("icona-rossa");  // colore icona				
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa"); 

		_lblErrore.hide();		
		
        if (_username.val() == "") {
            _username.addClass("is-invalid"); // bordo rosso textbox
			_username.prev().addClass("icona-rossa"); // colore icona
        } 
		else if (_password.val() == "") {
            _password.addClass("is-invalid"); // bordo rosso textbox
			_password.prev().addClass("icona-rossa"); // colore icona
        }
		else{
			let user=_username.val();
			// md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();  //funzione md5(), rendere la password incomprensibile e irreversebile, in caso se qualcuno malintenzionato cerca di intrecciare la pwd dell'utente
			let _richiestaLogin= inviaRichiesta("POST", "server/_login.php", { "username":user, "password":pass } );
			_richiestaLogin.fail(function(jqXHR, test_status, str_error)
			{
				if (jqXHR.status == 401) { // unauthorized
					_lblErrore.show();
				} else
					error(jqXHR, test_status, str_error)
			});
			_richiestaLogin.done(function(data) 
			{
				localStorage.setItem("user",user);
				window.location.href = "index.html";
			});
		}
	}
	
	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	})
	
});


