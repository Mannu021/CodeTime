document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transitionDuration = '3.0s';
document.querySelector("#app > div > div.header__3STC > div > div > div.navbar-left-container__3-qz > div:nth-child(1) > a > img").style.transform = 'rotate(3600deg)';

var temp=document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div");
var diff=temp.getAttribute("diff");
chrome.storage.sync.set({"diffval":diff});
console.log(diff);
