// T&H WebWorks - Main JavaScript File

// EmailJS configuration (replace placeholders with your EmailJS values)
const EMAILJS_CONFIG = {
    serviceId: 'service_y03xglr',
    templateId: 'template_w0vffia',
    publicKey: 'YxvfLTO9e1UsK4YwH'
};

function initEmailJS() {
    if (!window.emailjs) {
        console.warn('EmailJS SDK failed to load.');
        return;
    }

    if (
        !EMAILJS_CONFIG.serviceId ||
        !EMAILJS_CONFIG.templateId ||
        !EMAILJS_CONFIG.publicKey ||
        EMAILJS_CONFIG.serviceId.startsWith('YOUR_') ||
        EMAILJS_CONFIG.templateId.startsWith('YOUR_') ||
        EMAILJS_CONFIG.publicKey.startsWith('YOUR_')
    ) {
        console.warn('EmailJS configuration is incomplete. Update EMAILJS_CONFIG with your credentials.');
        return;
    }

    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
    });
}

// DOM Content Loaded with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();

    // Initialize critical components immediately
    initNavigation();
    initSmoothScrolling();
    
    // Defer non-critical components
    requestAnimationFrame(() => {
        initScrollAnimations();
        initContactForm();
    });
    
    // Initialize performance-heavy components on idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initParallaxEffects();
            initTypingAnimation();
            initImageOptimization();
        });
    } else {
        setTimeout(() => {
            initParallaxEffects();
            initTypingAnimation();
            initImageOptimization();
        }, 100);
    }
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) {
        console.warn('Navigation bar element not found. Skipping navigation initialization.');
        return;
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Active navigation link highlighting (moved to optimized scroll handler)
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content > *, .contact-content > *');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Stagger animation for service cards and portfolio items
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    portfolioItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
}

// Typing animation for the logo cursor
function initTypingAnimation() {
    const cursor = document.querySelector('.logo-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 1000);
    }
}

// Parallax effects for tech elements
function initParallaxEffects() {
    const techElements = document.querySelectorAll('.tech-element');
    
    // Subtle mouse movement parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            techElements.forEach((element, index) => {
                const moveX = (x - 0.5) * (10 + index * 2);
                const moveY = (y - 0.5) * (10 + index * 2);
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        // Reset position when mouse leaves
        hero.addEventListener('mouseleave', () => {
            techElements.forEach((element) => {
                element.style.transform = '';
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Set form loaded time for bot detection
        const formLoadedTime = document.getElementById('formLoadedTime');
        if (formLoadedTime) {
            formLoadedTime.value = Date.now().toString();
        }
        
        form.addEventListener('submit', handleFormSubmit);
        
        // Form validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidationError);
        });
        
        // Additional bot protection - monitor suspicious behavior
        initBotDetection(form);
    }
}

// Enhanced bot detection
function initBotDetection(form) {
    let suspiciousActivity = 0;
    
    // Monitor for extremely fast form filling (likely bot)
    let fieldFillTimes = {};
    
    form.querySelectorAll('input[type="text"], input[type="email"], textarea, select').forEach(field => {
        if (field.name === '_gotcha' || field.name === 'website' || field.name === 'email_confirm' || 
            field.name === 'phone' || field.name === 'url' || field.name === 'security_check') {
            return; // Skip honeypot fields
        }
        
        field.addEventListener('focus', () => {
            fieldFillTimes[field.name] = Date.now();
        });
        
        field.addEventListener('blur', () => {
            if (fieldFillTimes[field.name]) {
                const fillTime = Date.now() - fieldFillTimes[field.name];
                // If field was filled in less than 100ms, it's suspicious
                if (fillTime < 100 && field.value.length > 0) {
                    suspiciousActivity++;
                }
            }
        });
    });
    
    // Store suspicious activity score for form submission check
    form.setAttribute('data-suspicious-score', suspiciousActivity);
}

// Handle form submission with Formspree
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    // Enhanced Bot Protection Checks
    if (!passesSecurityChecks(form, formData)) {
        console.log('Form submission blocked - failed security checks');
        // Silently fail for bots (don't show error message)
        return;
    }
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitButton.disabled = true;
    
    // Ensure EmailJS is configured
    if (
        !window.emailjs ||
        !EMAILJS_CONFIG.serviceId ||
        !EMAILJS_CONFIG.templateId ||
        !EMAILJS_CONFIG.publicKey ||
        EMAILJS_CONFIG.serviceId.startsWith('YOUR_') ||
        EMAILJS_CONFIG.templateId.startsWith('YOUR_') ||
        EMAILJS_CONFIG.publicKey.startsWith('YOUR_')
    ) {
        console.error('EmailJS is not configured. Update EMAILJS_CONFIG in script.js.');
        showNotification('Email service is not configured. Please try again later.', 'error');
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;
        return;
    }

    const templateParams = {
        from_name: formData.get('name'),
        reply_to: formData.get('email'),
        project_type: formData.get('project'),
        message: formData.get('message'),
        page_url: window.location.href,
        submitted_at: new Date().toISOString()
    };

    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => {
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            const formLoadedTimeInput = form.querySelector('#formLoadedTime');
            if (formLoadedTimeInput) {
                formLoadedTimeInput.value = Date.now().toString();
            }

            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: 'Contact Form'
                });
            }
        })
        .catch(error => {
            console.error('EmailJS submission error:', error);
            showNotification('Oops! There was a problem submitting your form. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitButton.disabled = false;
        });
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error styling
    clearValidationError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Clear validation error styling
function clearValidationError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Get user-friendly field label
function getFieldLabel(fieldName) {
    const labels = {
        name: 'Name',
        email: 'Email',
        project: 'Project Type',
        message: 'Message'
    };
    
    return labels[fieldName] || fieldName;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

// Remove notification
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Comprehensive security checks for bot protection
function passesSecurityChecks(form, formData) {
    // Check 1: Honeypot fields - if any are filled, it's a bot
    const honeypotFields = ['_gotcha', 'website', 'email_confirm', 'phone', 'url', 'security_check'];
    
    for (const fieldName of honeypotFields) {
        const value = formData.get(fieldName);
        if (value && value.trim() !== '') {
            console.log(`Bot detected: Honeypot field "${fieldName}" was filled`);
            return false;
        }
    }
    
    // Check 2: Time-based protection - form must be displayed for at least 3 seconds
    const formLoadedTime = formData.get('form_loaded_time');
    if (formLoadedTime) {
        const timeSpent = Date.now() - parseInt(formLoadedTime);
        if (timeSpent < 3000) { // Less than 3 seconds
            console.log(`Bot detected: Form submitted too quickly (${timeSpent}ms)`);
            return false;
        }
    }
    
    // Check 3: JavaScript execution check - bots often don't execute JS properly
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.log('Bot detected: No JavaScript environment');
        return false;
    }
    
    // Check 4: Suspicious activity score
    const suspiciousScore = parseInt(form.getAttribute('data-suspicious-score') || '0');
    if (suspiciousScore > 2) {
        console.log(`Bot detected: High suspicious activity score (${suspiciousScore})`);
        return false;
    }
    
    // Check 5: Required fields validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        console.log('Bot detected: Missing required fields');
        return false;
    }
    
    // Check 6: Basic spam content detection
    const spamKeywords = [
        'viagra', 'cialis', 'pharmacy', 'casino', 'poker', 'loan', 'mortgage',
        'bitcoin', 'cryptocurrency', 'investment', 'make money', 'work from home',
        'click here', 'act now', 'limited time', 'congratulations', 'winner'
    ];
    
    const messageText = message.toLowerCase();
    const spamCount = spamKeywords.filter(keyword => messageText.includes(keyword)).length;
    
    if (spamCount > 2) {
        console.log(`Spam detected: Contains ${spamCount} spam keywords`);
        return false;
    }
    
    // Check 7: Message quality - very short messages are often spam
    if (message.trim().length < 10) {
        console.log('Spam detected: Message too short');
        return false;
    }
    
    // Check 8: Email validation beyond HTML5
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
        console.log('Invalid email format detected');
        return false;
    }
    
    // All checks passed
    return true;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimized scroll handler with passive listeners
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-dependent functionality here
    updateActiveNavLink();
}, 16); // ~60fps

