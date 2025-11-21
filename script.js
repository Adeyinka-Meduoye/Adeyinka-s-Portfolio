/* Modern, modular script (ES Module)
   Features:
   - Mobile nav toggle + accessible states
   - Smooth scroll & active link highlighting (IntersectionObserver)
   - Typing/role animation (roles updated)
   - Form validation + toast notifications
   - Light/Dark theme toggle with persistence
*/

const doc = document;
const navToggle = doc.getElementById('nav-toggle');
const primaryNav = doc.getElementById('primary-nav');
const navLinks = Array.from(doc.querySelectorAll('.nav-link'));
const toast = doc.getElementById('toast');
const yearElem = doc.getElementById('year');
const themeToggle = doc.getElementById('theme-toggle');
const themeIcon = doc.getElementById('theme-icon');

yearElem.textContent = new Date().getFullYear();

/* -------------------------
   Theme (Light/Dark) Toggle
   - persisted to localStorage
   ------------------------- */
const THEME_KEY = 'site-theme';
function applyTheme(themeName) {
  if (themeName === 'light') {
    document.documentElement.classList.add('light-theme');
    themeToggle?.setAttribute('aria-pressed', 'true');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('light-theme');
    themeToggle?.setAttribute('aria-pressed', 'false');
    if (themeIcon) themeIcon.textContent = '🌙';
  }
}

// Initialize theme from storage or prefer-dark/system
const saved = localStorage.getItem(THEME_KEY);
if (saved) {
  applyTheme(saved);
} else {
  // default to dark but respect user preference if explicitly light
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

themeToggle?.addEventListener('click', () => {
  const isLight = document.documentElement.classList.contains('light-theme');
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

/* -------------------------
   Mobile nav toggle
   ------------------------- */
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  document.documentElement.classList.toggle('nav-open');
});

/* Close mobile nav when a nav link is clicked */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.matchMedia('(max-width:980px)').matches) {
      document.documentElement.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* -------------------------
   Active link highlighting (IntersectionObserver)
   ------------------------- */
const sections = doc.querySelectorAll('main > section[id]');
const ioOptions = { root: null, rootMargin: '-30% 0px -40% 0px', threshold: 0 };

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = doc.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(n => n.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}, ioOptions);

sections.forEach(s => io.observe(s));

/* -------------------------
   Typing/role animation (updated roles)
   ------------------------- */
const roles = [
  'Front-End Engineer',
  'Digital Marketing Specialist',
  'Full Stack Brand Specialist',
  'Mobile App Developer'
];
const typedEl = doc.getElementById('role-typed');

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting) {
    if (charIndex < current.length) {
      charIndex++;
      setTimeout(typeLoop, 80);
    } else {
      deleting = true;
      setTimeout(typeLoop, 1200);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeLoop, 40);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 200);
    }
  }
}
typeLoop();

/* -------------------------
   Toast helper
   ------------------------- */
function showToast(message, ms = 3200) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), ms);
}

/* -------------------------
   Form validation + submit
   ------------------------- */
const form = doc.getElementById('contact-form');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = doc.getElementById('name');
  const email = doc.getElementById('email');
  const message = doc.getElementById('message');

  if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
    showToast('Please fill in all fields.');
    return;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!emailValid) {
    showToast('Please use a valid email address.');
    return;
  }

  // Simulate sending
  showToast('Sending message...');
  await new Promise(r => setTimeout(r, 900));
  showToast('Message sent — I will get back to you soon!');
  form.reset();
});

/* -------------------------
   Accessibility helpers:
   - Close the mobile nav when pressing Escape
   ------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.documentElement.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});
