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