import axios from "axios";
import { apiUrl } from "./config";
import { getArea } from "./utils";
const hospitalList = document.querySelector('#hospital-list');
let hospitalTotalData = [];
let hospitalPerData = [];
let hospitalLength = 0;
let perPage = 12;
let currentPage = 1;

//取全部新北寵物醫院資料
function init() {
    axios.get(`${apiUrl}/hospitals`)
        .then(function (res) {
            hospitalTotalData = res.data;
            hospitalLength = hospitalTotalData.length;
            //初始載入第一頁資料
            getCurrentData(1);
        })
        .catch(function (err) {
            console.log(err);
        })
}
init();
//渲染動物醫院
function renderHospitalData() {
    let hospitalStr = '';
    hospitalPerData.forEach(function (item) {
        let area = '';
        // 檢查 '機構地址' 是否存在
        if (item['機構地址']) {
            let hospitalAddress = item['機構地址'];
            area = getArea(hospitalAddress);
        }
        // console.log(hospitalArea);
        hospitalStr += ` <li class="col-12 col-sm-6 col-lg-4 ">
            <div class="card rounded-5 card-shadow hospital-card h-100">
                <div class="card-body p-3 p-lg-4">
                    <div class="d-flex justify-content-between align-items-center mb-12">
                        <span class="text-center bg-accent-yellow px-12 py-1 rounded-3">${area}</span>
                        <p class="d-flex align-items-center justify-content-center dark50"><span
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
                        <li><a class="d-flex align-items-center ls-48" href=tel:+"${item['機構電話']}">
                                <span class="icon-fill material-symbols-outlined me-1 dark30">
                                    call
                                </span>
                                ${item['機構電話']}
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
        </li>`;
    })
    hospitalList.innerHTML = hospitalStr;
}
//生成分頁
function generatePagination(total, perPage) {
    const pagination = document.querySelector('#pagination');
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

            // 等待0.5秒將頁面滾動到頂部
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
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