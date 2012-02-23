
//INIT OF ISCROLL PLUGIN
var selectedSubtypesOfRealities= new Array();  
var selectedSubtypesOfAdvertisers= new Array();  
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

$(document).ready( function(){ 

	
//BIND EVENT TO TOOGLE FLIP SWITCH IF IS ENABLED EXTEND SEARCHING SHOW EXTENDED FORM, DEFAULT IS HIDDEN	
	
$("#extendedSearchFlip").bind( "change", function(event, ui) {
	 console.log("changed"); 
	 
	 
	 console.log($("#extendedSearchFlip").val());
	 
	 var showHiddenDiv = $("#extendedSearchFlip").val();
	 
	 if(showHiddenDiv=="yes")
	 {
		 $(".extendedSearchDiv").show();
		fillListOfAdvertisers();
	 }
	 
	 if(showHiddenDiv=="no")
	 {
		 $(".extendedSearchDiv").hide();
	 }
	 
	});

//BIND EVENT IF I SELECT LAST ITEM IN FORM FOR CALCULATION OF AMOUNT OF REPAYMENT
$("#amountOfRepaymentTo").bind( "change", function(event, ui) {
	 console.log("changed"); 
	 
	//GET rate of interest
	// Retrieve all the object from storage
		
	var fetchedClassifiers = localStorage.getItem('Classifiers');
		
	// Parse to access 
	var parsedFetchedClassifields = JSON.parse(fetchedClassifiers);

	console.log('retrievedObject:'+ parsedFetchedClassifields);
	console.log(parsedFetchedClassifields);
		
	/*GTE INTEREST CONSTANT*/
	//TODO 	
	var interestConstant = parsedFetchedClassifields.ciselniky.config;
	 
	 
	 
	 
	 
	 
	 var amountOfRepaymentTo = $("#amountOfRepaymentTo").val();
	 console.log(amountOfRepaymentTo);
	 
	});







});

//INIT PHONEGAP
function init() {
	

    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
	
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
		
		
		
		
		
		/*FILL LIST OF DISTRICTS*/
		
		var listOFDistricts = parsedFetchedClassifields.ciselniky.okres;
		
		console.log("Seznam mest");
		console.log(listOFDistricts);
		
		
		$.each(listOFDistricts, function(key, value) { 
				  console.log(key + ': ' + value); 
					$(".listOfAllDistricts").append("<li><a onClick=\"passParamsOfDistrict("+key+","+"'"+value+"'"+");\"  href=\"#selectLocalityPage\" idOfCity=\""+key+"\" >"+value+"</a></li>");
		});
		$('.listOfAllDistricts').listview('refresh');
		
		/*//FILL LIST OF DISTRICTS*/
		
		
		
		
		
			  
				
	}
	
	
}


//GET NAME AND 
//ID OF  SELECTED DISTRICT
function passParamsOfDistrict(id,name) {

console.log("Vybran Okres s id a jmenem "+ id + " "+name);	
$(".choosenDistrictBtn .ui-btn-text").text(name);
$(".choosenValues").attr('dictrictId',id);

console.log("ATRIBUT idOfDictrict nyni obsahuje: " + $(".choosenValues").attr('dictrictId'));



console.log("VOLAM FCI fillListOfMunicipalities");


fillListOfMunicipalities(id);

}


function fillTypeSellOrRent(type)
{
	if(type== "sell")
	{$(".choosenValues").attr('type',1);
	console.log("DO ATRIBUTU type ulozeno 1 ");
	}
	
	if(type== "rent")
	{$(".choosenValues").attr('type',2);
	console.log("DO ATRIBUTU type ulozeno 2 ");
	}
}

//GET NAME AND 
//ID OF  SELECTED MUNICIPALITY
function passParamsOfMunicipality(id,name) {

console.log("Vybrana Obec s id a jmenem "+ id + " "+name);	
$(".choosenMunicipalitytBtn .ui-btn-text").text(name);
$(".choosenValues").attr('municipalityId',id);

$(".choosenValues").attr('nameOfMunicipality',name);
$(".choosenCityBtn .ui-btn-text").text(name);
console.log("ATRIBUT idOfDictrict nyni obsahuje: " + $(".choosenValues").attr('municipalityId'));



console.log("VOLAM FCI fillListOfSubMunicipalities");


fillListOfSubMunicipalities(id);

}



