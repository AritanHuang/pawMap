//取出地址區域
export function splitArea(address) {
    return address.substring(3, 6);
}

//回到頁面上方
export function scrollToTop() {
    // 实现回到页面顶部的逻辑
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 使用 smooth 滚动效果
    });
}
