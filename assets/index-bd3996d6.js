import{a as t,b as o}from"./axios-2ea11919.js";import{a as i}from"./utils-dced5580.js";t.get(`${o}/hospitals?_sort=被收藏次數&_order=desc`).then(s=>s.data.slice(0,4)).then(s=>{n(s)}).catch(s=>{console.log(s)});function n(s){const a=document.querySelector("#top-hospitals-list");let e="";s.forEach(l=>{e+=`<li class="col-12 col-sm-6">
                  <div class="card rounded-5 card-shadow">
                    <div class="card-body p-3 p-lg-4">
                      <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${i(l.機構地址)}</span>
                        <p class="d-flex align-items-center justify-content-center dark50"><span
                            class="icon-fill material-symbols-outlined dark30 me-2">
                            favorite
                          </span>${l.被收藏次數} 人收藏</p>
                      </div>
                      <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${l.機構名稱}</h5>
                      <ul class="mb-0 list-unstyled">
                        <li class="mb-1"><a class="d-flex align-items-center ls-48" href="https://www.google.com/maps?q=${encodeURIComponent(l.機構地址)}" target="_blank">
                            <span class="material-symbols-outlined icon-fill me-1 dark30">
                              location_on
                            </span>
                            ${l.機構地址}
                          </a></li>
                        <li><a class="d-flex align-items-center ls-48" href="tel:02 2609-0119">
                            <span class="icon-fill material-symbols-outlined me-1 dark30">
                              call
                            </span>
                           ${l.機構電話}
                          </a></li>
                      </ul>
                    </div>
                    <div class="card-footer bg-light rounded-bottom-5 overflow-hidden">
                      <a class="link-primary ls-48 d-flex justify-content-center align-items-center" href="hospital.html">
                        <span class="material-symbols-outlined fs-2 me-2">
                          arrow_forward
                        </span>
                        前往收藏
                      </a>
                    </div>
                  </div>
                </li>`}),a.innerHTML=e}
