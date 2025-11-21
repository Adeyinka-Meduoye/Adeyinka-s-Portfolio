/**
 * =========================================================
 * 1. Global Setup (DOM Element Selection)
 * =========================================================
 */

// Footer Year Update
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Contact Form Elements
const contactForm = document.getElementById('contact-form'); // Updated ID from HTML refactor
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
// Removed sendButton and resetButton as we'll listen to the form submit event


/**
 * =========================================================
 * 2. Form Submission Handler
 * =========================================================
 */

if (contactForm) {
    // Attach a single event listener to the form's submission event
    contactForm.addEventListener('submit', function (e) {
        // Prevent the default form submission (page reload)
        e.preventDefault(); 
        
        // Retrieve current values
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Basic Client-Side Validation
        if (nameValue === '' || emailValue === '' || messageValue === '') {
            // Using a simple alert, consider replacing with a more modern Toast/Snackbar notification in the UI
            alert("⚠️ Please ensure all fields are filled out.");
            return; // Stop execution if validation fails
        }
        
        // --- Submission Simulation ---
        
        // Log the data to the console (for debugging/tracking)
        console.log(`--- Form Submission Simulated ---`);
        console.log(`Name: ${nameValue}`);
        console.log(`Email: ${emailValue}`);
        console.log(`Message: ${messageValue}`);
        console.log(`---------------------------------`);
        
        // Display success message to the user
        alert("✅ Your message was sent successfully! I will be in touch soon.");

        // Clear the form fields after successful 'submission'
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        
        // Note: For a real-world form, this is where you would use the Fetch API 
        // to send the data to a backend service (e.g., Formspree, Netlify Forms, or a custom API endpoint).
    });
}
