// Initialize EmailJS
emailjs.init("x2jZLRL7ng_aEHqG9"); // Your public key

// DOM Elements
const form = document.getElementById("form");
const sendButton = document.getElementById("send");
const toast = document.getElementById("toast");
const roleSpan = document.querySelector(".home-profile span");

// Role Text Animation
const roles = [
  "Mobile App Developer",
  "Front-End Engineer",
  "Digital Marketing Specialist",
  "Full Stack Brand Specialist"
];
let roleIndex = 0;

function rotateRoleText() {
  roleSpan.textContent = roles[roleIndex];
  roleIndex = (roleIndex + 1) % roles.length;
}
setInterval(rotateRoleText, 2000); // change every 2s
rotateRoleText(); // initialize

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields", "error");
    return;
  }

  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  emailjs.send("service_fordfmq", "template_s2mp6xv", {
    name: name,
    email: email,
    message: message
  }).then(() => {
    showToast("Message sent successfully!", "success");
    form.reset();
    sendButton.disabled = false;
    sendButton.textContent = "Send";
  }).catch((err) => {
    showToast("Failed to send message. Try again!", "error");
    console.error(err);
    sendButton.disabled = false;
    sendButton.textContent = "Send";
  });
});

// Toast function
function showToast(message, type) {
  toast.textContent = message;
  toast.className = `toast-message ${type}`;
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 4000);
}
