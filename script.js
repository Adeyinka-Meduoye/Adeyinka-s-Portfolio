/**
 * =========================================================
 * GLOBAL CONFIGURATION & SETUP
 * =========================================================
 */

// ** REQUIRED **: Replace these placeholders with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_fordfmq'; 
const EMAILJS_TEMPLATE_ID = 'template_s2mp6xv'; 
const EMAILJS_PUBLIC_KEY = 'x2jZLRL7ng_aEHqG9'; 

// Initialize EmailJS with your public key
(function() {
    if (EMAILJS_PUBLIC_KEY !== 'x2jZLRL7ng_aEHqG9') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.warn("EmailJS not initialized. Please provide your Public Key in script.js.");
    }
})();

/**
 * =========================================================
 * 1. Footer Year Update
 * =========================================================
 */

const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

/**
 * =========================================================
 * 2. Theme Toggle (Dark/Light Mode)
 * =========================================================
 */

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;
const STORAGE_KEY = 'portfolio-theme';

// Function to set the theme on the HTML element and icon
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (theme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Check localStorage for preferred theme on page load
const storedTheme = localStorage.getItem(STORAGE_KEY);
if (storedTheme) {
    setTheme(storedTheme);
} else {
    // Set default theme based on OS preference or 'dark'
    const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(defaultTheme);
}

// Add event listener to the toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}


/**
 * =========================================================
 * 3. Contact Form (EmailJS Integration)
 * =========================================================
 */

const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); 
        
        // Disable button and show a sending state
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;

        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
             // Handle case where credentials are not set (local simulation)
            alert("⚠️ EmailJS is not configured. Simulating success.");
            console.log("Form data:", Object.fromEntries(new FormData(contactForm).entries()));
            
            // Re-enable and reset button state
            sendButton.textContent = 'Send Message';
            sendButton.disabled = false;
            contactForm.reset();
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function() {
                // Success
                alert("✅ Your message was sent successfully! I will be in touch soon.");
                contactForm.reset(); // Clear the form
            }, function(error) {
                // Error
                alert(`❌ Failed to send the message. Please try again later or email me directly. Error: ${error.text}`);
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                // Always re-enable button and reset text
                sendButton.textContent = 'Send Message';
                sendButton.disabled = false;
            });
    });
}
