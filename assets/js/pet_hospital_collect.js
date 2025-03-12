import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl, token, userId, petName } from "./config";
import { splitArea, scrollToTop } from "./utils";

const petCollectList = document.querySelector('#pet-collect-list');
const btnDeleteCollectall = document.querySelector('#btn-delete-collectall');
//載入收藏清單卡片
function init() {
    let petCollectData = [];
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
                btnDeleteCollectall.classList.add('d-none');
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
                                            <li class="mb-1"><a class="d-flex align-items-center ls-48" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${value['機構地址']}">
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
                                        <a id="btn-delete-collect-${value.hospitalId}" class="link-primary ls-48 d-flex justify-content-center align-items-center btn-delete-collect" data-name="${value['機構名稱']}"data-id="${value.hospitalId}"
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
//點擊取消收藏按鈕
petCollectList.addEventListener('click', function (e) {
    const deleteCollectBtn = e.target.closest('.btn-delete-collect');
    if (!deleteCollectBtn) {
        return;
    }
    else if (deleteCollectBtn) {
        e.preventDefault();
        const deleteHospitalId = deleteCollectBtn.dataset.id;
        deleteCollect(deleteHospitalId, deleteCollectBtn);
    }
})
//刪除收藏
function deleteCollect(deleteId, deleteCollectBtn) {
    axios.get(`${apiUrl}/collects?hospitalId=${deleteId}&userId=${userId}`)
        .then(res => {
            if (res.data) {
                axios.delete(`${apiUrl}/collects/${res.data[0].id}`)
                    .then(res => {
                        //成功後顯示訊息
                        Swal.fire(`取消收藏${deleteCollectBtn.dataset.name}`);
                        //收藏數減一
                        reduceFavoriteCount(deleteCollectBtn.dataset.id)
                        //重新渲染頁面
                        init();
                    })
            }
        })
        .catch(err => {
            console.log(err);
            Swal.fire("刪除失敗請稍後再試!");
        })
}
//刪除後收藏數減一
function reduceFavoriteCount(id) {
    axios.get(`${apiUrl}/hospitals/${id}`)
        .then(res => {
            const newFavoriteCount = res.data['被收藏次數'] - 1;
            return axios.patch(`${apiUrl}/hospitals/${id}`, {
                ['被收藏次數']: newFavoriteCount
            })
        })
        .then(res => {
            // console.log(res.data);
        })
        .catch(err => {
            Swal.fire('發生錯誤請稍後再試');
        })
}

//刪除全部收藏項目
btnDeleteCollectall.addEventListener('click', function (e) {
    e.preventDefault();
    axios.get(`${apiUrl}/collects?userId=${userId}`)
        .then(res => {
            // console.log(res.data);
            const collectsToDelete = res.data;
            const deleteRequests = collectsToDelete.map(item => {
                return axios.delete(`${apiUrl}/collects/${item.id}`)
            })
            return Promise.all(deleteRequests).then(deleteResponse => {
                // console.log(deleteResponse);
                //更新醫院收藏次數
                const updateRequests = collectsToDelete.map(item => {
                    return axios.get(`${apiUrl}/hospitals/${item.hospitalId}`)
                        .then(res => {
                            // console.log(res.data);
                            const newHospitalFavoriteCount = res.data['被收藏次數'] - 1;
                            return axios.patch(`${apiUrl}/hospitals/${item.hospitalId}`, {
                                '被收藏次數': newHospitalFavoriteCount
                            })
                        })
                })
                // 等待所有刪除請求和醫院更新請求完成
                return Promise.all(updateRequests).then(updateResponse => {
                    // console.log(updateResponse);
                    init();// 更新頁面或 UI
                })
            });
        })

        .catch(err => {
            console.log(err);
        })
})
//回到頁面最上方方法
const toplink = document.querySelector('#top-link');
toplink.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToTop();
})