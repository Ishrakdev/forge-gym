gsap.registerPlugin(ScrollTrigger);

// --- MOBILE MENU TOGGLE ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// 1. Sticky Header Fade/Blur Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 2. Hero Text Fade In
const heroTl = gsap.timeline();
heroTl.to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

// 3. Scroll-Driven Card Fan Effect (Desktop Only)
if (window.innerWidth > 768) {
    gsap.to(".card", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top", 
            end: "bottom center", 
            scrub: 1, 
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        ease: "power2.out"
    });
} else {
    // If mobile, just make cards visible immediately
    gsap.set(".card", { opacity: 1, y: 0 });
}

// 4. Gym Spaces Fade In on Scroll
gsap.from(".space-card", {
    scrollTrigger: {
        trigger: ".spaces-section",
        start: "top 85%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

// 5. Parallax mouse move on the fan (Desktop Only)
const cardFan = document.querySelector('.card-fan');
const cards = document.querySelectorAll('.card');

if (cardFan && window.innerWidth > 768) {
    cardFan.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;

        cards.forEach((card, index) => {
            const depth = (index + 1) * 2;
            gsap.to(card, {
                duration: 0.5,
                x: `+=${xAxis * depth}`, 
                y: `+=${yAxis * depth}`,
                ease: "power1.out"
            });
        });
    });
}