// Use passive listeners for better scroll performance
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Optimize touch events for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
}

// Critical Resource Hints
function initCriticalResourceHints() {
    // Preconnect to external domains
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialize critical hints immediately
initCriticalResourceHints();

// Enhanced preload critical resources
function preloadResources() {
    const criticalImages = [
        'assets/TH_Assets/logo_nav_trans.webp',
        'assets/TH_Assets/Team/devin.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Preload next viewport images on idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Trigger loading
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px' // Start loading 50px before entering viewport
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        });
    }
}

// Initialize preloading with performance timing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadResources);
} else {
    preloadResources();
}

// Image optimization and lazy loading enhancement
function initImageOptimization() {
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // If image is already cached, show immediately
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '10px'
    });
    
    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Progressive image loading for portfolio items
    const portfolioImages = document.querySelectorAll('.portfolio-img');
    portfolioImages.forEach(img => {
        // Create low-quality placeholder
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 10;
        canvas.height = 10;
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 10, 10);
        
        // Set placeholder while loading
        if (!img.complete) {
            const placeholder = canvas.toDataURL();
            img.style.backgroundImage = `url(${placeholder})`;
            img.style.backgroundSize = 'cover';
        }
    });
}

// Resource hints for better performance
function addResourceHints() {
    const head = document.head;
    
    // Prefetch next likely pages
    const prefetchLinks = [
        'privacy.html',
        'terms.html'
    ];
    
    prefetchLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        head.appendChild(link);
    });
}

// Initialize resource hints on idle
if ('requestIdleCallback' in window) {
    requestIdleCallback(addResourceHints);
} else {
    setTimeout(addResourceHints, 2000);
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Performance monitoring and optimization
function initPerformanceMonitoring() {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                }
            }
        });
        observer.observe({entryTypes: ['longtask']});
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
                console.warn('High memory usage detected');
            }
        }, 30000); // Check every 30 seconds
    }
}

// Initialize performance monitoring on idle
if ('requestIdleCallback' in window) {
    requestIdleCallback(initPerformanceMonitoring);
}

// Optimize animations for better performance
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.documentElement.style.setProperty('--transition-normal', '150ms ease');
        document.documentElement.style.setProperty('--transition-slow', '300ms ease');
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }
}

// Initialize animation optimizations
optimizeAnimations();

// Export functions for testing or external use
window.THWebWorks = {
    initNavigation,
    initScrollAnimations,
    initContactForm,
    initImageOptimization,
    showNotification,
    validateEmail: isValidEmail,
    performance: {
        preloadResources,
        optimizeAnimations,
        initPerformanceMonitoring
    }
};
