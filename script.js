/**
 * =========================================================
 * GLOBAL CONFIGURATION & SETUP
 * =========================================================
 */

// ** EMAILJS CREDENTIALS (Provided by User) **
// These credentials are used to connect the contact form to your EmailJS service.
const EMAILJS_SERVICE_ID = 'service_fordfmq'; 
const EMAILJS_TEMPLATE_ID = 'template_s2mp6xv'; 
const EMAILJS_PUBLIC_KEY = 'x2jZLRL7ng_aEHqG9'; 

// Initialize EmailJS
(function() {
    if (EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log("EmailJS initialized successfully.");
    } else {
        console.error("EmailJS Public Key is missing. Form submissions will fail.");
    }
})();


/**
 * =========================================================
 * 1. Custom Toast Notification System (Replacing alert())
 * =========================================================
 */

const toastContainer = document.getElementById('toast-container');

/**
 * Displays a custom, non-blocking toast notification.
 * @param {string} message The message to display.
 * @param {'success' | 'error' | 'warning'} type The type of notification.
 * @param {number} duration Duration in milliseconds (default: 5000).
 */
function showMessage(message, type = 'success', duration = 5000) {
    if (!toastContainer) {
        console.error("Toast container not found.");
        return;
    }

    const iconMap = {
        success: '<i class="fas fa-check-circle toast-icon"></i>',
        error: '<i class="fas fa-times-circle toast-icon"></i>',
        warning: '<i class="fas fa-exclamation-triangle toast-icon"></i>'
    };
    
    // Create the toast element
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `${iconMap[type]}<span>${message}</span>`;
    
    // Append and show
    toastContainer.prepend(toast);
    
    // Use a short delay for the CSS transition to take effect (ensures transform animation runs)
    setTimeout(() => {
        toast.classList.add('show');
    }, 10); 
    
    // Automatically hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
        // Wait for the fade-out transition before removing from DOM
        toast.addEventListener('transitionend', () => {
            if (!toast.classList.contains('show')) {
                toast.remove();
            }
        }, { once: true });
    }, duration);
}


/**
 * =========================================================
 * 2. General Page Logic (Year, Theme, Smooth Scroll)
 * =========================================================
 */

const STORAGE_KEY = 'portfolio-theme';
const htmlElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Function to set the theme on the HTML element and icon
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Update the icon based on the *new* theme (e.g., if theme is 'dark', show the sun icon for the *next* action)
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun'; // Next click changes to light (sun icon)
    } else {
        themeIcon.className = 'fas fa-moon'; // Next click changes to dark (moon icon)
    }
}

// Event listener for theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // 2.1 Update Footer Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2.2 Initial Theme Setup (check stored preference or OS preference)
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme = storedTheme 
        ? storedTheme 
        : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(initialTheme);
    
    // 2.3 Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is not just a placeholder ('#')
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll to the element
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Collapse the navbar on mobile after clicking a link
                    const navbarCollapse = document.getElementById('navbarNav');
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
});


/**
 * =========================================================
 * 3. Contact Form Submission (EmailJS Integration)
 * =========================================================
 */

const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send');


if (contactForm && sendButton) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); 
        
        // Use HTML5 constraint validation for robust checking
        if (!contactForm.checkValidity()) {
            // Trigger browser's native validation feedback
            contactForm.classList.add('was-validated'); 
            showMessage("⚠️ Please ensure all required fields are correctly filled.", 'warning');
            return;
        }

        // Disable button and show a sending state
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;

        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function() {
                // Success
                showMessage("✅ Your message was sent successfully! I will be in touch soon.", 'success');
                contactForm.reset(); // Clear the form
                contactForm.classList.remove('was-validated'); // Reset validation state
            }, function(error) {
                // Error
                showMessage(`❌ Failed to send the message. Please try again or email me directly.`, 'error');
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                // Always re-enable button and reset text
                sendButton.textContent = 'Send Message';
                sendButton.disabled = false;
            });
    });
}
