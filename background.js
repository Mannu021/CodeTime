async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]}),
        window.addEventListener("load", sw.init);
        chrome.action.setBadgeText({text: ''});
    
    }
    
});


chrome.alarms.onAlarm.addListener(async function() {
    chrome.action.setBadgeText({text: ''}),
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
