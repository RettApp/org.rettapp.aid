/*
Project: org.rettapp.aid
Author: Jonathan Starck
License: GNU GENERAL PUBLIC Version2, June 1991 & European Union Public Licence
Source: https://github.com/RettApp/org.rettapp.aid

Last Updated: 29. Mai 2015 11:03:02
*/
var versionRettApp="001";var jqmReady=$.Deferred(),pgReady=$.Deferred();document.addEventListener("deviceready",phonegapReady(),false);function phonegapReady(){$(document).on("mobileinit",function(){myAppLogic()})}function myAppLogic(){$(document).on("click","a",function(c){var b=$(this);var a=b.attr("href");if(b.attr("data-rel")=="external"){c.preventDefault();window.open(a,"_system");return false}})};