const form = document.getElementById("loginForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const username=document.getElementById("username").value;

const password=document.getElementById("password").value;

if(username==="admin" && password==="Nexora@2026"){

localStorage.setItem("adminLoggedIn","true");

window.location.href="admin.html";

}else{

alert("Invalid Username or Password");

}

});
