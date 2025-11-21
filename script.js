/**
 * Modern JavaScript for Adeyinka's Portfolio
 * Includes Form Handling (EmailJS).
 */

// 6. EmailJS Configuration
(function() {
    emailjs.init("x2jZLRL7ng_aEHqG9"); // Your Public Key
})();

// 1. DOM Element Selection
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("form-status");

/**
 * EmailJS: Handles form submission logic to send email.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Reset status message
    statusMessage.textContent = 'Sending...';
    statusMessage.className = 'mt-3 text-center text-info';
    
    // FIX: Corrected Service ID here
    const serviceID = "service_fordfmq"; // Corrected Service ID
    const templateID = "template_s2mp6xv"; // Your Template ID

    try {
        const result = await emailjs.sendForm(serviceID, templateID, form);
        
        console.log('SUCCESS!', result.status, result.text);
        
        statusMessage.textContent = '✅ Message sent successfully!';
        statusMessage.className = 'mt-3 text-center success';
        
        form.reset(); // Clear the form fields after successful submission

    } catch (error) {
        console.error('FAILED...', error);
        
        statusMessage.textContent = '❌ Failed to send message. Please try again or use the links provided.';
        statusMessage.className = 'mt-3 text-center error';
    }
};


// 2. Event Listeners (Run after DOM is fully loaded)
document.addEventListener('DOMContentLoaded', () => {
    
    if (form) {
        form.addEventListener("submit", handleFormSubmission);
    } else {
        console.error("Contact form element not found. Check the ID 'contactForm'.");
    }
    
    // Simple script to set the current year in the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
