document.addEventListener("DOMContentLoaded", restoreOptions());
function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#easy").value = result.easy || "30";
    document.querySelector("#medium").value= result.medium || "40";
    document.querySelector("#hard").value= result.hard|| "60";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = chrome.storage.sync.get(["medium","easy","hard"]);
  getting.then(setCurrentChoice, onError);
}

document.getElementById('sb').addEventListener('click',save_options);

function save_options() {
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
    setTimeout(function() {
      status.textContent = '';
    }, 4000);
  });
}
