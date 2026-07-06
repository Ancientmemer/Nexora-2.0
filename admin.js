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

<td>${app.status}</td>

</tr>

`;

});

}

loadApplications();

document.getElementById("logoutBtn").onclick=()=>{

localStorage.removeItem("adminLoggedIn");

window.location.href="admin-login.html";

};
