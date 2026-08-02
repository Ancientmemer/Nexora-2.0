import { supabase } from "./supabase.js";

if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

const tbody = document.querySelector("#applicationsTable tbody");

// Pagination
const PAGE_SIZE = 50;
let currentPage = 0;
let totalRows = 0;

async function loadApplications() {

    tbody.innerHTML = `
    <tr>
        <td colspan="8" style="text-align:center;padding:20px;">
            Loading applications...
        </td>
    </tr>`;

    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
        .from("applications")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {

        console.error(error);

        tbody.innerHTML = `
        <tr>
            <td colspan="8" style="color:red;text-align:center;padding:20px;">
                ${error.message}
            </td>
        </tr>`;

        return;
    }

    totalRows = count || 0;

    document.getElementById("totalCount").innerText = totalRows;

document.getElementById("pendingCount").innerText =
data.filter(app => app.status === "Pending").length;

document.getElementById("contactedCount").innerText =
data.filter(app => app.status === "Contacted").length;

document.getElementById("selectedCount").innerText =
data.filter(app => app.status === "Selected").length;

document.getElementById("rejectedCount").innerText =
data.filter(app => app.status === "Rejected").length;

    tbody.innerHTML = "";

    if (!data || data.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center;padding:20px;">
                No Applications Found
            </td>
        </tr>`;

        return;
    }

    data.forEach(app => {

        tbody.innerHTML += `
        <tr>

            <td>${app.full_name}</td>

            <td>${app.phone_number}</td>

            <td>${app.whatsapp_number}</td>

            <td>${app.email}</td>

            <td>${app.education}</td>

            <td>

                <select
                class="statusSelect"
                data-id="${app.id}">

                    <option ${app.status === "Pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option ${app.status === "Contacted" ? "selected" : ""}>
                        Contacted
                    </option>

                    <option ${app.status === "Selected" ? "selected" : ""}>
                        Selected
                    </option>

                    <option ${app.status === "Rejected" ? "selected" : ""}>
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
                data-message="${app.message || "No message"}"
                data-status="${app.status}">
                    View
                </button>

            </td>

            <td>

                <button
                class="deleteBtn"
                data-id="${app.id}">
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

const { error } = await supabase

.from("applications")

.update({status})

.eq("id",id);

if(error){

alert("Failed to update status.");

console.error(error);

return;

}

loadApplications();

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

console.error(error);

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

// =======================
// Pagination Controls
// =======================

const pagination = document.createElement("div");

pagination.style.marginTop = "20px";
pagination.style.display = "flex";
pagination.style.justifyContent = "center";
pagination.style.alignItems = "center";
pagination.style.gap = "15px";

pagination.innerHTML = `

<button id="prevPage">⬅ Previous</button>

<span id="pageInfo">Page 1</span>

<button id="nextPage">Next ➡</button>

`;

document.querySelector(".container").appendChild(pagination);

function updatePageInfo(){

const totalPages = Math.ceil(totalRows / PAGE_SIZE) || 1;

document.getElementById("pageInfo").innerText =
`Page ${currentPage + 1} of ${totalPages}`;

document.getElementById("prevPage").disabled =
currentPage === 0;

document.getElementById("nextPage").disabled =
(currentPage + 1) >= totalPages;

}

document
.getElementById("prevPage")
.addEventListener("click",()=>{

if(currentPage===0) return;

currentPage--;

loadApplications();

});

document
.getElementById("nextPage")
.addEventListener("click",()=>{

const totalPages = Math.ceil(totalRows / PAGE_SIZE);

if(currentPage + 1 >= totalPages) return;

currentPage++;

loadApplications();

});

// Update page info after every load

const oldLoad = loadApplications;

loadApplications = async function(){

await oldLoad();

updatePageInfo();

};

loadApplications();
