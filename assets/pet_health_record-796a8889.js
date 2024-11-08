import{S as c}from"./bootstrap.min-2015cc09.js";import{a as n,b as a,u as i,t as l,p as f}from"./axios-744198d0.js";let s=[];const u=document.querySelector("#todos-list"),d=document.querySelector("#newTodo"),m=document.querySelector("#btn-add-todo"),p=document.querySelector("#todo-title");function r(){n.get(`${a}/users/${i}/todos`).then(e=>{s=e.data,b()}).catch(e=>{console.log(e)})}r();function b(){let e="";s.forEach(function(t){e+=`<li class="d-flex mb-2 justify-content-between">
        <p class="d-flex align-items-center  me-4
        me-md-5 fs-md-5"><span class="material-symbols-outlined me-1">
                pet_supplies
            </span>${t.created_at.substring(0,10)}
            ${t.task}</p>
        <button type="button" class="btn btn-danger link-light" data-num="${t.id}">刪除</button>
    </li>`}),u.innerHTML=e,p.textContent=`${f}的健康紀錄`}m.addEventListener("click",function(e){let t={};t.task=d.value,t.created_at=new Date,n.post(`${a}/600/users/${i}/todos`,t,{headers:{Authorization:`Bearer ${l}`}}).then(o=>{r()}).catch(o=>{c.fire("新增待辦失敗")}),d.value=""});u.addEventListener("click",function(e){s.forEach(function(t){parseInt(e.target.getAttribute("data-num"))===t.id&&n.delete(`${a}/600/todos/${t.id}`,{headers:{Authorization:`Bearer ${l}`}}).then(o=>{r()}).catch(o=>{c.fire("刪除失敗，請稍後再試"),console.log(o)})})});
