/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var versionRettApp = "001";
var gapReady = $.Deferred();
var jqmReady = $.Deferred();

//Catch "deviceready" event which is fired when PhoneGap is ready
document.addEventListener("deviceReady", deviceReady, false);

//Resolve gapReady in reponse to deviceReady event
function deviceReady()
{
	gapReady.resolve();
}

/**
* Catch "mobileinit" event which is fired when a jQueryMobile is loaded.
* Ensure that we respond to this event only once.
*/
$(document).one("mobileinit", function(){
	jqmReady.resolve();
});

/**
* Run your App Logic only when both frameworks have loaded
*/
$.when(gapReady, jqmReady).then(myAppLogic);

// App Logic
function myAppLogic(){
	var obj = $('a[data-rel="external"]');
	$.each(obj, function(){
		currentLink = $(this).attr('href');
		$(this).attr('href', '#');
		$(this).attr('onclick', 'openDeviceBrowser("'+currentLink+'")' );
	});
	$('a[data-func="vibrate"]').click(function(){
		navigator.notification.vibrate(100);
	});
	$(document).on("pagebeforeshow", "#main-02-index", function(event) {
		$.ajax({
			dataType: 'jsonp',
			jsonp: 'callback',
			url: 'http://aid.rettapp.org/version.php',
			timeout: 2000,
			error: function(){
				$('.showVersion').html('<a href="#" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-alert ui-shadow ui-state-disabled">Versionsabfrage nicht möglich!</a>');
			},
			success: function (data, textStatus) {
				if(versionRettApp >= data.version){
					$('.showVersion').html('<a href="#" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-check ui-shadow ui-state-disabled">Neueste Version installiert</a>');
				}else{
					$('.showVersion').html('<a href="#" onclick="openDeviceBrowser("http://aid.rettapp.org/");" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-alert ui-shadow">Aktueller Version verfügbar</a>');
				}
			}
		});
    });
}

