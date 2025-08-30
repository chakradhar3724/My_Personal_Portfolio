// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.querySelector('.typing-text');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Theme Toggle Functionality
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Typing Animation
const phrases = [
    'AI/ML Engineer',
    'Data Scientist',
    'Deep Learning Expert',
    'Cloud Computing Specialist',
    'Research Enthusiast'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    const phrase = phrases[currentPhrase];
    
    if (isDeleting) {
        typingText.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingText.textContent = phrase.substring(0, currentChar + 1);
        currentChar++;
    }
    
    if (!isDeleting && currentChar === phrase.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
typeEffect();

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Skill bars animation
const animateSkillBars = () => {
    skillProgress.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animated');
        }
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Animate skill bar
            if (entry.target.classList.contains('skill-progress') && !entry.target.classList.contains('animated')) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    entry.target.style.width = width;
                    entry.target.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe each skill-progress bar
document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));

// Also observe other sections (optional, for animations)
document.querySelectorAll('section').forEach(section => observer.observe(section));


// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyb8jcbxYhThTbXwpLsEpGx_Eu6Numi6cUgfludjJtTs4x7lwnLvIbYS444NmhoHQ4O/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert(`Thank you, ${data.name}! Your message has been submitted.`);
            contactForm.reset();
        } else {
            alert('There was a problem submitting your form. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Network error. Please check your connection and try again.');
    }
});


// Remove parallax effect to fix button scrolling issue
// The parallax effect was causing the buttons to move during scroll
// We'll keep the hero static for better UX

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add smooth reveal animations for cards
const cards = document.querySelectorAll('.project-card, .publication-item, .about-card, .testimonial-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Back to top button functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: var(--shadow-medium);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.project-card, .publication-item, .contact-item, .testimonial-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Initialize AOS (Animate On Scroll) alternative
const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        elementObserver.observe(element);
    });
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Add stagger animation to navigation items
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
});

// Enhanced smooth scrolling with better performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Smooth scrolling enhancement
document.documentElement.style.scrollBehavior = 'smooth';

// Fix for iOS Safari smooth scrolling
if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Custom smooth scroll for Safari
    const smoothScroll = (target, duration = 1000) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };
    
    // Override click handlers for Safari
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target);
            }
        });
    });
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);