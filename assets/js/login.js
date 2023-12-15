import axios from "axios";
import Swal from "sweetalert2";
import { validate } from "validate.js";
import { apiUrl } from "./config";

const logInEmail = document.querySelector('#login-email');
const logInPassword = document.querySelector('#login-password');
const btnLogin = document.querySelector('#btn-login');

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    checkValue();
})

function checkValue() {
    const loginForm = document.querySelector('#login-form');
    const constraints = {
        帳號: {
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
        }
    };
    const inputs = document.querySelectorAll("input[type=email],input[type=password]")
    const result = validate(loginForm, constraints);
    inputs.forEach(item => {
        item.nextElementSibling.textContent = '';
    })
    if (result) {
        const resultAry = Object.keys(result);
        resultAry.forEach(errItem => {
            document.querySelector(`#${errItem}`).textContent = result[errItem];
        })
    }
    else {
        logIn();
    }
}
function logIn() {
    axios.post(`${apiUrl}/login`, {
        email: logInEmail.value,
        password: logInPassword.value
    }).then(res => {
        const token = res.data.accessToken;
        localStorage.setItem('token', token);
        Swal.fire({
            icon: "success",
            title: "登入成功",
            showConfirmButton: false,
            timer: 1500
        });
        logInEmail.value = '';
        logInPassword.value = '';
    }).catch(err => {
        // console.log(err);
        Swal.fire({
            icon: "error",
            title: "登入失敗!",
            text: "請確認您的登入資訊",
            footer: '<a href="signup.html">尚未註冊?</a>'
        });
        logInEmail.value = '';
        logInPassword.value = '';
    })
}