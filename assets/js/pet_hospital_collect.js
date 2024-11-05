import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl, token, userId, petName } from "./config";
import { splitArea, scrollToTop } from "./utils";

//載入收藏清單卡片
function init() {
    let petCollectData = [];
    const petCollectList = document.querySelector('#pet-collect-list');
    axios.get(`${apiUrl}/collects?userId=${userId}&_expand=hospital`)
        .then(res => {
            petCollectData = res.data;
            if (petCollectData.length > 0) {
                renderPetCollectData();
            }
            else {
                Swal.fire({
                    title: "尚未有收藏紀錄",
                    text: "目前還沒有收藏紀錄",
                    icon: "warning",
                    footer: '<a class="text-primary" href="hospital.html">前往寵物醫院列表收藏</a>'
                });
                petCollectList.innerHTML = `<p class="fs-1 text-center ">目前尚無收藏項目</p>`;
            }
        })
        .catch(err => {
            console.log(err);
        })
    function renderPetCollectData() {
        let petCollectStr = '';
        petCollectData.forEach(function (value, index) {
            petCollectStr += ` <li class="col-12 col-sm-6 col-lg-4 ">
                                <div class="card rounded-5 card-shadow hospital-card h-100">
                                    <div class="card-body p-3 p-lg-4">
                                        <div class="d-flex justify-content-between align-items-center mb-12">
                                            <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${value['機構區域']}</span>
                                            <p class="d-flex align-items-center justify-content-center dark50"><span
                                                    class="icon-fill material-symbols-outlined dark30 me-2">
                                                    favorite
                                                </span>${value.hospital['被收藏次數']} 人收藏</p>
                                        </div>
                                        <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${value['機構名稱']}</h5>
                                        <ul class="mb-0 list-unstyled">
                                            <li class="mb-1"><a class="d-flex align-items-center ls-48" href="">
                                                    <span class="material-symbols-outlined icon-fill me-1 dark30">
                                                        location_on
                                                    </span>
                                                    ${value['機構地址']}
                                                </a></li>
                                            <li><a class="d-flex align-items-center ls-48" href="tel:02 2609-0119">
                                                    <span class="icon-fill material-symbols-outlined me-1 dark30">
                                                        call
                                                    </span>
                                                    ${value['機構電話']}
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
                            </li>`
        })
        petCollectList.innerHTML = petCollectStr;
    }
}
init();