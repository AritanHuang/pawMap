import{a as n,b as a,u as c,t as i,S as l,p as f}from"./axios-2d2df78c.js";let s=[];const u=document.querySelector("#todos-list"),r=document.querySelector("#newTodo"),m=document.querySelector("#btn-add-todo"),b=document.querySelector("#todo-title");function d(){n.get(`${a}/users/${c}/todos`).then(e=>{s=e.data,p()}).catch(e=>{console.log(e)})}d();function p(){let e="";s.forEach(function(t){e+=`<li class="d-flex mb-2 justify-content-between">
        <p class="d-flex align-items-center  me-4
        me-md-5 fs-md-5"><span class="material-symbols-outlined me-1">
                pet_supplies
            </span>${t.created_at.substring(0,10)}
            ${t.task}</p>
        <button type="button" class="btn btn-danger link-light" data-num="${t.id}">刪除</button>
    </li>`}),u.innerHTML=e,b.textContent=`${f}的健康紀錄`}m.addEventListener("click",function(e){let t={};t.task=r.value,t.created_at=new Date,n.post(`${a}/600/users/${c}/todos`,t,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{d()}).catch(o=>{l.fire("新增待辦失敗")}),r.value=""});u.addEventListener("click",function(e){s.forEach(function(t){parseInt(e.target.getAttribute("data-num"))===t.id&&n.delete(`${a}/600/todos/${t.id}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{d()}).catch(o=>{l.fire("刪除失敗，請稍後再試"),console.log(o)})})});
