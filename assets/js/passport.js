import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "./config";
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
//取得使用者註冊資料
function getUsersData() {
    if (token || userId) {
        axios.get(`${apiUrl}/users/${userId}`)
            .then(function (res) {
                console.log(res.data);
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
//檢查資料是否有成功回傳
// if (getUsersData) {
//     console.log('有資料回傳');
// }
// else {
//     console.log('資料回傳失敗');
// }