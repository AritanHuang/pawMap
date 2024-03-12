import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "./config";
import { splitArea, displayUserData } from "./utils";

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
let userData;
//取得使用者註冊資料
function getUsersData() {
    if (token || userId) {
        axios.get(`${apiUrl}/users/${userId}`)
            .then(function (res) {
                userData = res.data;
                renderUserData();
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    else {
        Swal.fire({
            icon: "error",
            title: "請先登入或註冊",
            text: "必須是會員才能使用此功能",
            footer: '<a href="login.html">登入</a>'
        });

    }
}
getUsersData();

function renderUserData() {
    const passportContent = document.querySelector('#passport-content');
    let petArea = splitArea(userData.address);
    let petGender = displayUserData(userData).petGender;
    let isSpayed = displayUserData(userData).isSpayed;
    if (userData) {
        passportContent.innerHTML = `<div class="d-flex flex-column flex-lg-row 
        align-items-center
        justify-content-md-between align-items-md-center">
    <div class="mb-3 mb-lg-0">
        <img class="rounded-circle" src="${userData.petPhoto}" alt="Pet Photo"
            width="200" height="200">
    </div>
    <div class="passport-info">
        <p class="fs-lg-5 mb-2">名字: <span id="petName">${userData.petName}</span></p>
        <p class="fs-lg-5 mb-2">生日: <span id="birthday">${userData.petBirthday}</span></p>
        <p class="fs-lg-5 mb-2">年齡: <span id="age">Age</span></p>
        <p class="fs-lg-5 mb-2">所在地: <span id="location">${petArea}</span></p>
        <p class="fs-lg-5 mb-2">品種: <span id="breed">${userData.petBreed}</span></p>
        <p class="fs-lg-5 mb-2">性別: <span id="gender">${petGender}</span></p>
        <p class="fs-lg-5 mb-2">是否結紮: <span id="spayed">${isSpayed}</span></p>
        <p class="fs-lg-5 mb-2">體重: <span id="weight">${userData.petWeight}公斤</span></p>
    </div>
</div>`
    }
}