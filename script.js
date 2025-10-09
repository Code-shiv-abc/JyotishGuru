document.addEventListener('DOMContentLoaded', () => {

    // --- RESPONSIVE NAVIGATION ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('is-active');
            mobileNav.classList.remove('is-active');
        });
    });


    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Animations ---
    // Hero Section Animation
    gsap.to('.hero-background', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            scrub: true,
        },
        y: '30%',
        ease: 'none',
    });

    gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-content .subheading', { duration: 1, y: 50, opacity: 0, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-content .cta-button', { duration: 1, y: 50, opacity: 0, delay: 0.6, ease: 'power3.out' });

    // Staggered fade-in for sections
    document.querySelectorAll('section').forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
        });
    });

    // Animate cards with a stagger effect
    document.querySelectorAll('.card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
        });
    });

    // --- HOROSCOPE FORM ---
    const horoscopeForm = document.getElementById('horoscope-form');
    const horoscopeResult = document.getElementById('horoscope-result');
    const zodiacSignOutput = document.getElementById('zodiac-sign-output');
    const zodiacPredictionOutput = document.getElementById('zodiac-prediction-output');

    const getZodiacSign = (day, month) => {
        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return { sign: "Aquarius", prediction: "You are original, independent, and a humanitarian." };
        if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return { sign: "Pisces", prediction: "You are compassionate, artistic, and intuitive." };
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return { sign: "Aries", prediction: "You are energetic, courageous, and confident." };
        if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return { sign: "Taurus", prediction: "You are reliable, patient, and devoted." };
        if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return { sign: "Gemini", prediction: "You are curious, adaptable, and expressive." };
        if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return { sign: "Cancer", prediction: "You are tenacious, imaginative, and loyal." };
        if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return { sign: "Leo", prediction: "You are creative, passionate, and generous." };
        if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return { sign: "Virgo", prediction: "You are practical, loyal, and analytical." };
        if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return { sign: "Libra", prediction: "You are cooperative, diplomatic, and gracious." };
        if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return { sign: "Scorpio", prediction: "You are resourceful, brave, and passionate." };
        if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return { sign: "Sagittarius", prediction: "You are generous, idealistic, and have a great sense of humor." };
        if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return { sign: "Capricorn", prediction: "You are responsible, disciplined, and self-controlled." };
    };

    horoscopeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = horoscopeForm.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');

        // Simulate a brief delay for UX
        setTimeout(() => {
            const dob = new Date(e.target.dob.value);
            if (!isNaN(dob.getTime())) {
                const day = dob.getDate();
                const month = dob.getMonth() + 1;
                const zodiac = getZodiacSign(day, month);
                zodiacSignOutput.textContent = zodiac.sign;
                zodiacPredictionOutput.textContent = zodiac.prediction;
                horoscopeResult.style.display = 'block';
                gsap.from(horoscopeResult, { duration: 0.5, opacity: 0, y: 20 });
            }
            submitButton.classList.remove('loading');
        }, 500); // 0.5 second delay
    });

    // --- TESTIMONIAL CAROUSEL ---
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
                gsap.from(testimonial, { duration: 0.5, opacity: 0 });
            }
        });
    }

    function startCarousel() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    function stopCarousel() {
        clearInterval(testimonialInterval);
    }

    // Initial setup
    showTestimonial(currentTestimonial);
    startCarousel();

    // Event Listeners for controls
    nextBtn.addEventListener('click', () => {
        stopCarousel();
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        startCarousel();
    });

    prevBtn.addEventListener('click', () => {
        stopCarousel();
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
        startCarousel();
    });

    // --- INTERACTIVE ZODIAC GRID ---
    const zodiacSignCards = document.querySelectorAll('.zodiac-sign-card');
    const zodiacPredictions = {
        "Aries": "You are energetic, courageous, and confident.",
        "Taurus": "You are reliable, patient, and devoted.",
        "Gemini": "You are curious, adaptable, and expressive.",
        "Cancer": "You are tenacious, imaginative, and loyal.",
        "Leo": "You are creative, passionate, and generous.",
        "Virgo": "You are practical, loyal, and analytical.",
        "Libra": "You are cooperative, diplomatic, and gracious.",
        "Scorpio": "You are resourceful, brave, and passionate.",
        "Sagittarius": "You are generous, idealistic, and have a great sense of humor.",
        "Capricorn": "You are responsible, disciplined, and self-controlled.",
        "Aquarius": "You are original, independent, and a humanitarian.",
        "Pisces": "You are compassionate, artistic, and intuitive."
    };

    zodiacSignCards.forEach(card => {
        const performClick = () => {
            const sign = card.textContent.trim();
            const prediction = zodiacPredictions[sign];

            if (prediction) {
                zodiacSignOutput.textContent = sign;
                zodiacPredictionOutput.textContent = prediction;
                horoscopeResult.style.display = 'block';

                zodiacSignCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                gsap.from(horoscopeResult, { duration: 0.5, opacity: 0, y: 20 });
                horoscopeResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        card.addEventListener('click', performClick);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent space from scrolling the page
                performClick();
            }
        });
    });

    // --- "COMING SOON" NOTIFICATION ---
    const blogLinks = document.querySelectorAll('#blog .blog-post a');

    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        gsap.to(notification, {
            top: 40,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(notification, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 2,
                    onComplete: () => {
                        notification.remove();
                    }
                });
            }
        });
    };

    blogLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Coming Soon!');
        });
    });

    // --- AUTH MODAL ---
    const authModal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTabs = document.querySelector('.modal-tabs');

    const openModal = () => authModal.classList.add('active');
    const closeModal = () => authModal.classList.remove('active');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeModalBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    modalTabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-link')) {
            const tab = e.target.dataset.tab;

            // Update tab links
            document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
        }
    });

    // Placeholder form submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Login functionality is not yet implemented.');
        closeModal();
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Signup functionality is not yet implemented.');
        closeModal();
    });

    // Footer Social Icons Animation
    gsap.from('.social-media a', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 95%',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
    });
});