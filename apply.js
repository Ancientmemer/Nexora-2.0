import { supabase } from "./supabase.js";

function showPopup(title,message){

    document.getElementById("popupTitle").innerText = title;

    document.getElementById("popupMessage").innerText = message;

    document.getElementById("popup").style.display = "flex";

}

window.closePopup = function(){

    document.getElementById("popup").style.display = "none";

}

const form = document.getElementById("applicationForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const full_name = document.getElementById("fullName").value.trim();
    const phone_number = document.getElementById("phone").value.trim();
    const whatsapp_number = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const education = document.getElementById("education").value.trim();
    const message = document.getElementById("message").value.trim();

   const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .or(`email.eq.${email},phone_number.eq.${phone_number}`)
    .limit(1);

if (existing && existing.length > 0) {

    showPopup(
"Already Applied",
"Our records show you've already submitted an application."
);

    return;

}
    
    const { error } = await supabase
        .from("applications")
        .insert([
            {
                full_name,
                phone_number,
                whatsapp_number,
                email,
                education,
                message,
                status: "Pending"
            }
        ]);

    if (error) {

        showPopup(
"Submission Failed",
"Something went wrong. Please try again."
);

        console.error(error);

        return;

    }

    showPopup(
"Application Submitted",
"Our recruitment team will contact you soon."
);

    form.reset();

});
