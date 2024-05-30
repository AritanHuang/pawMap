import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl, userId, token, petName } from "./config";

let todoData = [];
const todosList = document.querySelector('#todos-list');
const newTodo = document.querySelector('#newTodo');
const btnAddTodo = document.querySelector('#btn-add-todo');
const todoTitle = document.querySelector('#todo-title');
//初始化頁面
function init() {
    //取得使用者待辦清單
    axios.get(`${apiUrl}/users/${userId}/todos`)
        .then(res => {
            todoData = res.data;
            // console.log(todoData);
            renderTodo();
        })
        .catch(err => {
            console.log(err);
        })
}
init();
//渲染todo資料
function renderTodo() {
    let todoStr = '';
    todoData.forEach(function (item) {
        todoStr += `<li class="d-flex mb-2 justify-content-between">
        <p class="d-flex align-items-center  me-4
        me-md-5 fs-md-5"><span class="material-symbols-outlined me-1">
                pet_supplies
            </span>${item.created_at.substring(0, 10)}
            ${item.task}</p>
        <button type="button" class="btn btn-danger link-light" data-num="${item.id}">刪除</button>
    </li>`
    })
    todosList.innerHTML = todoStr;
    todoTitle.textContent = `${petName}的健康紀錄`;
}
btnAddTodo.addEventListener('click', function (e) {
    let todoObj = {};
    todoObj.task = newTodo.value;
    todoObj.created_at = new Date();
    axios.post(`${apiUrl}/600/users/${userId}/todos`, todoObj, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            // console.log(res);
            init();
        })
        .catch(err => {
            Swal.fire("新增待辦失敗");
        })
    newTodo.value = '';
})
//刪除todo資料
todosList.addEventListener('click', function (e) {
    todoData.forEach(function (item) {
        if (parseInt(e.target.getAttribute('data-num')) === item.id) {
            axios.delete(`${apiUrl}/600/todos/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log(res);
                    init();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
})