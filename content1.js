document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transitionDuration = '3.0s';
document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transform = 'rotate(3600deg)';
var temp=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div");
var diff=temp.getAttribute("diff");
chrome.storage.sync.set({"diffval":diff});
console.log([diff]);
var oo=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY > div.btns__1OeZ");


//#app > div > div.header__3STC
//data-is-loadinggit 


//Stop watch code in pure js
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
oo.appendChild(start);
oo.appendChild(reset);
oo.appendChild(time);




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

