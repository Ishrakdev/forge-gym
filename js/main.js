// 1. MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = navLinks.classList.contains('active');
        
        if (isOpen) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰'; 
            document.body.style.overflow = '';
        } else {
            navLinks.classList.add('active');
            menuToggle.innerHTML = '✕'; 
            document.body.style.overflow = 'hidden';
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
    });
});

// 2. STICKY HEADER EFFECT
const header = document.getElementById("header");
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// 3. ANIMATIONS (Only run if elements exist on the page)
if (typeof gsap !== "undefined") {
    if (document.querySelector(".hero-title")) {
        const heroTl = gsap.timeline();
        heroTl.to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
              .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }

    if (document.querySelector(".card") && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".card", {
            scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom center", scrub: 1 },
            opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "power2.out"
        });
    }

    if (document.querySelector(".spaces-section") && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".space-card", {
            scrollTrigger: { trigger: ".spaces-section", start: "top 85%" },
            y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
        });
    }

    const cardFan = document.querySelector('.card-fan');
    if (cardFan && window.innerWidth > 768) {
        const cards = document.querySelectorAll('.card');
        cardFan.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            cards.forEach((card, index) => {
                const depth = (index + 1) * 2;
                gsap.to(card, { duration: 0.5, x: `+=${xAxis * depth}`, y: `+=${yAxis * depth}`, ease: "power1.out" });
            });
        });
    }
}