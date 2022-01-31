'use strict';

const popup={};

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.action.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({text: 'OFF'});
  chrome.alarms.clearAll();
  window.close();
}

//toggle buttton
var toggle=document.querySelector('input[id="swt"]');
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({"auto":"fal"},function(data){
    if(data.auto==="tru"){
      toggle.checked=true;
    }
  })
});
toggle.addEventListener('change', function () {
  if (toggle.checked) {
      chrome.storage.sync.set({"auto":"tru"});
    } 
  else {
      chrome.storage.sync.set({"auto":"fal"});
  }
});

//added messaging with the background script
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "something_completed") {
          //  To do something
          console.log(request.data.subject)
          console.log(request.data.content)
      }
  }
);*/


//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released
document.getElementById('Test').addEventListener('click', setAlarm);
document.getElementById('Easy').addEventListener('click', setAlarm);
document.getElementById('Medium').addEventListener('click', setAlarm);
document.getElementById('Hard').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);