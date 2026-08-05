const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const navLinks = document.querySelectorAll('.nav-list a');
let mobileNavLinks = [];
const typedText = document.querySelector('.typed-text');
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');
const currentYear = document.getElementById('current-year');
const revealElements = document.querySelectorAll('.reveal');
const header = document.getElementById('site-header');
const sections = document.querySelectorAll('main section[id]');

const roles = [
  'Software Developer',
  'Web Developer',
  'Computer Science Graduate',
  'IT Support Professional',
  'Problem Solver',
  'Lifelong Learner'
];

const localFormEndpoint = 'http://localhost:5001/submit-contact';

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 35;
const pauseDelay = 1200;

function typeRole() {
  if (!typedText) return;
  const currentRole = roles[roleIndex];
  typedText.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, typeSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, deleteSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeRole, pauseDelay);
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typeSpeed);
    }
  }
}

function updateYear() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

function toggleMobileNav() {
  if (!navToggle || !mobileNav) return;
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mobileNav.classList.toggle('active');
  mobileNav.setAttribute('aria-hidden', String(!mobileNav.classList.contains('active')));
}

function closeMobileNav() {
  if (!navToggle || !mobileNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('active');
  mobileNav.setAttribute('aria-hidden', 'true');
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle('shrink', window.scrollY > 30);
}

function updateActiveSection() {
  const offset = window.innerHeight * 0.3;
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    const sectionId = section.id;
    const isActive = top <= offset && top >= -section.offsetHeight + offset;
    const link = document.querySelector(`.nav-list a[href="#${sectionId}"]`);
    const mobileLink = document.querySelector(`.mobile-nav-list a[href="#${sectionId}"]`);
    if (link) link.classList.toggle('active', isActive);
    if (mobileLink) mobileLink.classList.toggle('active', isActive);
  });
}

function attachMobileNav() {
  if (!navToggle || !mobileNav) return;

  // Build mobile nav from desktop links to avoid duplicated visible markup
  function buildMobileNav() {
    const mainNavList = document.querySelector('.nav-list');
    if (!mainNavList || !mobileNav) return;
    mobileNav.innerHTML = '';
    const clone = mainNavList.cloneNode(true);
    clone.classList.remove('nav-list');
    clone.classList.add('mobile-nav-list');
    mobileNav.appendChild(clone);
    mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-list a');
    // Attach click handlers to newly created mobile links to close menu on navigation
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => closeMobileNav());
    });
  }

  buildMobileNav();

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });

  // mobile link handlers are attached during buildMobileNav()

  // Close when clicking outside the mobile nav
  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains('active')) return;
    if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileNav();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  // Ensure mobile menu is closed on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileNav();
      // rebuild to ensure no stale state
      buildMobileNav();
    }
  });
}

function handleContactSubmission(event) {
  if (!contactForm) return;
  event.preventDefault();

  const name = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const phone = document.getElementById('contact-phone')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();
  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!name || !email || !message) {
    contactFeedback.textContent = 'Please complete all required fields before sending.';
    contactFeedback.classList.remove('success');
    contactFeedback.classList.add('error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    contactFeedback.textContent = 'Please enter a valid email address.';
    contactFeedback.classList.remove('success');
    contactFeedback.classList.add('error');
    return;
  }

  contactFeedback.textContent = '';
  contactFeedback.classList.remove('error', 'success');

  const endpoint = contactForm.action || localFormEndpoint;

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }

  const replyToInput = contactForm.querySelector('input[name="_replyto"]');
  if (replyToInput) replyToInput.value = email;

  const payload = {
    name,
    email,
    phone,
    message,
    _subject: contactForm.querySelector('input[name="_subject"]')?.value || ''
  };

  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(async (response) => {
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message');
      }

      return data;
    })
    .then(() => {
      contactFeedback.textContent = 'Message sent successfully. Thank you!';
      contactFeedback.classList.remove('error');
      contactFeedback.classList.add('success');
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Contact submit error:', error);
      contactFeedback.textContent = 'There was an issue sending your message. Please ensure the backend is running and try again.';
      contactFeedback.classList.remove('success');
      contactFeedback.classList.add('error');
    })
    .finally(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
}

function setupContactForm() {
  if (!contactForm) return;
  contactForm.addEventListener('submit', handleContactSubmission);
}

function createScrollReveal() {
  if (!window.IntersectionObserver || !revealElements.length) {
    revealElements.forEach((element) => element.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

window.addEventListener('DOMContentLoaded', () => {
  updateYear();
  attachMobileNav();
  setupContactForm();
  createScrollReveal();
  typeRole();
  updateHeader();
  updateActiveSection();
});

window.addEventListener('scroll', () => {
  updateHeader();
  updateActiveSection();
});
