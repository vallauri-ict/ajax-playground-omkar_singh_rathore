"use strict";

$(document).ready(function(){
    let _table=$("#mainContent table");
    let vetAccessori=["ID","NOME","CATEGORIA","COLORE","LUNGHEZZA(CM)","LARGHEZZA(CM)","PREZZO"];
    let vetInformatica=["ID","NOME","MODELLO","RAM","SSD","PROCESSORE","RISOLUZIONE","PESO(KG)","PREZZO"];
    let vetLibri=["ID","NOME","COLORE","PAGINE","GENERE","PREZZO"];



    ///Ricerca della categoria cliccata
    let url_string=window.location.href;
    let url=new URL(url_string);
    let id=url.searchParams.get("id");
    if(id.toLowerCase()=="accessori")
    {
        $("#categoria").show();
        $("#Search").removeClass("col-md-4");
        $("#Search").addClass("col-md-12");
        $("#Search").css({
            "margin-top":"150px",
            "float":"left"
        });
    }
    else
    {
        $("#categoria").hide();
        $("#Search").addClass("col-md-4");
    }

    /// richiedi dati dal server
    let RichiestaData= inviaRichiesta("GET","server/_elencoDati.php",{"id":id});
    RichiestaData.done(function(data){
        console.log(data);
        caricaTabella(data);
    });

    RichiestaData.fail(function(jqXHR,textStatus,str_error){
        if((jqXHR.status == 0)||(jqXHR.status == 403))
            window.location.href="login.html";
        else
            error(jqXHR,textStatus,str_error);
    });

    $("#btnSearch").on("click",function(){
        let RichiediDati=inviaRichiesta("POST","server/_elencoDati_Ricerca.php",{"value":$("#txtSearch").val(),"id":id});
        RichiediDati.done(function(data){
            caricaTabella(data);
        })
        RichiediDati.fail(function(jqXHR,test_status,str_error){
            error(jqXHR,test_status,str_error)
        });
    })

    $("#categoria select").on("change",function(){
        ///utilizzato esclusivamente solo per la tabella Accessori
        let RichiestaDati=inviaRichiesta("GET","server/_elencoDati_Categoria.php",{"value":$(this).val()});
        RichiestaDati.done(function(data){
            caricaTabella(data);
        })
        RichiediDati.fail(error(jqXHR,textStatus,str_error));
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
        RichiedeLogOut.fail(function(jqXHR,test_status,str_error){
          error(jqXHR,test_status,str_error)
        });
    });


    $("#FiltraPrezzo div").children().on("click",function(){
        let selected= $(this).html();
        switch(selected)
        {
            case '0-100 EURO':
                {
                    filtraPrezzo(0,100,id.toLowerCase());
                    break;
                }
            case '100-300 EURO':
                {
                    filtraPrezzo(100,300,id.toLowerCase());
                    break;
                }
            case '300-1000 EURO':
                {
                    filtraPrezzo(300,1000,id.toLowerCase());
                    break;
                }
        }
    })



    $("#Ordinamento div").children().on("click",function(){
        let selected= $(this).html();
        switch(selected)
        {
            case 'PREZZO(crescente)':
                {
                    ordinaBasePrezzo("crescente",);
                    break;
                }
            case 'PREZZO(decrescente)':
                {
                    ordinaBasePrezzo("decrescente");
                    break;
                }
            case 'ALFABETICO(crescente)':
                {
                    OrdinaAlfabetico("crescente");
                    break;
                }
            case 'ALFABETICO(decrescente)':
                {
                    OrdinaAlfabetico("decrescente");
                    break;
                }
        }
    });

    $("#categoria div").children().on("click",function(){
        let selected=$(this).html();
        richiestaServer("server/_elencoDati_Categoria.php",{"category":selected}) //non passo id perchè tanto questo combobox si utilizza soltanto se ho cliccato card di accessori
    })
    
    $("#table ").on("click","td",function(){
        let idDetail=$(this).parent().prop("id");
        idDetail++;
        window.location="Details.html?id="+idDetail+"&card="+id;
    })

    function filtraPrezzo(min,max,id)
    {
        let RichiediDati=inviaRichiesta("GET","server/_elencoDati_Prezzo.php",{"min":min,"max":max,"id":id});
        RichiediDati.done(function(data){
            console.log(data);
            caricaTabella(data);
        })
        RichiediDati.fail(function(jqXHR,test_status,str_error){
            error(jqXHR,test_status,str_error);
        })
    }
    

    function ordinaBasePrezzo(modalità)
    {
        if(modalità=="crescente")
        {
            //ordinamento crescente
            richiestaServer("server/_elencoDati_PrezzoUP.php",{"id":id});
        }
        else if(modalità=="decrescente")
        {
            //ordinamento decrescente
            richiestaServer("server/_elencoDati_PrezzoDOWN.php",{"id":id});
        }
        else
            alert("modalità di ordinamento errata");
    }

    function OrdinaAlfabetico(modalità)
    {
        if(modalità=="crescente")
        {
            //ordinamento crescente
            richiestaServer("server/_elencoDati_OrdCrescente.php",{"id":id});
        }
        else if(modalità=="decrescente")
        {
            //ordinamento decrescente
            richiestaServer("server/_elencoDati_OrdDecrescente.php",{"id":id});
        }
        else
            alert("modalità di ordinamento errata");
    }

    function richiestaServer(path,parameters)
    {
        let RichiediDati=inviaRichiesta("GET",path,parameters);
            RichiediDati.done(function(data){
                console.log(data);
                caricaTabella(data);
            })
            RichiediDati.fail(function(jqXHR,test_status,str_error){
                error(jqXHR,test_status,str_error);
            })
    }

    function caricaTabella(data){
        ///carica i dati sulla tabella
        _table.html(""); //svuoto la tabella
        switch(id.toLowerCase())
        {
            case 'accessori':
                {
                    caricaThead(vetAccessori);
                    break;
                }
            case 'informatica':
                {
                    caricaThead(vetInformatica);
                    break;
                }
            case 'libri':
                {
                    caricaThead(vetLibri);
                    break;
                }    
        }
        let _tbody=$("<tbody>");
        for(let i=0;i<data.length;i++) ///carico i record
        {
            let _tr=$("<tr>").prop("id",i).addClass("data-row-style");
            let _th;
            for(let item in data[i])
            {
                if(item=="prezzo")
                    _th=$("<td>").html(data[i][item]+"&#8364").appendTo(_tr);
                else if(item !="imgPath")
                    _th=$("<td>").html(data[i][item]).appendTo(_tr);

            }
            _tr.appendTo(_tbody);
            _tr.appendTo(_table);
        }
    }

    function caricaThead(elencoCampi)
    {
        let _thead=$("<thead>").addClass("thead-dark");
        let _tr=$("<tr>");
        for(let i=0;i<elencoCampi.length;i++)
        {
            let _th=$("<th>").html(elencoCampi[i]).appendTo(_tr);
        }
        _tr.appendTo(_thead);
        _thead.appendTo(_table);
    }
});