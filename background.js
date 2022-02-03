chrome.runtime.onInstalled.addListener(()=>
    chrome.storage.sync.set({"easy":"25",
                            "medium":"45",
                            "hard":"60",
                            "stopwatch":"fal",//auto
                            "auto_det":"fal",//diff
                            "two_check":"tru",//to check whin to contionous window have same diff
                            "onalarm":"fal"},()=>{
        console.log("loaded codetime initalization settings");
    })
);
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /problems/.test(tab.url)) {
        chrome.alarms.clearAll();
        chrome.action.setBadgeText({text:""});
        contentload(tabId); 
        console.log("injected content script");
    }  
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
        if("diffval" in changes || "two_check" in changes || "auto_det" in changes){
           autodiff();
        }
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
    chrome.storage.sync.get(["easy","medium","hard","auto_det","diffval"],(data)=>{
        if(data.auto_det=="tru"){ 
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
                chrome.action.setBadgeText({text:"Na"})
                console.log("No difficulty detected when auto is on");
            }
            console.log(`alarm is set to diff${value}`)
        }
        else{
            console.log("diff toggle is off");
        }
    });
}
