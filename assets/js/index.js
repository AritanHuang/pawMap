import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl, token, userId, petName } from "./config";
import { splitArea, scrollToTop } from "./utils";
//隨機更新寵物收藏次數
// axios.get(`${apiUrl}/hospitals`)
//     .then(res => {
//         const hospitalData = res.data;
//         const updateHospital = hospitalData.map(hospital => {
//             const randomFavoriteCount = Math.floor(Math.random() * 100);
//             return axios.patch(`${apiUrl}/hospitals/${hospital.id}`, {
//                 '被收藏次數': randomFavoriteCount
//             })
//         })
//         return Promise.all(updateHospital);
//     })
//     .then(res => {
//         console.log('更新資料完成')
//     })
//     .catch(err => {
//         console.log(err);
//     })
//取出四則最高評價的寵物醫院
axios.get(`${apiUrl}/hospitals?_sort=被收藏次數&_order=desc`)
    .then(res => {
        const top4Hospitals = res.data;
        if (token) {

        }
        return top4Hospitals.slice(0, 4);
    })
    .then(finalHospitals => {
        renderTop4Hospitals(finalHospitals);
    })
    .catch(err => {
        console.log(err);
    })
//在首頁渲染4家收藏數最高的寵物醫院
function renderTop4Hospitals(hospitals) {
    const topHospitalsList = document.querySelector('#top-hospitals-list');
    let top4Str = '';
    hospitals.forEach(item => {
        top4Str += `<li class="col-12 col-sm-6">
                  <div class="card rounded-5 card-shadow">
                    <div class="card-body p-3 p-lg-4">
                      <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${splitArea(item['機構地址'])}</span>
                        <p class="d-flex align-items-center justify-content-center dark50"><span
                            class="icon-fill material-symbols-outlined dark30 me-2">
                            favorite
                          </span>${item['被收藏次數']} 人收藏</p>
                      </div>
                      <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${item['機構名稱']}</h5>
                      <ul class="mb-0 list-unstyled">
                        <li class="mb-1"><a class="d-flex align-items-center ls-48" href="https://www.google.com/maps?q=${encodeURIComponent(item['機構地址'])}" target="_blank">
                            <span class="material-symbols-outlined icon-fill me-1 dark30">
                              location_on
                            </span>
                            ${item['機構地址']}
                          </a></li>
                        <li><a class="d-flex align-items-center ls-48" href="tel:02 2609-0119">
                            <span class="icon-fill material-symbols-outlined me-1 dark30">
                              call
                            </span>
                           ${item['機構電話']}
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
                </li>`;
    });
    topHospitalsList.innerHTML = top4Str;
}
