"use strict";


$(document).ready(function(){
	let _cognome = $("#txtCognome input");
	let _nome = $("#txtNome input");
	let _indirizzo = $("#txtIndirizzo input");
	let _telefono=$("#txtTelefono input");
	let _mail = $("#txtMail input");
	let _username = $("#txtUsername input");
	let _password = $("#txtPassword input");
	let _confermaPassword = $("#txtConfermaPassword input");

	$("#btnInvia").on("click",function()
	{
		registra();
	});

	function registra()
	{
		disabilitaError();

		//controllo parametri se sono vuoti o no
		if(_cognome.val()=="")
			abilitaError(_cognome);
		else if(_nome.val()=="")
			abilitaError(_nome);
		else if(_indirizzo.val()=="")
			abilitaError(_indirizzo);
		else if(_telefono.val()=="")
			abilitaError(_telefono);
		else if(_mail.val()=="")
			abilitaError(_mail);
		else if(_username.val()=="")
			abilitaError(_username);
		else if(_password.val()=="")
			abilitaError(_password);
		else if(_confermaPassword.val()=="")
			abilitaError(_confermaPassword);
		
		//controllo se i parametri corrispondono ciò che è richiesto
		if((_mail.val().indexOf("@")== -1)&&((_mail.val().indexOf(".com")==-1)||(_mail.val().indexOf(".edu")==-1))) ///controllo se la mail è corretta o no
		{
			setTimeout(function(){
				abilitaError(_mail);
				alert("Mail errata");
			},3000);
		}
		else if(_password.val()!=_confermaPassword.val()) //controllo se coincidono le due password
			alert("Controlla di nuovo la password e la sua conferma, perchè non coincidono");
		else //tutto corretto
		{
			
			let pass=CryptoJS.MD5(_password.val()).toString();
			let Registrati=inviaRichiesta("POST","server/_registrati.php",
			{
				"cognome":_cognome.val(),
				"nome":_nome.val(),
				"indirizzo":_indirizzo.val(),
				"telefono":_telefono.val(),
				"mail":_mail.val(),
				"username":_username.val(),
				"pwd":pass,
			});
			Registrati.done(function(data){
				alert("Ora ti sei registrato");
				window.location="login.html";
			});
			Registrati.fail(function(jqXHR,test_status,str_error){
				error(jqXHR, test_status, str_error);
			});
		}
	}


	function abilitaError(txt)
	{
		txt.addClass("is-invalid"); // bordo rosso textbox
		txt.prev().addClass("icona-rossa"); // colore icona
	}

	function disabilitaError()
	{
		_cognome.removeClass("is-invalid");
		_cognome.prev().removeClass("icona-rossa");

		_nome.removeClass("is-invalid");
		_nome.prev().removeClass("icona-rossa");

		_indirizzo.removeClass("is-invalid");
		_indirizzo.prev().removeClass("icona-rossa");

		_mail.removeClass("is-invalid");
		_mail.prev().removeClass("icona-rossa");

		_username.removeClass("is-invalid");
		_username.prev().removeClass("icona-rossa");
		
		_password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa");

		_confermaPassword.removeClass("is-invalid");
		_confermaPassword.prev().removeClass("icona-rossa");
	}
})