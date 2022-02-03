//set alarm function
function setAlarm(event){
  chrome.alarms.clearAll();
  var value=event.currentTarget.id;
  chrome.storage.sync.get(["easy","medium","hard"],(data)=>{
    if(value=="easy"){
      chrome.alarms.create({delayInMinutes:parseFloat(data.easy)});
      chrome.action.setBadgeText({text: 'E'});
    }
    else if(value=="medium"){
      chrome.alarms.create({delayInMinutes:parseFloat(data.medium)});
      chrome.action.setBadgeText({text: 'M'});
    }
    else if(value=="hard"){
      chrome.alarms.create({delayInMinutes:parseFloat(data.hard)});
      chrome.action.setBadgeText({text: 'H'});
    }
    else{
      chrome.action.setBadgeText({text:'N'});
    }
  });
  window.close();
}

//clear alarm function
function clearAlarm() {
  chrome.action.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

//Added Stopwatch toggle button
var swtoggle=document.querySelector('input[id="swt"]');
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({"stopwatch":"fal"},function(data){
    if(data.stopwatch=="tru"){
      swtoggle.checked=true;
    }
  })
});
swtoggle.addEventListener('change', function () {
  if (swtoggle.checked) {
      chrome.storage.sync.set({"stopwatch":"tru"});
    } 
  else {
      chrome.storage.sync.set({"stopwatch":"fal"});
  }
});


//Added autodetect toggle
var adtoggle=document.querySelector('input[id="at"]');
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({"auto_det":"fal"},function(data){
    if(data.auto_det=="tru"){
      adtoggle.checked=true;
    }
  })
});
adtoggle.addEventListener('change', function () {
  if (adtoggle.checked) {
      chrome.storage.sync.set({"auto_det":"tru"});
    } 
  else {
      chrome.storage.sync.set({"auto_det":"fal"});
  }
});


document.getElementById('easy').addEventListener('click', setAlarm);
document.getElementById('medium').addEventListener('click', setAlarm);
document.getElementById('hard').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

