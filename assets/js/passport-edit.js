import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl, imgurToken } from "./config";
import { uploadImage } from "./utils";

let userData = {};
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

function initPetData() {
    axios.get(`${apiUrl}/users/${userId}`)
        .then(function (res) {
            userData = res.data;
            // console.log(userData);
            renderPetData();
        })
        .catch(function (err) {
            console.log(err);
        })
}
//取資料並渲染資料
initPetData();

const petName = document.querySelector('#petName');
const petBreed = document.querySelector('#petBreed');
const petBirthday = document.querySelector('#petBirthday');
const address = document.querySelector('#address');
const petPhoto = document.querySelector('#petPhoto');
const petWeight = document.querySelector('#petWeight');
const spayedBtn = document.querySelector('#spayed');
const notSpayedBtn = document.querySelector('#notSpayed');
const editUserDataBtn = document.querySelector('#btn-editUserData');

//將資料使用在畫面上
function renderPetData() {
    petName.value = userData.petName;
    petBreed.value = userData.petBreed;
    petBirthday.value = userData.petBirthday;
    address.value = userData.address;
    petWeight.value = userData.petWeight;
    //判斷寵物是否結紮，結紮後則無法修改
    if (userData.isSpayed === 'true') {
        spayedBtn.disabled = true;
        notSpayedBtn.disabled = true;
    }
    //尚未結紮的話，則在否的欄位先打勾
    else {
        notSpayedBtn.checked = true;
    }
}

//取得上傳圖片回傳資料
let imgUrl = '';
petPhoto.addEventListener('change', e => {
    editUserDataBtn.textContent = '圖片上傳中';
    editUserDataBtn.disabled = true;
    uploadImage(e.target.files[0], imgurToken)
        .then(res => {
            imgUrl = res;
            // console.log(imgUrl);
            editUserDataBtn.textContent = '修改';
            editUserDataBtn.disabled = false;
        })
        .catch(err => {
            console.log(err);
            Swal.fire("圖片上傳失敗，請稍候再試");
        })
})

//點擊修改按鈕時先檢查是否有資料被更動
editUserDataBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //更新的資料存放位置
    let updatePetData = {};
    //每次點擊事件發生後都能取得當下的值 
    const isSpayed = document.querySelector('input[name="isSpayed"]:checked').value;
    if (address.value !== userData.address) {
        updatePetData.address = address.value;
    }
    if (petPhoto.value !== '') {
        updatePetData.petPhoto = imgUrl;
    }
    if (petWeight.value !== userData.petWeight) {
        updatePetData.petWeight = petWeight.value;
    }
    if (isSpayed !== userData.isSpayed) {
        updatePetData.isSpayed = isSpayed;
    }
    // console.log(Object.keys(updatePetData).length);
    if (Object.keys(updatePetData).length > 0) {
        axios.patch(`${apiUrl}/users/${userId}`, updatePetData)
            .then(res => {
                Swal.fire("資料更新成功");
                //重新取資料並渲染資料
                initPetData();
                petPhoto.value = '';
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    else {
        Swal.fire("您並沒有更新任何資料");
    }
})


