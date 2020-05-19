"use strict";

let _table=$("#tblDetails tbody");

let  companies=[
    {
        "Id":"MSFT",
        "Name":"Microsoft Corporation SPA"
    },
    {
        "Id":"IBM",
        "Name":"IBM"
    },
    {
        "Id":"SNE",
        "Name":"Sony Corporation"
    },
    {
        "Id":"BABA",
        "Name":"AliBbaba China"
    },
    {
        "Id":"XIACF",
        "Name":"Xiaomi Corporation"
    }
];

const _scope="https://www.googleapis.com/auth/drive";
const _redirect_uri="http://127.0.0.1:8080/upload.html";

$(document).ready(function () {
    let _Sector=$("#ComboSector");

    ControlAccessToken(); ///Controllo di token
    //---------------------------------------LOGIN CONTROL ACCESS-----------------
    $("#LogOut").on("click",function(){ //Clicco solo per fare logout, mentre per fare login lo fa automaticamente, quando vado a fare upload dei file
        if(localStorage.getItem("accessToken"))
            signOut();
    })

    //--------------------------------Gestione di link su navigation bar---------------------------------
    $("#Search_Link ").on("click",function(){
        ScrollPage($("#quote"),1000);
    });
    $("#Graphic_Link").on("click",function(){
        ScrollPage($("#ComboSector"),1500);
    });
    $("#Download_Upload_Link").on("click",function(){
        ScrollPage($("#Options"),2000);
    });
    


    //----------------------------CARICAMENTO COMBOBOX COMPANIES TRADIZIONALE---------------------------------------
    
    //for(let i=0;i<companies.length;i++)
    //{
    //    $("<option>").prop("value",companies[i].Id).text(companies[i].Name).appendTo($("#Lst_Companies"));
    //}

    //---------------------CARICAMENTO COMBOBOX COMPANIES TRAMITE Node.js--> json-server-----------------------------
    
    let _companies= $.getJSON("http://localhost:3000/companies",function(data){
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
            $("<option>").prop("value",data[i].Id).text(data[i].Name).appendTo($("#Lst_Companies"));
        }
    });


    
    //--------------------------------RICERCA INCREMENTALE-------------------------------------------
    $("#txtSearch").on("keyup",function(){
        if($(this).val().length>=2)
            {
                let Ricerca=inviaRichiesta("GET","https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + $(this).val()+ "&apikey=4OGSYZ0P5TW95U2Z");
                Ricerca.done(function(data){
                    _table.html("");
                   //alert("ok");
                    console.log(data);
                    try
                    {
                        for(let i=0;i<4;i++)
                        {
                            let symbol=data["bestMatches"][i]["1. symbol"];
                            let Details=inviaRichiesta("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=4OGSYZ0P5TW95U2Z");
                            Details.done(function(data){
                                //alert("Corretto Dati");
                                console.log(data);
                                createRow(data["Global Quote"]);
                            }) 
                            Details.fail(error);
                        }
                    }
                    catch(error){};
                });
                Ricerca.fail(error);
            }
    });

    //---------------------------------------RICERCA TRAMITE COMBOBOX---------------------------------
    $("#Lst_Companies").on("change",function(){
        let symbol=$(this).prop("value");
        getGlobalQuotes(symbol);
    });

    //--------------------------------------RICERCA TRAMITE BOTTONE 'SEARCH'-------------------------
    $("#btnSearch").on("click",function(){
        let symbol=$("#txtSearch").val().toUpperCase();
        let Details=inviaRichiesta("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTES&symbol="+symbol+"&apikey=4OGSYZ0P5TW95U2Z");
        Details.done(function(data){
            _table.html("");
            createRow(data["Global Quote"]);
        });
        Details.fail(error);
    })
    //--------------------------------------CARICAMENTO COMBOBOX SECTOR------------------------------
    let RichiediSector=$.getJSON("http://localhost:3000/SECTOR",function(data){
        console.log(data);
        for(let key in data)
        {
            if(key!="Meta Data")
            {
                $("<option>").prop("value",key).text(key).appendTo(_Sector);
            }
        }    
    
    });

    //-----------------------------------------------CHART--------------------------------------------

    ///Default grafico
    //$.getJSON("http://localhost:3000/chart", function (data) {
    //   let  ctx = document.getElementById('myChart').getContext('2d');
    //   let myChart = new Chart(ctx, data);
    //});

    Chart.defaults.global.elements.rectangle.borderWidth = 5;

    $("#Options").hide(); ///div di download e upload sono nascosti,finchè non c'è un grafico presente
    $("#myChart").hide();
    $("#Download_Upload_Link").prop("disabled",true); // per forza il link sul navigation bar di download, deve essere disabilitato se ho disabilitato l'altro 
                                                      // e al click per generare il grafico, verranno riabilitati tutti e due. 
    _Sector.on("change",function(){
        let Sector_Selected=$(this).val();
        let Details=inviaRichiesta("GET","http://localhost:3000/SECTOR",Sector_Selected);
        Details.done(function(data){
            console.log(data[Sector_Selected]);
            $("#myChart").show();
            $("#Options").show();
            $("#Download_Upload_Link").prop("disabled",false);
            UpdateGraphic(data[Sector_Selected]); 
        });
        Details.fail(error);

    });

    //-------------------------------------DOWNLOAD-------------------------------------------
    $("#Options #Download a").on("click",function(){
        ///DOWNLOAD DEL GRAFICO E SALVARLO NEL LOCALE
        var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        $(this).prop("href",url_base64jp);
    })

    //------------------------------------UPLOAD----------------------------------------------

    $("#Upload").on("click",function(){
        ControlAccessToken();
        if(localStorage.getItem("accessToken")==null)
        {
            let web= inviaRichiesta("GET","http://localhost:3000/web");
            web.done(function(data){
                let clientId=data[0]["client_id"];
                let redirect_uri=_redirect_uri;
                let scope=_scope;
                let url="";
                signIn(clientId,redirect_uri,scope,url);
            });
            web.fail(error);
        }
        else
            window.location="upload.html";
    });

});



