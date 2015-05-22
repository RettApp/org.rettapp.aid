/*
Project: org.rettapp.aid
Author: Jonathan Starck
License: GNU GENERAL PUBLIC Version2, June 1991 & European Union Public Licence
Source: https://github.com/RettApp/org.rettapp.aid

Last Updated: 17. Mai 2015 22:47:42
*/
var versionRettApp="001";var gapReady=$.Deferred();var jqmReady=$.Deferred();document.addEventListener("deviceReady",deviceReady,false);function deviceReady(){gapReady.resolve()}$(document).one("mobileinit",function(){jqmReady.resolve()});$.when(gapReady,jqmReady).then(myAppLogic);function myAppLogic(){var a=$('a[data-rel="external"]');$.each(a,function(){currentLink=$(this).attr("href");$(this).attr("href","#");$(this).attr("onclick",'openDeviceBrowser("'+currentLink+'")')});$('a[data-func="vibrate"]').click(function(){navigator.notification.vibrate(100)});$(document).on("pagebeforeshow","#main-02-index",function(b){$.ajax({dataType:"jsonp",jsonp:"callback",url:"http://aid.rettapp.org/version.php",timeout:2000,error:function(){$(".showVersion").html('<a href="#" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-alert ui-shadow ui-state-disabled">Versionsabfrage nicht möglich!</a>')},success:function(c,d){if(versionRettApp>=c.version){$(".showVersion").html('<a href="#" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-check ui-shadow ui-state-disabled">Neueste Version installiert</a>')}else{$(".showVersion").html('<a href="#" onclick="openDeviceBrowser("http://aid.rettapp.org/");" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-alert ui-shadow">Aktueller Version verfügbar</a>')}}})})};