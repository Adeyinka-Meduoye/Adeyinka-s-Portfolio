/**
 * =========================================================
 * GLOBAL SETUP
 * =========================================================
 */

// Footer Year Update
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

/**
 * =========================================================
 * 1. THEME TOGGLE LOGIC (Dark/Light Mode)
 * =========================================================
 */

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;
const DARK_THEME = 'dark-theme';
const LIGHT_THEME = 'light-theme';

// Function to set the current theme
function setTheme(theme) {
    if (theme === LIGHT_THEME) {
        body.classList.remove(DARK_THEME);
        body.classList.add(LIGHT_THEME);
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.remove(LIGHT_THEME);
        body.classList.add(DARK_THEME);
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    // Note: Since Canvas prohibits localStorage, we will rely on the default theme.
    // In a production environment, you would use: localStorage.setItem('theme', theme);
}

// Check for the user's preferred theme (default to dark if not set)
// For this environment, we initialize to the dark theme as defined in HTML.
setTheme(body.classList.contains(LIGHT_THEME) ? LIGHT_THEME : DARK_THEME);

// Theme Toggle Click Handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains(DARK_THEME) ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
    });
}


/**
 * =========================================================
 * 2. EMAILJS INTEGRATION (Contact Form)
 * =========================================================
 */

// !!! IMPORTANT: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL EMAILJS KEYS !!!
// -------------------------------------------------------------------------
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g., 'service_xxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xxxxx'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // e.g., 'user_xxxxx'
// -------------------------------------------------------------------------

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const sendButton = document.getElementById('send-button');

// Function to display a message in the UI
function displayMessage(message, type = 'success') {
    formMessage.textContent = message;
    formMessage.className = `mt-3 text-center alert-${type}`; // Uses custom CSS classes
    formMessage.style.display = 'block';
}

// Function to hide the message
function hideMessage() {
    formMessage.style.display = 'none';
}

if (contactForm && window.emailjs) {
    // 1. Initialize EmailJS with the Public Key
    // Check if placeholders are set before initialization
    if (EMAILJS_PUBLIC_KEY.includes('YOUR_PUBLIC_KEY')) {
        console.error("EmailJS not initialized: Please replace 'YOUR_PUBLIC_KEY' in script.js.");
        displayMessage("Configuration Error: Please update the EmailJS keys in script.js.", 'danger');
    } else {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // 2. Form Submission Handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        hideMessage();
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        // Check again for complete configuration
        if (EMAILJS_SERVICE_ID.includes('YOUR_SERVICE_ID') || EMAILJS_TEMPLATE_ID.includes('YOUR_TEMPLATE_ID')) {
             displayMessage("Configuration Error: Please update the EmailJS Service and Template IDs in script.js.", 'danger');
             sendButton.disabled = false;
             sendButton.textContent = 'Send Message';
             return;
        }

        // Send the form using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                displayMessage("✅ Your message was sent successfully!", 'success');
                contactForm.reset(); // Clear the form
            }, function (error) {
                console.error('FAILED...', error);
                displayMessage(`❌ Failed to send message. Please try again later. Error: ${error.text || error}`, 'danger');
            })
            .finally(() => {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Message';
            });
    });
} else if (contactForm) {
    console.error("EmailJS SDK not loaded or contactForm not found.");
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        displayMessage("Error: Contact service is currently unavailable.", 'danger');
    });
}
