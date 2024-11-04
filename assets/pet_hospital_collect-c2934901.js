import"./bootstrap.min-2015cc09.js";import{a as i,b as c,u as n}from"./axios-744198d0.js";function o(){let e=[];const t=document.querySelector("#pet-collect-list");i.get(`${c}/collects?userId=${n}&_expand=hospital`).then(l=>{e=l.data,a()}).catch(l=>{console.log(l)});function a(){let l="";e.forEach(function(s,d){l+=` <li class="col-12 col-sm-6 col-lg-4 ">
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
                                            <li class="mb-1"><a class="d-flex align-items-center ls-48" href="">
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
                                        <a class="link-primary ls-48 d-flex justify-content-center align-items-center"
                                            href="">
                                            <span class="material-symbols-outlined fs-2 me-2">
                                                close
                                            </span>
                                            取消收藏
                                        </a>
                                    </div>
                                </div>
                            </li>`}),t.innerHTML=l}}o();
