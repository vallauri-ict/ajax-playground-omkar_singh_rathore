<?php
	header("Content-type:application/json;charset=utf-8"); 
	require("_libreria.php");
    
    //controllo i parametri
    if(!isset($_GET["category"]))
    {
        http_response_code(400);
        die("Parametro Mancante : categoria non selezionato");
    }

    //connessione al server
    $con= _connection("amazon_project");
    $category=$con->real_escape_string($_GET["category"]);
    ///esegui query
    $sql= "SELECT * FROM accessori WHERE categoria= '$category'";
    $data=_eseguiQuery($con,$sql);
    if(count($data)==0) //non esiste quel determinato valore nel DB, è inesistente
    {
        http_response_code(401);
        die("categoria inesistente");
    }
    else
    {
        $data=json_encode($data);
        echo($data);
    }
    $con->close();

?>