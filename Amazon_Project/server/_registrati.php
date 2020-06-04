<?php
	header("Content-type:application/json;charset=utf-8"); 
	require("_libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1-controllo paramteri
		if(!isset($_POST["username"]))
		{
			http_response_code(400); ///codice errore 400=mancante
			die("Parametro mancante: username");
		}
		if(!isset($_POST["pwd"]))
		{
			http_response_code(400);
			die("Parametro mancante: password");
		}
		if(!isset($_POST["cognome"]))
		{
			http_response_code(400);
			die("Parametro mancante: cognome");
		}
		if(!isset($_POST["nome"]))
		{
			http_response_code(400);
			die("Parametro mancante: nome");
		}
		if(!isset($_POST["indirizzo"]))
		{
			http_response_code(400);
			die("Parametro mancante: indirizzo");
		}
		if(!isset($_POST["mail"]))
		{
			http_response_code(400);
			die("Parametro mancante: mail");
		}
		if(!isset($_POST["telefono"]))
		{
			http_response_code(400);
			die("Parametro mancante: telefono ");
		}


		// 2-Connessione al Server
		$con = _connection("amazon_project");
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["pwd"]);
		$cognome = $con->real_escape_string($_POST["cognome"]);
		$nome = $con->real_escape_string($_POST["nome"]);
		$indirizzo = $con->real_escape_string($_POST["indirizzo"]);
		$mail = $con->real_escape_string($_POST["mail"]); 
		$telefono= $con->real_escape_string($_POST["telefono"]);

		// 3- Query
		//controllo se c'è già l'utente o no
		$sql="SELECT * FROM credentials WHERE username='$user'";
		$data = _eseguiQuery($con,$sql);
		if(count($data)==0) //ritorna un vettore vuoto, quindi significa che non esisteva l'utente già  prima
		{
			$sql = "INSERT INTO credentials(cognome,nome,indirizzo,telefono,mail,username,pwd) VALUES('$cognome','$nome','$indirizzo','$telefono','$mail','$user','$password')";
			$data = _eseguiQuery($con, $sql);
		}
		else
			die("Utente esiste già");


		echo(json_encode($data));
		// 5. Close
		$con->close(); //Servizio finito

	}
?>