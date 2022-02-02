function setAlarm(event){
  var value=event.currentTarget.id;
  chrome.storage.sync.get(["easy","medium","hard","diff","diffval"],(data)=>{
    if(value=="easy"){
      chrome.alarms.create({delayInMinutes:parseFloat(data.easy)});
      chrome.action.setBadgeText({text: 'E'});
    }
    else if(value=="medium"){
      chrome.alarms.create({delayInMinutes:parseFloat(data.medium)});
      chrome.action.setBadgeText({text: 'M'});
    }
    else{
      chrome.alarms.create({delayInMinutes:parseFloat(data.hard)});
      chrome.action.setBadgeText({text: 'H'});
    }

    window.close();
  });
}//////////////

function clearAlarm() {
  chrome.action.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

//Add Stopwatch toggle button
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

//
var togglediff=document.querySelector('input[id="at"]');
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({"diff":"fal"},function(data){
    if(data.diff=="tru"){
      togglediff.checked=true;
    }
  })
});
togglediff.addEventListener('change', function () {
  if (togglediff.checked) {
      chrome.storage.sync.set({"diff":"tru"});
    } 
  else {
      chrome.storage.sync.set({"diff":"fal"});
  }
});

document.getElementById('easy').addEventListener('click', setAlarm);
document.getElementById('medium').addEventListener('click', setAlarm);
document.getElementById('hard').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

