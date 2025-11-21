/**
 * Modern JavaScript for Adeyinka's Portfolio
 * Includes Form Handling (EmailJS).
 */

// 1. DOM Element Selection
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("form-status");

// EmailJS Configuration - Initialize with Public Key
(function() {
    emailjs.init("x2jZLRL7ng_aEHqG9"); 
    console.log("EmailJS Initialized.");
})();


/**
 * Handles form submission logic to send email via EmailJS.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Reset status message
    statusMessage.textContent = 'Sending...';
    statusMessage.className = 'mt-3 text-center text-info';
    
    // CONFIRMED CREDENTIALS
    const serviceID = "service_fordfmq"; 
    const templateID = "template_3z33dn4"; // <-- CORRECTED TEMPLATE ID

    try {
        console.log(`Attempting to send using Service: ${serviceID}, Template: ${templateID}`);
        
        // Send the form data
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
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
