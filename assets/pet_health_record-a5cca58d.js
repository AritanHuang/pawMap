import{S as l}from"./bootstrap.min-2015cc09.js";import{a as n,b as s,u as a,t as i,p as u}from"./axios-744198d0.js";let d=[];const m=document.querySelector("#todos-list"),o=document.querySelector("#newTodo"),p=document.querySelector("#btn-add-todo"),b=document.querySelector("#todo-title");function r(){n.get(`${s}/users/${a}/todos`).then(t=>{d=t.data,f()}).catch(t=>{console.log(t)})}r();function f(){let t="";d.forEach(function(e){t+=`<li class="d-flex mb-2 justify-content-between">
        <p class="d-flex align-items-center  me-4
        me-md-5 fs-md-5"><span class="material-symbols-outlined me-1">
                pet_supplies
            </span>${e.created_at.substring(0,10)}
            ${e.task}</p>
        <button type="button" class="btn btn-danger link-light" data-num="${e.id}">刪除</button>
    </li>`}),m.innerHTML=t,b.textContent=`${u}的健康紀錄`}p.addEventListener("click",function(t){let e={};e.task=o.value,e.created_at=new Date,n.post(`${s}/600/users/${a}/todos`,e,{headers:{Authorization:`Bearer ${i}`}}).then(c=>{r()}).catch(c=>{l.fire("新增待辦失敗")}),o.value=""});
