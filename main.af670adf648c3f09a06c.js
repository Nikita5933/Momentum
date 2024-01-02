(()=>{"use strict";var e,t={3581:(e,t,n)=>{const r=n.p+"assets/edit.svg",o=n.p+"assets/save.svg",a=n.p+"assets/delete.svg";function c(e){e.classList.remove("fadeIn"),e.classList.add("fadeOut"),setTimeout((()=>{e.style.visibility="hidden"}),401)}function s(e){e.style.visibility="visible",e.classList.add("fadeIn"),e.classList.remove("fadeOut"),e.focus()}function i(e,t){localStorage.setItem(e,t)}document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("settings"),t=document.getElementById("settingsWrapper"),n=document.getElementById("settingsClose"),i=document.getElementById("toDoWrapper");e.addEventListener("click",s.bind(null,t)),n.addEventListener("click",c.bind(null,t)),t.addEventListener("keydown",(e=>{27===e.keyCode&&c(t)})),i.addEventListener("click",(e=>{e.target===t&&c(t)}));let d={pendingArray:[],completedArray:[]};const l="pending",u="completed",m=document.getElementById("task"),p=document.getElementById("addBtn"),y=document.getElementById("pendingWrapper"),g=document.getElementById("completedWrapper");function b(e){e===l?y.innerHTML="":g.innerHTML="",d[`${e}Array`].forEach(((t,n)=>function(e,t,n){const c=`\n        <div class="task ${t===u?"task-completed":""}" data-type="${t}" data-index="${n}">\n                    <button class="ticket"></button>\n                    <p class="text">${e}</p>\n                    <input class="edit" type="text">\n                    <div class="task-buttons__wrapper">\n                        <button class="tool-button edit-btn"><img src="${r}" alt="edit"></button>\n                        <button class="tool-button save-btn"><img src="${o}" alt="save"></button>\n                        <button class="tool-button delete-btn"><img src="${a}" alt="delete"></button>\n                    </div>\n                </div>\n        `;switch(t){case l:y.insertAdjacentHTML("beforeend",c);break;case u:g.insertAdjacentHTML("beforeend",c)}}(t,e,n))),function(e){const t=document.getElementById(`${e}Wrapper`);t.querySelectorAll(".task").forEach((t=>{const n=t.querySelector(".text"),r=t.querySelector(".edit"),o=t.querySelector(".save-btn"),a=t.querySelector(".edit-btn"),c=t.querySelector(".delete-btn");function s(){a.style.display="block",o.style.display="none",n.style.display="block",r.style.display="none",n.innerHTML=r.value,d[`${e}Array`][+t.dataset.index]=r.value}t.querySelector(".ticket").addEventListener("click",(n=>{const r=e===u?l:u,o=d[`${e}Array`].splice(+t.dataset.index,1);d[`${r}Array`].unshift(o.toString()),b(e),b(r)})),r.addEventListener("keydown",(e=>{13===e.keyCode&&s(),27===e.keyCode&&r.blur()})),a.addEventListener("click",(()=>{o.style.display="block",a.style.display="none",n.style.display="none",r.style.display="block",r.value=d[`${e}Array`][+t.dataset.index],r.focus()})),o.addEventListener("click",(()=>{s()})),c.addEventListener("click",(()=>{d[`${e}Array`].splice(+t.dataset.index,1),b(e)}))}))}(e)}p.addEventListener("click",(()=>{const e=m.value.trim();e&&(d.pendingArray.push(e),m.value="",b(l))})),m.addEventListener("keydown",(e=>{if(13===e.keyCode){const e=m.value.trim();e&&(d.pendingArray.push(e),m.value="",b(l)),m.blur()}27===e.keyCode&&m.blur()}));const v=document.getElementById("to-doSave"),h=document.getElementById("to-doReset");v.addEventListener("click",(()=>{0===d.pendingArray.length&&0===d.completedArray.length||localStorage.setItem("list",JSON.stringify(d)),c(t)})),h.addEventListener("click",(()=>{localStorage.setItem("list",""),c(t)})),localStorage.getItem("list")&&(d=JSON.parse(localStorage.getItem("list")),b(l),b(u))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".momentum__date-time"),t=document.querySelector(".momentum__date-date"),n=document.querySelector(".momentum__date-greetings"),r=document.querySelectorAll(".time_hour"),o=document.querySelectorAll(".time_min"),a=document.querySelectorAll(".time_sec"),d=document.createElement("span"),l=document.createElement("span"),u=+(new Date).toTimeString().substring(0,2);d.innerText="PM",l.innerText="AM",u>=0&&u<=11?e.append(l):(u>=12||"00"===u.toString())&&e.append(d),setInterval((()=>{const e=new Date,t=+e.toTimeString().substring(0,2),n=e.toTimeString().substring(3,5),c=e.toTimeString().substring(6,8);t>=1&&t<=12?(r[0].innerHTML=t.toString()[0],r[1].innerHTML=t.toString()[1]):t>=13&&t<=21?(r[0].innerHTML="0",r[1].innerHTML=(t-12).toString()):t>=23?(r[0].innerHTML="1",r[1].innerHTML=(t-12).toString()[1]):"00"===t.toString()&&(r[0].innerHTML="1",r[1].innerHTML=(+t+12).toString()[1]),o[0].innerHTML=n[0],o[1].innerHTML=n[1],a[0].innerHTML=c[0],a[1].innerHTML=c[1]}),1e3);const m=new Date,p=e=>e.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),y=p(m).match(/\w+/gm)[0];let g=p(m).match(/\d+/gm)[0];const b=p(m).match(/\w+/gm)[1],v=+m.toTimeString().substring(0,2);switch(v>=0&&v<=5?n.innerText+=" Night,":v>=6&&v<=11?n.innerText+=" Morning,":v>=12&&v<=17?n.innerText+=" Afternoon,":v>=18&&v<=23&&(n.innerText+=" Evening,"),g){case"1":case"21":case"31":g+="st";break;case"2":case"22":g+="nd";break;case"3":case"23":g+="rd";break;case"8":case"28":g+="ht";break;default:g+="th"}t.innerText=`${y}, ${g} of ${b}`;const h=document.querySelectorAll(".momentum__date-span"),k=document.querySelector("[data-name]"),x=document.querySelector("[data-focus]");function f(e,t,n,r){!function(e,t,n){let r=localStorage.getItem(e);if(r)return void(t.textContent=r);t.textContent=`[ENTER ${n}]`}(e,t,n),i(r,t.textContent)}let S;function T(e,t,n){const r=e.target;13===e.keyCode&&(i(t,r.textContent),i(n,r.textContent),r.blur()),27===e.keyCode&&(r.textContent=localStorage.getItem(n),r.blur())}function C(e,t,n){const r=e.target;i(n,r.textContent),i(t,r.textContent)}function E(e){s(w),setTimeout((()=>c(w)),9e3);for(let t=0;t<=9;t++)fetch(e,{headers:{"X-Api-Key":"LIZy/oRMSBzGuJGljz/ePA==z2C33S6Tv8rW4nzN",Accept:"image.jpg"}}).then((e=>{e.text().then((e=>{let t={created:new Date,data:e};S.transaction(["cachedForms"],"readwrite").objectStore("cachedForms").add(t).onerror=function(e){console.log("error storing data"),console.error(e)}}))})).catch((e=>{console.log(e)}))}h.forEach(((e,t)=>{e.addEventListener("keydown",(e=>{const n=e.target;if(n.innerText.length>=26&&0===t){if(8===e.keyCode||46===e.keyCode||37===e.keyCode||39===e.keyCode)return;e.preventDefault()}else if(1===t&&n.innerText.length>=39){if(8===e.keyCode||46===e.keyCode||37===e.keyCode||39===e.keyCode)return;e.preventDefault()}})),e.addEventListener("focus",(e=>{const t=e.target;"[ENTER NAME]"!==t.textContent&&"[ENTER FOCUS]"!==t.textContent||(t.textContent=null)})),e.addEventListener("blur",(e=>{const n=e.target;""===n.textContent&&0===t&&(n.textContent="[ENTER NAME]"),""===n.textContent&&1===t&&(n.textContent="[ENTER FOCUS]")}))})),function(){indexedDB.deleteDatabase("testPics");let e=indexedDB.open("testPics",1);e.onerror=function(){console.error("Unable to open database.")},e.onsuccess=function(){S=e.result,console.log("db opened")},e.onupgradeneeded=function(){S=e.result,S.createObjectStore("cachedForms",{keyPath:"id",autoIncrement:!0})}}(),window.addEventListener("load",f.bind(null,"nameTitle",k,"NAME","backupTitle")),window.addEventListener("load",f.bind(null,"focusTitle",x,"FOCUS","backupFocus")),k.addEventListener("keydown",(e=>T(e,"nameTitle","backupTitle"))),k.addEventListener("blur",(e=>C(e,"nameTitle","backupTitle"))),x.addEventListener("keydown",(e=>T(e,"focusTitle","backupFocus"))),x.addEventListener("blur",(e=>C(e,"focusTitle","backupFocus"))),fetch("https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080",{headers:{"X-Api-Key":"LIZy/oRMSBzGuJGljz/ePA==z2C33S6Tv8rW4nzN",Accept:"image.jpg"}}).then((e=>{e.text().then((e=>{let t={created:new Date,data:e},n=S.transaction(["cachedForms"],"readwrite");n.objectStore("cachedForms").add(t).onerror=function(e){console.log("error storing data"),console.error(e)},n.oncomplete=function(){console.log("data stored")};const r=document.createElement("img");r.src=`data:image/png;base64,${e}`,r.addEventListener("load",(()=>{document.body.style.backgroundImage=`url("${r.src}")`,document.body.style.backgroundRepeat="no-repeat"}))}))})).catch((e=>{console.log(e)})),setTimeout((()=>E("https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080")),3e3);const L=document.querySelector(".refresh"),w=document.querySelector(".refresh__loading");let A=2,_=0;L.addEventListener("click",(()=>{L.classList.add("rotateClass"),setTimeout((()=>{L.classList.remove("rotateClass")}),800)})),L.addEventListener("click",(()=>{5===_&&(E("https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080"),_=0);let e=S.transaction(["cachedForms"],"readonly").objectStore("cachedForms").get(A);e.onsuccess=function(){let t=e.result.data;const n=document.querySelector(".background");document.body.style.backgroundColor="rgba(0,0,0,.1)",document.body.style.backgroundImage=`url("data:image/png;base64,${t}")`,document.body.style.backgroundRepeat="no-repeat",n.classList.add("opacityBG"),setTimeout((()=>{n.classList.remove("opacityBG")}),400)},_++,A++}))})),document.addEventListener("DOMContentLoaded",(()=>{const e="161d11578995b0dd48447acb004b6a41",t=document.querySelector(".momentum__weather-block"),n=document.querySelector(".city");let r;function o(n){function o(e){const n=`\n            <div class="momentum__weather-info">\n            <div class="momentum__weather-temp"><span>${e.temp}</span> C°</div>\n            <div class="momentum__weather-description">Weather:<span> ${e.desc}</span></div>\n            <div class="momentum__weather-humidity">Humidity:<span> ${e.humidity} %</span></div>\n            <div class="momentum__weather-wind">Wind speed: <span>${e.wind} m/s</span></div>\n            </div>\n            `;t.innerHTML="",function(e){const n=document.createElement("div");switch(n.classList.add("momentum__weather-pict"),e.id){case 200:case 201:case 202:case 230:case 231:case 232:n.style.backgroundPosition="-70px 617px",n.style.backgroundSize="865%";break;case 210:case 211:case 212:case 221:n.style.backgroundPosition="-275px 617px",n.style.backgroundSize="865%";break;case 300:case 310:n.style.backgroundPosition="-70px 420px",n.style.backgroundSize="865%";break;case 301:case 311:n.style.backgroundPosition="-407px 224px",n.style.backgroundSize="725%";break;case 302:case 312:case 313:case 314:case 321:n.style.backgroundPosition="-231px 224px",n.style.backgroundSize="725%";break;case 500:case 501:case 520:case 531:n.style.backgroundPosition="-580px 547px",n.style.backgroundSize="725%";break;case 511:case 613:case 615:case 616:n.style.backgroundPosition="-484px 422px",n.style.backgroundSize="865%";break;case 502:case 503:case 504:case 522:n.style.backgroundPosition="-690px 423px",n.style.backgroundSize="865%";break;case 600:case 611:case 612:n.style.backgroundPosition="207px 439px",n.style.backgroundSize="865%";break;case 601:case 602:case 620:case 621:case 622:n.style.backgroundPosition="-70px 246px",n.style.backgroundSize="865%";break;case 701:case 711:case 721:case 731:case 741:case 751:case 762:n.style.backgroundPosition="408px 246px",n.style.backgroundSize="865%";break;case 771:case 781:n.style.backgroundPosition="219px 246px",n.style.backgroundSize="865%";break;case 800:n.style.backgroundPosition="390px 645px",n.style.backgroundSize="865%";break;case 801:n.style.backgroundPosition="-231px 381px",n.style.backgroundSize="725%";break;case 802:n.style.backgroundPosition="344px 381px",n.style.backgroundSize="725%";break;case 803:n.style.backgroundPosition="-481px 636px",n.style.backgroundSize="865%";break;case 804:n.style.backgroundPosition="508px 228px",n.style.backgroundSize="725%"}t.append(n)}(e),t.insertAdjacentHTML("beforeend",n)}fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${n}&limit=3&appid=${e}`).then((e=>{if(e.ok)return e.json();r=e.status})).then((n=>{let[r]=n;fetch(`https://api.openweathermap.org/data/2.5/weather?lang=en&units=metric&lat=${r.lat}&lon=${r.lon}&appid=${e}`).then((e=>{if(e.ok)return e.json()})).then((e=>{let{main:t,weather:n,wind:r}=e;return{temp:Math.round(t.temp),humidity:t.humidity,desc:n[0].description,id:n[0].id,wind:r.speed}})).then((e=>{o(e)})).catch((e=>{t.innerText="",t.insertAdjacentHTML("beforeend",'<div class="momentum__weather-error">Server error! Try later!</div>'),console.log(e)}))})).catch((e=>{let n='<div class="momentum__weather-error">City data search error, please try to enter the city correctly!</div>';r&&(n='<div class="momentum__weather-error">Server error! Try later!</div>'),t.innerText="",t.insertAdjacentHTML("beforeend",n),console.log(e)}))}n.addEventListener("keydown",(e=>{if(13===e.keyCode||27===e.keyCode){n.blur();const e=n.innerText.trim();i("city",e),o(e)}})),n.addEventListener("focus",(e=>{const n=e.target;"[ENTER CITY]"!==n.innerText&&"momentum__weather-error"!==t.children[0].classList.value||(n.innerText="",i("city",""))})),n.addEventListener("blur",(e=>{const r=e.target;if(""===r.innerText)return r.innerText="[ENTER CITY]",i("city",""),void(t.innerText="");const a=n.innerText.trim();i("city",a),o(a)})),localStorage.getItem("city")&&(o(localStorage.getItem("city")),n.innerText=localStorage.getItem("city"))}));const d=n.p+"assets/USD.png",l=n.p+"assets/BYN.png",u=n.p+"assets/EUR.png",m=n.p+"assets/RUB.png",p=n.p+"assets/CNY.png";document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".select"),t=e[0].querySelectorAll(".select ul li"),n=e[1].querySelectorAll(".select ul li"),r=e[0].querySelector("label button"),o=e[1].querySelector("label button"),a=document.querySelectorAll(".fromCurrency"),c=document.querySelectorAll(".toCurrency"),s=document.querySelector(".currencyFirst"),i=document.querySelector(".currencySecond"),y=document.querySelector(".lastUpdate"),g=document.querySelector(".amount"),b=document.querySelector(".inputChange"),v=document.querySelector(".currentChange"),h=document.querySelector(".change");function k(e,t){e.innerText=t,e.style.cssText=`background-image: url('${function(e){switch(e){case"BYN":return l;case"USD":return d;case"EUR":return u;case"RUB":return m;case"CNY":return p}}(t)}');\n                                        background-size: contain;\n                                        background-repeat: no-repeat;\n                                        background-position: 55% 50%;`}e.forEach((e=>{e.addEventListener("click",(()=>{e.classList.toggle("active")}))})),function(){const d=new Map;fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=USD").then((e=>{if(e.ok)return e.json()})).then((e=>{d.set("update",e.meta.last_updated_at),d.set("USD",e.data),console.log(`curr date - ${d.get("update")}`)})).then((()=>{fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=BYN").then((e=>{if(e.ok)return e.json()})).then((e=>{d.set("BYN",e.data)}))})).then((()=>{fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=RUB").then((e=>{if(e.ok)return e.json()})).then((e=>{d.set("RUB",e.data)}))})).then((()=>{fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=EUR").then((e=>{if(e.ok)return e.json()})).then((e=>{d.set("EUR",e.data)}))})).then((()=>{fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=CNY").then((e=>{if(e.ok)return e.json()})).then((l=>{d.set("CNY",l.data),s.innerText=d.get("USD").BYN.value.toFixed(5),y.innerText=d.get("update").replace(/Z|T/gi," ")+"UTC",i.innerText=d.get("BYN").USD.value.toFixed(5),g.addEventListener("focus",(async e=>{const t=document.querySelector("#id-from li.active").textContent,n=document.querySelector("#id-to li.active").textContent;let r;g.addEventListener("keydown",(e=>{const t=e.target;if(13!==e.keyCode&&27!==e.keyCode||t.blur(),"."===t.value.at(-2)||t.value.length>=12){if(8===e.keyCode||46===e.keyCode||37===e.keyCode||39===e.keyCode)return;e.preventDefault()}})),g.addEventListener("input",(e=>{const o=e.target;if(""===o.value)return r=0,b.innerText=r.toString(),void(v.innerText="0.00");r=+o.value,b.innerText=r.toString(),v.innerText=(d.get(t)[n].value*r).toFixed(2)}))})),h.addEventListener("click",(()=>{const s=c[2].innerText,i=a[2].innerText,l=e[0].querySelector(".select ul > li.active"),u=e[1].querySelector(".select ul > li.active");t.forEach((e=>{e.innerText!==u.innerText?e.classList.remove("active"):e.classList.add("active")})),n.forEach((e=>{e.innerText!==l.innerText?e.classList.remove("active"):e.classList.add("active")})),a[2].innerText=s,c[2].innerText=i,k(r,s),k(o,i),g.value&&(v.innerText=(d.get(s)[i].value*+g.value).toFixed(2))})),t.forEach((e=>{e.addEventListener("click",(()=>{const n=e.textContent;e.classList.add("active"),t.forEach((t=>{e!==t&&t.classList.remove("active")})),k(r,n),a.forEach((e=>{e.textContent=n}));const o=document.querySelector("#id-to li.active").textContent;s.innerText=d.get(n)[o].value.toFixed(5),i.innerText=d.get(o)[n].value.toFixed(5),g.value&&(v.innerText=(d.get(n)[o].value*+g.value).toFixed(2))}))})),n.forEach((e=>{e.addEventListener("click",(()=>{const t=e.textContent;e.classList.add("active"),n.forEach((t=>{e!==t&&t.classList.remove("active")})),k(o,t),c.forEach((e=>{e.textContent=t}));const r=document.querySelector("#id-from li.active").textContent;s.innerText=d.get(r)[t].value.toFixed(5),i.innerText=d.get(t)[r].value.toFixed(5),g.value&&(v.innerText=(d.get(r)[t].value*+g.value).toFixed(2))}))}))}))})).catch((e=>{console.log(e);y.parentNode.innerText="Server Error !"}))}()}))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,o,a)=>{if(!n){var c=1/0;for(l=0;l<e.length;l++){n=e[l][0],o=e[l][1],a=e[l][2];for(var s=!0,i=0;i<n.length;i++)(!1&a||c>=a)&&Object.keys(r.O).every((e=>r.O[e](n[i])))?n.splice(i--,1):(s=!1,a<c&&(c=a));if(s){e.splice(l--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[n,o,a]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var o=n.length-1;o>-1&&!e;)e=n[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,c=n[0],s=n[1],i=n[2],d=0;if(c.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(i)var l=i(r)}for(t&&t(n);d<c.length;d++)a=c[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(l)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),r.O(void 0,[202],(()=>r(1202)));var o=r.O(void 0,[202],(()=>r(3581)));o=r.O(o)})();