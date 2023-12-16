import Swal from "sweetalert2";
const hamburgerBtn = document.querySelector('#hamburger-btn');
// 漢堡選單按鈕轉換
hamburgerBtn.addEventListener('click', function (e) {
    if (e.target.textContent === 'dehaze') {
        e.target.textContent = 'close';
    }
    else {
        e.target.textContent = 'dehaze';
    }
})

//檢查是否登入
function checkLogIn() {
    const token = localStorage.getItem('token');
    const headerSignUp = document.querySelector('#header-signup');
    const headerLogIn = document.querySelector('#header-login');
    const headerLogOut = document.querySelector('#header-logout');
    const mobileSignUp = document.querySelector('#mobile-signup');
    const mobileLogIn = document.querySelector('#mobile-login');
    const mobileLogOut = document.querySelector('#mobile-logout');
    if (token) {
        headerLogIn.classList.add('d-none');
        headerSignUp.classList.add('d-none');
        headerLogOut.classList.remove('d-none');
        mobileSignUp.classList.add('disabled');
        mobileLogIn.classList.add('d-none');
        mobileLogOut.classList.remove('d-none');
    }
    else {
        headerLogIn.classList.remove('d-none');
        headerSignUp.classList.remove('d-none');
        headerLogOut.classList.add('d-none');
        mobileSignUp.classList.remove('disabled');
        mobileLogIn.classList.remove('d-none');
        mobileLogOut.classList.add('d-none');
    }
}
checkLogIn();

const btnLogOut = document.querySelector('#btn-logout');
const btnMobileLogout = document.querySelector('#btn-mobile-logout');
//電腦登出
btnLogOut.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})
//手機版登出
btnMobileLogout.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})

function logOut() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}