//GET NAME AND 
//ID OF  SELECTED SUBMUNICIPALITY
function passParamsOfSubMunicipality(id,name) {

console.log("Vybrana CAST OBCE s id a jmenem "+ id + " "+name);	
$(".choosenPartOfMunicipalitytBtn .ui-btn-text").text(name);
$(".choosenValues").attr('partOfMunicipalityId',id);
$(".choosenValues").attr('nameOfSubMunicipality',name);

console.log("ATRIBUT partOfMunicipalityId nyni obsahuje: " + $(".choosenValues").attr('partOfMunicipalityId'));


}





//FILL LIST OF MUNICIPALITIES BY DISTRICT ID

function fillListOfMunicipalities(idOfDistrict)
{
	
	

	//$(".infoBarHeadingText").text('Ziskavam informace o subtypech');
	
	//$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/okres_obce.html",
							data: "okres="+idOfDistrict+"",
							type : "GET",
							
							success : function(result) {
								console.log("fillListOfMunicipalities prejalo parametr"+idOfDistrict+"");	
								
								
								console.log(result.casti_obci);
								
								listOfMunicipalities = result.casti_obci;
								
								
								$('.listOfMunicipalities li').remove();
								
								$.each(listOfMunicipalities, function(key, value) { 
								console.log(key + ': ' + value); 
								$(".listOfMunicipalities").append("<li onClick=\"passParamsOfMunicipality("+key+","+"'"+value+"'"+");\"><a  href=\"#selectLocalityPage\" id=\"subtypeId"+key+"\" ><h3 class=\"nameOfReality\">"+value+"</h3><p class=\"countOfRealities\">"+key+"</p><a data-rel=\"dialog\"  data-transition=\"slideup\">	</a></li>");
								});	
								$('.listOfMunicipalities').listview('refresh');
								console.log("hotovo");
								
								$(".infoBarHeadingText").text('INFORMACE O OBCICH NACTENY');
								$(".infoBar").hide('slow');		
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
		
	
}

//GET VALUES FROM FORM WHERE USER SELECTED SIZE FROM AND TO OF REALITY

function getSizesOfReality()
{
	
	

	console.log($('select#typeOfSpace option:selected').val());

	console.log($('select#sizeOfSpaceFrom option:selected').val());

	console.log($('select#sizeOfSpaceFrom option:selected').val());
	
	
	
	$(".choosenSpaceBtn .ui-btn-text").text($('select#sizeOfSpaceFrom option:selected').val()+ " - "+$('select#sizeOfSpaceTo option:selected').val());
	$(".choosenValues").attr('sizeFrom',$('select#sizeOfSpaceFrom option:selected').val());
	$(".choosenValues").attr('sizeTo',$('select#sizeOfSpaceTo option:selected').val());
}



/*FILL LIST OD ADVERTISERS*/
function fillListOfAdvertisers() {
	

		
				jQuery.ajax({
					url :"http://pts.ceskereality.cz/json/inzerenti.html",
					type : "GET",
					
					
							
							success : function(result) {
								
								console.log(result.inzerenti);
								
								listOfAdvertisers = result.inzerenti;
								
								$(".infoBar").hide();
								
								$('.listOfAdvertisers li').remove();
								var  id = 0;
								
								$.each(listOfAdvertisers, function(key, value) { 
								id ++;
								console.log(id + ': ' +key + ': ' + value); 
								$(".listOfAdvertisers").append("<li onClick=\"addAdvertiserToSelect('"+id+"',"+"'"+key+"',"+"'"+value+"'"+");\"><a  id=\"advertiserId"+key+"\" ><h3 class=\"nameOfReality\">"+value+"</h3>	</a></li>");
								});	
								$('.listOfAdvertisers').listview('refresh');

								
						
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
				

	
	

	
}




//FILL LIST OF SUBMUNICIPALITIES BY MUNICIPALITY ID

function fillListOfSubMunicipalities(idOfMunicipality)
{
	
	

	//$(".infoBarHeadingText").text('Ziskavam informace o castech obce');
	
	//$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/casti_obci.html",
							data: "kod_obce="+idOfMunicipality+"",
							type : "GET",
							
							success : function(result) {
								console.log("fillListOfSubMunicipalities prejalo parametr"+idOfMunicipality+"");	
								
								
								console.log(result.casti_obci);
								
								listOfSubMunicipalities = result.casti_obci;
								
								
								$('.listOfSubMunicipalities li').remove();
								
								$.each(listOfSubMunicipalities, function(key, value) { 
								console.log(key + ': ' + value); 
								$(".listOfSubMunicipalities").append("<li onClick=\"passParamsOfSubMunicipality("+key+","+"'"+value+"'"+");\"><a  href=\"#selectLocalityPage\" id=\"subtypeId"+key+"\" ><h3 class=\"nameOfReality\">"+value+"</h3><p class=\"countOfRealities\">"+key+"</p><a data-rel=\"dialog\"  data-transition=\"slideup\">	</a></li>");
								});	
								$('.listOfSubMunicipalities').listview('refresh');
								
								$(".infoBarHeadingText").text('INFORMACE O OBCICH NACTENY');
								$(".infoBar").hide('slow');		
								
								
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
			
	
}




/*FILL TYPE OF FLATS  LIST*/
function fillSubtypeOfRealitiesToSelect(subtype) {
	$.mobile.changePage( "#selectSubTypesOfRealities");
	
	//GET COUNT OF REALITY TYPES
	
	
	//$(".infoBarHeadingText").text('Načítám informace');
	
	//$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/pocty_subtypy.html",
							data: "typ="+subtype+"",
							type : "GET",
							
							success : function(result) {
								console.log("fillTypeOfRealitiesToSelect prejalo parametr"+subtype+"");	
								
								
								console.log(result.pocty_subtypy);
								
								countOfSubtypes = result.pocty_subtypy;
								
								$(".infoBar").hide();
						
								
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
	$('.listOfSubtypes').listview('refresh');

	//$(".infoBarHeadingText").text('INFORMACE O SUBTYPECH NACTENY');
	//$(".infoBar").hide('slow');		
	
	console.log('INFORMACE O SUBTYPECH NACTENY');
	
	$.mobile.changePage( "#selectSubTypesOfRealities");

	
}

//ADD SELECTED ADVERTISERS TO ARRAY AND ARRAY TO ATTRIBUTE
function addAdvertiserToSelect(id,key,value)
{
	console.log(key);
	console.log("#advertiserId"+key+"");

	
	
	//REMOVE SELECT ITEM FROM LIST
	if($("#advertiserId"+key+"").css("background-color")=="rgb(38, 130, 193)")
	{
	console.log("Je obarveno, odbarvuji");	
	$("#advertiserId"+key+"").css("background-color", "#fff");
	console.log("BARVA JE NYNI"+ $("#subtypeId"+key+"").css("background-color"));
	selectedSubtypesOfAdvertisers.splice(id, 1);
	console.log("Z POLE NA INDEXU: "+id+" ODEBRANA HODNOTA "+key+"");
	}
	
	
	//ADD SELECT ITEM TO LIST
	else if($("#advertiserId"+key+"").css("background-color")=="rgba(0, 0, 0, 0)" || $("#advertiserId"+key+"").css("background-color")=="rgb(255, 255, 255)")
	{
	console.log("Neni obarveno, obarvuji");	
	$("#advertiserId"+key+"").css("background-color", "#2682C1");
	console.log("BARVA JE NYNI"+ $("#advertiserId"+key+"").css("background-color"));
	selectedSubtypesOfAdvertisers[id] = key;
	console.log("DO POLE NA INDEX: "+id+" PRIDANA HODNOTA"+key+"");
	
	//PASS PARAMS TO FORM AND FILL NAMES TO THE BUTTON
	
	//DELETE DEFAULT TEXT IN BUTTON UF IS SET
	if($(".choosenAdvertisersBtn .ui-btn-text").text() == "Zvolte");
	{
	$(".choosenAdvertisersBtn .ui-btn-text").text("");
	}
	//JOIN TEXT INT BUTTON
	$(".choosenAdvertisersBtn .ui-btn-text").append(value);
	
	}

	
	//APPEND SUBTYPES ID INTO selectedSubtypes attr
	var advertisersString = "";
	
	$.each(selectedSubtypesOfAdvertisers, function(id, key) { 
		//console.log(key + ': ' + value); 
		
		if(key != undefined)
		{	
			//PREPARE STRING
			advertisersString += key+",";
		
		}
		
	});	
	
	//INSERT STIRNG INT ATTR
	$(".choosenValues").attr('selectedSubtypesOfAdvertisers',advertisersString );
	//
	
	
	//ECHO CONTENT ONTO ARRAY 
	console.log("ATRIBUT selectedSubtypesOfAdvertisers nyni obsahuje: "+$(".choosenValues").attr('selectedSubtypesOfAdvertisers'));
	
	//ECHO CONTENT ONTO ARRAY 
	console.log(selectedSubtypesOfRealities);
	
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
	$(".choosenValues").attr('selectedSubtypesOfRealities',subtypesString );
	//
	
	
	//ECHO CONTENT ONTO ARRAY 
	console.log("ATRIBUT selectedSubtypesOfRealities nyni obsahuje: "+$(".choosenValues").attr('selectedSubtypesOfRealities'));
	
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
	
	var typ = $('.choosenValues').attr('type');
	var subTyp = $('.choosenValues').attr('selectedSubtypesOfRealities');
	
	var okres = $('.choosenValues').attr('dictrictId');
	
	var obec = $('.choosenValues').attr('municipalityId');
	
	var castObce = $('.choosenValues').attr('partOfMunicipalityId');
	
	
	
	var stranka = "0";
	
	var trideni = "cena";
	
	var ascdesc = "asc";
	
	var cenaod = $('.choosenValues').attr('priceFrom');
	
	var cenado = $('.choosenValues').attr('priceTo');
	
	var plochaod = $('.choosenValues').attr('sizeFrom');
	
	var plochado = $('.choosenValues').attr('sizeTo');
	
	var prefix = $('.choosenValues').attr('selectedSubtypesOfAdvertisers');
	
	var mojelat = $('.choosenValues').attr('mojelat');
	
	var mojelon = $('.choosenValues').attr('mojelon');
	
	
	var prefix = $('.choosenValues').attr('selectedSubtypesOfAdvertisers');
	
	
	
	 console.log('GPS: '          + jensgps         + '\n' +
	         'TYP: '         + typ        + '\n' +
	         'SUBTYP: '         + subTyp        + '\n' +
	         'OKRES: '          + okres         + '\n' +
	         'OBEC: '          + obec         + '\n' +
	         'CAST OBCE: '          + castObce         + '\n' +
	         'trideni podle: ' + trideni  + '\n' +
	         'ascdesc: '           + ascdesc          + '\n' +
	         'cenaod: '             + cenaod             + '\n' +
	         'cenado: '             + cenado            + '\n' +
	         'plochaod: '             + plochaod            + '\n' +
	         'plochado: '             + plochado            + '\n' +
	         'prefix: '             + prefix            + '\n' +
	         'mojelat: '             + mojelat            + '\n' +
	         'mojelon: '         + mojelon     + '\n');
	 
	 
	
	//VERIFY, THAT IMPORTANT VALUES IN FORM  ARE FILLED
	
	 
	 
	 if(typ.length == 0 || subTyp.length== 0 || okres.length== 0 || cenaod.length == 0 || cenado.length == 0 )
		 
	 {
	 $(".infoBarHeadingText").text('Nespravne zadane hodnoty, vyberte prosim znovu');	
	 $(".infoBar").show();
	 }	
	 
	 else
	 {   
		 //TODO VYRESIT CO POKUD JE VYPNENA POUZE LONG  A LAT a VYRESIT PARAM. TYP UKLADANI DO ATTRIBUTU
		 getListOfRealities(jensgps, typ, subTyp, okres, stranka, trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon);
	 }
	
}


/*Writeout list of all matched realities by passed params
 * Example:
 * http://pts.ceskereality.cz/json/vypis.html?jensgps=0&typ=2&subtyp=1,3&okres=13&stranka=1&trideni=cena&ascdesc=desc&cenado=150000&cenaod=1200&plochaod=10&plochado=1000&mojelat=48.9808&mojelon=15.4814
 * */
function getListOfRealities(jensgps,typ,subTyp,okres,stranka,trideni,ascdesc,cenaod,cenado,plochaod,plochado,prefix,mojelat,mojelon)
{

	console.log("FCE getListOfRealities spustena");
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/vypis.html",
							data: {jensgps:jensgps,typ:typ,subTyp:subTyp,okres:okres,stranka:stranka,trideni:trideni,ascdesc:ascdesc,cenaod:cenaod,cenado:cenado,plochaod:plochaod,plochado:plochado,prefix:prefix,mojelat:mojelat,mojelon:mojelon},
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

	console.log ("Typ ceny:" +typeOf); 
    
	
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
		
			$("#priceFrom").append("<option value=\""+int * 1000+"\ >"+int * 1000+"</option>");
			
		}
		
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceTo").append("<option value=\""+int * 1000+"\">"+int * 1000+"</option>");

			
		}
		
		
		
	}
	
	
	/*FILL FOR SALE OF FLATS, HOUSES, AREAS, ETC*/
	
	if(typeOf = "sale")
	{
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceFrom").append("<option value=\""+int * 100000+"\">"+int * 100000+"</option>");

			
		}	
		
		
	for ( var int = 0; int < steps; int++) {
			
			$("#priceTo").append("<option value=\""+int * 100000+"\">"+int * 100000+"</option>");

			
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
							
							console.log("NEJBLIZSI MESTO MA ID OKRESU "+nearestMunicipality[1]+" ID OBCE "+nearestMunicipality[0]+"A NAZEV"+nearestMunicipality[2]+"");
							
							$(".choosenValues").attr('dictrictId',nearestMunicipality[1]);
							$(".choosenValues").attr('municipalityId',nearestMunicipality[0]);
							$(".choosenCityBtn .ui-btn-text").text(nearestMunicipality[2]);
							
							//passParamsOfCity(nearestMunicipality[1], nearestMunicipality[2]);
							
							
							
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



console.log('showOnMap runs');

console.log("Moje Lat"+Lat+" Moje Lon"+Long+"" );
//Onload handler to fire off the app.
//google.maps.event.addDomListener(window, 'load', initialize);
var geocoder = new google.maps.Geocoder();

initialize();

function initialize() {
	  var latLng = new google.maps.LatLng(Lat, Long);

	  
	  console.log(latLng);
	  var map = new google.maps.Map(document.getElementById('map_canvas'), {
	    zoom: 15,
	    zoomControl: true,
	    
	    zoomControlOptions: {
	    //STYLE AND POSITION OF ZOOM BTNS IN MAPS
	    style: google.maps.ZoomControlStyle.SMALL,
	    position: google.maps.ControlPosition.TOP_RIGHT
	  },
	  //STYLE AND POSITION OF DIRECTIONS CONTOLS
	  panControlOptions: {
	    position: google.maps.ControlPosition.TOP_RIGHT
	    },    
	    center: latLng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  });
	  var marker = new google.maps.Marker({
	    
	    position: latLng,
	    title: 'Zde se nachazite',
	    map: map,
	    draggable: true,
	    icon: 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-3ab4e0/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/star-3.png'  
	  });
	  
	  // Update current position info.
	  updateMarkerPosition(latLng);
	  geocodePosition(latLng);
	  
	  // Add dragging event listeners.
	  google.maps.event.addListener(marker, 'dragstart', function() {
	    updateMarkerAddress('Umistete zalozku');
	  });
	  
	  google.maps.event.addListener(marker, 'drag', function() {
	    updateMarkerStatus('Umistete zalozku');
	    updateMarkerPosition(marker.getPosition());
	  });
	  
	  google.maps.event.addListener(marker, 'dragend', function() {
	    console.log('Drag ended');
	    geocodePosition(marker.getPosition());
	  });
	  
	  console.log("MENIM");
	  $.mobile.changePage( "#selectOnMapPage");
	  
	}






function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('Neznama adresa');
    }
  });
}

