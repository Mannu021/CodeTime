document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transitionDuration = '3.0s';
document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transform = 'rotate(3600deg)';
var oo=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY > div.btns__1OeZ");
var temp=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div");
var diff=temp.getAttribute("diff");
chrome.storage.sync.set({"diffval":diff});
console.log([diff]);

chrome.storage.sync.get(["auto"],(data)=>{
  if(data.auto=="tru"){
    stopwatch(oo);
  }
  else{
    console.log("stopwatch is off")
  }
});

chrome.storage.sync.get(["diff","easy","medium","hard","tri"],(data)=>{
  if(data.diff=="tru"){
    if(data.tri=="tru"){
      chrome.storage.sync.set({"tri":"fal"});
    }else{
      chrome.storage.sync.set({"tri":"tru"});
    }
    var t=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div");
    var dif=t.getAttribute("diff");
    chrome.storage.sync.set({"diffval":dif});
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && "onalarm" in changes) {
    document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY").style.background='#fbc2c2';
    chrome.storage.sync.set({"onalarm":"fal"});
    console.log(changes);
  }
});

const targetNode=document.querySelector("#app > div > div.main__2_tD");
const config = {childList:true};
const callback = function(mutationsList, observer){
  for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          chrome.storage.sync.get(["diff","easy","medium","hard","tri","auto"],(data)=>{
            if(data.diff=="tru"){
              var temp=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div");
              var diff=temp.getAttribute("diff");
              chrome.storage.sync.set({"diffval":diff});
              document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY").style.background='#fafafa';
              chrome.storage.sync.set({"col":"tru"});
              console.log(`difficulty is set to ${diff}`);
              if(data.tri=="tru"){
                chrome.storage.sync.set({"tri":"fal"});
              }else{
                chrome.storage.sync.set({"tri":"tru"});
              }
            }
            else{
              console.log("Autodetect difficult is off");
            }
            console.log("enter");
            if(data.auto=="tru"){
              var ox=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY > div.btns__1OeZ");
              stopwatch(ox);
              console.log("tried to add stopwatch on mutation");
            }
            else{
              console.log("stopwatch is off");
            }
            console.log("end");
      });
      }
      else{
          console.log('The attribute not modified.');
      }
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
//data-is-loadinggit 





//Stop watch code in pure js
function stopwatch(outercover){
    var time=document.createElement("div");
    time.textContent="00:00:00"
    time.id="sw-time";
    var reset=document.createElement("input");
    reset.type="button";
    reset.value="reset";
    reset.id="sw-rst";
    var start=document.createElement("input");
    start.type="button";
    start.value="start";
    start.id="sw-go";
    reset.style.background="none";
    start.style.background="none";
    reset.style.border="none";
    start.style.border="none";
    reset.style.color="rgb(176, 190, 197)";
    start.style.color="rgb(176, 190, 197)";
    time.style.color="rgb(176, 190, 197)";
    outercover.appendChild(start);
    outercover.appendChild(reset);
    outercover.appendChild(time);
    var sw = {
        etime : null, 
        erst : null,
        ego : null, 
        timer : null, 
        now : 0, 
        init : () => {
          sw.etime = document.querySelector("#sw-time");
          sw.erst = document.querySelector("#sw-rst");
          sw.ego = document.querySelector("#sw-go");
          sw.erst.onclick = sw.reset;
          sw.ego.onclick = sw.start;
          sw.erst.disabled = false;
          sw.ego.disabled = false;
        },
        start : () => {
          sw.timer = setInterval(sw.tick, 1000);
          sw.ego.value = "stop";
          sw.ego.onclick = sw.stop;
        },
        stop : () => {
          clearInterval(sw.timer);
          sw.timer = null;
          sw.ego.value = "start";
          sw.ego.onclick = sw.start;
        },
        tick : () => {
          sw.now++;
          let hours = 0, mins = 0, secs = 0,
          remain = sw.now;
          hours = Math.floor(remain / 3600);
          remain -= hours * 3600;
          mins = Math.floor(remain / 60);
          remain -= mins * 60;
          secs = remain;
          if (hours<10) { hours = "0" + hours; }
          if (mins<10) { mins = "0" + mins; }
          if (secs<10) { secs = "0" + secs; }
          sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
        },
        reset : () => {
          if (sw.timer != null) { sw.stop(); }
          sw.now = -1;
          sw.tick();
        }
    };
    sw.init();
}
