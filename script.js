// Dark/Light Mode Toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "Toggle Dark/Light Mode";
toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.padding = "10px 15px";
toggleBtn.style.zIndex = "1000";
toggleBtn.style.cursor = "pointer";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// Contact Form
const form = document.getElementById("form");
const sendButton = document.getElementById("send");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

sendButton.addEventListener("click", function (e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Ensure you input a value in all fields!");
    return;
  }

  // EmailJS Integration
  emailjs.send(
    "service_fordfmq",
    "template_s2mp6xv",
    {
      from_name: name,
      from_email: email,
      message: message,
    },
    "x2jZLRL7ng_aEHqG9"
  )
  .then((response) => {
    console.log("SUCCESS!", response.status, response.text);
    alert("Your message was sent successfully!");
    form.reset();
  })
  .catch((error) => {
    console.error("FAILED...", error);
    alert("Oops! Something went wrong. Please try again.");
  });
});
