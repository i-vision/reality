
//INIT OF ISCROLL PLUGIN
var selectedSubtypesOfRealities= new Array();  
var selectedSubtypesOfAdvertisers= new Array();  
var myScroll;
var markerID = 1;
//var myLat;
//var myLong;

var countOfSubtypes = new Object();

function loaded() {
	//myScroll = new iScroll('wrapper');
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


/*CLEAR INFO MESSAGES BEFORE NEW PAGE IS LOAD*/

window.doubleLoadPreventer = 0;

$(document).bind('pagebeforechange', function(e, data){

    if ( window.doubleLoadPreventer === 1 ) {
        window.doubleLoadPreventer = 0;
        return;
    } else {
        window.doubleLoadPreventer = 1;
    }

    //your normal event handler code here
    $(".infoBarHeadingText").text('');	
	$(".infoBar").hide();
	
	
	
	//GET VALUES AND PREPARE FROM STRING TO WORK
	var parsedItems  = JSON.parse(localStorage.savedUserSettings);

	console.log(parsedItems);   
	//CHECK, THAT USER IS SIGNED IN, IF YES, HIDE SIGN IN BTN
	if(parsedItems.values[0].blokovany === "0")
	$("#userLogBtnMainPage .ui-btn-text").text(parsedItems.values[0].jmeno + " " + parsedItems.values[0].prijmeni);	

});

/*
	document.addEventListener('DOMContentLoaded', function(){
	
		var
			options = {},
			instance = PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), options );
	
	}, false);
	
*/	

$(document).ready( function(){ 

//INIT SWYPE SHOWDETAILOFREALITYPAGE MUST BE ID OF PAGE, WHERE IS GALLERY PLACED
//var myPhotoSwipe = $("#Gallery a").photoSwipe({ enableMouseWheel: true , enableKeyboard: true });
	
	
	
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


//SWIPE LEFT EVENT  

$('#writeoutOfRealities').live('swipeleft',function(event, ui){
	decrementActualPage();
	
	});

//SWIPE RIGHT EVENT  

$('#writeoutOfRealities').live('swiperight',function(event, ui){
	incrementActualPage();
	});

});

/*CHANGE PAGE IN WRITEOUT OF REALITY ESTATES*/

function changePageOfRealityEstate(action,districtId)
{
	

	var districtId = $(".choosenValues").attr("dictrictid");
	
	
	//INCREASE PAGE
	if(action == "increase")
	{
		console.log("INCREASE");
	  	var actualPageVal = $(".choosenValues").attr("actualPageOfRealEstate");
	  	var pagesTotal = $(".choosenValues").attr("pagesTotalOfRealEstate");
	  	
		actualPageVal ++;
		$(".choosenValues").attr("actualPageOfRealEstate",actualPageVal);
		//UPDATE VALUE IN LIST INFO
		//$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPageOfRealEstate"));
		
		
		if(actualPageVal == pagesTotal )
		{
			//$("#nextPage").hide();
			$(".infoBar").show();
			$(".infoBarHeadingText").text("TOTO JE POSLEDNI STRÁNKA");
			
		}
		if(actualPageVal < pagesTotal )	
		{
			$(".infoBar").hide();
			getAllRealEstateOfficess(districtId);
		}
		
	}
	

	//DECREASE PAGE
	if(action == "decrease")
	{
		console.log("DECREASE");
	  	var actualPageVal = $(".choosenValues").attr("actualPageOfRealEstate");
	  	var pagesTotal = $(".choosenValues").attr("pagesTotalOfRealEstate");
	  	
		actualPageVal -- ;
		$(".choosenValues").attr("actualPageOfRealEstate",actualPageVal);
		
		//UPDATE VALUE IN LIST INFO
		//$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPageOfRealEstate"));
		
		
		if(actualPageVal < 0 )
		{
			//$("#nextPage").hide();
			$(".infoBar").show();
			$(".infoBarHeadingText").text("JSTE NA PRVNÍ STRÁNCE");
			
		}
		if(actualPageVal < pagesTotal )	
		{
			$(".infoBar").hide();
			getAllRealEstateOfficess(districtId);
		
		}
		
	}
	
}
/*CHANGE PAGE IN WRITEOUT OF REALITIES FROM REALITY ESTATE*/

function changePageFromRealEstate(action)
{
	
	var actualPageVal = $(".choosenValues").attr("actualPageOfRealityWriteoutRealEstate");
  	var pagesTotal = $(".choosenValues").attr("pagesTotalWriteoutRealEstate");  	
  	var prefix = $(".choosenValues").attr("RealEstatePrefix");
	
	//INCREASE PAGE
	if(action == "increase")
	{
		console.log("INCREASE");
	  	
	 
	  	
		actualPageVal ++;
		$(".choosenValues").attr("actualPageOfRealityWriteoutRealEstate",actualPageVal);
		//UPDATE VALUE IN LIST INFO
		//$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPageOfRealityWriteoutRealEstate"));
		
		
		if(actualPageVal == pagesTotal )
		{
			//$("#nextPage").hide();
			$(".infoBar").show();
			$(".infoBarHeadingText").text("TOTO JE POSLEDNI STRÁNKA");
			
		}
		if(actualPageVal < pagesTotal )	
		{
			$(".infoBar").hide();
			getListOfRealitiesFromRealEstate(prefix);
		}
		
	}
	

	//DECREASE PAGE
	if(action == "decrease")
	{
		console.log("DECREASE");
	  	
	  	
		actualPageVal -- ;
		$(".choosenValues").attr("actualPageOfRealityWriteoutRealEstate",actualPageVal);
		
		//UPDATE VALUE IN LIST INFO
		//$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPageOfRealityWriteoutRealEstate"));
		
		
		if(actualPageVal < 0 )
		{
			//$("#nextPage").hide();
			$(".infoBar").show();
			$(".infoBarHeadingText").text("JSTE NA PRVNÍ STRÁNCE");
			
		}
		if(actualPageVal < pagesTotal )	
		{
			$(".infoBar").hide();
			getListOfRealitiesFromRealEstate(prefix);
		
		}
		
	}
	
}


//INCREMENT ACTUAL PAGE VALUE

function incrementActualPage() {
	console.log("SWIPE RIGHT");
	  	var actualPageVal = $(".choosenValues").attr("actualPage");
	  	var pagesTotal = $(".choosenValues").attr("pagesTotal");
	  	
		actualPageVal ++;
		$(".choosenValues").attr("actualPage",actualPageVal);
		
		//UPDATE VALUE IN LIST INFO
		$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPage"));
		
		
		if(actualPageVal ==pagesTotal )
		{
			//$("#nextPage").hide();
			$(".infoBar").show();
			$(".infoBarHeadingText").text("TOTO JE POSLEDNI STRÁNKA, NEMŮŽETE DALE");
			
		}
		if(actualPageVal <=pagesTotal )	
		{
			$(".infoBar").hide();
			getParamsForSearch();
		}
		
		
	}

//DECRMENT ACTUAL PAGE VALUE

function decrementActualPage() {
	
		console.log("SWIPE LEFT");
		var actualPageVal = $(".choosenValues").attr("actualPage");
		var pagesTotal = $(".choosenValues").attr("pagesTotal");
		actualPageVal --;
		$(".choosenValues").attr("actualPage",actualPageVal);
		
		//UPDATE VALUE IN LIST INFO
		$("#ActualPage").text(actualPageVal);
		
		console.log("ATTR ACTUAL PAGE MA NYNI HODNOTU "+$(".choosenValues").attr("actualPage"));
		
		if(actualPageVal >= 0)
		{
			$(".infoBar").hide();
			getParamsForSearch();
		}
		if(actualPageVal == 0)
		{
			//$("#previousPage").hide();
			$(".infoBarHeadingText").text("TOTO JE PRVNÍ STRÁNKA, NEMŮŽETE DOPŘEDU");
			
			$(".infoBar").show();
		}
	}


//INIT PHONEGAP
function init() {
	

    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
	
	checkSettings();
	//FILL ATTRIBUES ABOUT ACTUAL DICTRICT AND MUNICIALITY
	
	document.addEventListener("deviceready", deviceInfo, true);
	
   
}




//CHECK ALL SETTING AFTER START OF APP, IF FIRST TIME START UP OF APP
//GET ALL JSON VALUES FOR FORMS FILLING 

function checkSettings()
{	
	
	getMyPosition('1');
	
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
		
		//FILL RECOMMENDED PAGE SELECT BOXES
		//fillRecommnededRealitiesPage();
		
		
		/*FILL LIST OF DISTRICTS*/
		
		var listOFDistricts = parsedFetchedClassifields.ciselniky.okres;
		
		console.log("Seznam mest");
		console.log(listOFDistricts);
		
		
		$.each(listOFDistricts, function(key, value) { 
				  console.log(key + ': ' + value); 
					$(".listOfAllDistricts").append("<li><a onClick=\"passParamsOfDistrict("+key+","+"'"+value+"'"+");\"  href=\"#selectLocalityPage\" idOfCity=\""+key+"\" >"+value+"</a></li>");
		});
		//$('.listOfAllDistricts').listview('refresh');
		
		/*//FILL LIST OF DISTRICTS*/
		
		
		
		
		

		/*FILL LIST OF DISTRICTS for REALITY ESTATE SELECT*/
		
		var listOfAllDistrictsForRealityEstate = parsedFetchedClassifields.ciselniky.okres;
		
		console.log("SEZNAM MEST");
		console.log(listOfAllDistrictsForRealityEstate);
		
		
		$.each(listOfAllDistrictsForRealityEstate, function(key, value) { 
				  console.log(key + ': ' + value); 
					$(".listOfAllDistrictsForRealityEstate").append("<li><a onClick=\"getAllRealEstateOfficess("+key+");\"  href=\"#writeoutAllRealEstateOfficessPage\" >"+value+"</a></li>");
		});
		//$('.listOfAllDistrictsForRealityEstate').listview('refresh');
		

		/*!!FILL LIST OF DISTRICTS for REALITY ESTATE SELECT*/
		
		
		
		
		
			  
				
	}
	
	
}

