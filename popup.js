'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.action.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({text: 'OFF'});

  window.close();
}
//toggle value automatic alarm
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      alert("checked")
    
    } else {
      chrome.storage.sync.set({toggle: "False"});
      alert("checked")
      
    }
  });
});




//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released
document.getElementById('Test').addEventListener('click', setAlarm);
document.getElementById('Easy').addEventListener('click', setAlarm);
document.getElementById('Medium').addEventListener('click', setAlarm);
document.getElementById('Hard').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);