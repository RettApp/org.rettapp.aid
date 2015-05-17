if (localStorage.getItem("settings") === null) {
	var settings = {};
	settings.startdisclaimer = '0';
	localStorage.setItem("settings", JSON.stringify(settings));
};
function panelAndListRefresh() {
	$('body > [data-role="panel"]').panel();
	$('body > [data-role="panel"] [data-role="listview"]').listview().listview('refresh');
	$('body > [data-role="page"] [data-role="listview"]').listview().listview('refresh');
}
function changeSliderOnSettings(sliderID, sliderIDvalue) {
	$(sliderID+' [value="'+sliderIDvalue+'"]').prop("selected", true);
	$(sliderID).slider().slider("refresh");
}
$(document).on("pageinit", function(event) {
	panelAndListRefresh();
});
$(document).on("pagebeforecreate", "#main-01-disclaimer", function(event, ui) {
	var settings = JSON.parse(localStorage.getItem('settings'));
	if(settings.startdisclaimer == "1") {
		$.mobile.changePage("#main-02-index");
	};
});


$(document).on("pagebeforeshow", "#function-02-settings", function(event) {
	var settings = JSON.parse(localStorage.getItem('settings'));
	changeSliderOnSettings('#settings-startdisclaimer', settings.startdisclaimer);
});



$(document).on("pageshow", function(event) {
	$("#saveSettings").click(function(){
		var settings = {};
		settings.startdisclaimer = $('#settings-startdisclaimer').val();
		localStorage.setItem("settings", JSON.stringify(settings));
		location.reload(true);
	});
});


$(document).on("pageinit", function(){
		$(".aid").listview({
		    autodividers: true,
		    autodividersSelector: function (li) {
		        var out = li.attr('divider');
		        return out;
		    }
		}).listview('refresh');
	});