import{S as n}from"./bootstrap.min-2015cc09.js";import{a,b as i,u as o}from"./axios-7862a9ca.js";const c=document.querySelector("#pet-collect-list");function r(){let l=[];a.get(`${i}/collects?userId=${o}&_expand=hospital`).then(e=>{l=e.data,l.length>0?t():(n.fire({title:"尚未有收藏紀錄",text:"目前還沒有收藏紀錄",icon:"warning",footer:'<a class="text-primary" href="hospital.html">前往寵物醫院列表收藏</a>'}),c.innerHTML='<p class="fs-1 text-center ">目前尚無收藏項目</p>')}).catch(e=>{console.log(e)});function t(){let e="";l.forEach(function(s,f){e+=` <li class="col-12 col-sm-6 col-lg-4 ">
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
                            </li>`}),c.innerHTML=e}}r();c.addEventListener("click",function(l){const t=l.target.closest(".btn-delete-collect");if(t){if(t){l.preventDefault();const e=t.dataset.id;d(e,t)}}else return});function d(l,t){a.get(`${i}/collects?hospitalId=${l}&userId=${o}`).then(e=>{e.data&&a.delete(`${i}/collects/${e.data[0].id}`).then(s=>{n.fire(`取消收藏${t.dataset.name}`),p(t.dataset.id),r()})}).catch(e=>{console.log(e),n.fire("刪除失敗請稍後再試!")})}function p(l){a.get(`${i}/hospitals/${l}`).then(t=>{const e=t.data.被收藏次數-1;return a.patch(`${i}/hospitals/${l}`,{被收藏次數:e})}).then(t=>{}).catch(t=>{n.fire("發生錯誤請稍後再試")})}
