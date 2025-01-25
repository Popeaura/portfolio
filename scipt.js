// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll (if they exist on the page)
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillBars = skillsSection.querySelectorAll('.skill-level');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars(skillBars);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // Add active class to navigation links based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    // Simple form validation for contact form (if it exists on the page)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                alert('Form submitted successfully!');
                this.reset();
            }
        });
    }
});

// Function to animate skill bars
function animateSkillBars(skillBars) {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Function to validate form
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (!name.value.trim()) {
        alert('Please enter your name');
        isValid = false;
    }

    if (!email.value.trim()) {
        alert('Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        isValid = false;
    }

    if (!message.value.trim()) {
        alert('Please enter a message');
        isValid = false;
    }

    return isValid;
}

// Function to validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

console.log('Portfolio enhancement script loaded successfully!');