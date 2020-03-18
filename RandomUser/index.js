"use strict";
let Nat=["AU","BR","CA","CH","DE","DK","ES","FI","FR","GB","IE","IR","NO","NL","NZ","TR","US"];
let Indice=0;
let person;
let Current_dataFile;
$(document).ready(function () {
	//let param = "results=3&gender=female&nat=US";
    //inviaRichiesta(param, aggiornaPagina);
    ///Gestione Menu principale
    let param;
	for(let i=0;i<6;i++)
	{
		$("#divMenu").find("li").eq(i).css({
            "background-image":"url(card_icons.png)",
            "width":"90px",
            "height":"60px", //height:"80px hover"
            "background-position-x":-129*i+"px",
            "background-position-y":"-114px"
		});
	}
	$("#divMenu").find("li").on("mouseover",function(){
        $(this).animate({
            "height":"80px",
            "background-position-y":"0px"
        });

    }).on("mouseout",function(){
        $(this).animate({
            "height":"60px",
            "background-position-y":"-114px"
        });
    });

    ///----------------------------NUMERO DI RICHIESTE-----------------------------------------
    $("<h4>").html("NUMBER OF REQUESTS: ").appendTo($("#divSel"));
    $("<span>").html("1").css({
        "position":"relative",
        "left":"10px"
    }).appendTo($("#divSel"));
    $("<span>").html("10").css({
        "position":"relative",
        "left":"670px"
    }).appendTo($("#divSel"));
    $("<input>").prop("type","range").prop("id","range").prop("min","1").prop("max","10").css({
        "width":"650px",
        "position":"relative",
        "left":"2px",
    }).appendTo($("#divSel"));
	$("<span>").css({
		"height":"30px",
		"position":"relative",
		"bottom":"48px",
		"right":"220px"
	}).prop("id","NumberRange").appendTo($("#divSel"));
	$("#range").on("change",function(){
		$("#NumberRange").html($("#range").val());
	})
	
    //------------------------------------------------------------------------

    //------------------------------Nazionalità-----------------------------------
    $("<h4>").html("NATIONALITY:").css({
        "width":"100px",
        "margin":"5px auto",
        "font-family":'Microsoft Sans Serif'
    }).appendTo($("#divSel"));
    for(let i=0;i<17;i++)
    {
        $("<input>").css({
            "width":"20px",
            "position":"relative",
            "left":1.2*i+"px"
        }).prop("type","checkbox").prop("id","chk"+Nat[i]).appendTo($("#divSel"));
        $("<span>").css({
            "position":"relative",
            "left":1.2*i+"px",
        }).html(Nat[i]).appendTo($("#divSel"));
    }
    //-----------------------------------------------------------------------

    //------------------------------------GENDER--------------------------
    $("<h4>").html("GENDER : ").appendTo($("#divSel"));
    $("<input>").prop("type","checkbox").prop("id","chkFemale").css({
        "position":"relative",
        "left":"50px"
    }).appendTo($("#divSel"));
    $("<span>").html("FEMALE").css({
        "position":"relative",
        "right":"100px"
    }).appendTo($("#divSel"));
    $("<input>").prop("type","checkbox").prop("id","chkMale").css({
        "position":"relative",
        "left":"80px"
    }).appendTo($("#divSel"));
    $("<span>").html("MALE").css({
        "position":"relative",
        "right":"50px"
    }).appendTo($("#divSel"));
    $("<br>").appendTo($("#divSel"));
    //------------------------------------------------------------------------------
    $("<input>").prop({
        "type":"button",
        "value":"Search",
        "id":"Search"
    }).css({
        "position":"relative",
        "left":"1px",
        "margin-top":"25px",
        "margin-bottom":"25px",
        "height":"30px",
        "width":"200px"
    }).appendTo($("#divSel"));
    $("#Left").html("<").css({
        "font-size":"30pt",
        "text-align":"center",
        "line-height":"300px",
        "font-family":'Microsoft Sans Serif',
    });
    $("#Left").on("mouseover",function () {
        $("#Left").animate({
            "width":"70px",
            "opacity":"0.9"
        },800);
    });
    $("#Left").on("mouseout",function () {
        $("#Left").animate({
            "width":"50px",
            "opacity":"0.1"
        },800);
    });

    $("#Right").html(">").css({
        "font-size":"30pt",
        "text-align":"center",
        "line-height":"300px",
        "font-family":'Microsoft Sans Serif',
    });

    $("#Right").on("mouseover",function () {
        $("#Right").animate({
            "width":"70px",
            "opacity":"0.9"
        },800);
    });
    $("#Right").on("mouseout",function () {
        $("#Right").animate({
            "width":"50px",
            "opacity":"0.1"
        },800);
    });

    ///-----------------------INVIA--------------------------
    $("#Search").on("click",function () {
        $("#contenitore").css({
            "height":"350px"
        });
        $("#contenitore").animate({
            "height":"500px"
        },4000);
        $("#Left").animate({
            "height":"300px"
        },4000);
        $("#Right").animate({
            "height":"300px"
        },4000);
        param="results="+$("#range").val();
        if(($("#chkMale").prop("checked"))&&($("#chkFemale").prop("checked")))
            param+="&gender=female|male";
        else
        {
            if($("#chkMale").prop("checked"))
                 param+="&gender=male";
            else
            {
                if($("#chkFemale").prop("checked"))
                    param+="&gender=female";
                else
                    alert("You haven't specified the gender");
            }
        }
        param+="&nat=";
        let contNat=0;
        for(let i=0;i<17;i++)
        {
            if($("#chk"+Nat[i]).prop("checked"))
            {
                contNat++;
                if(contNat>1)
                    param+=","+Nat[i];
                else
                    param+=Nat[i];
            }
        }
        if(contNat==0)
            alert("You haven't specified the nationality'");
        //let param = "results="+$("#range").val()+"&gender=female &nat=US";
        //alert(param);
        inviaRichiesta(param,aggiornaPagina); // +function UpdatePage
        console.log(param);
        $("#Left").on("click",function(){
                if(Indice<=0)
                {
                    alert("It's first");
                }
                else
                {
                    Indice--;
					$("#contenitore").css({
						"height":"350px"
					});
					$("#contenitore").animate({
						"height":"500px"
					},4000);
                    UpdatePage(Indice);
                }
        });
         $("#Right").on("click",function(){
                if(Indice>=$("#range").val())
                {
                    alert("It's Last");
                }

                else
                {
                    Indice++;
					$("#contenitore").css({
						"height":"350px"
					});
					$("#contenitore").animate({
						"height":"500px"
					},4000);
                    UpdatePage(Indice);
                }
        });

    })
});

