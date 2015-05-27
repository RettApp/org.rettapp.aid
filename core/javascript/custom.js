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
function calculatePackYears(cigarettes, years){
	result = cigarettes*years/20;
	return result;
}
function kaufrunden(zahl){
	result = Math.round(zahl);
	return result;
}
$(document).on("pageinit", function(event) {
	panelAndListRefresh();
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
$(document).on("pagebeforeshow", function(event){
	activePage = $.mobile.activePage.attr("id");
	$('a.ui-btn-active').removeClass("ui-btn-active");
	$('[href="#'+activePage+'"]').addClass("ui-btn-active");
});

$(document).on("pageshow", function(event){
	$("input[id^='cigarettes']").change(function() {
		cigarettesEasy = $("#cigarettes-1__easy").val();
		cigarettesYearsEasy = $("#cigarettes-1-years__easy").val();
		easy = calculatePackYears(cigarettesEasy, cigarettesYearsEasy);
		$(".py-calculator-results__easy").html(kaufrunden(easy)+' py');
		
		cigarettes1Complex = $("#cigarettes-1__complex").val();
		cigarettes1YearComplex = $("#cigarettes-1-years__complex").val();
		cigarettes1 = calculatePackYears(cigarettes1Complex, cigarettes1YearComplex);
		
		cigarettes2Complex = $("#cigarettes-2__complex").val();
		cigarettes2YearComplex = $("#cigarettes-2-years__complex").val();
		cigarettes2 = calculatePackYears(cigarettes2Complex, cigarettes2YearComplex);
		
		cigarettes3Complex = $("#cigarettes-3__complex").val();
		cigarettes3YearComplex = $("#cigarettes-3-years__complex").val();
		cigarettes3 = calculatePackYears(cigarettes3Complex, cigarettes3YearComplex);
		
		cigarettes4Complex = $("#cigarettes-4__complex").val();
		cigarettes4YearComplex = $("#cigarettes-4-years__complex").val();
		cigarettes4 = calculatePackYears(cigarettes4Complex, cigarettes4YearComplex);
		
		cigarettes5Complex = $("#cigarettes-5__complex").val();
		cigarettes5YearComplex = $("#cigarettes-5-years__complex").val();
		cigarettes5 = calculatePackYears(cigarettes5Complex, cigarettes5YearComplex);
		
		cigarettes6Complex = $("#cigarettes-6__complex").val();
		cigarettes6YearComplex = $("#cigarettes-6-years__complex").val();
		cigarettes6 = calculatePackYears(cigarettes6Complex, cigarettes6YearComplex);
		
		complex = cigarettes1+cigarettes2+cigarettes3;
		$(".py-calculator-results__complex").html(kaufrunden(complex)+' py');
	});
})
$(document).on("pageshow", "#aid-26", function(event) {
	$("input").change(function() {
	    unityLabel = $("#unity :radio:checked").attr('label');
	    unityValue = $("#unity :radio:checked").val();
	    agentAmount = $("#agent-amount").val();
	    liquidAmount = $('#liquid-amount').val();
	    unityPerKg = $('#unity-per-kg').val();
	    patientWeight = $('#patient-weight').val();
	    
	    if(unityValue === '1'){
	        results = '<b>'+agentAmount+unityLabel+" auf "+liquidAmount+" ml</b><br>";
	        results += agentAmount*1000+'mg'+" auf "+liquidAmount+" ml<br>";
	        results += agentAmount*1000000+'µg'+" auf "+liquidAmount+" ml";
	        $('#doseResultsConditionDefinition').html(results);
	    }else if(unityValue === '1000'){
	        results = agentAmount/1000+"g"+" auf "+liquidAmount+" ml</b><br>";
	        results += '<b>'+agentAmount+unityLabel+" auf "+liquidAmount+" ml</b><br>";
	        results += agentAmount*1000+'µg'+" auf "+liquidAmount+" ml";
	        $('#doseResultsConditionDefinition').html(results);
	    }else if(unityValue === '1000000') {
	        results = agentAmount/1000000+"g auf "+liquidAmount+" ml</b><br>";
	        results += agentAmount/1000+"mg auf "+liquidAmount+" ml<br>";
	        results += '<b>'+agentAmount+unityLabel+" auf "+liquidAmount+" ml<b>";
	        $('#doseResultsConditionDefinition').html(results);
	    }
	    if(unityValue === '1'){
	        results = '<b>'+agentAmount/liquidAmount+' '+unityLabel+'/ml</b><br>';
	        results += agentAmount*1000/liquidAmount+' mg/ml<br>';
	        results += agentAmount*1000000/liquidAmount+' µg/ml';
	        $('#doseResultsCorrespondValue').html(results);
	    }else if(unityValue === '1000'){
	        results = agentAmount/1000/liquidAmount+' g/ml<br>';
	        results += '<b>'+agentAmount/liquidAmount+' '+unityLabel+'/ml</b><br>';
	        results += agentAmount*1000/liquidAmount+' µg/ml';
	        $('#doseResultsCorrespondValue').html(results);
	    }else if(unityValue === '1000000') {
	        results = agentAmount/1000000/liquidAmount+' g/ml<br>';
	        results += agentAmount/1000/liquidAmount+' mg/ml<br>';
	        results += '<b>'+agentAmount/liquidAmount+' '+unityLabel+'/ml</b>';
	        $('#doseResultsCorrespondValue').html(results);
	    }
	    if(unityValue === '1'){
	        correspond = agentAmount*1000/liquidAmount;
	        results = patientWeight*unityPerKg+' mg<br>';
	        results += patientWeight*unityPerKg/correspond+' ml bei aktueller Dosis';
	        $('#doseResultsDoseValue').html(results);
	    }else if(unityValue === '1000'){
	        correspond = agentAmount/liquidAmount;
	        results = patientWeight*unityPerKg+' mg<br>';
	        results += patientWeight*unityPerKg/correspond+' ml bei aktueller Dosis';
	        $('#doseResultsDoseValue').html(results);
	    }else if(unityValue === '1000000') {
	        correspond = agentAmount/1000/liquidAmount;
	        results = patientWeight*unityPerKg+' mg<br>';
	        results += patientWeight*unityPerKg/correspond+' ml bei aktueller Dosis';
	        $('#doseResultsDoseValue').html(results);
	    }
	});
});