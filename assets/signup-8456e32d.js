import{S as c}from"./bootstrap.min-4cf75e1e.js";import{a as u,b as v}from"./axios-4008c28b.js";import{v as f}from"./validate-a71c0bbf.js";const S="a0461da17c62e537d08e30497baa2ddd0d56a826",i=document.querySelector("#Email"),l=document.querySelector("#Password"),p=document.querySelector("#petName"),m=document.querySelector("#petBreed"),d=document.querySelector("#petBirthday"),y=document.querySelector("#address"),g=document.querySelector("#petPhoto"),q=document.querySelector("#signup-btn");let h="",e={};g.addEventListener("change",function(n){const s=n.target.files[0],a=new FormData;a.append("image",s),a.append("album","dICFBxM"),u.post("https://api.imgur.com/3/image",a,{headers:{Authorization:`Bearer ${S}`,"Content-Type":"multipart/form-data"}}).then(t=>{h=t.data.data.link}).catch(t=>{console.log(t)})});q.addEventListener("click",n=>{n.preventDefault();const s=document.querySelector('input[name="petGender"]:checked').value,a=document.querySelector('input[name="isSpayed"]:checked').value;e.email=i.value,e.password=l.value,e.petName=p.value,e.petBreed=m.value,e.petBirthday=d.value,e.address=y.value,e.petPhoto=h,e.petGender=s,e.isSpayed=a,B()});function B(){const n=document.querySelector("#sign-up-form"),s=document.querySelectorAll("input[type=text],input[type=password],input[type=email],input[type=date],input[type=file]"),t=f(n,{信箱:{presence:{message:"為必填欄位"},email:{message:"格式錯誤"}},密碼:{presence:{message:"為必填欄位"},length:{minimum:6,message:"至少六個字元"}},寵物名字:{presence:{message:"為必填欄位"}},寵物品種:{presence:{message:"為必填欄位"}},寵物生日:{presence:{message:"為必填欄位"}},地址:{presence:{message:"為必填欄位"}},寵物圖片:{presence:{message:"為必填欄位"}}});s.forEach(function(o){o.nextElementSibling.textContent=""}),t?Object.keys(t).forEach(r=>{document.querySelector(`#${r}`).textContent=t[r]}):u.post(`${v}/users`,e).then(o=>{c.fire({icon:"success",title:"註冊成功",showConfirmButton:!1,timer:1500}),i.value="",l.value="",p.value="",g.value="",m.value="",d.value="",y.value=""}).catch(o=>{c.fire({icon:"error",title:"Oops...",text:"請檢查資料是否有誤"})})}
