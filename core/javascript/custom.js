/*
Project: org.rettapp.aid
Author: Jonathan Starck
License: GNU GENERAL PUBLIC Version2, June 1991 & European Union Public Licence
Source: https://github.com/RettApp/org.rettapp.aid

Last Updated: 22. Mai 2015 13:19:59
*/
if(localStorage.getItem("settings")===null){var settings={};settings.startdisclaimer="0";localStorage.setItem("settings",JSON.stringify(settings))}function panelAndListRefresh(){$('body > [data-role="panel"]').panel();$('body > [data-role="panel"] [data-role="listview"]').listview().listview("refresh");$('body > [data-role="page"] [data-role="listview"]').listview().listview("refresh")}function changeSliderOnSettings(a,b){$(a+' [value="'+b+'"]').prop("selected",true);$(a).slider().slider("refresh")}$(document).on("pageinit",function(a){panelAndListRefresh()});$(document).on("pagebeforecreate","#main-01-disclaimer",function(b,c){var a=JSON.parse(localStorage.getItem("settings"));if(a.startdisclaimer=="1"){$.mobile.changePage("#main-02-index")}});$(document).on("pagebeforeshow","#function-02-settings",function(b){var a=JSON.parse(localStorage.getItem("settings"));changeSliderOnSettings("#settings-startdisclaimer",a.startdisclaimer)});$(document).on("pageshow",function(a){$("#saveSettings").click(function(){var b={};b.startdisclaimer=$("#settings-startdisclaimer").val();localStorage.setItem("settings",JSON.stringify(b));location.reload(true)})});$(document).on("pageshow","#aid-26",function(a){$("input").change(function(){unityLabel=$("#unity :radio:checked").attr("label");unityValue=$("#unity :radio:checked").val();agentAmount=$("#agent-amount").val();liquidAmount=$("#liquid-amount").val();unityPerKg=$("#unity-per-kg").val();patientWeight=$("#patient-weight").val();if(unityValue==="1"){results="<b>"+agentAmount+unityLabel+" auf "+liquidAmount+" ml</b><br>";results+=agentAmount*1000+"mg auf "+liquidAmount+" ml<br>";results+=agentAmount*1000000+"µg auf "+liquidAmount+" ml";$("#doseResultsConditionDefinition").html(results)}else{if(unityValue==="1000"){results=agentAmount/1000+"g auf "+liquidAmount+" ml</b><br>";results+="<b>"+agentAmount+unityLabel+" auf "+liquidAmount+" ml</b><br>";results+=agentAmount*1000+"µg auf "+liquidAmount+" ml";$("#doseResultsConditionDefinition").html(results)}else{if(unityValue==="1000000"){results=agentAmount/1000000+"g auf "+liquidAmount+" ml</b><br>";results+=agentAmount/1000+"mg auf "+liquidAmount+" ml<br>";results+="<b>"+agentAmount+unityLabel+" auf "+liquidAmount+" ml<b>";$("#doseResultsConditionDefinition").html(results)}}}if(unityValue==="1"){results="<b>"+agentAmount/liquidAmount+" "+unityLabel+"/ml</b><br>";results+=agentAmount*1000/liquidAmount+" mg/ml<br>";results+=agentAmount*1000000/liquidAmount+" µg/ml";$("#doseResultsCorrespondValue").html(results)}else{if(unityValue==="1000"){results=agentAmount/1000/liquidAmount+" g/ml<br>";results+="<b>"+agentAmount/liquidAmount+" "+unityLabel+"/ml</b><br>";results+=agentAmount*1000/liquidAmount+" µg/ml";$("#doseResultsCorrespondValue").html(results)}else{if(unityValue==="1000000"){results=agentAmount/1000000/liquidAmount+" g/ml<br>";results+=agentAmount/1000/liquidAmount+" mg/ml<br>";results+="<b>"+agentAmount/liquidAmount+" "+unityLabel+"/ml</b>";$("#doseResultsCorrespondValue").html(results)}}}if(unityValue==="1"){correspond=agentAmount*1000/liquidAmount;results=patientWeight*unityPerKg+" mg<br>";results+=patientWeight*unityPerKg/correspond+" ml bei aktueller Dosis";$("#doseResultsDoseValue").html(results)}else{if(unityValue==="1000"){correspond=agentAmount/liquidAmount;results=patientWeight*unityPerKg+" mg<br>";results+=patientWeight*unityPerKg/correspond+" ml bei aktueller Dosis";$("#doseResultsDoseValue").html(results)}else{if(unityValue==="1000000"){correspond=agentAmount/1000/liquidAmount;results=patientWeight*unityPerKg+" mg<br>";results+=patientWeight*unityPerKg/correspond+" ml bei aktueller Dosis";$("#doseResultsDoseValue").html(results)}}}})});$(document).on("pageinit",function(){$(".aid").listview({autodividers:true,autodividersSelector:function(a){var b=a.attr("divider");return b}}).listview("refresh")});