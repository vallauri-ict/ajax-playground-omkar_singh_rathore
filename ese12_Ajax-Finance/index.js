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



$(document).ready(function () {

    //carico Combobox
    for(let i=0;i<companies.length;i++)
    {
        $("<option>").prop("value",companies[i].Id).text(companies[i].Name).appendTo($("#Lst_Companies"));
    }
    
    //RICERCA INCREMENTALE
    $("#txtSearch").on("keyup",function(){
        if($(this).value.length>=2)
            {
                let Ricerca=inviaRichiesta("GET","https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + $(this).value+ "&apikey=4OGSYZ0P5TW95U2Z");
                Ricerca.done(function(data){
                    $(_table).html("");
                    //alert("ok");
                    console.log(data);
                    try
                    {
                        for(let i=0;i<4;i++)
                        {
                            let symbol=data["bestMatches"][i]["1. symbol"];
                            let Details=inviaRichiesta("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=4OGSYZ0P5TW95U2Z",{},false);
                            Details.done(function(data){
                                //alert("Corretto Dati");
                                caricaTabella(data["Global Quote"]);
                            }) 
                            Details.fail(error);
                            //let url="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=4OGSYZ0P5TW95U2Z";
                            //$.getJSON(url,function(data){
                            //    caricaTabella(data["Global Quote"]);
                            // })
                        }
                    }
                    catch(ee){};
                });
                Ricerca.fail(error);
            }
    });

    //RICERCA TRAMITE COMBOBOX
    $("#Lst_Companies").on("change",function(){
        let symbol=$(this).prop("value");
        getGlobalQuotes(symbol);
    });

    //CHART
    $.getJSON("http://localhost:3000/chart", function (data) {
       var ctx = document.getElementById('myChart').getContext('2d');
       var myChart = new Chart(ctx, data);
   })
    //getGlobalQuotes("IBM");
});

function caricaTabella(data){
    let _tr=$("<tr>");
    for(let key in data) //key in questo caso sarebbe un dato di global quote come "01. symbol","02. open"
    {
        $("<td>").text(data[key]).appendTo(_tr);
    }
    $(_table).append(_tr);
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