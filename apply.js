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
