import{a,b as n,u as d,S as o}from"./axios-2d2df78c.js";import{s as $}from"./utils-77fb7ba4.js";const r=document.querySelector("#pet-collect-list"),f=document.querySelector("#btn-delete-collectall");function p(){let l=[];a.get(`${n}/collects?userId=${d}&_expand=hospital`).then(e=>{l=e.data,l.length>0?t():(o.fire({title:"尚未有收藏紀錄",text:"目前還沒有收藏紀錄",icon:"warning",footer:'<a class="text-primary" href="hospital.html">前往寵物醫院列表收藏</a>'}),r.innerHTML='<p class="fs-1 text-center ">目前尚無收藏項目</p>',f.classList.add("d-none"))}).catch(e=>{console.log(e)});function t(){let e="";l.forEach(function(s,c){e+=` <li class="col-12 col-sm-6 col-lg-4 ">
                                <div class="card rounded-5 card-shadow hospital-card h-100">
                                    <div class="card-body p-3 p-lg-4">
                                        <div class="d-flex justify-content-between align-items-center mb-12">
                                            <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${s.機構區域}</span>
                                            <p class="d-flex align-items-center justify-content-center dark50"><span
                                                    class="icon-fill material-symbols-outlined dark30 me-2">
                                                    favorite
                                                </span>${s.hospital.被收藏次數} 人收藏</p>
                                        </div>
                                        <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${s.機構名稱}</h5>
                                        <ul class="mb-0 list-unstyled">
                                            <li class="mb-1"><a class="d-flex align-items-center ls-48" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${s.機構地址}">
                                                    <span class="material-symbols-outlined icon-fill me-1 dark30">
                                                        location_on
                                                    </span>
                                                    ${s.機構地址}
                                                </a></li>
                                            <li><a class="d-flex align-items-center ls-48" href="tel:02 2609-0119">
                                                    <span class="icon-fill material-symbols-outlined me-1 dark30">
                                                        call
                                                    </span>
                                                    ${s.機構電話}
                                                </a></li>
                                        </ul>
                                    </div>
                                    <div class="card-footer bg-light rounded-bottom-5 overflow-hidden">
                                        <a id="btn-delete-collect-${s.hospitalId}" class="link-primary ls-48 d-flex justify-content-center align-items-center btn-delete-collect" data-name="${s.機構名稱}"data-id="${s.hospitalId}"
                                            href="">
                                            <span class="material-symbols-outlined fs-2 me-2">
                                                close
                                            </span>
                                            取消收藏
                                        </a>
                                    </div>
                                </div>
                            </li>`}),r.innerHTML=e}}p();r.addEventListener("click",function(l){const t=l.target.closest(".btn-delete-collect");if(t){if(t){l.preventDefault();const e=t.dataset.id;g(e,t)}}else return});function g(l,t){a.get(`${n}/collects?hospitalId=${l}&userId=${d}`).then(e=>{e.data&&a.delete(`${n}/collects/${e.data[0].id}`).then(s=>{o.fire(`取消收藏${t.dataset.name}`),b(t.dataset.id),p()})}).catch(e=>{console.log(e),o.fire("刪除失敗請稍後再試!")})}function b(l){a.get(`${n}/hospitals/${l}`).then(t=>{const e=t.data.被收藏次數-1;return a.patch(`${n}/hospitals/${l}`,{被收藏次數:e})}).then(t=>{}).catch(t=>{o.fire("發生錯誤請稍後再試")})}f.addEventListener("click",function(l){l.preventDefault(),a.get(`${n}/collects?userId=${d}`).then(t=>{const e=t.data,s=e.map(c=>a.delete(`${n}/collects/${c.id}`));return Promise.all(s).then(c=>{const u=e.map(i=>a.get(`${n}/hospitals/${i.hospitalId}`).then(h=>{const m=h.data.被收藏次數-1;return a.patch(`${n}/hospitals/${i.hospitalId}`,{被收藏次數:m})}));return Promise.all(u).then(i=>{p()})})}).catch(t=>{console.log(t)})});const y=document.querySelector("#top-link");y.addEventListener("click",function(l){l.preventDefault(),$()});
