import axios from "axios";
import validate from "validate.js";//表單驗證套件
import Swal from "sweetalert2";//提醒視窗套件
import flatpickr from "flatpickr";//日期選擇器套件
import { apiUrl } from "./config";
const clientId = '54125f1145322a9';
const imgurToken = 'a0461da17c62e537d08e30497baa2ddd0d56a826';

const email = document.querySelector('#Email');
const password = document.querySelector('#Password');
const petName = document.querySelector('#petName');
const petBreed = document.querySelector('#petBreed');
const petWeight = document.querySelector('#petWeight');
const petBirthday = document.querySelector('#petBirthday');
const address = document.querySelector('#address');
const petPhoto = document.querySelector('#petPhoto');





const signUpButton = document.querySelector('#signup-btn');
let imgUrl = '';
let userData = {};

//取得圖片網址
petPhoto.addEventListener('change', function (e) {
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imgFile);
    //加入相簿
    formData.append('album', 'dICFBxM');
    axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            'Authorization': `Bearer ${imgurToken}`,
            // Authorization: `Client-ID ${clientId}`,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => {
            imgUrl = res.data.data.link;
            // console.log(imgUrl);
        })
        .catch(err => {
            console.log(err);
        })
})

signUpButton.addEventListener('click', e => {
    e.preventDefault();
    const petGender = document.querySelector('input[name="petGender"]:checked').value;
    const isSpayed = document.querySelector('input[name="isSpayed"]:checked').value;
    userData.email = email.value;
    userData.password = password.value;
    userData.petName = petName.value;
    userData.petBreed = petBreed.value;
    userData.petWeight = petWeight.value;
    userData.petBirthday = petBirthday.value;
    userData.address = address.value;
    userData.petPhoto = imgUrl;
    userData.petGender = petGender;
    userData.isSpayed = isSpayed;
    checkValue();
    // console.log(userData);
})

//表單驗證
function checkValue() {
    const signUpForm = document.querySelector('#sign-up-form');
    const inputs = document.querySelectorAll("input[type=text],input[type=password],input[type=email],input[type=date],input[type=file],input[type=number]");
    const constraints = {
        信箱: {
            presence: {
                message: "為必填欄位"
            },
            email: {
                message: "格式錯誤"
            }
        },
        密碼: {
            presence: {
                message: "為必填欄位"
            },
            length: {
                minimum: 6,
                message: "至少六個字元"
            }
        },
        寵物名字: {
            presence: {
                message: "為必填欄位"
            }
        },
        寵物品種: {
            presence: {
                message: "為必填欄位"
            }
        },
        寵物體重: {
            presence: {
                message: "為必填欄位"
            }
        },
        寵物生日: {
            presence: {
                message: "為必填欄位"
            }
        },
        地址: {
            presence: {
                message: "為必填欄位"
            }
        },
        寵物圖片: {
            presence: {
                message: "為必填欄位"
            }
        },
    };
    const result = validate(signUpForm, constraints);
    inputs.forEach(function (item) {
        item.nextElementSibling.textContent = '';
    })
    if (result) {
        let resultAry = Object.keys(result);
        resultAry.forEach(errItem => {
            document.querySelector(`#${errItem}`).textContent = result[errItem];
        })
    }
    else {
        // if (imgUrl !== undefined) {
        //     console.log(userData);
        // }
        axios.post(`${apiUrl}/users`, userData)
            .then(res => {
                // console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "註冊成功",
                    showConfirmButton: false,
                    timer: 1500
                });
                email.value = '';
                password.value = '';
                petName.value = '';
                petPhoto.value = '';
                petBreed.value = '';
                petWeight.value = '';
                petBirthday.value = '';
                address.value = '';
            })
            .catch(err => {
                // console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "請檢查資料是否有誤"
                });
            })
    }
}

// Flatpickr套件
const config = {
    maxDate: 'today'
}
flatpickr("input[type=date]", config);
