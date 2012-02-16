
//INIT OF ISCROLL PLUGIN
var selectedSubtypesOfRealities= new Array();  
var myScroll;
//var myLat;
//var myLong;

var countOfSubtypes = new Object();

function loaded() {
	myScroll = new iScroll('wrapper');
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/* * * * * * * *
 *
 * Use this for high compatibility (iDevice + Android)
 *
 */
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
/*
 * * * * * * * */


/* * * * * * * *
 *
 * Use this for iDevice only
 *
 */
//document.addEventListener('DOMContentLoaded', loaded, false);
/*
 * * * * * * * */


/* * * * * * * *
 *
 * Use this if nothing else works
 *
 */
//window.addEventListener('load', setTimeout(function () { loaded(); }, 200), false);
/*
 * * * * * * * */


/*CUSTOM FUNCTIONS*/

$(document).ready(function () {
	$.extend(MyApp.resources, localizedResources);

	});



//INIT PHONEGAP
function init() {
	

    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
	$.extend(MyApp.resources, localizedResources);
	checkSettings();
	document.addEventListener("deviceready", deviceInfo, true);
	
   
}




//CHECK ALL SETTING AFTER START OF APP, IF FIRST TIME START UP OF APP
//GET ALL JSON VALUES FOR FORMS FILLING 

function checkSettings()
{
	var firstTimeStartUp = localStorage.firstTimeStartUp;
	
	console.log("firstTimeStartUp VALUE IS: "+firstTimeStartUp);
	
	if (Number (firstTimeStartUp) !== 1)
	{
		console.log("APP IS STRARTING FOR FIRST TIME, DOWNLOADING ALL VALUES ");
		localStorage.firstTimeStartUp=1;
		downloadClassifiers('http://pts.ceskereality.cz/json/ciselniky.html', 'GET');
	}
	
	if (Number (firstTimeStartUp) == 1)
	{
		console.log("APP NOT STRARTING FOR FIRST TIME ALL CLASSIFIERS ARE STORED, FETCHING TO FORMS ");	
		
		
		// Retrieve all the object from storage
		//this procedure is repeated everytime after startup the app
		var fetchedClassifiers = localStorage.getItem('Classifiers');
		
		//console.log(fetchedClassifiers);
		// Parse to access 
		var parsedFetchedClassifields = JSON.parse(fetchedClassifiers);

		console.log('retrievedObject:'+ parsedFetchedClassifields);
		console.log(parsedFetchedClassifields);
		
		
		
		//TODO
		//FILL ALL FORMS AND LISTS WITH DTA FROM CLASSIFIERS
		
		
		
		
		
		/*FILL CITY  LIST*/
		
		var listOFAllCities = parsedFetchedClassifields.ciselniky.okres;
		
		console.log("Seznam mest");
		console.log(listOFAllCities);
		
		
		$.each(listOFAllCities, function(key, value) { 
				  console.log(key + ': ' + value); 
					$(".listOfAllCities").append("<li><a onClick=\"passParamsOfCity("+key+","+"'"+value+"'"+");\" class=\"pageForReturn\" href=\"\" idOfCity=\""+key+"\" >"+value+"</a></li>");
		});
		$('.listOfAllCities').listview('refresh');
		
		/*//FILL CITY  LIST*/
		
		
		
		
		
			  
				
	}
	
	
}

/*FILL TYPE OF FLATS  LIST*/
function fillTypeOfRealitiesToSelect(subtype) {
	
	
	//GET COUNT OF REALITY TYPES
	
	
	$(".infoBarHeadingText").text('Ziskavam informace o subtypech');
	
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/pocty_subtypy.html",
							data: "typ="+subtype+"",
							type : "GET",
							
							success : function(result) {
								console.log("fillTypeOfRealitiesToSelect prejalo parametr"+subtype+"");	
								
								
								console.log(result.pocty_subtypy);
								
								countOfSubtypes = result.pocty_subtypy;
								
								
								$(".infoBarHeadingText").text('INFORMACE O SUBTYPECH NACTENY');
								$(".infoBar").hide('slow');		
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
				
	console.log(countOfSubtypes);			
				
	
	//!GET COUNT OF REALITY TYPES
	
	var fetchedClassifiers = localStorage.getItem('Classifiers');
	
	//console.log(fetchedClassifiers);
	// Parse to access 
	var parsedFetchedClassifields = JSON.parse(fetchedClassifiers);

	//console.log('retrievedObject:'+ parsedFetchedClassifields);
	//console.log(parsedFetchedClassifields);
	
	
	
	var flatForRentList = parsedFetchedClassifields.ciselniky.subtyp[subtype];
	
	console.log(flatForRentList);
	
	$('.listOfSubtypes li').remove();
	
	$.each(flatForRentList, function(key, value) { 
	console.log(key + ': ' + value); 
	$(".listOfSubtypes").append("<li onClick=\"addSubtypeToSelect("+key+","+"'"+value+"'"+");\"><a  id=\"subtypeId"+key+"\" ><h3 class=\"nameOfReality\">"+value+"</h3><p class=\"countOfRealities\">"+key+"</p><a data-rel=\"dialog\"  data-transition=\"slideup\">	</a></li>");
	});	
	//$('.listOfSubtypes').listview('refresh');


	
}

function addSubtypeToSelect(key,value)
{
	console.log(key);
	console.log("#subtypeId"+key+"");

	
	
	//REMOVE SELECT ITEM FROM LIST
	if($("#subtypeId"+key+"").css("background-color")=="rgb(38, 130, 193)")
	{
	console.log("Je obarveno, odbarvuji");	
	$("#subtypeId"+key+"").css("background-color", "#fff");
	console.log("BARVA JE NYNI"+ $("#subtypeId"+key+"").css("background-color"));
	selectedSubtypesOfRealities.splice(key, 1);
	console.log("Z POLE NA INDEXU: "+key+" ODEBRANA HODNOTA "+value+"");
	}
	
	
	//ADD SELECT ITEM TO LIST
	else if($("#subtypeId"+key+"").css("background-color")=="rgba(0, 0, 0, 0)" || $("#subtypeId"+key+"").css("background-color")=="rgb(255, 255, 255)")
	{
	console.log("Neni obarveno, obarvuji");	
	$("#subtypeId"+key+"").css("background-color", "#2682C1");
	console.log("BARVA JE NYNI"+ $("#subtypeId"+key+"").css("background-color"));
	selectedSubtypesOfRealities[key] = value;
	console.log("DO POLE NA INDEX: "+key+" PRIDANA HODNOTA"+value+"");
	
	//PASS PARAMS TO FORM AND FILL NAMES TO THE BUTTON
	
	//DELETE DEFAULT TEXT IN BUTTON UF IS SET
	if($(".choosenSubtypesBtn .ui-btn-text").text() == "Zvolte typ nemovitosti");
	{
	$(".choosenSubtypesBtn .ui-btn-text").text("");
	}
	//JOIN TEXT INT BUTTON
	$(".choosenSubtypesBtn .ui-btn-text").append(value);
	
	}

	
	//APPEND SUBTYPES ID INTO selectedSubtypes attr
	var subtypesString = "";
	
	$.each(selectedSubtypesOfRealities, function(key, value) { 
		//console.log(key + ': ' + value); 
		
		if(value != undefined)
		{	
			//PREPARE STRING
			subtypesString += key+",";
		
		}
		
	});	
	
	//INSERT STIRNG INT ATTR
	$(".choosenValues").attr('selectedSubtypes',subtypesString );
	//
	
	
	//ECHO CONTENT ONTO ARRAY 
	console.log(selectedSubtypesOfRealities);
	
}

/*//FILL TYPE OF FLATS  LIST*/




//GET NAME AND 
//ID OF EACH SELECTED CITY
function passParamsOfCity(id,name) {

console.log("Vybrano mesto s id a jmenem "+ id + " "+name);	
$(".choosenCityBtn .ui-btn-text").text(name);
$(".choosenValues").attr('idOfCity',id);

}


//GET ID OF PAGE WHERE  
//USER IS REDIRECTED AFTER SELECT OF CITY

/*typeOfPrice is experimental param, is used for show, hwhat type of price (sale, rent)
 *will be offer to user (every page will have be different type, or any) 
 **/


function pageForReturn(idOfpageForReturn,typeOfPrice) {

	console.log("Po zvoleni mesta navrat na stranku: "+idOfpageForReturn);
	
	 $(".pageForReturn").each(function() {
	        $(this).attr( 'href' , "#"+idOfpageForReturn );
	    });
	 
	 
	 if(typeOfPrice == 'sale')
     {
		 	fillSelectPricePage('sale');
     }
	 
	 
	 if(typeOfPrice == 'rent')
     {
		 fillSelectPricePage('rent');
     }
	 
	 if(!typeOfPrice)
     {
		 	
     }
	 
	 

}

//UNIVERSAL FUNCTION FOR PASING PARAMMS FROM FORM TO SEARCH FUNCTION

function getParamsForSearch() {

	//ATTR TYPE PRESENTS TYPE OF REALITY, PRICE, ETC.., FOR EXAMPLE type="2" is USED FOR FLATS  <div data-role="page" data-theme="b" id="flatsOnSalePage" type="2">
	
	
	//TODO IMPLEMENT jensgps INTO  APP
	var jensgps = 0;	
	//TODO HOW TO RESOLVE TYP SALE OR RENT? TOOGLE BTN OR IN PAGE?
	//ATTR TYPE PRESENTS TYPE OF REALITY, FOR EXAMPLE type="2" is USED FOR FLATS  <div data-role="page" data-theme="b" id="flatsOnSalePage" type="2">
	
	var typ = $('.ui-page-active').attr('type');
	
	var subtyp = $('.ui-page-active').attr('selectedSubtypes');
	
	var okres = $('.ui-page-active').attr('idOfCity');
	
	var stranka = "1";
	
	var trideni = "cena";
	
	var ascdesc = "asc";
	
	var cenaod = $('.ui-page-active').attr('priceFrom');
	
	var cenado = $('.ui-page-active').attr('priceTo');
	
	var plochaod = $('.ui-page-active').attr('sizeFrom');
	
	var plochado = $('.ui-page-active').attr('sizeTo');
	
	var mojelat = $('.ui-page-active').attr('mojelat');
	
	var mojelon = $('.ui-page-active').attr('mojelon');
	
	
	
	 console.log('GPS: '          + jensgps         + '\n' +
	         'TYP: '         + typ        + '\n' +
	         'SUBTYP: '          + subtyp         + '\n' +
	         'OKRES: '          + okres         + '\n' +
	         'trideni podle: ' + trideni  + '\n' +
	         'ascdesc: '           + ascdesc          + '\n' +
	         'cenaod: '             + cenaod             + '\n' +
	         'cenado: '             + cenado            + '\n' +
	         'plochaod: '             + plochaod            + '\n' +
	         'plochado: '             + plochado            + '\n' +
	         'mojelat: '             + mojelat            + '\n' +
	         'mojelon: '         + mojelon     + '\n');
	 
	 
	
	//VERIFY, THAT IMPORTANT VALUES IN FORM  ARE FILLED
	
	 
	 
	 if(typ.length == 0 || subtyp.length== 0 || okres.length== 0 || cenaod.length == 0 || cenado.length == 0 )
		 
	 {
	 $(".infoBarHeadingText").text('Nespravne zadane hodnoty, vyberte prosim znovu');	
	 $(".infoBar").show();
	 }	
	 
	 else
	 {
		 getListOfRealities(jensgps, typ, subtyp, okres, stranka, trideni, ascdesc, cenaod, cenado, plochaod, plochado, mojelat, mojelon);
	 }
	
}


/*Writeout list of all matched realities by passed params
 * Example:
 * http://pts.ceskereality.cz/json/vypis.html?jensgps=0&typ=2&subtyp=1,3&okres=13&stranka=1&trideni=cena&ascdesc=desc&cenado=150000&cenaod=1200&plochaod=10&plochado=1000&mojelat=48.9808&mojelon=15.4814
 * */
function getListOfRealities(jensgps,typ,subtyp,okres,stranka,trideni,ascdesc,cenaod,cenado,plochaod,plochado,mojelat,mojelon)
{

	console.log("FCE getListOfRealities spustena");
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/vypis.html",
							data: {jensgps:jensgps,typ:typ,subtyp:subtyp,okres:okres,stranka:stranka,trideni:trideni,ascdesc:ascdesc,cenaod:cenaod,cenado:cenado,plochaod:plochaod,plochado:plochado,mojelat:mojelat,mojelon:mojelon},
							type : "GET",
							
							success : function(result) {
							
								console.log(result);
								
								
								
								$(".infoBarHeadingText").text('OBEC USPESNE NACTENA');
								$(".infoBar").hide('slow');		
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}



/*Fill select list of price range for rent or sale
 * price for rent Kc/ Month
 * price for sale 100000 Kc ++ 
 * */

function fillSelectPricePage(typeOf) {

	var steps = 30; 
	
	
	$('#priceRange').click(function() {
	    
		
	    console.log ("Cena od zvolena  :" + $('select#priceFrom option:selected').val()); 
	    console.log ("Cena od do  :" +$('select#priceTo option:selected').val()); 
	    
	    //UPDATE VALUES IN PAGE WHERE IS RETURNED TO

	    
	    $(".choosenPriceBtn .ui-btn-text").text($('select#priceFrom option:selected').text()+" - "+$('select#priceTo option:selected').text());
	    $(".choosenValues").attr("priceFrom",$('select#priceFrom option:selected').val());
	    $(".choosenValues").attr("priceto",$('select#priceTo option:selected').val());
	    
	});
	
	
	/*FILL FOR RENT OF FLATS, HOUSES, AREAS, ETC*/
	
	if(typeOf = "rent")
	{
		

		//TODO FILL INTO LIST USER CURRENCY 
		for ( var int = 0; int < steps; int++) {
		
			$("#priceFrom").append("<option value=\""+int * 10000+"\ >"+int * 10000+"</option>");
			
		}
		
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceFrom").append("<option value=\""+int * 10000+"\">"+int * 10000+"</option>");

			
		}
		
		
		
	}
	
	
	/*FILL FOR SALE OF FLATS, HOUSES, AREAS, ETC*/
	
	if(typeOf = "sale")
	{
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceFrom").append("<option value=\""+int * 100000+"\">"+int * 100000+"</option>");

			
		}
		
		
	for ( var int = 0; int < steps; int++) {
			
			$("#priceTo").append("<option value=\""+int * 10000+"\">"+int * 10000+"</option>");

			
		}
	}
	
	
	
	
	
	
	
}

