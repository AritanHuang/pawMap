import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl, token, userId, petName } from "./config";
import { splitArea, scrollToTop } from "./utils";
const hospitalList = document.querySelector('#hospital-list');
const pagination = document.querySelector('#pagination');
let hospitalTotalData = [];
let hospitalPerData = [];
let hospitalLength = 0;
let perPage = 12;
let currentPage = 1;
let areaData = [];

//取全部新北寵物醫院資料
function init() {
    axios.get(`${apiUrl}/hospitals`)
        .then(function (res) {
            hospitalTotalData = res.data;
            hospitalLength = hospitalTotalData.length;
            //初始載入第一頁資料
            getCurrentData(1);
            getArea();
        })
        .catch(function (err) {
            console.log(err);
        })
}
init();
//渲染動物醫院
function renderHospitalData() {
    //重新載入頁面時檢查收藏按鈕狀態
    checkAndSetCollectStatus()
    const hospitalSearch = document.querySelector('#hospital-search')
    let hospitalStr = '';
    let hospitalNum = 0;
    hospitalPerData.forEach(function (item) {
        let area = '';
        // 檢查 '機構地址' 是否存在
        if (item['機構地址']) {
            let hospitalAddress = item['機構地址'];
            area = splitArea(hospitalAddress);
        }
        // console.log(hospitalArea);
        hospitalStr += ` <li class="col-12 col-sm-6 col-lg-4 ">
            <div class="card rounded-5 card-shadow hospital-card h-100">
                <div class="card-body p-3 p-lg-4">
                    <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${area}</span>
                        <p id="favorite-count-${item.id}" class="d-flex align-items-center justify-content-center dark50"><span 
                                class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${item['被收藏次數']} 人收藏</p>
                    </div>
                    <h5 class="card-title fs-lg-4 fs-5 fw-medium ls-60 ls-lg-72">${item['機構名稱']}</h5>
                    <ul class="mb-0 list-unstyled">
                        <li class="mb-1"><a class="d-flex align-items-center ls-48" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item['機構地址'])}">
                                <span class="material-symbols-outlined icon-fill me-1 dark30">
                                    location_on
                                </span>
                                ${item['機構地址']}
                            </a></li>
                        <li><a class="d-flex align-items-center ls-48" href="tel:+${item['機構電話']}">
                                <span class="icon-fill material-symbols-outlined me-1 dark30">
                                    call
                                </span>
                                ${item['機構電話']}
                            </a></li>
                    </ul>
                </div>
                <div class="card-footer bg-light rounded-bottom-5 overflow-hidden">
                    <a id="btn-collect-${item.id}" class="link-primary ls-48 d-flex justify-content-center align-items-center btn-collect" data-id=${item.id} data-name=${item['機構名稱']} data-address=${item['機構地址']} data-tel=${item['機構電話']} data-collected=${item['被收藏次數']} data-area=${area} href="">
                        <span class="material-symbols-outlined fs-2 me-2">
                            favorite
                        </span>
                        收藏這間醫院
                    </a>
                </div>
            </div>
        </li>`;
        //計算顯示比數
        hospitalNum++;
    })
    hospitalList.innerHTML = hospitalStr;
    if (hospitalNum === 0) {
        Swal.fire("很抱歉，本區域尚無資料");
    }
    hospitalSearch.textContent = `本次搜尋共${hospitalNum}筆`;
}
//生成分頁
function generatePagination(total, perPage) {
    let pageStr = ''
    //無條件進入取頁面整數
    const totalPages = Math.ceil(total / perPage);
    //最多顯示五頁
    const maxDisplayedPages = 5;
    let startPage = 1;
    let endPage = totalPages;
    if (totalPages > maxDisplayedPages) {
        //無條件捨去取整數當前頁數前後要加的頁數
        const middlePage = Math.floor(maxDisplayedPages / 2);
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
        if (startPage < 1) {
            startPage = 1;
            endPage = maxDisplayedPages;
        }
        else if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - maxDisplayedPages + 1;
        }
    }
    // 添加前一頁的按鈕第一頁不能點
    if (currentPage === 1) {
        pageStr += `<li class="page-item">
                    <a class="page-link disabled" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`;
    }
    else {
        pageStr += `<li class="page-item">
        <a class="page-link" id="previous-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`;
    }
    //生成頁碼
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            pageStr += `<li class="page-item"><a class="page-link active" data-id="${i} " href="#">${i}</a></li>`;
        }
        else {
            pageStr += `<li class="page-item"><a class="page-link" data-id="${i}" href="#">${i}</a></li>`;
        }
    }

    // 添加下一頁的按鈕
    if (currentPage === totalPages) {
        pageStr += `<li class="page-item">
        <a class="page-link disabled" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`;
    }
    else {
        pageStr += `<li class="page-item">
                    <a class="page-link" id="next-link" href="#" aria-label="Next">
                        <span  aria-hidden="true">&raquo;</span>
                    </a>
                </li>`;
    }
    pagination.innerHTML = pageStr;

    const pageButtons = document.querySelectorAll('.page-link');
    //頁面上頁碼按鈕跑迴圈
    pageButtons.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const page = e.target.getAttribute('data-id');
            //點擊下一頁按鈕
            if (e.currentTarget.getAttribute('id') === 'next-link') {
                currentPage++;
            }
            //點擊前一頁按鈕
            else if (e.currentTarget.getAttribute('id') === 'previous-link') {
                currentPage--;
            }
            //點擊數字頁碼
            else {
                //更新目前所在頁面
                currentPage = parseInt(page);
            }
            getCurrentData(currentPage);

            // 等待0.8秒將頁面滾動到頂部 
            // setTimeout(() => {
            //     window.scrollTo({
            //         top: 0,
            //         behavior: 'smooth'
            //     });
            // }, 800);
        })
    })
}

