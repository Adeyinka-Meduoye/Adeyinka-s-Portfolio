// Initialize EmailJS
emailjs.init("x2jZLRL7ng_aEHqG9");

const form = document.getElementById("form");
const sendButton = document.getElementById("send");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  emailjs.send("service_fordfmq", "template_s2mp6xv", templateParams)
    .then(
      function (response) {
        alert("Your message was sent successfully!");
        console.log("SUCCESS!", response.status, response.text);

        // Reset form
        form.reset();
        sendButton.disabled = false;
        sendButton.textContent = "Send";
      },
      function (error) {
        alert("Oops! Something went wrong. Please try again.");
        console.error("FAILED...", error);
        sendButton.disabled = false;
        sendButton.textContent = "Send";
      }
    );
});
