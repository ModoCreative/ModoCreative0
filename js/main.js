// MoDo Creative - Main JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1500);
    }

    // Navbar
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
        }

        // Active nav link
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPos > section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current || link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Scroll reveals
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (filterBtns && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                const filter = btn.dataset.filter;
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category.includes(filter)) {
                        item.classList.remove('hidden');
                        setTimeout(() => item.style.opacity = '1', 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.classList.add('hidden'), 300);
                    }
                });
            });
        });
    }

    // Portfolio Modal
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.querySelector('.close');
    const modalBtns = document.querySelectorAll('.modal-btn');

    if (modal && modalBtns.length) {
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = btn.closest('.portfolio-item');
                const imgSrc = item.querySelector('img').src;
                const title = item.querySelector('h3') ? item.querySelector('h3').textContent : 'Project';
                const desc = item.querySelector('p') ? item.querySelector('p').textContent : 'Amazing project showcase';

                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <img src="${imgSrc}" alt="${title}">
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <div class="modal-gallery">
                        <!-- More images/video placeholders -->
                        <img src="${imgSrc}" alt="Gallery 1" style="width:48%; margin-right:2%;">
                        
                    </div>
                    <a href="https://wa.me/201559233383?text=Hi!%20I%20love%20your%20${title}%20project.%20Can%20we%20discuss%20similar%20work?%20" target="_blank" class="btn-primary" style="margin-top:2rem;">Discuss Project <i class="fab fa-whatsapp"></i></a>
                `;
                modal.style.display = 'flex';
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => modal.style.display = 'none');
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // WhatsApp CTAs
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let text = btn.dataset.text || 'Hello, Iam interested in the  package from MoDo Creative. Can you share more details and how we can get started?';
            let phone = btn.dataset.phone || '';
            let packageName = btn.dataset.package;
            if (packageName) {
                text = `Hello, I'm interested in the ${packageName} package from MoDo Creative. Can you share more details and how we can get started?`;
            }
            const url = `https://wa.me/201559233383${phone}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if (name && email && phone && message) {
                const text = `New Contact Form:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
                const url = `https://wa.me/201559233383?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
                contactForm.reset();
                alert('Thank you! We\'ll contact you via WhatsApp shortly.');
            } else {
                alert('Please fill all fields.');
            }
        });
    }

    // Button micro-interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .service-card, .package-card');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-5px)');
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
    });

    // Navbar links outside nav (footer etc.)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
