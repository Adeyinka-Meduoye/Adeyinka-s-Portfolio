/**
 * Modern JavaScript for Adeyinka's Portfolio
 * Includes Form Handling (EmailJS).
 */

// 1. DOM Element Selection
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("form-status");

// 6. EmailJS Configuration - Initialize right away
(function() {
    // IMPORTANT: Double-check this Public Key in your EmailJS dashboard
    emailjs.init("x2jZLRL7ng_aEHqG9"); 
    console.log("EmailJS Initialized.");
})();


/**
 * 1. EmailJS: Handles form submission logic to send email.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Reset status message
    statusMessage.textContent = 'Sending...';
    statusMessage.className = 'mt-3 text-center text-info';
    
    // IMPORTANT: Using the confirmed IDs from your request
    const serviceID = "service_fordfmq"; 
    const templateID = "template_s2mp6xv";

    try {
        console.log(`Attempting to send using Service: ${serviceID}, Template: ${templateID}`);
        
        // This is the correct asynchronous send function
        const result = await emailjs.sendForm(serviceID, templateID, form);
        
        console.log('SUCCESS!', result.status, result.text);
        
        statusMessage.textContent = '✅ Message sent successfully!';
        statusMessage.className = 'mt-3 text-center success';
        
        form.reset(); // Clear the form fields after successful submission

    } catch (error) {
        // If this block is hit, there is usually an issue with the Service ID, Template ID, 
        // the public key, or network connectivity.
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
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
