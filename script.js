const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        if(answer.style.maxHeight){

            answer.style.maxHeight = null;
            question.querySelector("span").textContent = "+";

        }else{

            answer.style.maxHeight = answer.scrollHeight + "px";
            question.querySelector("span").textContent = "−";

        }

    });

});

const menu = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav-links");

menu.onclick = () => {
    nav.classList.toggle("active");
};

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

const fadeElements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {

    threshold:0.2

});

fadeElements.forEach(element => {

    observer.observe(element);

});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        backToTop.style.display = "block";

    }else{

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
