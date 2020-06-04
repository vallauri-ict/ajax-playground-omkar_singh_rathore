"use strict";

$(document).ready(function () {

    if(localStorage.getItem("user")==null)
        window.location="login.html";

    $(".card").on("click",function(){
      let content= $(this).prop("id"); //Accessori,Informatica,Libri. ID di card cliccato

        //aprirò una nuova pagina , in cui ci sono la lista di elementi del content,
        // e lo aprirò soltanto dopo aver mandato una richiesta al server, per i dati che voglio, per poter rappresentarli sulla tabella 
        // questi righe di codice verranno scritte nella js della nuova pagina lista.html
        window.location="Lista.html?id="+$(this).prop("id");      
    });

    $("#logout").on("click",function(){
      let RichiedeLogOut=inviaRichiesta("POST","server/_logout.php");
      RichiedeLogOut.done(function(data){
          ///session distrutto e dunque si ritorna al page del login
          if(data["logout"]==true)
            {
              alert("Ti sei disconnesso");
              setTimeout(function(){
                window.location="login.html";
              },2000);
            }
      })
      RichiedeLogOut.fail(function(jqXHR,test_status,str_error){
        error(jqXHR,test_status,str_error)
      });

    })


});

