"use strict";


$(document).ready(function(){
    let url_string=window.location.href;
    let url=new URL(url_string);
    let idProduct=url.searchParams.get("id");
    let Card=url.searchParams.get("card");

    //Richiesta Al server
    let RichiediDati = inviaRichiesta("GET","server/_Dettagli.php",{"id":idProduct,"Card":Card});
    RichiediDati.done(function(data){
        console.log(data);
        ///Caricamento in dettaglio del prodotto selezionato
        let imgPath=data[0]["imgPath"];
        $("#image").prop({
            "src":imgPath
        });
        for(let item in data[0])
        {
            if(item !="imgPath")
            {
                let _div=$("<div>").addClass("row");
                let _title=$("<h5>").html(item+" :  ").appendTo(_div);
                let _content=$("<h6>").html("&nbsp &nbsp"+data[0][item]).addClass("lead").css("font-style","italic").appendTo(_div);
                $("<br>").appendTo(_div);
                _div.appendTo($("#mainContent"));
            }
        }
    });

    RichiediDati.fail(function(jqXHR,test_status,str_error){
        error(jqXHR,test_status,str_error);
    })

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
    });
})