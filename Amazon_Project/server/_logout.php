<?php
	header("Content-type:application/json;charset=utf-8"); 
    session_start();
    session_unset();
    session_destroy();

    setcookie(session_name(),"",-2,"/");

    $data=array("logout"=>true);//un vettore in cui c'è un campo logout e il suo valore ho impostato a true , per far
                                //capire che si è effettuato il logout, sul done dell'inviarichiesta al server.
    $data=json_encode($data); 
    echo($data);
?>