//GET ALL CLASSIFIERS FOR APP INTO LOCAL STORAGE
//DURING RUN OF THIS FUNCTION WE INFORM USER ABOUT PROCESSING OF DOWNLOAD
function downloadClassifiers(url,method)
{			
	$(".infoBarHeadingText").text('nacitam ciselniky');
	
	$(".infoBar").show();
	
			jQuery.ajax({
						url :url,
						type : method,
						success : function(result) {
							console.log('UKLADAM CISELNIKY');
							//localStorage.Classifiers = result;
							// Put the object into storage
							
							console.log("JSON STR");
							console.log(JSON.stringify(result));

							localStorage.setItem('Classifiers', JSON.stringify(result));
							
							
							console.log(localStorage.Classifiers);

						

						},
						complete : function(result) {
							console.log('HOTOVO CISELNIKY');
							$(".infoBarHeadingText").text('ciselniky uspesne ulozeny');
							$(".infoBar").hide('slow');		

						},
						// IF HTTP RESULT 400 || 404
						error : function(x, e) {
								
							typeOfRequestError(x, e);
						}
					});

}




function typeOfRequestError(x, e)
{

	if (x.status == 0) {
		console.log('You are offline!!\n Please Check Your Network.');
		$(".infoBarHeadingText").text('Chyba : Nedostupne internetove pripojeni.');
		$(".infoBar").show();		
		
	} else if (x.status == 404) {
		console.log('Requested URL not found.');
		$(".infoBarHeadingText").text('Chyba 404: adresa nenalezena.');
		$(".infoBar").show();		

	} else if (x.status == 500) {
		console.log('Internel Server Error');
		$(".infoBarHeadingText").text('Chyba 505: chyba serveru, zkuste to prosim za chvili.');
		$(".infoBar").show();		

	} else if (e == 'parsererror') {
		console.log('Error.\nParsing JSON Request failed.');
		$(".infoBarHeadingText").text('Chyba : vyskytla se chyba pri parsovani dat.');
		$(".infoBar").show();		

	} else if (e == 'timeout') {
		console.log('Request Time out.');
		$(".infoBarHeadingText").text('Chyba : casovy limit pro propojeni vyprsel.');
		$(".infoBar").show();		

	} else {
	
		console.log('Unknow Error.\n' + x.responseText);
		$(".infoBarHeadingText").text('Chyba : neznama chyba. '+x.responseText+"");
		$(".infoBar").show();		

		
	}

}



