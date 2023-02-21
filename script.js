let form = document.getElementById("form");
let sendButton = document.getElementById("send");
let resetButton = document.getElementById("reset");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

sendButton.addEventListener("click", function (e) {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  if (name.value == "" || email.value == "") {
    alert("Ensure you input a value in all fields!");
  } else {
    alert("Your message was sent successfully!");
    console.log(
      `This form has a name of ${name.value}, email of ${email.value}, and a message of ${message.value}`
    );

    name.value = "";
    email.value = "";
    message.value = "";
  }
});
