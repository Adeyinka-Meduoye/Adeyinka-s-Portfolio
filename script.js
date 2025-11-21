// EmailJS Initialization
emailjs.init("x2jZLRL7ng_aEHqG9");

let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.sendForm('service_fordfmq', 'template_s2mp6xv', this)
    .then(() => {
      alert("Your message was sent successfully!");
      form.reset();
    }, (err) => {
      console.error(err);
      alert("Oops! Something went wrong. Please try again.");
    });
});

// Dark/Light Mode Toggle with Persistence
const darkBtn = document.getElementById("dark-mode-btn");
const lightBtn = document.getElementById("light-mode-btn");

const enableLightMode = () => {
  document.body.classList.add("light-mode");
  localStorage.setItem("theme", "light");
};

const enableDarkMode = () => {
  document.body.classList.remove("light-mode");
  localStorage.setItem("theme", "dark");
};

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  enableLightMode();
} else {
  enableDarkMode();
}

darkBtn.addEventListener("click", enableDarkMode);
lightBtn.addEventListener("click", enableLightMode);

// Home Text Animation
const span = document.querySelector(".home-profile span");
const texts = ["Digital Marketing Specialist", "Mobile App Developer", "Front-End Engineer", "Full Stack Brand Specialist"];
let index = 0;
setInterval(() => { 
  span.textContent = texts[index]; 
  index = (index + 1) % texts.length; 
}, 2000);
