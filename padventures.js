/* ========================================
   PAdventures - Independent JavaScript
   No shared dependencies
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const menuToggle = document.getElementById('paMenuToggle');
    const menu = document.getElementById('paMenu');
    const scrollTopBtn = document.getElementById('paScrollTop');
    const searchInput = document.querySelector('.pa-search-input');
    const dropdownItems = document.querySelectorAll('.pa-menu-item');

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (menu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ========================================
    // Scroll to Top Functionality
    // ========================================
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Search Input Enhancement
    // ========================================
    if (searchInput) {
        // Clear placeholder on focus
        searchInput.addEventListener('focus', function() {
            this.placeholder = '';
        });

        // Restore placeholder on blur
        searchInput.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = 'character search';
            }
        });

        // Handle form submission
        const searchForm = searchInput.closest('.pa-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    // Placeholder - would typically redirect to search
                    console.log('Search for:', searchTerm);
                    alert('Search functionality would search for: ' + searchTerm);
                }
            });
        }
    }

    // ========================================
    // Dropdown Menu Enhancement (Touch Devices)
    // ========================================
    dropdownItems.forEach(function(item) {
        const link = item.querySelector('.pa-menu-link');
        const dropdown = item.querySelector('.pa-dropdown');

        if (link && dropdown) {
            // Add touch support for mobile
            link.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    // Close other dropdowns
                    dropdownItems.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('touch-open');
                        }
                    });
                    // Toggle current dropdown
                    item.classList.toggle('touch-open');
                }
            });
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }

    // ========================================
    // Card Hover Sound Effect (Optional)
    // ========================================
    const toolCards = document.querySelectorAll('.pa-tool-card');
    toolCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            // hover effect placeholder
        });
    });

    // =============================
    // Play Now Button: Shiny Sparks on Hover
    // =============================
    const playNowBtn = document.querySelector('.play-now');
    if (playNowBtn) {
        const particlesContainer = playNowBtn.querySelector('.particles');
        let sparkInterval = null;

        function createSpark() {
            const spark = document.createElement('span');
            const size = Math.random() * 5 + 3;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const angle = Math.random() * 360;
            const distance = 30 + Math.random() * 50;
            const dx = Math.cos(angle * Math.PI / 180) * distance;
            const dy = Math.sin(angle * Math.PI / 180) * distance;
            const duration = 0.4 + Math.random() * 0.5;
            const colors = ['#fff', '#FFD700', '#FFE566', '#fffbe6', '#fff700'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            Object.assign(spark.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                left: startX + '%',
                top: startY + '%',
                background: color,
                borderRadius: '50%',
                pointerEvents: 'none',
                boxShadow: `0 0 ${size + 4}px ${color}, 0 0 ${size + 8}px ${color}`,
                opacity: '1',
                zIndex: '10',
                transition: `transform ${duration}s ease-out, opacity ${duration}s ease-out`
            });

            particlesContainer.appendChild(spark);

            requestAnimationFrame(() => {
                spark.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
                spark.style.opacity = '0';
            });

            setTimeout(() => {
                if (spark.parentNode) spark.parentNode.removeChild(spark);
            }, duration * 1000 + 50);
        }

        playNowBtn.addEventListener('mouseenter', () => {
            // Initial burst
            for (let i = 0; i < 20; i++) {
                setTimeout(createSpark, i * 18);
            }
            // Continuous sparks while hovering
            sparkInterval = setInterval(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(createSpark, i * 20);
                }
            }, 80);
        });

        playNowBtn.addEventListener('mouseleave', () => {
            if (sparkInterval) {
                clearInterval(sparkInterval);
                sparkInterval = null;
            }
        });
    }

    // ========================================
    // Keyboard Navigation Support
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // ========================================
    // Resize Handler
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 1024 && menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                if (menuToggle) {
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }, 250);
    });

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🎮 PAdventures - Fairy Legion', 'font-size: 20px; font-weight: bold; color: #FFD700;');
    console.log('%cWelcome to the PAdventures information page!', 'color: #4ECDC4;');
    console.log('%cUse the navigation to explore game tools and guides.', 'color: #45B7AA;');

})();