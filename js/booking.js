document.addEventListener("DOMContentLoaded", () => {
    // 1. Get URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme') || 'coed';
    const className = urlParams.get('class') || 'Class Session';
    const classTime = urlParams.get('time') || 'Time';

    // 2. Apply Theme & Data to Page
    const body = document.body;
    const classTitle = document.getElementById('class-title');
    const classTimeEl = document.getElementById('class-time');
    const themeLabel = document.getElementById('theme-label');

    // Set Body Theme class
    body.classList.add(`${theme}-theme`);

    // Update Text
    classTitle.innerText = className;
    classTimeEl.innerText = classTime;
    
    // Set Label
    if (theme === 'men') themeLabel.innerText = "MEN'S SESSION";
    if (theme === 'women') themeLabel.innerText = "WOMEN'S SESSION";
    if (theme === 'coed') themeLabel.innerText = "CO-ED SESSION";

    // 3. Animate Page Load
    gsap.from(".booking-container", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    // 4. Handle Form Submission
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('success-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload

        // Hide form, show success message
        gsap.to(form, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            gsap.from(successMsg, { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.5)" });
        }});
    });
});