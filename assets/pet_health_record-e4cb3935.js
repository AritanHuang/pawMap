import{S as u}from"./bootstrap.min-2015cc09.js";import{a as n,b as a,u as c,t as i,p as m}from"./axios-744198d0.js";let s=[];const l=document.querySelector("#todos-list"),r=document.querySelector("#newTodo"),f=document.querySelector("#btn-add-todo"),p=document.querySelector("#todo-title");function d(){n.get(`${a}/users/${c}/todos`).then(e=>{s=e.data,b()}).catch(e=>{console.log(e)})}d();function b(){let e="";s.forEach(function(t){e+=`<li class="d-flex mb-2 justify-content-between">
        <p class="d-flex align-items-center  me-4
        me-md-5 fs-md-5"><span class="material-symbols-outlined me-1">
                pet_supplies
            </span>${t.created_at.substring(0,10)}
            ${t.task}</p>
        <button type="button" class="btn btn-danger link-light" data-num="${t.id}">刪除</button>
    </li>`}),l.innerHTML=e,p.textContent=`${m}的健康紀錄`}f.addEventListener("click",function(e){let t={};t.task=r.value,t.created_at=new Date,n.post(`${a}/600/users/${c}/todos`,t,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{d()}).catch(o=>{u.fire("新增待辦失敗")}),r.value=""});l.addEventListener("click",function(e){s.forEach(function(t){parseInt(e.target.getAttribute("data-num"))===t.id&&n.delete(`${a}/600/todos/${t.id}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{d()}).catch(o=>{console.log(o)})})});
