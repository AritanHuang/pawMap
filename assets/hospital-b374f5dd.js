import{S as d}from"./bootstrap.min-2015cc09.js";import{t as h,a as i,b as o,u as g}from"./axios-744198d0.js";import{a as q,s as b}from"./utils-6feeab9a.js";const y=document.querySelector("#hospital-list"),k=document.querySelector("#pagination");let m=[],f=[],x=0,v=12,r=1,$=[];function w(){i.get(`${o}/hospitals`).then(function(t){m=t.data,x=m.length,L(1),E()}).catch(function(t){console.log(t)})}w();function S(){A();const t=document.querySelector("#hospital-search");let l="",a=0;f.forEach(function(e){let s="";if(e.機構地址){let c=e.機構地址;s=b(c)}l+=` <li class="col-12 col-sm-6 col-lg-4 ">
            <div class="card rounded-5 card-shadow hospital-card h-100">
                <div class="card-body p-3 p-lg-4">
                    <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${s}</span>
                        <p id="favorite-count-${e.id}" class="d-flex align-items-center justify-content-center dark50"><span 
                                class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${e.被收藏次數} 人收藏</p>
                    </div>
                    <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${e.機構名稱}</h5>
                    <ul class="mb-0 list-unstyled">
                        <li class="mb-1"><a class="d-flex align-items-center ls-48" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.機構地址)}">
                                <span class="material-symbols-outlined icon-fill me-1 dark30">
                                    location_on
                                </span>
                                ${e.機構地址}
                            </a></li>
                        <li><a class="d-flex align-items-center ls-48" href="tel:+${e.機構電話}">
                                <span class="icon-fill material-symbols-outlined me-1 dark30">
                                    call
                                </span>
                                ${e.機構電話}
                            </a></li>
                    </ul>
                </div>
                <div class="card-footer bg-light rounded-bottom-5 overflow-hidden">
                    <a id="btn-collect-${e.id}" class="link-primary ls-48 d-flex justify-content-center align-items-center btn-collect" data-id=${e.id} data-name=${e.機構名稱} data-address=${e.機構地址} data-tel=${e.機構電話} data-collected=${e.被收藏次數} data-area=${s} href="">
                        <span class="material-symbols-outlined fs-2 me-2">
                            favorite
                        </span>
                        收藏這間醫院
                    </a>
                </div>
            </div>
        </li>`,a++}),y.innerHTML=l,a===0&&d.fire("很抱歉，本區域尚無資料"),t.textContent=`本次搜尋共${a}筆`}function C(t,l){let a="";const e=Math.ceil(t/l),s=5;let c=1,p=e;if(e>s){const n=Math.floor(s/2);c=r-n,p=r+n,c<1?(c=1,p=s):p>e&&(p=e,c=e-s+1)}r===1?a+=`<li class="page-item">
                    <a class="page-link disabled" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`:a+=`<li class="page-item">
        <a class="page-link" id="previous-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`;for(let n=c;n<=p;n++)n===r?a+=`<li class="page-item"><a class="page-link active" data-id="${n} " href="#">${n}</a></li>`:a+=`<li class="page-item"><a class="page-link" data-id="${n}" href="#">${n}</a></li>`;r===e?a+=`<li class="page-item">
        <a class="page-link disabled" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`:a+=`<li class="page-item">
                    <a class="page-link" id="next-link" href="#" aria-label="Next">
                        <span  aria-hidden="true">&raquo;</span>
                    </a>
                </li>`,k.innerHTML=a,document.querySelectorAll(".page-link").forEach(n=>{n.addEventListener("click",function(u){u.preventDefault();const T=u.target.getAttribute("data-id");u.currentTarget.getAttribute("id")==="next-link"?r++:u.currentTarget.getAttribute("id")==="previous-link"?r--:r=parseInt(T),L(r)})})}function L(t){i.get(`${o}/hospitals?_page=${t}&_limit=${v}`).then(l=>{f=l.data,S(),C(x,v)}).catch(l=>{console.log(l)})}function E(){i.get(`${o}/areas`).then(t=>{$=t.data,D()}).catch(t=>{console.log(t)})}function D(){const t=document.querySelector("#district");let l='<option value="" disabled selected>請選擇行政區</option>';$.forEach(a=>{l+=` <option value="${a.englishName}">${a.name}</option>`}),t.innerHTML=l,t.addEventListener("change",a=>{f=[],$.forEach(e=>{e.englishName===a.target.value&&m.forEach(s=>{b(s.機構地址)===e.name&&f.push(s)})}),S(),k.classList.add("d-none")})}const H=document.querySelector("#top-link");H.addEventListener("click",t=>{t.preventDefault(),q()});y.addEventListener("click",t=>{const l=t.target.closest(".btn-collect");if(!l)return;const a=l.innerText.replace("favorite","").replace("close","").trim();if(l)if(t.preventDefault(),h&&a==="收藏這間醫院"){let e={};e.userId=g,e.hospitalId=l.dataset.id,e.機構名稱=l.dataset.name,e.機構地址=l.dataset.address,e.機構區域=l.dataset.area,e.機構電話=l.dataset.tel,e.isCollected="true",i.post(`${o}/collects`,e).then(s=>{l.innerHTML=`<span class="material-symbols-outlined fs-2 me-2">
                        close
                    </span>
                    取消收藏`,d.fire({icon:"success",title:`成功收藏${s.data.機構名稱}`,showConfirmButton:!1,timer:1500}),P(s.data.hospitalId)}).catch(s=>{console.log(s),d.fire({icon:"error",title:"Oops...",text:"收藏失敗請稍後再試"})})}else h&&a==="取消收藏"?i.get(`${o}/collects?userId=${g}&hospitalId=${l.dataset.id}`).then(e=>{const s=e.data;s?i.delete(`${o}/collects/${s[0].id}`).then(c=>{l.innerHTML=`<span class="material-symbols-outlined fs-2 me-2">
                                favorite
                            </span>
                            收藏這間醫院`,d.fire({icon:"success",title:`成功刪除${l.dataset.name}`,showConfirmButton:!1,timer:1500}),M(l.dataset.id)}).catch(c=>{d.fire({icon:"error",title:"Oops...",text:"收藏失敗請稍後再試"})}):d.fire({icon:"error",title:"Oops...",text:"收藏失敗請稍後再試"})}).catch(e=>{console.log(e)}):d.fire({icon:"error",title:"Oops...",text:"請先登入",footer:'<a href="login.html">登入</a>'})});function P(t){if(t){const l=document.querySelector(`#favorite-count-${t}`);i.get(`${o}/hospitals/${t}`).then(a=>{const e=a.data.被收藏次數+1;return i.patch(`${o}/hospitals/${t}`,{被收藏次數:e})}).then(a=>{l.innerHTML=`<span class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${a.data.被收藏次數} 人收藏`}).catch(a=>{console.log(a)})}}function M(t){if(t){const l=document.querySelector(`#favorite-count-${t}`);i.get(`${o}/hospitals/${t}`).then(a=>{const e=a.data.被收藏次數-1;return i.patch(`${o}/hospitals/${t}`,{被收藏次數:e})}).then(a=>{l.innerHTML=`<span class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${a.data.被收藏次數} 人收藏`}).catch(a=>{console.log(a)})}}function A(){h&&i.get(`${o}/users/${g}/collects`).then(t=>{t.data.forEach(function(a){const e=document.querySelector(`#btn-collect-${a.hospitalId}`);a.isCollected&&e!==null&&(e.innerHTML=`<span class="material-symbols-outlined fs-2 me-2">
                            close
                        </span>
                        取消收藏`)})}).catch(t=>{console.log(t)})}
