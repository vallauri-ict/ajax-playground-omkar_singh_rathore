<?php
	header("Content-type:application/json;charset=utf-8"); 
	require("_libreria.php");

    //controllo i parametri
    if(!isset($_POST["value"]))
    {
        http_response_code(400);
        die("Parametro Mancante : value da cercare");
    }
    //comunque per id non ci serve il controllo,dato che lo prendo dall'url

    //connessione al server
    $con= _connection("amazon_project");
    $value=$con->real_escape_string($_POST["value"]);
    $id =$con->real_escape_string($_POST["id"]);
    ///esegui query
    $sql= "SELECT * FROM $id WHERE nome= '$value'";
    $data=_eseguiQuery($con,$sql);
    if(count($data)==0) //non esiste quel determinato valore nel DB, è inesistente
    {
        http_response_code(401);
        die("Valore inserito è inesistente");
    }
    else
    {
        $data=json_encode($data);
        echo($data);
    }
    $con->close();
?>