function updateMarkerStatus(str) {
	console.log("AKTUALNI STATUS :"+str );
}

function updateMarkerPosition(latLng) {
  
	console.log("NOVA POZICE :"+latLng.lat() + latLng.lng() );
	$("#actualGPSPosition").text(latLng.lat() + " "+ latLng.lng());
	
	$(".choosenValues").attr("mojelat",latLng.lat() );
	$(".choosenValues").attr("mojelon",latLng.lng() );
	
/*	
	document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
  */
  
}

function updateMarkerAddress(str) {
	
	console.log("AKTUALNI ADRESA :"+str );
	
	var parsedAddress = str.split(",");
	
	$("#actualAddress").text(parsedAddress[0] );
	
	 $(".choosenCityBtn .ui-btn-text").text(parsedAddress[0]);

}







/*PREVIOUS VERSION, MOMENTALY UNUSED
MUST BE INCLUDED
  <script type="text/javascript" charset="utf-8" src="jquery-ui-map-3.0-beta/ui/jquery.ui.map.js"></script>
  <script type="text/javascript" charset="utf-8" src="jquery-ui-map-3.0-beta/ui/jquery.ui.map.services.js"></script>
  <script type="text/javascript" charset="utf-8" src="jquery-ui-map-3.0-beta/ui/jquery.ui.map.extensions.js"></script>
       
*/

//INSERT MARKER ON ACTUAL POSITION ON MAP
//BIND EVENTS dragend WHICH CALLING FUNCTION findLocation AND RETURN GPS COORDS AND FORMATED ADDRES OF NEW PLACE
/*

$('#map_canvas').gmap('addMarker', {'position':+ Lat+","+Long+"",'draggable': true, 'bounds': true}).bind('init', 
function(map, marker) {
		
	
	$(".infoBar").hide();
	
		findLocation(marker.getPosition(), marker);
		}).dragend( function(event) {
			console.log("dragend dokoncen");
			findLocation(event.latLng, this);
			
			
		}).click( function() {
			console.log("kliknuto na marker");
});


function findLocation(location, marker) {
	
	console.log(location.Qa);
	console.log(location.Ra);
	console.log(marker.position);

	$('#map_canvas').gmap('search', {'location': location}, function(results, status) {
		console.log(results);
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
*/




}