function inviaRichiesta(parametri, callBack) {
  $.ajax({
    url: "https://randomuser.me/api", //default: currentPage
    type: "GET",
    data: parametri,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    dataType: "json",
    async: true, // default
    timeout: 5000, 
    success: callBack,
    error: function(jqXHR, test_status, str_error) {
      alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
    }
   });
}
function UpdatePage(Indice)
{
    person=Current_dataFile.results[Indice];
    $("#Description").css({
	  "color":"black",
	  "opacity":"0.5",
	  "margin":"5px"
  });
  $("#name").css("font-size","20pt");      
  $("#Description").html("Hi, My name is :");
  let st=person.name.title+" "+person.name.first+" "+person.name.last;
  $("#name").html(st);
       $("#divMenu").find("li").on("mouseover",function()
       {
           switch($(this).prop("id"))
           {
               case "Nome":
               {	
					$("#Description").html("Hi, My name is :");
                   let st=person.name.title+" "+person.name.first+" "+person.name.last;
                   $("#name").html(st);
                   break;
               }
               case "Mail":
               {
				   $("#Description").html("My Email Address is :");
                   let st=person.email;
                   $("#name").html(st);
                   break;
               }
               case "dataNascita":
               {
				   $("#Description").html("My Birthday is :");
                   let st=(person.dob.date).substr(0,10);
				   let split=st.split("-");
				   let aus;
				   aus=split[0];
				   split[0]=split[2];
				   split[2]=aus;
				   st=split[0]+"/"+split[1]+"/"+split[2];
                   $("#name").html(st);
                   break;
               }
               case "Luogo":
               {
				   $("#Description").html("My Address is :");
                   let st=person.location.street.name+" "+person.location.street.number+"  "+person.location.city+" ,"+person.location.state+" ,"+person.location.country;
                   $("#name").html(st);
                   break;
               }
               case "Telefono":
               {
				   $("#Description").html("My Phone Number is:");
                   let st=person.cell;
                   $("#name").html(st);
                   break;
               }
               case "Password":
               {
				   $("#Description").html("My Password is:");
                   let st=person.login.password;
                   $("#name").html(st);
                   break;
               }
           }
       });
  //$("#name").html(st);
  $("#img").attr("src", person.picture.large);
}

function aggiornaPagina(data){
  console.log(data);
  Current_dataFile=data;
  //person = data.results[Indice];
  //let st = person.name.title + " " + person.name.first + " " + person.name.last;
  // alert(st);
  UpdatePage(Indice);
}
