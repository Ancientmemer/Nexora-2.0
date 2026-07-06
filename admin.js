import { supabase } from "./supabase.js";

if(localStorage.getItem("adminLoggedIn")!=="true"){

    window.location.href="admin-login.html";

}

const tbody=document.querySelector("#applicationsTable tbody");

async function loadApplications(){

const {data,error}=await supabase
.from("applications")
.select("*")
.order("created_at",{ascending:false});

if(error){

console.log(error);

return;

}

tbody.innerHTML="";

data.forEach(app=>{

tbody.innerHTML+=`

<tr>

<td>${app.full_name}</td>

<td>${app.phone_number}</td>

<td>${app.whatsapp_number}</td>

<td>${app.email}</td>

<td>${app.education}</td>

<td>

<select
class="statusSelect"
data-id="${app.id}"
>

<option ${app.status==="Pending"?"selected":""}>
Pending
</option>

<option ${app.status==="Contacted"?"selected":""}>
Contacted
</option>

<option ${app.status==="Selected"?"selected":""}>
Selected
</option>

<option ${app.status==="Rejected"?"selected":""}>
Rejected
</option>

</select>

</td>

</tr>

`;

});

}

document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

const value=e.target.value.toLowerCase();

const rows=document.querySelectorAll("#applicationsTable tbody tr");

rows.forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(value)?"":"none";

});

});

loadApplications();

document.getElementById("logoutBtn").onclick=()=>{

localStorage.removeItem("adminLoggedIn");

window.location.href="admin-login.html";

};

document.addEventListener("change",async(e)=>{

if(!e.target.classList.contains("statusSelect")) return;

const id=e.target.dataset.id;

const status=e.target.value;

await supabase

.from("applications")

.update({status})

.eq("id",id);

});
