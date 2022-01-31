async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.storage.sync.get({"auto":"fal"},function(data){
            if(data.auto==="tru"){
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./content1.js"]});
            }
            else{
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./content2.js"]});
            }
          });
        chrome.action.setBadgeText({text: ''});
    }
});

//swtoggle
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync'){
        val=chrome.storage.sync.get("auto",(item)=>{
            if(item.auto=="tru"){
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]});
            }

        });
    }
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