//取得點擊頁面資訊
function getCurrentData(page) {
    axios.get(`${apiUrl}/hospitals?_page=${page}&_limit=${perPage}`)
        .then(res => {
            hospitalPerData = res.data;
            renderHospitalData();
            //重新生成頁碼
            generatePagination(hospitalLength, perPage);
        })
        .catch(err => {
            console.log(err);
        })
}

//取得行政區資料
function getArea() {
    axios.get(`${apiUrl}/areas`)
        .then(res => {
            areaData = res.data;
            renderArea();
        })
        .catch(err => {
            console.log(err);
        })
}
//渲染行政區選單
function renderArea() {
    const district = document.querySelector('#district');
    let areaStr = '<option value="" disabled selected>請選擇行政區</option>';
    areaData.forEach(item => {
        areaStr += ` <option value="${item.englishName}">${item.name}</option>`
    })
    district.innerHTML = areaStr;
    district.addEventListener('change', e => {
        hospitalPerData = [];
        areaData.forEach(areaItem => {
            if (areaItem.englishName === e.target.value) {
                hospitalTotalData.forEach(hospitalItem => {
                    let area = splitArea(hospitalItem['機構地址']);
                    if (area === areaItem.name) {
                        hospitalPerData.push(hospitalItem);
                    }
                })
            }
        })
        renderHospitalData();
        //先預設把頁碼拿掉
        pagination.classList.add('d-none');
    })
}

//點擊logo回到頁面上方
const topButton = document.querySelector('#top-link');
topButton.addEventListener('click', e => {
    e.preventDefault();
    scrollToTop();
})

