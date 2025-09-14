/* =============================================
   WEALTH SAFARI - INTERACTIVE FUNCTIONALITY
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // =============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // =============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // STICKY HEADER ON SCROLL
    // =============================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove sticky class based on scroll position
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction (optional enhancement)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // =============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // =============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // =============================================
    // ANIMATED COUNTER FOR STATISTICS
    // =============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for counter animation
    const counterElement = document.querySelector('.counter-number');
    if (counterElement) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.5
        });
        
        counterObserver.observe(counterElement);
    }
    
    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            scrollObserver.observe(element);
        });
    }
    
    initScrollAnimations();
    
    // =============================================
    // WHATSAPP CHAT WIDGET INTERACTIONS
    // =============================================
    const whatsappChat = document.getElementById('whatsapp-chat');
    if (whatsappChat) {
        // Show tooltip on page load after a delay
        setTimeout(() => {
            const tooltip = whatsappChat.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateX(0)';
                
                // Hide tooltip after 3 seconds
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateX(10px)';
                }, 3000);
            }
        }, 2000);
    }
    
    // =============================================
    // FORM VALIDATION (for future contact forms)
    // =============================================
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // =============================================
    // UTILITY FUNCTIONS
    // =============================================
    
    // Debounce function for performance optimization
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
    
    // Throttle function for scroll events
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
    
    // Apply throttling to scroll events for better performance
    const throttledScroll = throttle(function() {
        updateActiveNavLink();
    }, 100);
    
    window.addEventListener('scroll', throttledScroll);
    
    // =============================================
    // LOADING ANIMATION (optional)
    // =============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading screens if present
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // =============================================
    // ACCESSIBILITY ENHANCEMENTS
    // =============================================
    
    // Keyboard navigation for dropdown menus
    const dropdownTriggers = document.querySelectorAll('.dropdown > .nav-link');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Focus management for mobile menu
    const firstNavLink = document.querySelector('.nav-menu .nav-link');
    const lastNavLink = document.querySelector('.nav-menu .nav-link:last-child');
    
    if (mobileMenuToggle && firstNavLink && lastNavLink) {
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                if (navMenu.classList.contains('active')) {
                    firstNavLink.focus();
                }
            }
        });
        
        // Trap focus within mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (navMenu.classList.contains('active') && e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstNavLink) {
                        e.preventDefault();
                        lastNavLink.focus();
                    }
                } else {
                    if (document.activeElement === lastNavLink) {
                        e.preventDefault();
                        firstNavLink.focus();
                    }
                }
            }
        });
    }
    
    // =============================================
    // PERFORMANCE OPTIMIZATIONS
    // =============================================
    
    // Lazy loading for images (if needed in future)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // =============================================
    // ERROR HANDLING
    // =============================================
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send error reports to analytics here
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
    
    console.log('Wealth Safari website initialized successfully!');
});

// =============================================
// ADDITIONAL CSS FOR JAVASCRIPT INTERACTIONS
// =============================================

// Add some dynamic styles via JavaScript
const additionalStyles = `
    .header.scrolled {
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        backdrop-filter: blur(10px);
    }
    
    .loaded * {
        transition-duration: 0.3s;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

    // =============================================
    // FAQ ACCORDION FUNCTIONALITY
    // =============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
