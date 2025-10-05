// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create mailto link with form data
        const subject = `Contact from ${data.name} - ${data.service || 'General Inquiry'}`;
        const body = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Service Interest: ${data.service || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}

Message:
${data.message}
        `.trim();
        
        const mailtoLink = `mailto:hello@wallinlabs.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('Thank you! Your email client should open with a pre-filled message. Please send it to complete your inquiry.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Show message function
function showMessage(text, type = 'info') {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.textContent = text;
    message.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 6px;
        font-weight: 500;
        ${type === 'success' ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' : ''}
        ${type === 'error' ? 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;' : ''}
        ${type === 'info' ? 'background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd;' : ''}
    `;
    
    // Insert message after form
    contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(212, 255, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#D4FF00';
        navbar.style.backdropFilter = 'none';
    }
});

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only add loading for form submissions
        if (this.type === 'submit') {
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            // Reset after a delay (in case of errors)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});
