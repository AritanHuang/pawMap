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
    if (token) {
        headerLogIn.classList.add('d-none');
        headerSignUp.classList.add('d-none');
        headerLogOut.classList.remove('d-none');
    }
    else {
        headerLogIn.classList.remove('d-none');
        headerSignUp.classList.remove('d-none');
        headerLogOut.classList.add('d-none');
    }
}
checkLogIn();

const btnLogOut = document.querySelector('#btn-logout');
btnLogOut.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})

function logOut() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}