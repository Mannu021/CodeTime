document.addEventListener("DOMContentLoaded", restoreOptions());
document.getElementById('sb').addEventListener('click',save_options);

function restoreOptions() {
  //for setting default value in option page options from storage.sync
  function setCurrentChoice(result) {
    document.querySelector("#easy").value = result.easy;
    document.querySelector("#medium").value= result.medium;
    document.querySelector("#hard").value= result.hard;
  }
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  var getting = chrome.storage.sync.get(["medium","easy","hard"]);
  getting.then(setCurrentChoice, onError);
}

function save_options() {
  //for saving the option menu option in storage sync location
  var eas=document.getElementById("easy").value;
  var med=document.getElementById("medium").value;
  var har=document.getElementById("hard").value;
  chrome.storage.sync.set({
    easy:eas,
    medium: med,
    hard:har
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {status.textContent = ''}, 4000);
  });
}
