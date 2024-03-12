import{S as i}from"./bootstrap.min-361b4cd4.js";import{a as o,b as r}from"./axios-4008c28b.js";import{s as d,d as t}from"./utils-5bceefce.js";const c=localStorage.getItem("token"),a=localStorage.getItem("userId");let e;function m(){c||a?o.get(`${r}/users/${a}`).then(function(s){e=s.data,g()}).catch(function(s){console.log(s)}):i.fire({icon:"error",title:"請先登入或註冊",text:"必須是會員才能使用此功能",footer:'<a href="login.html">登入</a>'})}m();function g(){const s=document.querySelector("#passport-content");let p=d(e.address),n=t(e).petGender,l=t(e).isSpayed;e&&(s.innerHTML=`<div class="d-flex flex-column flex-lg-row 
        align-items-center
        justify-content-md-between align-items-md-center">
    <div class="mb-3 mb-lg-0">
        <img class="rounded-circle" src="${e.petPhoto}" alt="Pet Photo"
            width="200" height="200">
    </div>
    <div class="passport-info">
        <p class="fs-lg-5 mb-2">名字: <span id="petName">${e.petName}</span></p>
        <p class="fs-lg-5 mb-2">生日: <span id="birthday">${e.petBirthday}</span></p>
        <p class="fs-lg-5 mb-2">年齡: <span id="age">Age</span></p>
        <p class="fs-lg-5 mb-2">所在地: <span id="location">${p}</span></p>
        <p class="fs-lg-5 mb-2">品種: <span id="breed">${e.petBreed}</span></p>
        <p class="fs-lg-5 mb-2">性別: <span id="gender">${n}</span></p>
        <p class="fs-lg-5 mb-2">是否結紮: <span id="spayed">${l}</span></p>
        <p class="fs-lg-5 mb-2">體重: <span id="weight">${e.petWeight}公斤</span></p>
    </div>
</div>`)}
