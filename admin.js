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

<td>

<button
class="viewBtn"
data-name="${app.full_name}"
data-phone="${app.phone_number}"
data-whatsapp="${app.whatsapp_number}"
data-email="${app.email}"
data-education="${app.education}"
data-message="${app.message || 'No message'}"
data-status="${app.status}"
>

View

</button>

</td>

<td>

<button
class="deleteBtn"
data-id="${app.id}"
>

Delete

</button>

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

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const confirmDelete = confirm(
        "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    const id = e.target.dataset.id;

    const { error } = await supabase
        .from("applications")
        .delete()
        .eq("id", id);

    if (error) {

        alert("Failed to delete application.");

        return;

    }

    loadApplications();

});

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("viewBtn")) return;

alert(

`Name: ${e.target.dataset.name}

Phone: ${e.target.dataset.phone}

WhatsApp: ${e.target.dataset.whatsapp}

Email: ${e.target.dataset.email}

Education: ${e.target.dataset.education}

Status: ${e.target.dataset.status}

Message:

${e.target.dataset.message}`

);

});
