document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animations for non-hero elements will be handled by AOS later.

    // --- INITIALIZE AOS ---
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });

    // Refresh AOS after all content (including images) has loaded to prevent elements being hidden
    window.addEventListener('load', () => {
        AOS.refresh();
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
});