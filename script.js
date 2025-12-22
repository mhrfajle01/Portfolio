// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Sticky Header & Active Navigation
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
    // === ANIMATE SKILL BARS FIX ===
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && entry.target.classList.contains('skill-category')){
          entry.target.classList.add('appear');
          entry.target.querySelectorAll('.skill-bar').forEach(bar=>{
            bar.style.width = bar.dataset.level + '%';
          });
        }
      });
    },{threshold:0.2});
    document.querySelectorAll('.skill-category').forEach(el=>observer.observe(el));
// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements
document.querySelectorAll('.skill-category, .project-card, .timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();

// Typewriter Animation
const typewriterText = document.getElementById('typewriter-text');
const text = "Md. Fajle Rabby";
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = text.substring(0, charIndex);
    typewriterText.textContent = currentText;
    
    if (!isDeleting) {
        // Typing effect
        charIndex++;
        
        if (charIndex > text.length) {
            // Pause at end
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
    } else {
        // Deleting effect
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
        }
    }
    
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typingSpeed);
}

// Start the typewriter effect after a short delay
setTimeout(type, 500);

// Contact Form with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("Ji_2D1Ey56ixF8sif"); // Replace with your actual EmailJS user ID
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable the submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        
        // Send email using EmailJS
        emailjs.sendForm('service_noo255e', 'template_3k903mq', this)
            .then(() => {
                // Success message
                formMessage.textContent = 'Message sent successfully! I will contact you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                // Error message
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                console.error('Error sending email:', error);
            })
                        .finally(() => {
                            // Re-enable submit button
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Send Message';
                        });
                });
            });
            
            // Project Modal Logic
            document.addEventListener('DOMContentLoaded', () => {
                const modalOverlay = document.getElementById('projectModal');
                const modalContent = document.getElementById('modalContent');
                const closeModal = document.getElementById('closeModal');
                const projectLinks = document.querySelectorAll('.project-link');
            
                projectLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const projectUrl = this.getAttribute('data-project-url');
                        
                        if (projectUrl) {
                            // Clear previous project
                            modalContent.innerHTML = '';
            
                            // Create iframe
                            const iframe = document.createElement('iframe');
                            iframe.src = projectUrl;
                            iframe.setAttribute('frameborder', '0');
                            
                            modalContent.appendChild(iframe);
                            modalOverlay.style.display = 'flex';
                        }
                    });
                });
            
                const closeProjectModal = () => {
                    modalOverlay.style.display = 'none';
                    // Important to remove the iframe to stop the project from running
                    modalContent.innerHTML = ''; 
                };
            
                closeModal.addEventListener('click', closeProjectModal);
                modalOverlay.addEventListener('click', (e) => {
                    // Close only if the overlay itself is clicked, not the content inside
                    if (e.target === modalOverlay) {
                        closeProjectModal();
                    }
                });
            });
            