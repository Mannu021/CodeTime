chrome.runtime.onInstalled.addListener(()=>
    chrome.storage.sync.set({"easy":"1","medium":"2","hard":"3","auto":"fal","diff":"fal","tri":"tru","onalarm":"fal"},()=>{
        console.log("loaded codetime initalization settings");
    })
);
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /problems/.test(tab.url)) {
        chrome.alarms.clearAll();
        chrome.action.setBadgeText({text:""});
        contentload(tabId); 
        console.log("inject content script");
    }  
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
        autodiff();
    }
});


chrome.alarms.onAlarm.addListener(async function() {
    console.log("onalarm");
    chrome.storage.sync.set({"onalarm":"tru"})
    chrome.alarms.clearAll();    
    chrome.action.setBadgeText({text:""});
});
  

function contentload(tabid){
    chrome.scripting.executeScript({
            target: { tabId: tabid },
            files: ["./content1.js"]});
}

function autodiff(){
    chrome.storage.sync.get(["easy","medium","hard","diff","diffval"],(data)=>{
        if(data.diff=="tru"){ 
            var value=data.diffval;
            if(value=="easy"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.easy)});
                chrome.action.setBadgeText({text: 'Ea'});
            }
            else if(value=="medium"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.medium)});
                chrome.action.setBadgeText({text: 'Ma'});
            }
            else if (value=="hard"){
                chrome.alarms.create({delayInMinutes:parseFloat(data.hard)});
                chrome.action.setBadgeText({text: 'Ha'});
                
            }
            else{
                console.log("No difficulty detected when auto is on");
            }
            console.log(`alarm is set to diff${value}`)
        }
        else{
            console.log("diff toggle is off");
        }
    });
}