function ScrollPage(id,time)
{
    $("html,body").animate({
        scrollTop: $(id).offset().top
    },time);
}


function UpdateGraphic(DataChart){
    let  ctx = document.getElementById('myChart').getContext('2d');
    let _Chart_Details=$.getJSON("http://localhost:3000/chart",function(chart){
    console.log(chart);
    chart["data"]["labels"]=[];
    chart["data"]["datasets"][0]["data"]=[];
    let DataSets=chart["data"]["datasets"][0];
    let Chart_Data= chart["data"];
    console.log(DataSets["data"]);
    let IndexColor1;
    let IndexColor2;
    let IndexColor3;
        for(let key in DataChart)
        {
            IndexColor1=Random(0,255);
            IndexColor2=Random(0,255);
            IndexColor3=Random(0,255);
            Chart_Data["labels"].push(key.toUpperCase());
            DataSets["data"].push(DataChart[key].replace("%",""));
            DataSets["borderColor"].push("rgba("+IndexColor1+","+IndexColor2+","+IndexColor3+",1");
        }
        let Graphic=new Chart(ctx,chart);
    });   
}


function createRow(data){ ///Data["Global Quote"]
    let _tr=$("<tr>");
    $("<td>").addClass("td").html(data["01. symbol"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["05. price"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["07. latest trading day"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["09. change"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["02. ooen"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["08. previous close"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["03. high"]).appendTo(_tr);
    $("<td>").addClass("td").html(data["06. volume"]).appendTo(_tr);
    _tr.appendTo(_table);
}


function getGlobalQuotes(symbol) {
    let url="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=4OGSYZ0P5TW95U2Z";
    $.getJSON(url,function (data) {
            $("#symbol").text(data["Global Quote"]["01. symbol"]);
            let globalQuoteData = data["Global Quote"];
            $("#previousClose").text(globalQuoteData["08. previous close"]);
            $("#open").text(globalQuoteData["02. open"]);
            $("#lastTrade").text(globalQuoteData["05. price"]);
            $("#lastTradeTime").text(globalQuoteData["07. latest trading day"]);
            $("#change").text(globalQuoteData["09. change"]);
            $("#daysLow").text(globalQuoteData["04. low"]);
            $("#daysHigh").text(globalQuoteData["03. high"]);
            $("#volume").text(globalQuoteData["06. volume"]);
        }
    );
}

function inviaRichiesta(method, url, parameters = "", async = true) {
    return $.ajax({ 
        type: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        timeout: 5000,
        async: async
    });
}
function error(jqXHR, text_status, string_error) {  
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}

function Random(min, max) {
    //INCLUSIVO
    return Math.floor((max - min + 1) * Math.random()) + min;
}
