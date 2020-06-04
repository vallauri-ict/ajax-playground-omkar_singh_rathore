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
		//connessione al server
		$con=_connection("amazon_project");
		$id=$_GET["id"];

		//query
		$sql = "SELECT * FROM $id ORDER BY nome DESC";
		$data =  _eseguiQuery($con, $sql);
		if(count($data)==0) //$data è vuoto
		{
			die("data richiesta inesistente");
		}
		echo(json_encode($data));
		$con->close();
	}
?>