import"./bootstrap.min-1d37006c.js";import{a as g,b as f,S as x}from"./sweetalert2.all-dee922f7.js";function m(e){return e.substring(3,6)}function S(){window.scrollTo({top:0,behavior:"smooth"})}const q=document.querySelector("#hospital-list"),b=document.querySelector("#pagination");let p=[],d=[],v=0,h=12,n=1,u=[];function w(){g.get(`${f}/hospitals`).then(function(e){p=e.data,v=p.length,y(1),L()}).catch(function(e){console.log(e)})}w();function k(){const e=document.querySelector("#hospital-search");let i="",t=0;d.forEach(function(a){let s="";if(a.機構地址){let o=a.機構地址;s=m(o)}i+=` <li class="col-12 col-sm-6 col-lg-4 ">
            <div class="card rounded-5 card-shadow hospital-card h-100">
                <div class="card-body p-3 p-lg-4">
                    <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${s}</span>
                        <p class="d-flex align-items-center justify-content-center dark50"><span
                                class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${a.被收藏次數} 人收藏</p>
                    </div>
                    <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${a.機構名稱}</h5>
                    <ul class="mb-0 list-unstyled">
                        <li class="mb-1"><a class="d-flex align-items-center ls-48" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.機構地址)}">
                                <span class="material-symbols-outlined icon-fill me-1 dark30">
                                    location_on
                                </span>
                                ${a.機構地址}
                            </a></li>
                        <li><a class="d-flex align-items-center ls-48" href=tel:+"${a.機構電話}">
                                <span class="icon-fill material-symbols-outlined me-1 dark30">
                                    call
                                </span>
                                ${a.機構電話}
                            </a></li>
                    </ul>
                </div>
                <div class="card-footer bg-light rounded-bottom-5 overflow-hidden">
                    <a class="link-primary ls-48 d-flex justify-content-center align-items-center" href="">
                        <span class="material-symbols-outlined fs-2 me-2">
                            favorite
                        </span>
                        收藏這間醫院
                    </a>
                </div>
            </div>
        </li>`,t++}),q.innerHTML=i,t===0&&x.fire("很抱歉，本區域尚無資料"),e.textContent=`本次搜尋共${t}筆`}function P(e,i){let t="";const a=Math.ceil(e/i),s=5;let o=1,r=a;if(a>s){const l=Math.floor(s/2);o=n-l,r=n+l,o<1?(o=1,r=s):r>a&&(r=a,o=a-s+1)}n===1?t+=`<li class="page-item">
                    <a class="page-link disabled" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`:t+=`<li class="page-item">
        <a class="page-link" id="previous-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`;for(let l=o;l<=r;l++)l===n?t+=`<li class="page-item"><a class="page-link active" data-id="${l} " href="#">${l}</a></li>`:t+=`<li class="page-item"><a class="page-link" data-id="${l}" href="#">${l}</a></li>`;n===a?t+=`<li class="page-item">
        <a class="page-link disabled" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`:t+=`<li class="page-item">
                    <a class="page-link" id="next-link" href="#" aria-label="Next">
                        <span  aria-hidden="true">&raquo;</span>
                    </a>
                </li>`,b.innerHTML=t,document.querySelectorAll(".page-link").forEach(l=>{l.addEventListener("click",function(c){c.preventDefault();const $=c.target.getAttribute("data-id");c.currentTarget.getAttribute("id")==="next-link"?n++:c.currentTarget.getAttribute("id")==="previous-link"?n--:n=parseInt($),y(n)})})}function y(e){g.get(`${f}/hospitals?_page=${e}&_limit=${h}`).then(i=>{d=i.data,k(),P(v,h)}).catch(i=>{console.log(i)})}function L(){g.get(`${f}/areas`).then(e=>{u=e.data,T()}).catch(e=>{console.log(e)})}function T(){const e=document.querySelector("#district");let i='<option value="" disabled selected>請選擇行政區</option>';u.forEach(t=>{i+=` <option value="${t.englishName}">${t.name}</option>`}),e.innerHTML=i,e.addEventListener("change",t=>{d=[],u.forEach(a=>{a.englishName===t.target.value&&p.forEach(s=>{m(s.機構地址)===a.name&&d.push(s)})}),k(),b.classList.add("d-none")})}const A=document.querySelector("#top-link");A.addEventListener("click",e=>{e.preventDefault(),S()});
