import{S as o}from"./bootstrap.min-18d6e209.js";import{a as r,b as c}from"./axios-82754f8c.js";import{s as d,d as t,c as g}from"./utils-46b729ca.js";const m=localStorage.getItem("token"),a=localStorage.getItem("userId");let e;function f(){m||a?r.get(`${c}/users/${a}`).then(function(s){e=s.data,b()}).catch(function(s){console.log(s)}):o.fire({icon:"error",title:"請先登入或註冊",text:"必須是會員才能使用此功能",footer:'<a href="login.html">登入</a>'})}f();function b(){const s=document.querySelector("#passport-content");let p=d(e.address),n=t(e).petGender,i=t(e).isSpayed,l=g(e.petBirthday);e&&(s.innerHTML=`<div class="d-flex flex-column flex-lg-row 
        align-items-center
        justify-content-md-between align-items-md-center">
        <div class="mb-3 mb-lg-0">
        <img class="rounded-circle" src="${e.petPhoto}" alt="Pet Photo"
            width="200" height="200" style="object-fit: cover; object-position: center;">
    </div>
    <div class="passport-info">
        <p class="fs-lg-5 mb-2">名字: <span id="petName">${e.petName}</span></p>
        <p class="fs-lg-5 mb-2">生日: <span id="birthday">${e.petBirthday}</span></p>
        <p class="fs-lg-5 mb-2">年齡: <span id="age">${l}</span></p>
        <p class="fs-lg-5 mb-2">所在地: <span id="location">${p}</span></p>
        <p class="fs-lg-5 mb-2">品種: <span id="breed">${e.petBreed}</span></p>
        <p class="fs-lg-5 mb-2">性別: <span id="gender">${n}</span></p>
        <p class="fs-lg-5 mb-2">是否結紮: <span id="spayed">${i}</span></p>
        <p class="fs-lg-5 mb-2">體重: <span id="weight">${e.petWeight}公斤</span></p>
    </div>
</div>`)}
