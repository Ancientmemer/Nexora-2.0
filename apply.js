import { supabase } from "./supabase.js";

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

    alert("You have already submitted an application. Our recruitment team will contact you soon.");

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

        alert("❌ Application submission failed.");

        console.error(error);

        return;

    }

    alert("✅ Application submitted successfully!");

    form.reset();

});
