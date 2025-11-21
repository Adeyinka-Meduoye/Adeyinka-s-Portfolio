/**
 * Modern JavaScript for Adeyinka's Portfolio
 * Focuses on form handling, validation, and performance.
 */

// 1. DOM Element Selection using modern practices
const form = document.getElementById("contactForm"); // Changed ID to match HTML refactor
const sendButton = document.getElementById("sendBtn"); // Changed ID to match HTML refactor
// Removed 'resetButton' as it wasn't present or used in the HTML

/**
 * Handle form submission logic.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = (event) => {
    // Prevent the default browser form submission (which reloads the page)
    event.preventDefault();

    // Get input values directly from the form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Basic Client-Side Validation
    if (!name || !email || !message) {
        // Use the browser's native constraint validation API (if supported)
        // or a more visual feedback method instead of a basic alert, 
        // but keeping the spirit of the original check.
        alert("🚨 Please ensure all fields (Name, Email, Message) are filled out!");
        return; // Stop execution if validation fails
    }

    // --- FORM SUBMISSION (Simulated) ---
    
    // 1. Log data to console (useful for debugging)
    console.log('--- Form Data Captured ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------');
    
    // 2. Display success message (replace this with an actual AJAX/Fetch call in production)
    alert("✅ Success! Your message was sent successfully!");

    // 3. Clear the form fields after successful 'submission'
    form.reset(); 
    
    // OPTIONAL: In a real-world scenario, you would use the Fetch API here
    /*
    fetch(form.action, {
        method: form.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        // Handle successful submission
    })
    .catch(error => {
        // Handle errors
    });
    */
};


// 2. Event Listeners
if (form) {
    // Attach the submission handler directly to the form's 'submit' event
    form.addEventListener("submit", handleFormSubmission);
} else {
    console.error("Contact form element not found. Check the ID 'contactForm'.");
}

// NOTE: We don't need a separate click listener for the 'sendButton' because 
// listening to the 'submit' event on the form itself is more robust.
