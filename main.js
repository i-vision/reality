
//INIT OF ISCROLL PLUGIN

var myScroll;
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
		
		/*FILL TYPE OF FLATS  LIST*/
		
		var flatForRentList = parsedFetchedClassifields.ciselniky.subtyp[2];
		
		console.log(flatForRentList);
		
		
		$.each(flatForRentList, function(key, value) { 
				  console.log(key + ': ' + value); 
					$(".subtyp_2").append("<option value=\""+key+"\">"+value+"</option>");
		});	
		/*//FILL TYPE OF FLATS  LIST*/
		
		
		
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

//GET NAME AND 
//ID OF EACH SELECTED CITY
function passParamsOfCity(id,name) {

console.log("Vybrano mesto s id a jmenem "+ id + " "+name);	
$(".choosenCity .ui-btn-text").text(name);
$(".choosenCity").attr("idofcity",id);

}


//GET ID OF PAGE WHERE  
//USER IS REDIRECTED AFTER SELECT OF CITY

function pageForReturn(idOfpageForReturn) {

	console.log("Po zvoleni mesta navrat na stranku: "+idOfpageForReturn);

	
	 $(".pageForReturn").each(function() {
	        $(this).attr( 'href' , "#"+idOfpageForReturn );
	    });
	
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
	} else if (x.status == 404) {
		console.log('Requested URL not found.');
	} else if (x.status == 500) {
		console.log('Internel Server Error');
	} else if (e == 'parsererror') {
		console.log('Error.\nParsing JSON Request failed.');
	} else if (e == 'timeout') {
		console.log('Request Time out.');
	} else {
		console.log('Unknow Error.\n' + x.responseText);
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
function getMyPosition()
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