function changeParamsForBackBtn(id,whereToRedirect)
{
		
		$(id).attr('href',whereToRedirect);	
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

//FILL TYPE OF REALITY (FLAT,HOUSE,ETC) TO ATTR  type 
function fillTypeOfReality(typeOfReality)
{
	$(".choosenValues").attr('type',typeOfReality);
	console.log("DO ATRIBUTU type ulozena hodnota "+typeOfReality);
}

//0 = prodej 1= pronajem
function fillTypeSellOrRent(type)
{
	if(type== "sell")
	{$(".choosenValues").attr('sellOrRent',0);
	console.log("DO ATRIBUTU sellOrRent ulozeno 0 = prodej ");
	fillSelectPricePage('sell');
	}
	
	if(type== "rent")
	{$(".choosenValues").attr('sellOrRent',1);
	console.log("DO ATRIBUTU sellOrRent ulozeno 1 = pronajem ");
	fillSelectPricePage('rent');
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



//FUNCTION CHECK THAT USER IS SIGNED UNDER HIS ACCOUNT AND IF YES, FILL FORM 
function getUserInfo()
{
	
	
	//PREVIOUS EXIST? IF NOT REDIRECT WITH MESSAGE
	if(localStorage.savedUserSettings === undefined)
	{
		
		$.mobile.changePage( "#userLoginPage");
		$(".infoBarHeadingText").text('PRO ZMĚNU NASTAVENÍ JE TŘEBA SE PŘIHLÁSIT');
		
		
	}
	

	//FILL FORM AND DISABLE INPUTS
	else
	{
	console.log("UZIVATEL JE PRIHLASEN, NACITAM JEHO DATA"); 
	//GET VALUES AND PREPARE FROM STRING TO WORK
	var parsedItems  = JSON.parse(localStorage.savedUserSettings);

	
	
	 $("#registerUpdateFieldContain :input").attr("disabled", "disabled");
	

	$('#changedName').val(parsedItems.values[0].jmeno);

	$('#changedSurname').val(parsedItems.values[0].prijmeni);

	$('#changedUserEmail').val(parsedItems.values[0].email);


	$('#changedCellPhone').val(parsedItems.values[0].tel);

	
	}
	  
	
	
	
}



//GET NEW VALUES FROM USER SEND TO UPDATE AND SHOW MESSAGE ABOUT PROGRESS
function updateUserInfo()
{
	
	if($('#updateUserInfoBtn').attr('status')=== 0);
	{
	$('#updateUserInfoBtn .ui-btn-inner').text('Uložit');
	

	 $("#registerUpdateFieldContain :input").removeAttr("disabled");
	 
	 $('#changedWatcher').slider('enable');	
	 
	 $('#updateUserInfoBtn').attr('status','1');
	 
	}

	
	if($('#updateUserInfoBtn').attr('status')=== 1);
	{
		//GET VALUES FROM FORM
		
		var parsedItems  = JSON.parse(localStorage.savedUserSettings);
		var id = parsedItems.values[0].id;
		
		var jmeno = $('#changedName').val();	
		var prijmeni =  $('#changedSurname').val();
		var email =  $('#changedUserEmail').val();
		var telefon =  $('#changedCellPhone').val();
		var stareheslo = parsedItems.values[0].heslo;
		
		var noveheslo = $.encoding.digests.hexSha1Str($("#changedPasswordUsr").val());
		 
		console.log($("#changedPasswordUsr").val.length);
		
		if(jmeno.length == 0 || prijmeni.length== 0 || email.length== 0 || telefon.length == 0 )
		{

			$(".infoBarHeadingText").text('ZADANE UDAJE NEJSOU SPRAVNE');
			$(".infoBar").show();	
			return false;
			
		}
		
		//http://pts.ceskereality.cz/json/hlidac_registrace_oprava.html
		//?id=2977&email=ivo.stejskal@ceskestavby.cz&
		//heslo=30170405&blokovany=1&novejmeno=Ivo&noveprijmeni=Stejskal&novetel=608463126&noveemail=ivo.stejskal@ceskestavby.cz
		//&noveheslo=30170405&noveip=ff
		
		jQuery.ajax({
			
			url :"http://pts.ceskereality.cz/json/hlidac_registrace_oprava.html",
			data: {id:id,email:email,heslo:actualPage,
					novejmeno:jmeno,noveprijmeni:prijmeni,
					novetel:telefon,noveemail:email,noveheslo:heslo},
			type : "GET",
			
			success : function(result) {
				
			
				
				$(".infoBarHeadingText").text('INFORMACE O OBCICH NACTENY');
				$(".infoBar").hide('slow');		
				
				
				
			},
			// IF HTTP RESULT 400 || 404
			error : function(x, e) {
					
				typeOfRequestError(x, e);
			}
		});

		
	}
	
	
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
function fillSubtypeOfRealitiesToSelect() {
	
	$.mobile.changePage( "#selectSubTypesOfRealities");
	//GET COUNT OF REALITY TYPES
	var type = $(".choosenValues").attr('type');
	
	//$(".infoBarHeadingText").text('Načítám informace');
	
	//$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/pocty_subtypy.html",
							data: "typ="+type+"",
							type : "GET",
							
							success : function(result) {
								console.log("fillTypeOfRealitiesToSelect prejalo parametr"+type+"");	
								
								
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
	
	
	
	var flatForRentList = parsedFetchedClassifields.ciselniky.subtyp[type];
	
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
/*

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
*/
//UNIVERSAL FUNCTION FOR PASING PARAMMS FROM FORM TO SEARCH FUNCTION

function getParamsForSearch(isForMapShow) {

	//ATTR TYPE PRESENTS TYPE OF REALITY, PRICE, ETC.., FOR EXAMPLE type="2" is USED FOR FLATS  <div data-role="page" data-theme="b" id="flatsOnSalePage" type="2">
	
	
	//TODO IMPLEMENT jensgps INTO  APP
	var jensgps = 0;	
	//TODO HOW TO RESOLVE TYP SALE OR RENT? TOOGLE BTN OR IN PAGE?
	//ATTR TYPE PRESENTS TYPE OF REALITY, FOR EXAMPLE type="2" is USED FOR FLATS  <div data-role="page" data-theme="b" id="flatsOnSalePage" type="2">
	var operace = $('.choosenValues').attr('sellOrRent');
	
	var typ = $('.choosenValues').attr('type');
	
	var subTyp = $('.choosenValues').attr('selectedSubtypesOfRealities');
	
	var okres = $('.choosenValues').attr('dictrictId');
	
	var obec = $('.choosenValues').attr('municipalityId');
	
	var castObce = $('.choosenValues').attr('partOfMunicipalityId');
	
	
	var stranka  = $('.choosenValues').attr('actualPage');
	
	var trideni = $('.choosenValues').attr('sortBy');
	
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
	 
	 
	 else if(isForMapShow == "1")
	 {
		 showMarkersOnMap(1, typ, subTyp, okres, stranka, trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon);
	 }
	 
	 else
	 {   
		
		 //TODO ADD  operace into history
		//SAVE TO SEARCH HISTORY
		 saveToHistoryOfSearch(typ, subTyp, okres,0,trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon);
		 
		 
		 //CALL FUNCTION FOR WRITEOUT OF REALITIES
		 getListOfRealities(jensgps, typ, subTyp, okres, stranka, trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon,operace);
	 }
	
}


function saveToHistoryOfSearch(typ, subTyp, okres,stranka,trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon)

{
	
	console.log("SAVETOHISTORYOFSEARCH RUN");
	
	
	console.log('typ:  '          + typ         + '\n' +
	         'subTyp: '         + subTyp        + '\n' +
	         'okres: '         + okres       + '\n' +
	         'okres: '         + stranka       + '\n' +
	         'trideni: '          + trideni         + '\n' +
	         'ascdesc: '          + ascdesc         + '\n' +
	         'cenaod'          + cenaod         + '\n' +
	         'cenado: '          + cenado         + '\n' +
	       
	         'plochaod: '          + plochaod         + '\n' +
	         'plochado: '          + plochado         + '\n' +
	         'prefix: '          + prefix         + '\n' +
	         'mojelat: '          + mojelat         + '\n' +
	         'mojelon: '          + mojelon         + '\n');
	
	
	//PREVIOUS EXIST? IF NOT CREATE
	if(localStorage.savedHisoryOfSearch === undefined)
	{
	var muster = {"history" : []};
	//localStorage.storedRealities = work;    
	localStorage.setItem('savedHisoryOfSearch', JSON.stringify(muster));
	}
	else
	{
	console.log("savedHisoryOfSearch already exist in localstorage"); 
	    
	}
	  
	//GET VALUES AND PREPARE FROM STRING TO WORK
	var parsedItems  = JSON.parse(localStorage.savedHisoryOfSearch);

	console.log(parsedItems);   

	//GET LENGTH
	console.log(parsedItems.history.length);

	
	//IF IS STORED MORE THAN 10 VALUES REMOV FIRST AND ADD LAST
	if(parsedItems.history.length >10)
	{
	parsedItems.history.shift();  
	parsedItems.history.push({"typ" : typ,"subTyp" : subTyp,"okres" : okres,"stranka" : stranka,"trideni" :trideni,"ascdesc" :ascdesc,"cenaod" : cenaod,"cenado":cenado,"plochaod":plochaod,"plochado":plochado,"prefix":prefix,"mojelat":mojelat,"mojelon":mojelon});//add to end of aaray 

	}    
	else
	{
	parsedItems.history.push({"typ" : typ,"subTyp" : subTyp,"okres" : okres,"stranka" : stranka,"trideni" :trideni,"ascdesc" :ascdesc,"cenaod" : cenaod,"cenado":cenado,"plochaod":plochaod,"plochado":plochado,"prefix":prefix,"mojelat":mojelat,"mojelon":mojelon});//add to end of aaray 
	
	}
	  
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.savedHisoryOfSearch = JSON.stringify(parsedItems);	
	
	console.log("savedHisoryOfSearch DONE!");
	
}


function getListOfHistoryOfSearch()
{
	
	console.log("getListOfHistoryOfSearch RUN");
	var parsedRes = JSON.parse(localStorage.savedHisoryOfSearch);
	var parsedClassifiers1 = JSON.parse(localStorage.Classifiers);
	console.log(parsedRes);
	console.log(parsedClassifiers1.ciselniky);	

	if(parsedRes.history.length==0)
	{
		$(".infoBarHeadingText").text('V HISTORII NENÍ ULOŽEN ŽÁDNÝ ZÁZNAM');
		$(".infoBar").show();
		
	}
	
	else
	{
		$(".infoBar").hide();
	}
	
	
	
	$('.listOfsavedHisoryOfSearch li').remove();
	
	$.each(parsedRes.history, function(key, value) { 
		
		
	console.log(parsedClassifiers1.ciselniky.okres[parseInt(value.okres)]);
		
//jensgps,typ,subTyp,okres,stranka,trideni,ascdesc,cenaod,cenado,plochaod,plochado,prefix,mojelat,mojelon
		
		$(".listOfsavedHisoryOfSearch").append("<li class=\"listOfRealities\">" +
				"<a  onClick=\"getListOfRealities('"+0+"','"+value.typ+"',"+"'"+value.subTyp+"',"+"'"+value.okres+"',"+"'"+value.stranka+"',"
				+"'"+value.trideni+"',"+"'"+value.ascdesc+"',"+"'"+value.cenaod+"',"+"'"+value.cenado+"',"+"'"+value.plochaod+"',"+"'"+value.plochado+"',"+"'"+value.prefix+"',"+"'"+value.mojelat+"',"+"'"+value.mojelon+"'"+");" +"\" " +"idOfCity=\""+key+"\">" +
				"<h3>"+parsedClassifiers1.ciselniky.okres[parseInt(value.okres)]+"</h3>"+
				"<p><strong>Typ "+parsedClassifiers1.ciselniky.typ[parseInt(value.typ)]+"</strong></p>"+
				"<p><strong>Cena od "+value.cenaod+" - "+value.cenado+" Kč</strong></p>"+
				"<div><img src=\"img/bell_active.png\" /></div>"+
				
				
				
				"</a>" +
				
				"<a onClick=\"deleteSavedDetailOfSearch("+key+");\" data-rel=\"dialog\" data-transition=\"slideup\"></a>"+
				
				"</li>");

	
	});
	
	

	//REDIRECT
	$.mobile.changePage( "#historyOfSearchPage");
	
	//REFRESH MUST BE CALL AFTER CHANGEPAGE
	$('.listOfsavedHisoryOfSearch').listview('refresh');	
}


function deleteSavedDetailOfSearch(id)
{
	console.log("deleteSavedDetail RUN");
	var parsedRes = JSON.parse(localStorage.savedHisoryOfSearch);
	console.log(parsedRes);
	
	console.log("Mazu prvek na pozici"+ id);
	parsedRes.history.splice(id,id+1);
	console.log(parsedRes.history.length);
	
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.savedHisoryOfSearch = JSON.stringify(parsedRes);	
	
	getListOfHistoryOfSearch();
	
	

	
}


function saveDetailOfReality(prefix,inzerent,cislo,foto,cena,obec,plocha)
{
	
console.log("saveDetailOfReality RUNNNING");
	
	console.log('prefix:  '          + prefix         + '\n' +
	         'inzerent: '         + inzerent        + '\n' +
	         'cislo: '         + cislo       + '\n' +
	         'foto: '          + foto         + '\n' +
	         'cena: '          + cena         + '\n' +
	         'obec: '          + obec         + '\n' +
	         'plocha: '          + plocha         + '\n');
	
	
	//SAVE JSON TO ARRAY IN LS
	
	//PREVIOUS EXIST? IF NOT CREATE
	if(localStorage.savedDetailsOfRealities === undefined)
	{
	var muster = {"details" : []};
	//localStorage.storedRealities = work;    
	localStorage.setItem('savedDetailsOfRealities', JSON.stringify(muster));
	}
	else
	{
	console.log("savedDetailsOfRealities already exist in localstorage"); 
	    
	}
	  
	//GET VALUES AND PREPARE FROM STRING TO WORK
	var parsedItems  = JSON.parse(localStorage.savedDetailsOfRealities);

	console.log(parsedItems);   

	//GET LENGTH
	console.log(parsedItems.details.length);

	
	//IF IS STORED MORE THAN 10 VALUES REMOV FIRST AND ADD LAST
	if(parsedItems.details.length >10)
	{
	parsedItems.details.shift();  
	parsedItems.details.push({"prefix" : prefix,"inzerent" : inzerent,"cislo" : cislo,"foto" :foto,"cena" :cena,"obec" : obec,"plocha":plocha});//add to end of aaray 

	}    
	else
	{    
		parsedItems.details.push({"prefix" : prefix,"inzerent" : inzerent,"cislo" : cislo,"foto" :foto,"cena" :cena,"obec" : obec,"plocha":plocha});//add to end of aaray 
	}
	  
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.savedDetailsOfRealities = JSON.stringify(parsedItems);	
	
	console.log("savedDetailsOfRealities DONE!");
	
}





function getListOfSavedDetails()
{
	
	console.log("getListOfSavedDetails RUN");
	var parsedRes = JSON.parse(localStorage.savedDetailsOfRealities);

	
	console.log(parsedRes);
	if(parsedRes.details.length==0)
	{
		$(".infoBarHeadingText").text('V HISTORII NENÍ ULOŽENA ŽÁDNÁ NEMOVITOST');
		$(".infoBar").show();
		
	}
	
	
	
	$('.listOfStoredDetailsOfRealities li').remove();
	
	$.each(parsedRes.details, function(key, value) { 
		  
		//console.log(value.cena);	
		//console.log(value.cislo);	
		/* console.log('CENA:  '          + value.cena         + '\n' +
		         'CISLO: '         + cislo        + '\n' +
		         'datum_vlozeni: '         + datum_vlozeni        + '\n' +
		         'foto: '          + foto         + '\n' +
		         'inzerent: '          + inzerent         + '\n' +
		         'lat: '          + lat         + '\n' +
		         'lon: ' + lon  + '\n' +
		         'obec: '           + obec          + '\n' +
		         'okres: '             + okres             + '\n' +
		         'popis: '             + popis            + '\n' +
		         'prefix: '             + prefix            + '\n' +
		
		         'subtyp: '             + subtyp            + '\n' +
		         'typ: '             + typ            + '\n' +
		         'typ_ceny: '             + typ_ceny            + '\n' +
		         'vlastnictvi: '         + vlastnictvi     + '\n');
		 */ 
		
		
		$(".listOfStoredDetailsOfRealities").append("<li class=\"listOfRealities\">" +
				"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");" +"\" " +"idOfCity=\""+key+"\">" +
				"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
				"<h3>"+value.obec+"</h3>"+
				"<p><strong>"+value.cena+" Kč</strong></p>"+
			
				"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+
				
				"</a>" +
				"<a onClick=\"deleteSavedDetail("+key+");\" data-rel=\"dialog\" data-transition=\"slideup\"></a>"+
				
				"</li>");

	
	});
	
	
	
	/*
	$('#listOfStoredDetailsOfRealities li').swipeDelete({
	    direction: 'swiperight', // standard jquery mobile event name
	    btnLabel: 'Delete',
	    btnTheme: 'b',
	    btnClass: 'aSwipeBtn',
	    click: function(e){
	        e.preventDefault();
	        var url = $(e.target).attr('href');
	        $(this).parents('li').remove();
	        $.post(url, function(data) {
	            console.log(data);
	        });
	    }
	});
	
*/
	//REDIRECT
	$.mobile.changePage( "#historyOfDetailsPage");
	
	//REFRESH MUST BE CALL AFTER CHANGEPAGE
	$('.listOfStoredDetailsOfRealities').listview('refresh');	
}


function deleteSavedDetail(id)
{
	console.log("deleteSavedDetail RUN");
	var parsedRes = JSON.parse(localStorage.savedDetailsOfRealities);
	console.log(parsedRes);
	
	console.log("Mazu prvek na pozici"+ id);
	parsedRes.details.splice(id,id+1);
	console.log(parsedRes.details.length);
	
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.savedDetailsOfRealities = JSON.stringify(parsedRes);	
	
  getListOfSavedDetails();
	
}





function getAllRealEstateOfficess(districtId)
{
	if(districtId == undefined)
	{
	console.log("NEZNAM OKRES, ZJISTIM NEJBLIZSI A TEN VYPISI");		
	//CALL FUNCTION TO GET GPS COORDS AND DISTRICT ID	
	getMyPosition('1');
	console.log($(".choosenValues").attr("dictrictid"));
	var districtId = $(".choosenValues").attr("dictrictid");
	}
	else
	console.log("ZNAM OKRES,DOSADIM A VYPISI");

	$(".infoBarHeadingText").text('NAČÍTÁM DATA');
	
	//GET ACTUAL PAGE	
	var actualPage = $(".choosenValues").attr("actualPageOfRealEstate");
	
	//SAVE DISTRICT ID TO  PARAMS
	//$(".choosenValues").attr("dictrictid", districtId);
	
	console.log("ID OKRESU JE " + districtId);
		
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/rk.html",
							data: {okres:districtId,stranka:actualPage},
							type : "GET",
							
							success : function(result) {
								console.log("getAllRealEstateOfficess RUNS");	
								
								console.log(result);	
								
								//TOTAL COUNT OF PAGES
							
								var countOfPagesRounded = Math.round(result.rk.pocet/20);
								
								$(".choosenValues").attr("pagesTotalOfRealEstate",countOfPagesRounded);
								
								$('.listOfFoudRealityEstates li').remove();
								
								$.each(result.rk.realitni_kancelar, function(key, value) { 
								console.log(key + ': ' + value); 
								
								$(".listOfFoudRealityEstates").append("<li>" +
										"<a  onClick=\"getListOfRealitiesFromRealEstate('"+value.prefix+"'"+");\">" +
										"<img src=\"http://img.ceskereality.cz/loga/"+value.logo+"\" width=\"80px\" />" +
										"<h3>"+value.rk+" "+value.mesto+" </h3>"+
										"<p><strong>"+value.www+" Kč</p>"+
										"<p> telefon: "+value.tel+"</p>"+
										"<p class=\"ui-li-aside\"><strong> počet nemovitostí: "+value.nemovitosti+"</strong></p>"+	
										"</a>" +
										"</li>");
					
								
								});
								
								$('.listOfFoudRealityEstates').listview('refresh');	
								
								
								//$(".infoBarHeadingText").text('HOTOVO');
								$(".infoBar").hide('slow');		
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}


//SHOW FOUNDED REALITIES AND THEIR MARKERS ON MAP,ONLY WITH FILLED GPS COORDS
function showMarkersOnMap(jensgps, typ, subTyp, okres, stranka, trideni, ascdesc, cenaod, cenado, plochaod, plochado,prefix,mojelat, mojelon)
{
	
	console.log("SHOWMARKERSONMAP RUNNNING");
	
	console.log('JENSGPS:  '          + jensgps         + '\n' +
	         'PRODEJ NEBO PRONAJEM: '         + typ        + '\n' +
	         'TYP: '         + typ       + '\n' +
	         'SUBTYP: '          + subTyp         + '\n' +
	         'OKRES: '          + okres         + '\n' +
	         'STRANKA: '          + stranka         + '\n' +
	         'TRIDENI: '          + trideni         + '\n' +
	         'ASCDESC: ' + ascdesc  + '\n' +
	         'CENAOD: '           + cenaod          + '\n' +
	         'CENADO: '             + cenado             + '\n' +
	         'PLOCHAOD: '             + plochaod            + '\n' +
	         'PLOCHADO: '             + plochado            + '\n' +
	
	         'PREFIX: '             + prefix            + '\n' +
	         'MOJELAT: '             + mojelat            + '\n' +
	         'MOJELON: '             + mojelon            + '\n');
	      
	
	
	jQuery.ajax({
		
		url :"http://pts.ceskereality.cz/json/vypis.html",
		//ONLY REALITIES WITH FILLED GPS COORDS
		data: {jensgps:'1',typ:typ,subTyp:subTyp,okres:okres,stranka:stranka,trideni:trideni,ascdesc:ascdesc,cenaod:cenaod,cenado:cenado,plochaod:plochaod,plochado:plochado,prefix:prefix,mojelat:mojelat,mojelon:mojelon},
		type : "GET",
		
		success : function(result) {
		console.log("NACTENO");
	    console.log(result);
		
		//SET COUNT OF FOUND MARKERS TO ATTR COUNTOFMARKERS
		$('.choosenValues').attr('countOfMarkers',result.nemovitosti.pocet);
			
			
			
			var stringifiedRes = JSON.stringify(result.nemovitosti.nemovitost);	
			var parsedRes = JSON.parse(stringifiedRes);
		
			
			console.log(parsedRes);
			

			  //IF EVERYTHING IS FINISHED CHANGE PAGE
			    $.mobile.changePage( "#showRealitiesOnMapPage", { transition: "slideup"} );		
					


		console.log('SHOWONMAP RUNS');
		/*
		 * INSERT MARKERS ON MAP
		 * */
		

	    //INIT MAP AND DEAFAULT SETTING FOR THIS MAP
	    var mapOpts = {
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      scaleControl: true,
	      scrollwheel: true
	    }
	    var map = new google.maps.Map(document.getElementById("map_canvas2"), mapOpts);
	    //  We set zoom and center later by fitBounds()



	    /**
	     * makeMarker() ver 0.2
	     * creates Marker and InfoWindow on a Map() named 'map'
	     * creates sidebar row in a DIV 'sidebar'
	     * saves marker to markerArray and markerBounds
	     * @param options object for Marker, InfoWindow and SidebarItem
	     * @author Esa 2009
	     */
	    var infoWindow = new google.maps.InfoWindow();
	    var markerBounds = new google.maps.LatLngBounds();
	    var markerArray = [];
	     
	    function makeMarker(options){
	      var pushPin = new google.maps.Marker({map:map,	    
	      icon: 'img/realt_1.png'  
	});
	      pushPin.setOptions(options);
	      google.maps.event.addListener(pushPin, "click", function(){
	        infoWindow.setOptions(options);
	        infoWindow.open(map, pushPin);
	        if(this.sidebarButton)this.sidebarButton.button.focus();
	      });
	      var idleIcon = pushPin.getIcon();
	      if(options.sidebarItem){
	        pushPin.sidebarButton = new SidebarItem(pushPin, options);
	        pushPin.sidebarButton.addIn("sidebar");
	      }
	      markerBounds.extend(options.position);
	      markerArray.push(pushPin);
	      return pushPin;
	    }

	    google.maps.event.addListener(map, "click", function(){
	      infoWindow.close();
	    });


	    /**
	     * Creates an sidebar item, in this case button, which is hidden for user and user can switch between markers by top buttons
	     * @constructor
	     * @author Esa 2009
	     * @param marker
	     * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
	     */
	    var sidebarId = 0;
	    function SidebarItem(marker, opts){
	      sidebarId ++;
	      //alert(sidebarId);
	      var tag = opts.sidebarItemType || "button";
	      var row = document.createElement(tag);
	      row.innerHTML = opts.sidebarItem;
	      row.className = opts.sidebarItemClassName || "sidebar_item";  
	      //ADDED BECAUSE OF TRIGERING JQUERY CLICK
	      row.id = "sidebar_item"+sidebarId;  
	      //row.style.display = "block";
	      row.style.width = opts.sidebarItemWidth || "120px";
	      row.onclick = function(){
	        google.maps.event.trigger(marker, 'click');
	      }
	      row.onmouseover = function(){
	        google.maps.event.trigger(marker, 'mouseover');
	      }
	      row.onmouseout = function(){
	        google.maps.event.trigger(marker, 'mouseout');
	      }
	      this.button = row;
	    }
	    // adds a sidebar item to a <div>
	    SidebarItem.prototype.addIn = function(block){
	      if(block && block.nodeType == 1)this.div = block;
	      else
	        this.div = document.getElementById(block)
	        || document.getElementById("sidebar")
	        || document.getElementsByTagName("body")[0];
	      this.div.appendChild(this.button);
	    }
	    // deletes a sidebar item
	    SidebarItem.prototype.remove = function(){
	      if(!this.div) return false;
	      this.div.removeChild(this.button);
	      return true;
	    }


	    
		
	    /*BROWSE ARRAY MUST BE AT END IN THIS FUNCT*/
		$.each(parsedRes, function(key, value) { 
			  
		
			 console.log('CENA:  '          + value.cena         + '\n' +
			         'CISLO: '         + value.cislo        + '\n' +
			         'datum_vlozeni: '         + value.datum_vlozeni        + '\n' +
			         'foto: '          + value.foto         + '\n' +
			         'inzerent: '          + value.inzerent         + '\n' +
			         'lat: '          + value.lat         + '\n' +
			         'lon: ' + value.lon  + '\n' +
			         'obec: '           + value.obec          + '\n' +
			         'okres: '             + value.okres             + '\n' +
			         'popis: '             + value.popis            + '\n' +
			         'prefix: '             + value.prefix            + '\n' +
			
			         'subtyp: '             + value.subtyp            + '\n' +
			         'typ: '             + value.typ            + '\n' +
			         'typ_ceny: '             + value.typ_ceny            + '\n' +
			         'vlastnictvi: '         + value.vlastnictvi     + '\n');
			 
			 
			 
			 
			 /*ADD MARKERS START*/
			 
	
			    	  makeMarker({
			    	      position: new google.maps.LatLng(value.lat,value.lon),
			    	      title: value.cena,
			    	      sidebarItem: value.cena,
			    	      content: "<div id=\"content\">" 
			    	    	  +"<a href=\"\" onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");\"><img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" /></a>"
			    	    	  +"<h4 style=\"float:right;left:20px;\">"+value.cena+"</h4>"
			    	    	  +"<p style=\"float:right;left:20px;\">"+value.cena+"</p>"
			    	    	  +"<a href=\" onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");\" style=\"float:right;left:20px;\" >Detail</a>"
			    	  		  +"</div>"
			    	      
			    	    }); 

			 
			   /*ADD MARKERS END*/
			 
			 
			  
		});
		
		/*BROWSE ARRAY*/
	    /**
	     *   fit viewport to markers
	     */
	    map.fitBounds(markerBounds);

		
		
		/*
		 * 
		 * END OF INSERT MARKERS TO MAP*/

	    
		},
		// IF HTTP RESULT 400 || 404
		error : function(x, e) {
				
			typeOfRequestError(x, e);
		}
	});
	
	
	
}

function showDetailOfReality(prefix,inzerent,cislo)
{
	
	console.log("SHOWDETAILOFREALITY LAUNCH");
	console.log(prefix);

	console.log(inzerent);

	console.log(prefix);
	
	
	$(".infoBar").hide();
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
	//IF EVERYTHING IS FINISHED CHANGE PAGE
    $.mobile.changePage( "#showDetailOfRealityPage", { transition: "slideup"} );
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/nemovitost.html",
							data: {prefix:prefix,inzerent:inzerent,cislo:cislo},
							type : "GET",
							
							success : function(result) {
								
						   console.log(result);
								
						    
						    //INSERT PHOTOS
						   
							$.each(result.nemovitost.fotografie, function(key, value) { 
								
								console.log(key+" "+value);		
						
								//<li><a href="photoswipe/examples/images/full/001.jpg" rel="external"><img src="http://img.ceskereality.cz/foto_mini/19890/19890asm13090224931593.jpg" alt="Image 001" /></a></li>
								$("#Gallery").append("<li><a rel=\"external\"  href=\"http://img.ceskereality.cz/foto/"+inzerent+"/"+value+"\"><img src=\"http://img.ceskereality.cz/foto_mini/"+inzerent+"/"+value+"\" alt=\"Image 001\" /></a></li>");
							
								
							});
							
							$('#detailGallery').listview('refresh');
							
							//BASIC INFO, PRICE, PLACE
							$('#uvodniFoto').text(result.nemovitost.fotografie.foto1);
							
							$('#prefix').text(prefix);
							$('#inzerent').text(inzerent);
							$('#cislo').text(cislo);
							
							
							$('#nabidkaod').text(result.nemovitost.nabidkaod);
							$('#datum_aktualizace').text(result.nemovitost.datum_aktualizace);
							$('#adresa').text(result.nemovitost.adresa);
							$('#cena').text(result.nemovitost.cena);
							
							
							//TEXT DESCRIPTION
							$('#popis').text(result.nemovitost.popis);
							
							
							//SPECIFICATION

							$('#vlastnictvi').text(result.nemovitost.vlastnictvi);
							$('#rok_vystavby').text(result.nemovitost.rok_vystavby);
							$('#posl_rekonstrukce').text(result.nemovitost.posl_rekonstrukce);
							$('#charakterobce').text(result.nemovitost.charakterobce);
							$('#poloha').text(result.nemovitost.poloha);
							$('#stav').text(result.nemovitost.stav);
							$('#plocha_celkova').text(result.nemovitost.plocha_celkova);	
							$('#plocha_zastavena').text(result.nemovitost.plocha_zastavena);
							$('#plocha_obytna').text(result.nemovitost.plocha_obytna);
							$('#plocha_uzitna').text(result.nemovitost.plocha_uzitna);
							$('#plocha_vyrobni').text(result.nemovitost.plocha_vyrobni);
							$('#plocha_nebytova').text(result.nemovitost.plocha_nebytova);
							$('#patro').text(result.nemovitost.patro);
							
							
							//QUIPMENT		
							
							
							$('#kanalizace').text(result.nemovitost.vybaveni.Kanalizace['0']);
							$('#parkovani').text(result.nemovitost.vybaveni.Parkování['0']);
							$('#zahrada').text(result.nemovitost.vybaveni.Zahrada['0']);
					
							
							
							/*
							
											$('#subtyp').text(result.nemovitost.subtyp);
											$('#okres').text(result.nemovitost.okres);
											$('#adresa').text(result.nemovitost.adresa);
											$('#cena_prepocet').text(result.nemovitost.cena_prepocet);
											$('#cena_prepocet_kcm2').text(result.nemovitost.cena_prepocet_kcm2);
											$('#poznamkakcene').text(result.nemovitost.poznamkakcene);
											$('#najem').text(result.nemovitost.najem);
											$('#typ_ceny').text(result.nemovitost.typ_ceny);
											$('#podlazi_nadzemnich').text(result.nemovitost.podlazi_nadzemnich);
											$('#podlazi_podzemnich').text(result.nemovitost.podlazi_podzemnich);
											$('#mistnosti').text(result.nemovitost.mistnosti);
											$('#bytu').text(result.nemovitost.bytu);
											$('#volnychbytu').text(result.nemovitost.volnychbytu);
											$('#tel_linek').text(result.nemovitost.tel_linek);
											$('#datum_vlozeni').text(result.nemovitost.datum_vlozeni);
											$('#datum_aktualizace').text(result.nemovitost.datum_aktualizace);
											$('#kmodeme').text(result.nemovitost.kmodeme);
											$('#moznosti').text(result.nemovitost.moznosti);
											$('#datum_aktualizace').text(result.nemovitost.datum_aktualizace);
											
							*/
							
							
							//CONTACT
							
							$('#inzerent').text(result.nemovitost.inzerent);

							$('#nabidkaod').text(result.nemovitost.nabidkaod);
							$('#inzerent_ulice').text(result.nemovitost.inzerent_ulice);
							$('#inzerent_mesto').text(result.nemovitost.inzerent_mesto);
							$('#inzerent_tel').text(result.nemovitost.inzerent_tel.replace("+420", ""));
							$('#inzerent_tel2').text(result.nemovitost.inzerent_tel2.replace("+420", ""));
							$('#inzerent_tel3').text(result.nemovitost.inzerent_tel3.replace("+420", ""));
							$('#inzerent_email').text(result.nemovitost.inzerent_email);
							$('#inzerent_email2').text(result.nemovitost.inzerent_email2);
							$('#inzerent_www').text(result.nemovitost.inzerent_www);
							$('#makler_jmeno').text(result.nemovitost.makler_jmeno);
							$('#makler_telp').text(result.nemovitost.makler_telp);
							$('#makler_telm').text(result.nemovitost.makler_telm);
							$('#makler_icq').text(result.nemovitost.makler_icq);
							$('#makler_mail').text(result.nemovitost.makler_mail);
							$('#makler_info').text(result.nemovitost.makler_info);
							$('#makler_foto').attr('src',result.nemovitost.makler_foto);
							
							//IF VALUE IS EMPTY INSERT DEFAULT MEASSAGE 
							$(".grid_6 div:empty").text("-------");
							
							
							//FILL SHOW ON MAP PAGE BTN GPS  COORDS
							//IF LAT AND LON ARE EMPTY, USE obec_stred_lat COORDS
							if(result.nemovitost.lat == "")
							{
							console.log("LAT NEMOVITOSTI NEUVEDENA");	
							$('#showOnMapBtn').attr('onClick',"showOnMap("+result.nemovitost.obec_stred_lat+","+ result.nemovitost.obec_stred_lon+");");
							}
							if(result.nemovitost.lat != "")
							{
							console.log(result.nemovitost.lat);	
							console.log("LAT NEMOVITOSTI UVEDENA");	
							$('#showOnMapBtn').attr('onClick',"showOnMap("+result.nemovitost.lat+","+ result.nemovitost.lon+");");
							}
							
							//IF EVERYTHING IS SUCESSFULLY FINISHED HIDE INFO MESSAGE
							
							$(".infoBar").hide();
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}

function showOnMapTest()
{
	
	
	//IF EVERYTHING IS FINISHED CHANGE PAGE
    $.mobile.changePage( "#showRealitiesOnMapPage", { transition: "slideup"} );		
    //TESTING JSON
    var nemovitost = [
{ "title": "barak1",
                "lat": "48.974481",
                "popis": "Prodej pěkné chalupy v blízkosti Borovan. Jedná se o klasické vesnické stavení, které se sestává z obytné části, vejminku a stodoly. Obytnou část tvoří kuchyně, obývací pokoj, ložnice, koupelna, WC, p",
                "cena": 22222,
                "lon": "14.474546"  },

{"title": "barak2",
                "lat": "48.975024",
                "popis": "Nabízíme k prodeji udržovanou chalupu 3+1 v Nepomuku u Dražíče. Chalupa se nachází na okraji obce v blízkosti lesa. Dispozice : Kuchyň, 2 x pokoj, chodba, samostatná koupelna a WC se započatou rekonst",
                "cena": 22522,
                "lon": "14.473994"}]; 
        

    //INIT MAP AND DEAFAULT SETTING FOR THIS MAP
    var mapOpts = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: true,
      scrollwheel: false
    }
    var map = new google.maps.Map(document.getElementById("map_canvas2"), mapOpts);
    //  We set zoom and center later by fitBounds()



    /**
     * makeMarker() ver 0.2
     * creates Marker and InfoWindow on a Map() named 'map'
     * creates sidebar row in a DIV 'sidebar'
     * saves marker to markerArray and markerBounds
     * @param options object for Marker, InfoWindow and SidebarItem
     * @author Esa 2009
     */
    var infoWindow = new google.maps.InfoWindow();
    var markerBounds = new google.maps.LatLngBounds();
    var markerArray = [];
     
    function makeMarker(options){
      var pushPin = new google.maps.Marker({map:map,	    
      icon: 'img/realt_1.png'  
});
      pushPin.setOptions(options);
      google.maps.event.addListener(pushPin, "click", function(){
        infoWindow.setOptions(options);
        infoWindow.open(map, pushPin);
        if(this.sidebarButton)this.sidebarButton.button.focus();
      });
      var idleIcon = pushPin.getIcon();
      if(options.sidebarItem){
        pushPin.sidebarButton = new SidebarItem(pushPin, options);
        pushPin.sidebarButton.addIn("sidebar");
      }
      markerBounds.extend(options.position);
      markerArray.push(pushPin);
      return pushPin;
    }

    google.maps.event.addListener(map, "click", function(){
      infoWindow.close();
    });


    /**
     * Creates an sidebar item, in this case button, which is hidden for user and user can switch between markers by top buttons
     * @constructor
     * @author Esa 2009
     * @param marker
     * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
     */
    var sidebarId = 0;
    function SidebarItem(marker, opts){
      sidebarId ++;
      //alert(sidebarId);
      var tag = opts.sidebarItemType || "button";
      var row = document.createElement(tag);
      row.innerHTML = opts.sidebarItem;
      row.className = opts.sidebarItemClassName || "sidebar_item";  
      //ADDED BECAUSE OF TRIGERING JQUERY CLICK
      row.id = "sidebar_item"+sidebarId;  
      //row.style.display = "block";
      row.style.width = opts.sidebarItemWidth || "120px";
      row.onclick = function(){
        google.maps.event.trigger(marker, 'click');
      }
      row.onmouseover = function(){
        google.maps.event.trigger(marker, 'mouseover');
      }
      row.onmouseout = function(){
        google.maps.event.trigger(marker, 'mouseout');
      }
      this.button = row;
    }
    // adds a sidebar item to a <div>
    SidebarItem.prototype.addIn = function(block){
      if(block && block.nodeType == 1)this.div = block;
      else
        this.div = document.getElementById(block)
        || document.getElementById("sidebar")
        || document.getElementsByTagName("body")[0];
      this.div.appendChild(this.button);
    }
    // deletes a sidebar item
    SidebarItem.prototype.remove = function(){
      if(!this.div) return false;
      this.div.removeChild(this.button);
      return true;
    }




    /**
     * add markers and info window contents
     *   makeMarker({
      position: new google.maps.LatLng(60.28527,24.84864),
      title: "Vantaankoski",
      sidebarItem: "Vantaankoski",
      content: "<b>Vantaankoski</b>"
    }); 
     *
     */
    
   var imgSrc = "http://img.ceskereality.cz/foto_mini/19890/19890asm13090224931593.jpg";
    
    $.each(nemovitost, function(i,item){
    	  makeMarker({
    	      position: new google.maps.LatLng(item.lat,item.lon),
    	      title: item.title,
    	      sidebarItem: item.title,
    	      content: "<div id=\"content\">"
    	    	
    	    	  +"<img src=\""+imgSrc+"\" />"
    	    	  +"<h4 style=\"float:right;left:20px;\">"+item.title+"</h4>"
    	    	
    	    	  +"<p style=\"float:right;left:20px;\">"+item.cena+"</p>"
    	    	  +"<a href=\"#mainPage\" style=\"float:right;left:20px;\" >Detail</p>"
    	  		  +"</div>"
    	      
    	    }); 

     
    });
    
    


    /**
     *   fit viewport to markers
     */
    map.fitBounds(markerBounds);



    
}


function registerNewUser()
{
	var name = $("#name").val() ;
		var surname = $("#surname").val() ;
			var email =$("#userEmail").val() ;
				var cellPhone =$("#cellPhone").val() ;
					var watcher = $("#watcher").val() ;
						var password = $.encoding.digests.hexSha1Str($("#passwordNewUsr").val() );
						console.log(
								"DELKA HESLA " +$("#passwordNewUsr").val().length+"\n"+
								name+"\n"+
								surname+"\n"+
								email+"\n"+
								cellPhone+"\n"+
								watcher+"\n"+
								password+"\n"
						);
						
						
						//VALIDATE THAT FORM IS FILLED
						 if(name.length == 0 || surname.length== 0 || email.length< 4 || cellPhone.length < 9 || watcher == 0|| $("#passwordNewUsr").val().length < 5 )
							 
						 {
						 $(".infoBarHeadingText").text('NESPRAVNE ZADANE HODNOTY, ZADEJTE PROSIM ZNOVU');	
						 $(".infoBar").show();
						 $(".infoBar").slideUp(6000);
						 return false;
						 }
						 
							
						//IF O.K, SEND DATA
						 else
						{
							 
							 
							 
							 console.log("FCE registerNewUser spustena");
							
									
											jQuery.ajax({
														
														url :"http://pts.ceskereality.cz/json/hlidac_registrace.html",
														data: {jmeno:name,prijmeni:surname,tel:cellPhone,email:email,heslo:password},
														type : "GET",
														beforeSend:function()
														{
															//SHOW MESSAGE ABOUT PROGRESS
															 $(".infoBarHeadingText").text('ODESILAM DATA..');	
															 $(".infoBar").show();
															//SHOW MESSAGE ON BTN 
															
															 $('#registerNewUsrBtn').attr("disabled", "disabled");
															//DISABLE INPUTS
															 $("#registerFieldContain :input").attr("disabled", "disabled");
															
															 
														},
														complete:function()
														{
															// $(".infoBar").hide();
														},
														success : function(result) {
														
															
															//TODO ADD VERIFICATION, THAT USER IS SUCCESSFULLY REGISTRED
															console.log(result.hlidac_registrace.status);
															console.log(result);
															if(result.hlidac_registrace.status === "ok")
															{
																
																$(".infoBarHeadingText").text('REGISTRACE O.K');	
																$(".infoBar").slideUp(6000);
																//CLEAR ALL INPUTS
																$("#registerFieldContain :input").text("");
																$("#registerFieldContain :input").val("");
															}	
															
															if(result.hlidac_registrace.status === "error")
															{
																
																//SHOW ERROR MESS
																$(".infoBarHeadingText").text('CHYBA PŘI REGISTRACI, ZKUSTE TO PROSÍM ZNOVU');	
																$(".infoBar").slideUp(6000);
																
																//AND ENABLE INPUTS
																$("#registerFieldContain :input").removeAttr("disabled");
																//CLEAR PASSWORD
																$("#passwordNewUsr").text("").val("");
															}	
																
															
															
														},
														// IF HTTP RESULT 400 || 404
														error : function(x, e) {
																
															typeOfRequestError(x, e);
														}
													});
								
								
							 
							 
						}
						
						
}



function loginUser()
{
	var email = $("#userLoginEmail").val() ;
	var password = $.encoding.digests.hexSha1Str($("#userLoginPassword").val() );
				
						console.log(
								email+"\n"+
								password+"\n"
								
						);
						
						
						//VALIDATE THAT FORM IS FILLED
						 if(email.length < 4 || $("#userLoginPassword").val().length< 4 )
							 
						 {
						 $(".infoBarHeadingText").text('NESPRAVNE ZADANE HODNOTY, ZADEJTE PROSIM ZNOVU');	
						 $(".infoBar").show();
						 return false;
						 }
						 
							
						//IF O.K, SEND DATA
						 else
						{
							 
							 
							 
							 console.log("ODESILANI DAT PRO fci loginUser spusteno");
							
									
											jQuery.ajax({
														
														url :"http://pts.ceskereality.cz/json/hlidac_prihlaseni.html",
														data: {email:email,heslo:password},
														type : "GET",
														beforeSend:function()
														{
															 $(".infoBarHeadingText").text('ODESILAM DATA..');	
															 $(".infoBar").show();
														},
														complete:function()
														{
															// $(".infoBar").hide();
														},
														success : function(result) {
														
															
															//TODO ADD VERIFICATION, THAT USER IS SUCCESSFULLY REGISTRED
															console.log(result);
															if(result.hlidac_prihlaseni.blokovany=== "0" )
															
														{
																 $(".infoBarHeadingText").text('PŘIHLÁŠENÍ ÚSPĚŠNÉ');	
																 $(".infoBar").show();
																	$(".infoBar").slideUp(6000);
																	//CLEAR ALL INPUTS
																	$("#loginFieldContain :input").text("");
																	$("#loginFieldContain :input").val("");
																	
																	
																	//SAVE VALUES TO LS
																	
																	
																	//SAVE JSON TO ARRAY IN LS
																	
																	//PREVIOUS EXIST? IF NOT CREATE
																	if(localStorage.savedUserSettings === undefined)
																	{
																	var muster = {"values" : []};
																	//localStorage.storedRealities = work;    
																	localStorage.setItem('savedUserSettings', JSON.stringify(muster));
																	}
																	else
																	{
																	console.log("savedUserSettings already exist in localstorage"); 
																	    
																	}
																	  
																	//GET VALUES AND PREPARE FROM STRING TO WORK
																	var parsedItems  = JSON.parse(localStorage.savedUserSettings);

																	console.log(parsedItems);   

																	//GET LENGTH
																	console.log(parsedItems.values.length);

																	
																	//DELETE OLD, SAVE NEW VALUES
																	
																	parsedItems.values.shift();  
																	parsedItems.values.push({"blokovany" : result.hlidac_prihlaseni.blokovany,"email" : result.hlidac_prihlaseni.email,
																	"id" : result.hlidac_prihlaseni.id,"jmeno" :result.hlidac_prihlaseni.jmeno,
																	"prijmeni" :result.hlidac_prihlaseni.prijmeni,"tel" : result.hlidac_prihlaseni.tel});//add to end of aaray 

																	$("#userLoginHeader").text("Uživatel "+result.hlidac_prihlaseni.prijmeni+" "+result.hlidac_prihlaseni.jmeno);
																	
																	
																	  
																	//PREPARE FOR SAVE TO LS AS STRING
																	localStorage.savedUserSettings = JSON.stringify(parsedItems);	
																	
																	
																	
																
														}
															
															
														else
														{
															 $(".infoBarHeadingText").text('PŘIHLÁŠENÍ NEÚSPĚŠNÉ');	
															 $(".infoBar").show();
																$(".infoBar").slideUp(6000);
																//CLEAR ALL INPUTS
																$("#userLoginPassword").text("");
																$("#userLoginPassword").val("");
																
															
														}
															
															
														},
														// IF HTTP RESULT 400 || 404
														error : function(x, e) {
																
															typeOfRequestError(x, e);
														}
													});
								
								
							 
							 
						}
						
						
}


function getNewPassword()
{
	var email = $("#userForgottenEmail").val() ;
				
						console.log(
								email+"\n"
								
						);
						
						
						//VALIDATE THAT FORM IS FILLED
						 if(email.length < 4)
							 
						 {
						 $(".infoBarHeadingText").text('NESPRAVNE ZADANE HODNOTY, ZADEJTE PROSIM ZNOVU');	
						 $(".infoBar").show();
						 return false;
						 }
						 
							
						//IF O.K, SEND DATA
						 else
						{
							 
							 
							 
							 console.log("ODESILANI DAT PRO fci getNewPassword spusteno");
							
									
											jQuery.ajax({
														
														url :"http://pts.ceskereality.cz/json/hlidac_heslo.html",
														data: {email:email},
														type : "GET",
														beforeSend:function()
														{
															 $(".infoBarHeadingText").text('ODESILAM DATA..');	
															 $(".infoBar").show();
														},
														complete:function()
														{
															// $(".infoBar").hide();
														},
														success : function(result) {
														
															
															//TODO ADD VERIFICATION, THAT USER IS SUCCESSFULLY REGISTRED
															console.log(result);
															
														
															
															
														},
														// IF HTTP RESULT 400 || 404
														error : function(x, e) {
																
															typeOfRequestError(x, e);
														}
													});
								
								
							 
							 
						}
						
						
}




/*THIS FUNCTION IS FOR SWICTHING OF MARKERS AT MAP, BUTTONS ARE HIDDEN AND WE INCREASE O DECR. ID OF HIDDEN BUTTON,
THIS BUTTON WE THEN SUBMIT BY TRIGGER*/

//TODO GET ACTUAL COUNT OF RETURNED VALUES FROM JSON AND SET THIS VALUE FOR REPEATING, FXP. IF COUT IS 9, AFTER 9, RESET TO 0
function updateMarker(action)
{
	if (action == 'increase')
	{
		markerID ++;
		$("#sidebar_item"+markerID+"").trigger('click'); 
	}
	
	if (action == 'decrease')
	{
		markerID --;
		$("#sidebar_item"+markerID+"").trigger('click'); 
	}
}


/*Writeout list of all matched realities by passed params
 * Example:
 * http://pts.ceskereality.cz/json/vypis.html?jensgps=0&typ=2&subtyp=1,3&okres=13&stranka=1&trideni=cena&ascdesc=desc&cenado=150000&cenaod=1200&plochaod=10&plochado=1000&mojelat=48.9808&mojelon=15.4814
 * */
function getListOfRealities(jensgps,typ,subTyp,okres,stranka,trideni,ascdesc,cenaod,cenado,plochaod,plochado,prefix,mojelat,mojelon,operace)
{
	
	
	//REMOVE ALL  PREVIOUS REALITIES
	$('.listOfFoudRealities li.listOfRealities').remove();
	

	console.log("FCE getListOfRealities spustena");
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/vypis.html",
							data: {jensgps:jensgps,typ:typ,subTyp:subTyp,okres:okres,stranka:stranka,trideni:trideni,ascdesc:ascdesc,cenaod:cenaod,cenado:cenado,plochaod:plochaod,plochado:plochado
								,prefix:prefix,mojelat:mojelat,mojelon:mojelon,operace:operace},
							type : "GET",
							
							success : function(result) {
							
								
								
								console.log(result);
								
								$("#countOfFoundRealities").text(result.nemovitosti.pocet);
								
								//GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								var countOfPages = result.nemovitosti.pocet / $(".choosenValues").attr('itemsPerPage') ;
								var countOfPagesRounded = Math.round(countOfPages);
								
								$(".choosenValues").attr('pagesTotal', countOfPagesRounded);
								$("#totalCountOfPages").text( countOfPagesRounded);	
								console.log("pocet STRANEK "+countOfPagesRounded);
								
								if(countOfPagesRounded === 0 )	
								{
									$.mobile.changePage('#nothingFoundPage', {transition: 'slidedown', role: 'dialog'});   
									return false;
								}
								
								//!! GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								
								
								
								var stringifiedRes = JSON.stringify(result.nemovitosti.nemovitost);	
								var parsedRes = JSON.parse(stringifiedRes);
							
								
								console.log(parsedRes);
								/*
								console.log(result.nemovitosti);
								console.log("POCET NALEZENYCH NEMOVITOSTI" +result.nemovitosti.pocet);
								
								
								console.log("NAVRACENE REALITY");
								console.log(result.nemovitosti.nemovitost);
								
								*/
								
								
								
								$.each(parsedRes, function(key, value) { 
									  
									//console.log(value.cena);	
									//console.log(value.cislo);	
									/* console.log('CENA:  '          + value.cena         + '\n' +
									         'CISLO: '         + cislo        + '\n' +
									         'datum_vlozeni: '         + datum_vlozeni        + '\n' +
									         'foto: '          + foto         + '\n' +
									         'inzerent: '          + inzerent         + '\n' +
									         'lat: '          + lat         + '\n' +
									         'lon: ' + lon  + '\n' +
									         'obec: '           + obec          + '\n' +
									         'okres: '             + okres             + '\n' +
									         'popis: '             + popis            + '\n' +
									         'prefix: '             + prefix            + '\n' +
									
									         'subtyp: '             + subtyp            + '\n' +
									         'typ: '             + typ            + '\n' +
									         'typ_ceny: '             + typ_ceny            + '\n' +
									         'vlastnictvi: '         + vlastnictvi     + '\n');
									 */ 
									
									
									$(".listOfFoudRealities").append("<li class=\"listOfRealities\">" +
											"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");" +
											" saveDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"',"+"'"+value.foto+"',"+"'"+value.cena+"',"+"'"+value.obec+"',"+"'"+value.plocha+"'"+");\" " +"idOfCity=\""+key+"\">" +
											"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
											"<h3>"+value.obec+"</h3>"+
											"<p><strong>"+value.cena+" Kč</p>"+
											"<p>"+value.popis+"</p>"+
											"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+
											
											"</a>" +
											"</li>");
						
								
								});
								

								$(".infoBar").hide();
								
								$.mobile.changePage("#writeoutOfRealities");
								$('.listOfFoudRealities').listview('refresh');
								
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}

//GET VALUES FROM DETAIL OF REALITY AND SAVE THIS VALUES TO FAVORITES IN LS
function saveToFavorites()
{
	console.log("getValuesToSaveToFavorites RUN ");
	//GET DETAILS
	console.log($("#prefix").text());
	console.log($("#inzerent").text());
	console.log($("#cislo").text());
	console.log($("#nabidkaod").text());
	console.log($("#adresa").text());
	console.log($("#mesto").text());
	console.log($("#cena").text());
	console.log($("#myNoteToReality").text());
	console.log($("#uvodniFoto").text());
	
	var prefix = $("#prefix").text();
	var inzerent = $("#inzerent").text();
	var cislo = $("#cislo").text();
	var nabidkaod = $("#nabidkaod").text();
	var adresa = $("#adresa").text();
	var mesto = $("#mesto").text();
	var cena = $("#cena").text();
	var poznamka = $("#myNoteToReality").text();
	var foto = $("#uvodniFoto").text();
	
	//SAVE JSON TO ARRAY IN LS
	
	//PREVIOUS EXIST? IF NOT CREATE
	if(localStorage.myFavoritesReality === undefined)
	{
	var muster = {"details" : []};
	//localStorage.storedRealities = work;    
	localStorage.setItem('myFavoritesReality', JSON.stringify(muster));
	}
	else
	{
	console.log("myFavoritesReality already exist in localstorage"); 
	    
	}
	  
	//GET VALUES AND PREPARE FROM STRING TO WORK
	var parsedItems  = JSON.parse(localStorage.myFavoritesReality);

	console.log(parsedItems);   

	//GET LENGTH
	console.log(parsedItems.details.length);

	
	//IF IS STORED MORE THAN 10 VALUES REMOV FIRST AND ADD LAST
	if(parsedItems.details.length >30)
	{
	parsedItems.details.shift();  
	parsedItems.details.push({"prefix" : prefix,"inzerent" : inzerent,"cislo" : cislo,"nabidkaod" :nabidkaod,"adresa" :adresa,"mesto" : mesto,"cena":cena,"poznamka":poznamka,"foto":foto});//add to end of aaray 

	}    
	else
	{    
	parsedItems.details.push({"prefix" : prefix,"inzerent" : inzerent,"cislo" : cislo,"nabidkaod" :nabidkaod,"adresa" :adresa,"mesto" : mesto,"cena":cena,"poznamka":poznamka,"foto":foto});//add to end of aaray 
	}
	  
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.myFavoritesReality = JSON.stringify(parsedItems);	
	
	console.log("myFavoritesReality DONE!");
	
}

//WTRITEOUT FAVOURITES
function getListOfSavedDFavourites()
{
	
	console.log("getListOfSavedDFavourites RUN");
	var parsedRes = JSON.parse(localStorage.myFavoritesReality);

	
	console.log(parsedRes);
	if(parsedRes.details.length==0)
	{
		$(".infoBarHeadingText").text('NENÍ ULOŽENA ŽÁDNÁ NEMOVITOST');
		$(".infoBar").show();
		
	}
	
	
	
	$('.listOfSavedDFavourites li').remove();
	
	$.each(parsedRes.details, function(key, value) { 
		  
		//console.log(value.cena);	
		//console.log(value.cislo);	
		/* console.log('CENA:  '          + value.cena         + '\n' +
		         'CISLO: '         + cislo        + '\n' +
		         'datum_vlozeni: '         + datum_vlozeni        + '\n' +
		         'foto: '          + foto         + '\n' +
		         'inzerent: '          + inzerent         + '\n' +
		         'lat: '          + lat         + '\n' +
		         'lon: ' + lon  + '\n' +
		         'obec: '           + obec          + '\n' +
		         'okres: '             + okres             + '\n' +
		         'popis: '             + popis            + '\n' +
		         'prefix: '             + prefix            + '\n' +
		
		         'subtyp: '             + subtyp            + '\n' +
		         'typ: '             + typ            + '\n' +
		         'typ_ceny: '             + typ_ceny            + '\n' +
		         'vlastnictvi: '         + vlastnictvi     + '\n');
		 */ 
		
		
		$(".listOfSavedDFavourites").append("<li class=\"listOfRealities\">" +
				"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");" +"\" " +"idOfCity=\""+key+"\">" +
				"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
				"<h3>"+value.obec+"</h3>"+
				"<p><strong>"+value.cena+" Kč</strong></p>"+
				"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+	
				"</a>" +
				"<a onClick=\"deleteSavedFafourites("+key+");\" data-rel=\"dialog\" data-transition=\"slideup\"></a>"+
				"</li>");

	
	});
	 
	//REDIRECT
	$.mobile.changePage( "#favouritesRealitiesPage");
	
	$(".infoBar").hide();
	//REFRESH MUST BE CALL AFTER CHANGEPAGE
	$('.listOfSavedDFavourites').listview('refresh');	
}


//DELETE ITEM FROM FAVOURITES
function deleteSavedFafourites(id)
{
	console.log("deleteSavedFafourites RUN");
	var parsedRes = JSON.parse(localStorage.myFavoritesReality);
	console.log(parsedRes);
	
	console.log("Mazu prvek na pozici"+ id);
	parsedRes.details.splice(id,id+1);
	console.log(parsedRes.details.length);
	
	//PREPARE FOR SAVE TO LS AS STRING
	localStorage.myFavoritesReality = JSON.stringify(parsedRes);	
	
	getListOfSavedDFavourites();
}

/*Writeout list of all matched realities by passed params
 * Example:
 * http://pts.ceskereality.cz/json/vypis.html?jensgps=0&typ=2&subtyp=1,3&okres=13&stranka=1&trideni=cena&ascdesc=desc&cenado=150000&cenaod=1200&plochaod=10&plochado=1000&mojelat=48.9808&mojelon=15.4814
 * */
function getListOfRealitiesFromRealEstate(prefix)
{
	
	//REDIRECT
	$.mobile.changePage( "#writeoutOfRealitiesFromRealEstate");
	
	//REMOVE ALL  PREVIOUS REALITIES
	$('.listOfFoudRealitiesFromRealEstate li.listOfRealities').remove();
	
	//SAVE PREFIX TO ATTR 
	$(".choosenValues").attr('RealEstatePrefix',prefix);
	
	//GET ACTUAL PAGE STORED IN ATTR
	var actualPage = $(".choosenValues").attr('actualPageOfRealityWriteoutRealEstate');

	
	console.log("FCE getListOfRealitiesFromRealEstate spustena");
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/vypis.html",
							data: {prefix:prefix,stranka:actualPage},
							type : "GET",
							
							success : function(result) {
							
								
								
								console.log(result);
								
								$("#totalCountOfRealitiesFromRealEstate").text(result.nemovitosti.pocet);
								
								//GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								var countOfPages = result.nemovitosti.pocet / $(".choosenValues").attr('itemsPerPage') ;
								var countOfPagesRounded = Math.round(countOfPages);
								
								
								//INSERT VALUES TO WRITEOUT DELIMITER
								$("#actualPageFromRealEState").text( $(".choosenValues").attr('actualPageOfRealityWriteoutRealEstate'));
								$(".choosenValues").attr('actualPageOfRealityWriteoutRealEstate');
								$(".choosenValues").attr('pagesTotalWriteoutRealEstate', countOfPagesRounded);
								$("#totalCountOfPagesFromRealEState").text( countOfPagesRounded);	
								console.log("pocet STRANEK "+countOfPagesRounded);
								//!! GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								
								
								
								var stringifiedRes = JSON.stringify(result.nemovitosti.nemovitost);	
								var parsedRes = JSON.parse(stringifiedRes);
							
								
								console.log(parsedRes);
								/*
								console.log(result.nemovitosti);
								console.log("POCET NALEZENYCH NEMOVITOSTI" +result.nemovitosti.pocet);
								
								
								console.log("NAVRACENE REALITY");
								console.log(result.nemovitosti.nemovitost);
								
								*/
								
								
								
								$.each(parsedRes, function(key, value) { 
									  
									//console.log(value.cena);	
									//console.log(value.cislo);	
									/* console.log('CENA:  '          + value.cena         + '\n' +
									         'CISLO: '         + cislo        + '\n' +
									         'datum_vlozeni: '         + datum_vlozeni        + '\n' +
									         'foto: '          + foto         + '\n' +
									         'inzerent: '          + inzerent         + '\n' +
									         'lat: '          + lat         + '\n' +
									         'lon: ' + lon  + '\n' +
									         'obec: '           + obec          + '\n' +
									         'okres: '             + okres             + '\n' +
									         'popis: '             + popis            + '\n' +
									         'prefix: '             + prefix            + '\n' +
									
									         'subtyp: '             + subtyp            + '\n' +
									         'typ: '             + typ            + '\n' +
									         'typ_ceny: '             + typ_ceny            + '\n' +
									         'vlastnictvi: '         + vlastnictvi     + '\n');
									 */ 
									
									
									$(".listOfFoudRealitiesFromRealEstate").append("<li class=\"listOfRealities\">" +
											"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");\" " +"idOfCity=\""+key+"\">" +
											"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
											"<h3>"+value.obec+"</h3>"+
											"<p><strong>"+value.cena+" Kč</p>"+
											"<p>"+value.popis+"</p>"+
											"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+
											
											"</a>" +
											"</li>");
						
								
								});
								

								$('.listOfFoudRealitiesFromRealEstate').listview('refresh');
								$(".infoBar").hide();
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}



function getListOfRealitiesTest()
{
	
	//REMOVE ALL  PREVIOUS REALITIES
	$('.listOfFoudRealities li.listOfRealities').remove();
	

	console.log("FCE getListOfRealities spustena");
	$(".infoBarHeadingText").text('Nacitam data..');
	$(".infoBar").show();
		
				jQuery.ajax({
							
							url :"http://pts.ceskereality.cz/json/vypis.html?jensgps=0&typ=2&subtyp=1,3&okres=13&stranka=1&trideni=cena&ascdesc=desc&cenado=150000&cenaod=1200&plochaod=10&plochado=1000&mojelat=48.9808&mojelon=15.4814",
							//data: {jensgps:jensgps,typ:typ,subTyp:subTyp,okres:okres,stranka:stranka,trideni:trideni,ascdesc:ascdesc,cenaod:cenaod,cenado:cenado,plochaod:plochaod,plochado:plochado,prefix:prefix,mojelat:mojelat,mojelon:mojelon},
							type : "GET",
							
							success : function(result) {
							
								
								
								console.log(result);
								
								$("#countOfFoundRealities").text(result.nemovitosti.pocet);
								
								//GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								var countOfPages = result.nemovitosti.pocet / $(".choosenValues").attr('itemsPerPage') ;
								var countOfPagesRounded = Math.round(countOfPages);
								
								$(".choosenValues").attr('pagesTotal', countOfPagesRounded);
								$("#totalCountOfPages").text( countOfPagesRounded);	
								console.log("pocet STRANEK "+countOfPagesRounded);
								//!! GET COUNT OF PAGES AND FILL THIS VALUE INTO ATTR
								
								
								
								var stringifiedRes = JSON.stringify(result.nemovitosti.nemovitost);	
								var parsedRes = JSON.parse(stringifiedRes);
							
								
								console.log(parsedRes);
								/*
								console.log(result.nemovitosti);
								console.log("POCET NALEZENYCH NEMOVITOSTI" +result.nemovitosti.pocet);
								
								
								console.log("NAVRACENE REALITY");
								console.log(result.nemovitosti.nemovitost);
								
								*/
								
								
								
								$.each(parsedRes, function(key, value) { 
									  
									//console.log(value.cena);	
									//console.log(value.cislo);	
									/* console.log('CENA:  '          + value.cena         + '\n' +
									         'CISLO: '         + cislo        + '\n' +
									         'datum_vlozeni: '         + datum_vlozeni        + '\n' +
									         'foto: '          + foto         + '\n' +
									         'inzerent: '          + inzerent         + '\n' +
									         'lat: '          + lat         + '\n' +
									         'lon: ' + lon  + '\n' +
									         'obec: '           + obec          + '\n' +
									         'okres: '             + okres             + '\n' +
									         'popis: '             + popis            + '\n' +
									         'prefix: '             + prefix            + '\n' +
									
									         'subtyp: '             + subtyp            + '\n' +
									         'typ: '             + typ            + '\n' +
									         'typ_ceny: '             + typ_ceny            + '\n' +
									         'vlastnictvi: '         + vlastnictvi     + '\n');
									 */ 
									
									
									$(".listOfFoudRealities").append("<li class=\"listOfRealities\">" +
											"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");\" " +"idOfCity=\""+key+"\">" +
											"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
											"<h3>"+value.obec+"</h3>"+
											"<p><strong>"+value.cena+" Kč</p>"+
											"<p>"+value.popis+"</p>"+
											"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+
											
											"</a>" +
											"</li>");
						
								
								});
								

								$('.listOfFoudRealities').listview('refresh');
								$(".infoBar").hide();
								
							},
							// IF HTTP RESULT 400 || 404
							error : function(x, e) {
									
								typeOfRequestError(x, e);
							}
						});
	
	
	
	
}



/*FILL PAGES FOR RECOMENDED REALITIES PAGE */


function fillRecommnededRealitiesPage()
{

	$(".infoBar").hide();
	
	
	var fetchedClassifiers = localStorage.getItem('Classifiers');
	
	// ARSE FROM STORED VALUES IN LS 
	var parsedFetchedClassifields = JSON.parse(fetchedClassifiers);

	console.log('retrievedObject:'+ parsedFetchedClassifields);
	console.log(parsedFetchedClassifields);
	

	//FILL COUNTRY LIST
	$.each(parsedFetchedClassifields.ciselniky.region, function(key, value) { 
			  console.log("NACTENE REGIONY" +key + ': ' + value); 
			  $("#regionSelectBox").append("<option value=\""+key+"\">"+value+"</option>");
	});

	
	//FILL TYPE OF TYPE
	$.each(parsedFetchedClassifields.ciselniky.typ, function(key, value) { 
		  console.log("NACTENE TYPY" +key + ': ' + value); 
		  $("#typeRecommendedSelectBox").append("<option value=\""+key+"\">"+value+"</option>");
	});

	
	//ON BTN CLICK CALL FUNCTION FOR WRITEOUT OF RECOMMENDED REALITIES
	$("#selectedRegionAndTypeBtn").click(function() {
		
	    console.log ("ZVOLENY KRAJ  :" + $('select#regionSelectBox option:selected').val()); 
	    console.log ("ZVOLENY TYP  :" +$('select#typeRecommendedSelectBox option:selected').val()); 
	
	    var country  =  $('select#regionSelectBox option:selected').val();
	    var type  =  $('select#typeRecommendedSelectBox option:selected').val();
	    
	    showRecommendedRealities(country, type);
	    
		});
	
		
	$.mobile.changePage("#recommendedRealitiesPage");
	
}

function renewFormForRecommendedRealities()
{   //SHOW FORM
    $("#divWithFormToSelect").show();
    
    //SHOW LIST 
    $(".listOfRecommendedRealities").hide();
	
}

/* WRITEOUT RECOMNENDED REALITIES LIST FROM PASSED VALUES */

function showRecommendedRealities(country, type)
{
	

	console.log("showRecommendedRealities prejalo PARAMETRY"+country+" a "+type+"");	
	

    
    //HIDE FORM
    $("#divWithFormToSelect").hide();
    
    //SHOW LIST 
    $(".listOfRecommendedRealities").show();


    $(".infoBarHeadingText").text('NAČÍTÁM DOPORUČENÉ REALITY');
    	
    $(".infoBar").show();
    	
    			jQuery.ajax({
    						
    						url :"http://pts.ceskereality.cz/json/vypis_doporucene.html",
    						data: {region : country,typ : type},
    						type : "GET",
    						
    						success : function(result) {
    							console.log(result);
    			    			
    							
    							
    							$('.listOfRecommendedRealities li').remove();
								
								$.each(result.nemovitosti.nemovitost, function(key, value) { 
									$(".listOfRecommendedRealities").append("<li class=\"listOfRealities\">" +
											"<a  onClick=\"showDetailOfReality('"+value.prefix+"',"+"'"+value.inzerent+"',"+"'"+value.cislo+"'"+");\" " +"idOfCity=\""+key+"\">" +
											"<img src=\"http://img.ceskereality.cz/foto_mini/"+value.inzerent+"/"+value.foto+"\" width=\"80px\" />" +
											"<h3>"+value.obec+"</h3>"+
											"<p><strong>"+value.cena+" Kč</p>"+
											"<p>"+value.popis+"</p>"+
											"<p class=\"ui-li-aside\"><strong>"+value.plocha+" m2</strong></p>"+
											
											"</a>" +
											"</li>");
						
								
								});
								$('.listOfRecommendedRealities').listview('refresh');
    							
    							
    							
    							$(".infoBar").hide();		
    							
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
	
	
	$('#priceFrom option').remove();

	$('#priceTo option').remove();
	
	/*FILL FOR SALE OF FLATS, HOUSES, AREAS, ETC*/
	
	if(typeOf === "sell")
	{
		

		console.log ("Plnim ciselniky hodnotami pro prodej");
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceFrom").append("<option value=\""+int * 100000+"\">"+int * 100000+" Kč</option>");
			console.log(int * 100000);
			
		}	
		
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceTo").append("<option value=\""+int * 100000+"\">"+int * 100000+" Kč</option>");
			console.log(int * 100000);
			
		}
	
	
	
	}
	
	
/*FILL FOR RENT OF FLATS, HOUSES, AREAS, ETC*/
	
	if(typeOf === "rent")
	{
		
		console.log ("Plnim ciselniky hodnotami pro pronajem"); 
		//TODO FILL INTO LIST USER CURRENCY 
		for ( var int = 0; int < steps; int++) {
		
			$("#priceFrom").append("<option value=\""+int * 1000+"\" >"+int * 1000+" Kč/měs</option>");
			console.log(int * 1000);
			
		}
		
		
		for ( var int = 0; int < steps; int++) {
			
			$("#priceTo").append("<option value=\""+int * 1000+"\">"+int * 1000+" Kč/měs</option>");
			console.log(int * 1000);
			
		}
		
		
		
	}
	
	
	
	
	$('#priceRange').click(function() {
	    
		
	    console.log ("Cena od zvolena  :" + $('select#priceFrom option:selected').val()); 
	    console.log ("Cena od do  :" +$('select#priceTo option:selected').val()); 
	    
	    //UPDATE VALUES IN PAGE WHERE IS RETURNED TO

	    
	    $(".choosenPriceBtn .ui-btn-text").text($('select#priceFrom option:selected').text()+" - "+$('select#priceTo option:selected').text());
	    $(".choosenValues").attr("priceFrom",$('select#priceFrom option:selected').val());
	    $(".choosenValues").attr("priceto",$('select#priceTo option:selected').val());
	    
	});
	
	
	
	
}

function changeSortMethod(sortBy)
{
	
	console.log(sortBy);
	$(".choosenValues").attr("sortBy",sortBy);
	getParamsForSearch();
	
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
							
							
							
							//$(".infoBarHeadingText").text('OBEC USPESNE NACTENA');
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

$.mobile.changePage("#selectOnMapPage");

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