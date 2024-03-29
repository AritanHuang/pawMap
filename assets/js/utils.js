import axios from "axios";

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
//計算年齡
export function countAge(petBirthday) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDate = date.getDate();
    const petYear = parseInt(petBirthday.substring(0, 4))
    const petMonth = parseInt(petBirthday.substring(5, 7));
    const petDate = parseInt(petBirthday.substring(8, 10));
    let year = currentYear - petYear;
    let month = currentMonth - petMonth;
    let ageStr;
    // 判斷是否過生日
    if (petMonth > currentMonth || (petMonth === currentMonth && petDate > currentDate)) {
        year -= 1;
        month = 12 + month;
        if (year < 0) {
            year = 0;
        }
    }
    return ageStr = `${year}歲${month}個月`;
}

//上傳圖片
export function uploadImage(imgFile, imgurToken) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', imgFile);
        formData.append('album', 'dICFBxM');
        axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Authorization': `Bearer ${imgurToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                resolve(res.data.data.link);
            })
            .catch(err => {
                reject(err);
            });
    });
}

