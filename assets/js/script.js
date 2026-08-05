/* =====================================================
   JUDE DINIZ PORTFOLIO
   Version 2.0
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const header = document.querySelector(".site-header");

const navToggle = document.querySelector(".nav-toggle");

const mobileNav = document.querySelector(".mobile-nav");

const navLinks = document.querySelectorAll(".main-nav a");

const mobileLinks = document.querySelectorAll(".mobile-nav a");

const sections = document.querySelectorAll("section[id]");

const currentYear = document.getElementById("current-year");

const typingElement = document.querySelector(".typing-text");

const backToTop = document.querySelector(".back-to-top");

const revealElements = document.querySelectorAll(
".reveal,.fade-left,.fade-right,.zoom"
);

/* =====================================================
   TYPING TEXT
===================================================== */

const roles = [

"Software Developer",

"Computer Science Graduate",

"Web Developer",

"IT Support",

"Digital Forensics Enthusiast",

"Cyber Security Learner"

];

/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;
/* =====================================================
   UTILITY FUNCTIONS
===================================================== */

/* ---------- Current Year ---------- */

function updateCurrentYear() {

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }

}

/* ---------- Smooth Scroll ---------- */

function smoothScroll(target) {

    const element = document.querySelector(target);

    if (!element) return;

    window.scrollTo({

        top: element.offsetTop - 80,

        behavior: "smooth"

    });

}

/* ---------- Debounce ---------- */

function debounce(func, delay = 100) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}

/* ---------- Throttle ---------- */

function throttle(callback, delay = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback.apply(this, args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}

/* ---------- Toggle Class ---------- */

function toggleClass(element, className) {

    if (!element) return;

    element.classList.toggle(className);

}

/* ---------- Add Class ---------- */

function addClass(element, className) {

    if (!element) return;

    element.classList.add(className);

}

/* ---------- Remove Class ---------- */

function removeClass(element, className) {

    if (!element) return;

    element.classList.remove(className);

}
/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function openMobileMenu() {

    if (!mobileNav || !navToggle) return;

    mobileNav.classList.add("active");

    navToggle.setAttribute("aria-expanded", "true");

}

function closeMobileMenu() {

    if (!mobileNav || !navToggle) return;

    mobileNav.classList.remove("active");

    navToggle.setAttribute("aria-expanded", "false");

}

function toggleMobileMenu() {

    if (!mobileNav) return;

    mobileNav.classList.toggle("active");

    const expanded = mobileNav.classList.contains("active");

    navToggle.setAttribute("aria-expanded", expanded);

}

/* =====================================================
   MOBILE NAV EVENTS
===================================================== */

function initialiseMobileNavigation() {

    if (!navToggle || !mobileNav) return;

    navToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        toggleMobileMenu();

    });

    document.addEventListener("click", (event) => {

        if (!mobileNav.classList.contains("active")) return;

        if (

            !mobileNav.contains(event.target) &&

            !navToggle.contains(event.target)

        ) {

            closeMobileMenu();

        }

    });

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMobileMenu();

        }

    });

}
/* =====================================================
   STICKY HEADER
===================================================== */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        if (

            scrollPosition >= sectionTop &&

            scrollPosition < sectionTop + sectionHeight

        ) {

            document
                .querySelectorAll('.main-nav a, .mobile-nav a')
                .forEach(link => {

                    link.classList.remove("active");

                });

            const desktopLink = document.querySelector(
                `.main-nav a[href="#${sectionId}"]`
            );

            const mobileLink = document.querySelector(
                `.mobile-nav a[href="#${sectionId}"]`
            );

            if (desktopLink) {

                desktopLink.classList.add("active");

            }

            if (mobileLink) {

                mobileLink.classList.add("active");

            }

        }

    });

}

/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

function initialiseSmoothNavigation() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function (event) {

                const target = this.getAttribute("href");

                if (target === "#") return;

                event.preventDefault();

                smoothScroll(target);

            });

        });

}

/* =====================================================
   SCROLL EVENTS
===================================================== */

window.addEventListener(

    "scroll",

    throttle(() => {

        updateHeader();

        updateActiveNavigation();

    }, 100)

);
/* =====================================================
   TYPING ANIMATION
===================================================== */

function typeWriter() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent = currentRole.substring(

            0,

            characterIndex + 1

        );

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeWriter, 1800);

            return;

        }

        setTimeout(typeWriter, 90);

    }

    else {

        typingElement.textContent = currentRole.substring(

            0,

            characterIndex - 1

        );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {

                roleIndex = 0;

            }

        }

        setTimeout(typeWriter, 45);

    }

}

/* =====================================================
   CURSOR EFFECT
===================================================== */

function createTypingCursor() {

    if (!typingElement) return;

    const cursor = document.createElement("span");

    cursor.className = "typing-cursor";

    cursor.textContent = "|";

    typingElement.after(cursor);

}
/* =====================================================
   TYPING ANIMATION
===================================================== */

function typeWriter() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent = currentRole.substring(

            0,

            characterIndex + 1

        );

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeWriter, 1800);

            return;

        }

        setTimeout(typeWriter, 90);

    }

    else {

        typingElement.textContent = currentRole.substring(

            0,

            characterIndex - 1

        );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {

                roleIndex = 0;

            }

        }

        setTimeout(typeWriter, 45);

    }

}

/* =====================================================
   CURSOR EFFECT
===================================================== */

function createTypingCursor() {

    if (!typingElement) return;

    const cursor = document.createElement("span");

    cursor.className = "typing-cursor";

    cursor.textContent = "|";

    typingElement.after(cursor);

}
/* =====================================================
   SCROLL REVEAL
===================================================== */

function initialiseScrollReveal() {

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

        return;

    }

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15,

            rootMargin:"0px 0px -50px 0px"

        }

    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

}

/* =====================================================
   SECTION STAGGER ANIMATION
===================================================== */

function staggerCards() {

    const cards = document.querySelectorAll(

        ".skill-card, .project-card, .contact-card, .certificate-card, .timeline-item"

    );

    cards.forEach((card,index)=>{

        card.style.transitionDelay = `${index * 100}ms`;

    });

}
/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

function initialiseBackToTop() {

    if (!backToTop) return;

    function toggleBackToTop() {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(

        "scroll",

        throttle(toggleBackToTop, 100)

    );

    backToTop.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* =====================================================
   INITIALISE WEBSITE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Current Year */
    updateCurrentYear();

    /* Navigation */
    initialiseMobileNavigation();

    initialiseSmoothNavigation();

    /* Typing Animation */
    createTypingCursor();

    typeWriter();

    /* Scroll Reveal */
    initialiseScrollReveal();

    staggerCards();

    /* Back To Top */
    initialiseBackToTop();

    /* Initial Navigation State */
    updateHeader();

    updateActiveNavigation();

});

/* =====================================================
   WINDOW EVENTS
===================================================== */

window.addEventListener(

    "scroll",

    throttle(() => {

        updateHeader();

        updateActiveNavigation();

    }, 100)

);

window.addEventListener(

    "resize",

    debounce(() => {

        updateHeader();

    }, 150)

);

/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});