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

//轉換使用者資料
export function displayUserData(userData) {
    // 將 male 或 female 轉換為 男生 或 女生
    let newUserData = {};
    if (userData.petGender === 'male') {
        newUserData.petGender = '男';
    } else if (userData.petGender === 'female') {
        newUserData.petGender = '女';
    }
    if (userData.isSpayed === 'true') {
        newUserData.isSpayed = '是';
    }
    else if (userData.isSpayed === 'false') {
        newUserData.isSpayed = '否';
    }
    return newUserData;
}
