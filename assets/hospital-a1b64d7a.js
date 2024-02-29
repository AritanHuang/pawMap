import{S as p}from"./bootstrap.min-361b4cd4.js";import{a as g,b as h}from"./axios-4008c28b.js";function b(e){return e.substring(3,6)}function w(){window.scrollTo({top:0,behavior:"smooth"})}const v=document.querySelector("#hospital-list"),k=document.querySelector("#pagination");let f=[],d=[],y=0,m=12,n=1,u=[];function q(){g.get(`${h}/hospitals`).then(function(e){f=e.data,y=f.length,x(1),P()}).catch(function(e){console.log(e)})}q();function $(){const e=document.querySelector("#hospital-search");let l="",t=0;d.forEach(function(a){let s="";if(a.機構地址){let o=a.機構地址;s=b(o)}l+=` <li class="col-12 col-sm-6 col-lg-4 ">
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
                    <a class="link-primary ls-48 d-flex justify-content-center align-items-center btn-collect"  href="">
                        <span class="material-symbols-outlined fs-2 me-2">
                            favorite
                        </span>
                        收藏這間醫院
                    </a>
                </div>
            </div>
        </li>`,t++}),v.innerHTML=l,t===0&&p.fire("很抱歉，本區域尚無資料"),e.textContent=`本次搜尋共${t}筆`}function L(e,l){let t="";const a=Math.ceil(e/l),s=5;let o=1,r=a;if(a>s){const i=Math.floor(s/2);o=n-i,r=n+i,o<1?(o=1,r=s):r>a&&(r=a,o=a-s+1)}n===1?t+=`<li class="page-item">
                    <a class="page-link disabled" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`:t+=`<li class="page-item">
        <a class="page-link" id="previous-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`;for(let i=o;i<=r;i++)i===n?t+=`<li class="page-item"><a class="page-link active" data-id="${i} " href="#">${i}</a></li>`:t+=`<li class="page-item"><a class="page-link" data-id="${i}" href="#">${i}</a></li>`;n===a?t+=`<li class="page-item">
        <a class="page-link disabled" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`:t+=`<li class="page-item">
                    <a class="page-link" id="next-link" href="#" aria-label="Next">
                        <span  aria-hidden="true">&raquo;</span>
                    </a>
                </li>`,k.innerHTML=t,document.querySelectorAll(".page-link").forEach(i=>{i.addEventListener("click",function(c){c.preventDefault();const S=c.target.getAttribute("data-id");c.currentTarget.getAttribute("id")==="next-link"?n++:c.currentTarget.getAttribute("id")==="previous-link"?n--:n=parseInt(S),x(n)})})}function x(e){g.get(`${h}/hospitals?_page=${e}&_limit=${m}`).then(l=>{d=l.data,$(),L(y,m)}).catch(l=>{console.log(l)})}function P(){g.get(`${h}/areas`).then(e=>{u=e.data,D()}).catch(e=>{console.log(e)})}function D(){const e=document.querySelector("#district");let l='<option value="" disabled selected>請選擇行政區</option>';u.forEach(t=>{l+=` <option value="${t.englishName}">${t.name}</option>`}),e.innerHTML=l,e.addEventListener("change",t=>{d=[],u.forEach(a=>{a.englishName===t.target.value&&f.forEach(s=>{b(s.機構地址)===a.name&&d.push(s)})}),$(),k.classList.add("d-none")})}const E=document.querySelector("#top-link");E.addEventListener("click",e=>{e.preventDefault(),w()});v.addEventListener("click",e=>{e.preventDefault(),e.target.classList.contains("btn-collect")&&(localStorage.getItem("token")?p.fire({icon:"success",title:"成功收藏",showConfirmButton:!1,timer:1500}):p.fire({icon:"error",title:"Oops...",text:"請先登入",footer:'<a href="login.html">登入</a>'}))});
