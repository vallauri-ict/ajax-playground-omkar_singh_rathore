<?php
	header("Content-type:application/json;charset=utf-8"); 
	require("_libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "GET")
	{
		//controllo parametri
		if(!isset($_GET["id"])){
			http_response_code(400);
			die("parametro mancante id");
		}
		else if(!isset($_GET["min"]))
		{
			http_response_code(400);
			die("Parametro mancante : min");
		}
		else if(!isset($_GET["max"]))
		{
			http_response_code(400);
			die("Parametro mancante : max");
		}
		//connessione al server
		$con=_connection("amazon_project");
		$id=$_GET["id"];
		$min=$con->real_escape_string($_GET["min"]);
		$max=$con->real_escape_string($_GET["max"]);

		//query
		$sql = "SELECT * FROM $id WHERE prezzo BETWEEN $min AND $max";
		$data =  _eseguiQuery($con, $sql);
		if(count($data)==0) //$data è vuoto
		{
			die("data richiesta inesistente \n ");
		}
		echo(json_encode($data));
		$con->close();
	}


?>