//點擊收藏按鈕
hospitalList.addEventListener('click', e => {
    // 確保點擊的元素為 .btn-collect 按鈕
    // e.preventDefault();
    const collectButton = e.target.closest('.btn-collect');
    if (!collectButton) {
        // 如果點擊的元素不是收藏按鈕，直接返回
        return;
    }
    const buttonText = collectButton.innerText
        .replace('favorite', '')
        .replace('close', '')
        .trim();
    if (collectButton) {
        e.preventDefault();
        //收藏醫院
        if (token && buttonText === '收藏這間醫院') {
            let collectObj = {};
            collectObj.userId = userId;
            collectObj.hospitalId = collectButton.dataset.id;
            collectObj['機構名稱'] = collectButton.dataset.name;
            collectObj['機構地址'] = collectButton.dataset.address;
            collectObj['機構區域'] = collectButton.dataset.area;
            collectObj['機構電話'] = collectButton.dataset.tel;
            collectObj.isCollected = 'true';
            axios.post(`${apiUrl}/collects`, collectObj)
                .then(res => {
                    // console.log(res);
                    collectButton.innerHTML = `<span class="material-symbols-outlined fs-2 me-2">
                        close
                    </span>
                    取消收藏`;
                    Swal.fire({
                        icon: "success",
                        title: `成功收藏${res.data['機構名稱']}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //若成功收藏則在該筆寵物醫院收藏數加一
                    updateHospitalFavorite(res.data.hospitalId);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "收藏失敗請稍後再試"
                    });
                })
        }
        //刪除收藏
        else if (token && buttonText === '取消收藏') {
            axios.get(`${apiUrl}/collects?userId=${userId}&hospitalId=${collectButton.dataset.id}`)
                .then(res => {
                    const collect = res.data;
                    if (collect) {
                        axios.delete(`${apiUrl}/collects/${collect[0].id}`)
                            .then(res => {
                                // console.log(res.data);
                                collectButton.innerHTML = `<span class="material-symbols-outlined fs-2 me-2">
                                favorite
                            </span>
                            收藏這間醫院`;
                                Swal.fire({
                                    icon: "success",
                                    title: `成功刪除${collectButton.dataset.name}`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                decreaseHospitalFavorite(collectButton.dataset.id);
                            })
                            .catch(err => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "收藏失敗請稍後再試"
                                });
                            })
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "收藏失敗請稍後再試"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "請先登入",
                footer: '<a href="login.html">登入</a>'
            });
        }
    }
})

//將收藏數+1
function updateHospitalFavorite(hospitalId) {
    if (hospitalId) {
        const favoriteCountElement = document.querySelector(`#favorite-count-${hospitalId}`)
        axios.get(`${apiUrl}/hospitals/${hospitalId}`)
            .then(res => {
                // console.log(res);
                const newFavoriteCount = res.data['被收藏次數'] + 1;
                return axios.patch(`${apiUrl}/hospitals/${hospitalId}`, {
                    '被收藏次數': newFavoriteCount
                });
            })
            .then(res => {
                // console.log(res);
                favoriteCountElement.innerHTML = `<span class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${res.data['被收藏次數']} 人收藏`;
            })
            .catch(err => {
                console.log(err);
            })
    }
}
//將收藏數-1
function decreaseHospitalFavorite(hospitalId) {
    if (hospitalId) {
        const favoriteCountElement = document.querySelector(`#favorite-count-${hospitalId}`);
        axios.get(`${apiUrl}/hospitals/${hospitalId}`)
            .then(res => {
                const newFavoriteCount = res.data['被收藏次數'] - 1;
                return axios.patch(`${apiUrl}/hospitals/${hospitalId}`, {
                    '被收藏次數': newFavoriteCount
                })
            })
            .then(res => {
                favoriteCountElement.innerHTML = `<span class="icon-fill material-symbols-outlined dark30 me-2">
                                favorite
                            </span>${res.data['被收藏次數']} 人收藏`;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

//重新載入頁面時檢查收藏按鈕的顯示狀態
function checkAndSetCollectStatus() {
    if (token) {
        axios.get(`${apiUrl}/users/${userId}/collects`)
            .then(res => {
                const collectData = res.data;
                collectData.forEach(function (item) {
                    const collectBtn = document.querySelector(`#btn-collect-${item.hospitalId}`);
                    //若收藏的醫院在不同分頁就會出現按鈕綁定為null出錯
                    if (item.isCollected && collectBtn !== null) {
                        collectBtn.innerHTML = `<span class="material-symbols-outlined fs-2 me-2">
                            close
                        </span>
                        取消收藏`;
                    }
                })
            })
            .catch(err => { console.log(err); })
    }
}
