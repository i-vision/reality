
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
	}
	
	if (Number (firstTimeStartUp) == 1)
	{
		console.log("VALUES FOR APP ARE ALREADY STORED INTO APP, NOT NECESSARRY TO UPDATE");
		//http://pts.ceskereality.cz/json/ciselniky.html
		var test = getJson('http://search.twitter.com/search.json?q=bacon', 'GET');
		
		console.log("UKLADAM NAVRACENA DATA" + test);
		
		// Put the object into storage
		//localStorage.classifiers =  JSON.stringify(classifiers);
		
		
		
	}
	
	
}

function getJson(url,type)
{
	console.log(url);
	console.log(type);
	
	var returnValue;
    $.ajax({
        type: type,
        url: url,
        
        dataType: "jsonp",
        //async: false,
        //data: $("form").serialize(),
        success:
            function(result) {
                
                    returnValue = result;
                    return;
                
            },
        error:
            function(errorThrown) {
                alert("Error occured: " + errorThrown);
            }
        });

        return returnValue;
}

function downloadClassifiers()
{

		email = $("#userRegistrationEmail").val();
		password = $.encoding.digests.hexSha1Str($("#userRegistrationPassword")
				.val());
		appDefLanguge = $("#userRegistrationLanguage").val();

		if (!isValidEmailAddress(email) | password.length < 5) {

			$("#errorMessRegistration").show();
			$("#errorMessRegistration h1").text(text['chyba_registrace']);

		}

		else {
			$("#errorMessRegistration").hide();

			//
			// IF NOT, DO REQUEST
			// alert(apiUrl + "municipality/" + municipalityCode + ".json");
			jQuery
					.ajax({
						url : "api/users/register?email=" + email + "&password="
								+ password + "&applanguage=" + appDefLanguge + "",
						type : "GET",
						success : function(result) {
							console.log('DATA SENT');
							objectResult = jQuery.parseJSON(result);
							console.log(objectResult.status);

							if (objectResult.status == "user_alredy_exist") {
								$("#errorMessRegistration").show();
								$("#errorMessRegistration h1").text(
										text['uzivatel_existuje']);
								$("#sentNewPasswordBtn").show();

							}

							if (objectResult.status == "user_sucess_registered") {
								$("#errorMessRegistration").show();
								$("#errorMessRegistration h1").text(
										text['uzivatel_uspesne_registrovan']);
								$("#sentNewPasswordBtn").hide();
								$("#goToLoginBtn").show();

								$("#userRegistrationEmail").val("");
								$("#userRegistrationPassword").val("");

							}

						},
						// IF HTTP RESULT 400 || 404
						error : function(x, e) {

							if (x.status == 0) {
								console
										.log('You are offline!!\n Please Check Your Network.');
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
					});

		}

	}


var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var locationWatch = false;

var toggleLocation = function() {
    var suc = function(p) {
        jQuery("#loctext").empty();
                
        var text = "<div class=\"locdata\">Latitude: " + p.coords.latitude
                + "<br/>" + "Longitude: " + p.coords.longitude + "<br/>"
                + "Accuracy: " + p.coords.accuracy + "m<br/>" + "</div>";
        jQuery("#locdata").append(text);

        var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center="
                + p.coords.latitude
                + ","
                + p.coords.longitude
                + "&zoom=13&size=280x175&markers=color:blue|"
                + p.coords.latitude + ',' + p.coords.longitude;

        jQuery("#map").remove();
        jQuery("#loccontainer").append(
                jQuery(document.createElement("img")).attr("src", image_url)
                        .attr('id', 'map'));
    };
    var fail = function(error) {
        jQuery("#loctext").empty();
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User did not share geolocation data.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Could not detect current position.");
            break;

        case error.TIMEOUT:
            alert("Retrieving position timed out.");
            break;

        default:
            alert("Unknown error.");
            break;
        }
    };

    if (locationWatch) {
        locationWatch = false;
        jQuery("#loctext").empty();
        jQuery("#locdata").empty();
        jQuery("#map").remove();
    } else {
        if (navigator.geolocation) {
            jQuery("#loctext").append("Getting geolocation . . .");
            navigator.geolocation.getCurrentPosition(suc, fail);
        } else {
            jQuery("#loctext").empty();
            jQuery("#loctext").append("Unable to get location.");
            alert("Device or browser can not get location.");
        }
        locationWatch = true;
    }
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

function toggleAccel() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
}

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    //console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.bottom = "160px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 30
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

// This is just to do this.
function readFile() {
    navigator.file.read('/sdcard/phonegap.txt', fail, fail);
}

function writeFile() {
    navigator.file.write('foo.txt', "This is a test of writing to a file",
            fail, fail);
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name &&
               contacts[2].name.formatted ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var compassWatch = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (compassWatch !== null) {
        navigator.compass.clearWatch(compassWatch);
        compassWatch = null;
        updateHeading({ magneticHeading : ""});
    } else {        
        var options = { frequency: 1000 };
        compassWatch = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);

    $("#accelmenu").live('expand', function() {
        toggleAccel();
    }).live('collapse', function() {
        toggleAccel();
    });

    $("#locationmenu").live('expand', function() {
        toggleLocation();
    }).live('collapse', function() {
        toggleLocation();
    });
    
    $("#compassmenu").live('expand', function() {
        toggleCompass();
    }).live('collapse', function() {
        toggleCompass();
    });    
}
