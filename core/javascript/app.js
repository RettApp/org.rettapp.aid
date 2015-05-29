/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var versionRettApp = "001";
var jqmReady = $.Deferred(), pgReady = $.Deferred();

// jqm page is ready
$(document).one("pageinit", jqmReady.resolve);

// phonegap ready
document.addEventListener("deviceready", pgReady.resolve, false);

// all ready, throw a custom 'onDeviceready' event
$.when(jqmReady, pgReady).then(function(){
	myAppLogic();
});

// App Logic
function myAppLogic(){
	alert('Works');
	$(document).on('click', 'a', function (e){
		var elem = $(this);
		var url = elem.attr('href');
		if (elem.attr('data-rel') == 'external') {
			e.preventDefault();
			window.open(url, '_system');
			return false;
		}
	})
}