function getJson(url,type,data)
{
	console.log(url);
	console.log(type);

    $.ajax({
        
        url: url,
        dataType: "json",
        //async: false,
        data:data,
        success:
        function(result) {
            test(result);
        },
        error:
            function(errorThrown) {
                alert("Error occured: " + errorThrown);
            }
        });

     
}


//GET ACTUAL GPS COORDS
//AND GET NEAREST CITY FROM USER AND WRITEOUT
function getMyPosition(getAlsoMunicipality)
{

// onSuccess Callback
//  This method accepts a `Position` object, which contains
//  the current GPS coordinates
//
var onSuccess = function(position) {
   console.log('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + new Date(position.timestamp)      + '\n');
   
  // myLat = position.coords.latitude;
  // myLong = position.coords.longitude;

   if (getAlsoMunicipality == "1")
	   {
   
	   $(".mojelat").attr('');
	   getMunicipalityByGpsCoords(position.coords.latitude,position.coords.longitude);
	   $(".choosenValues").attr("mojelat",position.coords.latitude );
	   $(".choosenValues").attr("mojelon",position.coords.longitude );
  
	   }
   

   //IF WE NEED MARK POSITION FOR SEARCH ON MAP 
   if (getAlsoMunicipality == "selectOnMap")
	   {
	   
	   console.log('HLEDAM PODLE ZADANI NA MAPE');
   
	   $(".mojelat").attr('');
	   $(".choosenValues").attr("mojelat",position.coords.latitude );
	   $(".choosenValues").attr("mojelon",position.coords.longitude );
	   
	   showOnMap(position.coords.latitude,position.coords.longitude);

	   
	   }
   
};



//WRITEOUT NEAREST CITY TO USER



//onError Callback receives a PositionError object
//
function onError(error) {
	
	//TODO ERROR MESS FOR USER
	console.log("GPS ERROR code: "   + error.code +"message:" + error.message);
	
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

}



//GET NEAREST CITY BY GPS COORDS AND FILL ID OF THIS CITY INTO ATTRIBUTE municipalityId
function getMunicipalityByGpsCoords(Lat,Long) {


$(".infoBarHeadingText").text('Ziskavam informace o aktualni poloze');
	
$(".infoBar").show();
	
			jQuery.ajax({
						
						url :"http://pts.ceskereality.cz/json/gps_obce.html",
						data: "mojelat="+Lat+"&mojelon="+Long+"",
						type : "GET",
						
						success : function(result) {
							console.log("getMunicipalityByGpsCoords prejalo souradnice"+Lat+" a "+Long+"");	
							
							//TODO PARSE
							console.log(result.nejblizsi_obec);
							var nearestMunicipality = result.nejblizsi_obec.split(',');
							
							console.log("NEJBLIZSI MESTO MA ID "+nearestMunicipality[0]+"A NAZEV"+nearestMunicipality[1]+"");
							passParamsOfCity(nearestMunicipality[0], nearestMunicipality[1]);
							
							
							
							$(".infoBarHeadingText").text('OBEC USPESNE NACTENA');
							$(".infoBar").hide('slow');		
							
						},
						// IF HTTP RESULT 400 || 404
						error : function(x, e) {
								
							typeOfRequestError(x, e);
						}
					});
	
}




//SHOW MY CURRENT LOCATION ON GOOGLE MAP FOR NEXT USE 
//DOCUMENTATION FOR THIS PLUGIN IS HERE 
//http://code.google.com/p/jquery-ui-map/wiki/jquery_ui_map_v_3_sample_code
function showOnMap(Lat,Long) {

$(".infoBarHeadingText").text('Ziskavam informace o aktualni poloze');
$(".infoBar").show();


console.log('showOnMap runs');

console.log("Lat"+Lat+"Lon"+Long+"" );
/*
$('#map_canvas').gmap().bind('init', function(ev, map) {
	$('#map_canvas').gmap('addMarker', {'position': '48.978714,14.469563', 'bounds': true}).click(function() {
		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
	});
});
*/


$('#map_canvas').gmap().bind('init', function(event, map) { 
	$(map).click( function(event) {
		$('#map_canvas').gmap('addMarker', {
			'position': event.latLng, 
			'draggable': true, 
			'bounds': false
		}, function(map, marker) {
			console.log(marker.__gm_id);
			console.log(marker.__gm_id);
			console.log(marker.__gm_id);
		
			findLocation(marker.getPosition(), marker);
		}).dragend( function(event) {
			findLocation(event.latLng, this);
		}).click( function() {
			openDialog(this);
		})
	});
});

function findLocation(location, marker) {
	
	console.log(location);
	console.log(marker);
	
	$('#map_canvas').gmap('search', {'location': location}, function(results, status) {
		console.log(results[0].address_components);
		
		if ( status === 'OK' ) {
			
			console.log(results[0].address_components);
			
			$.each(results[0].address_components, function(i,v) {
				if ( v.types[0] == "administrative_area_level_1" || 
					 v.types[0] == "administrative_area_level_2" ) {
					
					console.log(v.long_name);
					
				} else if ( v.types[0] == "country") {
					console.log(v.long_name);
					
				}
			});
			console.log(results[0].formatted_address);
			marker.setTitle(results[0].formatted_address);
			
			//openDialog(marker);
		}
	});
}

function openDialog(marker) {
	$('#dialog'+marker.__gm_id).dialog({'modal':true, 'title': 'Edit and save point', 'buttons': { 
		"Remove": function() {
			$(this).dialog( "close" );
			marker.setMap(null);
		},
		"Save": function() {
			$(this).dialog( "close" );
		}
	}});
}



$.mobile.changePage( "#selectOnMapPage");	


}