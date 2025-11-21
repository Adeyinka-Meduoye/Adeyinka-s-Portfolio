// ===== Dark/Light Mode Toggle =====
const toggleButton = document.createElement("button");
toggleButton.innerText = "🌙 / ☀️";
toggleButton.id = "mode-toggle";
toggleButton.style.position = "fixed";
toggleButton.style.bottom = "20px";
toggleButton.style.right = "20px";
toggleButton.style.zIndex = "100";
toggleButton.style.padding = "10px 15px";
toggleButton.style.borderRadius = "5px";
toggleButton.style.border = "none";
toggleButton.style.cursor = "pointer";
document.body.appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// ===== EmailJS Form Submission =====
const form = document.getElementById("form");
const sendButton = document.getElementById("send");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  sendButton.disabled = true;
  sendButton.innerText = "Sending...";

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill in all fields.");
    sendButton.disabled = false;
    sendButton.innerText = "Send";
    return;
  }

  emailjs.send("service_fordfmq", "template_s2mp6xv", formData, "x2jZLRL7ng_aEHqG9")
    .then(() => {
      alert("Your message was sent successfully!");
      form.reset();
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    })
    .catch(() => {
      alert("Oops! Something went wrong. Please try again.");
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    });
});

// ===== Home Section: Mobile Fix =====
const homeDiv = document.querySelector(".home-div");
if (window.innerWidth <= 768) {
  const homePassport = document.querySelector(".home-passport");
  const homeDescription = document.querySelector(".home-description");
  homeDiv.innerHTML = "";
  homeDiv.appendChild(homePassport);
  homeDiv.appendChild(homeDescription);
}

// ===== Optional: Adjust animated role text if needed =====
const roles = ["Front-End Engineer", "Digital Marketing Specialist", "Full Stack Brand Specialist", "Mobile App Developer"];
let roleIndex = 0;
const roleSpan = document.querySelector(".home-profile span");

setInterval(() => {
  roleSpan.textContent = roles[roleIndex];
  roleIndex = (roleIndex + 1) % roles.length;
}, 5000);
