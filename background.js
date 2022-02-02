async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.runtime.onInstalled.addListener(()=>
    chrome.storage.sync.set({"easy":"25","medium":"45","hard":"60","auto":"fal","diff":"fal"},()=>{
        console.log("loaded codetime initalization settings");
    })
);
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.alarms.clearAll();
    chrome.action.setBadgeText({text:''});
    contentload(changeInfo,tabId,tab);   
    autodiff();
});


chrome.alarms.onAlarm.addListener(async function() {
    chrome.scripting.insertCSS({
            target: { tabId: (await getCurrentTab()).id },
            files: ["inject.css"]
        }),
    chrome.alarms.clearAll();    
});
  
chrome.notifications.onButtonClicked.addListener(function() {
    chrome.storage.sync.get(['minutes'], function(item) {
        chrome.action.setBadgeText({text: 'ON'});
     chrome.alarms.create({delayInMinutes: item.minutes});
    });
});

function contentload(changeinfo,tabid,Tab){
    if (changeinfo.status === 'complete' && /^http/.test(Tab.url)) {
        chrome.storage.sync.get({"auto":"fal"},function(data){
            if(data.auto==="tru"){
                chrome.scripting.executeScript({
                    target: { tabId: tabid },
                    files: ["./content1.js"]});
                }
            else{
                chrome.scripting.executeScript({
                    target: { tabId: tabid },
                    files: ["./content2.js"]});
                }
            });
    }
}

function autodiff(){
    chrome.storage.sync.get(["easy","medium","hard","diff","diffval"],(data)=>{
        if(data.diff=="tru"){ 
            var value=data.diffval;
            if(value=="easy"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.easy)});
                chrome.action.setBadgeText({text: 'E'});
                
            }
            else if(value=="medium"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.medium)});
                chrome.action.setBadgeText({text: 'M'});
            }
            else if (value=="hard"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.hard)});
                chrome.action.setBadgeText({text: 'H'});
                
            }
            else{
                console.log("No difficulty detected when auto is on");
            }
        }
        else{
            console.log("auto diff is off");
        }
    });
}

/*chrome.tab.reload( await getCurrentTab().id ,function () {
        chrome.alarms.clearAll();
        chrome.action.setBadgeText({ text: '' });
});*/