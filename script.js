document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- HERO SECTION ANIMATION ---
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

    // Animate the sky gradient from dawn to sunrise to day
    heroTimeline.to('.sky-gradient', {
        background: 'linear-gradient(180deg, #2a2a4e 0%, #5a4a78 50%, #f7b733 100%)', // Dawn to early sunrise
        ease: 'power1.in'
    }).to('.sky-gradient', {
        background: 'linear-gradient(180deg, #f7b733 0%, #fc4a1a 50%, #87CEEB 100%)', // Sunrise to day
        ease: 'power1.in'
    });

    // Animate hero content on load
    gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' });
    gsap.from('.hero-content .subheading', { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: 'power2.out' });
    gsap.from('.hero-content .cta-button', { duration: 1, y: 50, opacity: 0, delay: 1, ease: 'power2.out' });


    // --- SCROLL-TRIGGERED SECTION ANIMATIONS ---
    const sections = gsap.utils.toArray('section:not(#hero)');

    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // --- HOROSCOPE FORM ---
    const horoscopeForm = document.getElementById('horoscope-form');
    const horoscopeResult = document.getElementById('horoscope-result');

    horoscopeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you would process the form data here.
        // For this version, we just show a static result.
        horoscopeResult.style.display = 'block';
        gsap.from(horoscopeResult, { duration: 0.5, opacity: 0, y: 20 });
    });


    // --- TESTIMONIAL CAROUSEL ---
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
                gsap.from(testimonial, { duration: 0.5, opacity: 0 });
            }
        });
    }

    // Initially show the first testimonial
    showTestimonial(currentTestimonial);

    // Change testimonial every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

});
