import{S as u}from"./bootstrap.min-18d6e209.js";import{a as i,b as p,i as S}from"./axios-82754f8c.js";import{u as f}from"./utils-46b729ca.js";let t={};const m=localStorage.getItem("userId");localStorage.getItem("token");function y(){i.get(`${p}/users/${m}`).then(function(a){t=a.data,b()}).catch(function(a){console.log(a)})}y();const g=document.querySelector("#petName"),v=document.querySelector("#petBreed"),q=document.querySelector("#petBirthday"),r=document.querySelector("#address"),n=document.querySelector("#petPhoto"),s=document.querySelector("#petWeight"),B=document.querySelector("#spayed"),l=document.querySelector("#notSpayed"),o=document.querySelector("#btn-editUserData");function b(){g.value=t.petName,v.value=t.petBreed,q.value=t.petBirthday,r.value=t.address,s.value=t.petWeight,t.isSpayed==="true"?(B.disabled=!0,l.disabled=!0):l.checked=!0}let h="";n.addEventListener("change",a=>{o.textContent="圖片上傳中",o.disabled=!0,f(a.target.files[0],S).then(e=>{h=e,o.textContent="修改",o.disabled=!1}).catch(e=>{console.log(e),o.textContent="圖片上傳失敗"})});o.addEventListener("click",function(a){a.preventDefault();let e={};const d=document.querySelector('input[name="isSpayed"]:checked').value;r.value!==t.address&&(e.address=r.value),n.value!==""&&(e.petPhoto=h),s.value!==t.petWeight&&(e.petWeight=s.value),d!==t.isSpayed&&(e.isSpayed=d),Object.keys(e).length>0?i.patch(`${p}/users/${m}`,e).then(c=>{u.fire("資料更新成功"),y(),n.value=""}).catch(c=>{console.log(c.response)}):u.fire("您並沒有更新任何資料")});
