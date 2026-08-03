// Portfolio interactive behavior

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const typedText = document.querySelector('.hero-typed-text');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');
const revealElements = document.querySelectorAll('.reveal');

const roles = [
  'Software Developer',
  'Web Developer',
  'Computer Science Graduate',
  'IT Support Professional',
  'Problem Solver',
  'Lifelong Learner'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 80;
const deleteSpeed = 40;
const pauseDelay = 1200;

function typeRole() {
  if (!typedText) return;

  const currentRole = roles[roleIndex];
  const displayedText = currentRole.slice(0, charIndex);

  typedText.textContent = displayedText;

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

function attachMobileNavListeners() {
  if (!navToggle || !navList) return;

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function handleContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim() || 'A visitor';
    const email = document.getElementById('contact-email')?.value.trim() || 'Not provided';
    const phone = document.getElementById('contact-phone')?.value.trim() || 'Not provided';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:dinizjude@gmail.com?subject=${subject}&body=${body}`;
  });
}

function createScrollReveal() {
  if (!revealElements.length) return;

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
  attachMobileNavListeners();
  handleContactForm();
  createScrollReveal();
  typeRole();
});
