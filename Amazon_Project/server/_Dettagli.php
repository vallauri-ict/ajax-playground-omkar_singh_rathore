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
        else if(!isset($_GET["Card"]))
        {
            http_response_code(400);
            die("Parametro mancante Category");
        }
		//connessione al server
		$con=_connection("amazon_project");
        $id=$con->real_escape_string($_GET["id"]);
        $Card=$con->real_escape_string($_GET["Card"]);

		//query
		$sql = "SELECT * FROM $Card WHERE id=$id";
		$data =  _eseguiQuery($con, $sql);
		if(count($data)==0) //$data è vuoto
		{
			die("data richiesta inesistente");
		}
		echo(json_encode($data));
		$con->close();
	}
?>