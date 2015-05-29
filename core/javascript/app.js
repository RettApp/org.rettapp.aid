/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var versionRettApp = "001";
var jqmReady = $.Deferred(), pgReady = $.Deferred();

document.addEventListener("deviceready", phonegapReady(), false);

function phonegapReady(){
	$(document).on( "mobileinit", function(){
		myAppLogic();
	});
}

// App Logic
function myAppLogic(){
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


