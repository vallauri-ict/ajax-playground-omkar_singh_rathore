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
		if(!isset($_POST["password"]))
		{
			http_response_code(400);
			die("Parametro mancante: password");
		}
		// 2-Connessione al Server
		$con = _connection("amazon_project");
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["password"]);

		// 3- Query
		$sql = "SELECT * FROM credentials WHERE username='$user'";
		$data = _eseguiQuery($con, $sql);
		if(count($data)==0) /// se il vettore è vuoto= non ha trovato l'utente
		{
			http_response_code(401);
			die("Username non valido");
		}
		else if($data[0]['pwd']!=$password)
		{
			http_response_code(401);
			die("password non valido");
		}
		///4. Creazione Session e restituzione risultato
		else{
			session_start();
			$_SESSION["id"] = $data[0]["id"];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(),session_id(),time()+SCADENZA, "/"); //session_name esiste già xk ho creato session_start(),e lo aggiorna, altrimnenti lo crea lui
																		 // "/" significa che cookie vale per qualsiasi risorsa.
			//echo(json_encode({"ris":"ok"}));
			echo(json_encode(array("ris"=>"ok")));
		}
		// 5. Close
		$con->close(); //Servizio finito



	}
?>