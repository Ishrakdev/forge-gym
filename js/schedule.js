document.addEventListener("DOMContentLoaded", () => {
    // --- STICKY HEADER ---
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    // --- MAIN CATEGORY TABS (Men, Women, Co-ed, PT) ---
    const tabs = document.querySelectorAll('.tab-btn');
    const grids = document.querySelectorAll('.schedule-grid');
    const body = document.body;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            body.className = `schedule-page ${targetId}-theme`;

            grids.forEach(grid => {
                if (grid.id === targetId) {
                    grid.style.display = (targetId === 'personal') ? 'block' : 'block';
                    
                    const itemsToAnimate = targetId === 'personal' ? ".pt-cta-container" : ".day-tabs";
                    gsap.fromTo(grid.querySelectorAll(itemsToAnimate), 
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                    );
                } else {
                    grid.style.display = 'none';
                }
            });
        });
    });

    // --- DAY TABS (Sunday, Monday, etc.) ---
    const dayBtns = document.querySelectorAll('.day-btn');
    
    dayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 1. Find the parent container (e.g., #coed, #men)
            const parentGrid = this.closest('.schedule-grid');
            
            // 2. Remove active class from all day buttons IN THIS GRID
            parentGrid.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 3. Hide all day contents IN THIS GRID
            parentGrid.querySelectorAll('.day-content').forEach(content => {
                content.style.display = 'none';
            });

            // 4. Show the target day content
            const targetDayId = this.getAttribute('data-day');
            const targetContent = parentGrid.querySelector(`#${targetDayId}`);
            
            if (targetContent) {
                targetContent.style.display = 'block';
                
                // 5. Animate the cards inside horizontally
                gsap.fromTo(targetContent.querySelectorAll('.glass-card'),
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", clearProps: "all" }
                );
            }
        });
    });

    // --- REDIRECT TO BOOKING PAGE ---
    const bookBtns = document.querySelectorAll('.book-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const className = this.getAttribute('data-class');
            const classTime = this.getAttribute('data-time');
            
            // Get current theme (fallback to coed)
            const currentTheme = Array.from(body.classList).find(c => c.endsWith('-theme'))?.replace('-theme', '') || 'coed';

            // Go to booking page
            window.location.href = `booking.html?theme=${currentTheme}&class=${encodeURIComponent(className)}&time=${encodeURIComponent(classTime)}`;
        });
    });
});