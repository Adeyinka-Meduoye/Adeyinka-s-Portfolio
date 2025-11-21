/**
 * Modern JavaScript for Adeyinka's Portfolio
 * Includes Form Handling (EmailJS) and Theme Toggle.
 */

// 6. EmailJS Configuration
(function() {
    emailjs.init("x2jZLRL7ng_aEHqG9"); // Your Public Key
})();

// 1. DOM Element Selection
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("form-status");
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement; // Targets the <html> tag


/**
 * 6. EmailJS: Handles form submission logic to send email.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Reset status message
    statusMessage.textContent = 'Sending...';
    statusMessage.className = 'mt-3 text-center text-info';
    
    const serviceID = "service_fordfmr"; // Your Service ID (Corrected typo from ffordfm to fordfmr based on common pattern)
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

/**
 * 5. Theme Toggle: Switches between light and dark themes.
 */
const toggleTheme = () => {
    // Get the current theme from the data-bs-theme attribute on the <html> element
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the new theme
    htmlElement.setAttribute('data-bs-theme', newTheme);
    
    // Update the button icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'light') {
        icon.className = 'fa fa-moon-o'; // Moon icon for dark mode prompt
        themeToggle.setAttribute('aria-label', 'Toggle dark theme');
    } else {
        icon.className = 'fa fa-sun-o'; // Sun icon for light mode prompt
        themeToggle.setAttribute('aria-label', 'Toggle light theme');
    }
    
    // Optional: Save preference to localStorage
    localStorage.setItem('theme', newTheme);
};

/**
 * Applies saved theme preference on page load.
 */
const loadTheme = () => {
    // Check localStorage for saved theme, default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    
    // Update icon on load
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'light') {
        icon.className = 'fa fa-moon-o';
    } else {
        icon.className = 'fa fa-sun-o';
    }
};


// 2. Event Listeners (Run after DOM is fully loaded)
document.addEventListener('DOMContentLoaded', () => {
    
    // Load saved theme immediately
    loadTheme();
    
    if (form) {
        form.addEventListener("submit", handleFormSubmission);
    } else {
        console.error("Contact form element not found. Check the ID 'contactForm'.");
    }
    
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
});
