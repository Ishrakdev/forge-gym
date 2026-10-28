document.addEventListener("DOMContentLoaded", () => {
    // --- STICKY HEADER ---
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    // --- MULTI-STEP FORM LOGIC ---
    const form = document.getElementById('multi-step-form');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const progress = document.getElementById('progress');
    const successMsg = document.getElementById('success-message');
    
    let currentStep = 0;

    // Function to show the current step with animation
    const updateStep = () => {
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.style.display = 'block';
                // GSAP slide and fade in
                gsap.fromTo(step, 
                    { opacity: 0, x: 20 }, 
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                );
            } else {
                step.style.display = 'none';
            }
        });
        // Update progress bar
        progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    };

    // NEXT BUTTONS
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Check validation for current step
            const currentInputs = steps[currentStep].querySelectorAll('input[required]');
            let valid = true;
            
            currentInputs.forEach(input => {
                if (input.type === 'radio') {
                    const radioGroup = steps[currentStep].querySelectorAll(`input[name="${input.name}"]`);
                    const isChecked = Array.from(radioGroup).some(r => r.checked);
                    if (!isChecked) valid = false;
                } else if (!input.value) {
                    valid = false;
                }
            });

            if (valid && currentStep < steps.length - 1) {
                currentStep++;
                updateStep();
            } else if (!valid) {
                alert("Please make a selection to continue.");
            }
        });
    });

    // BACK BUTTONS
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStep();
            }
        });
    });

    // SUBMIT FORM
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        // Hide form and progress bar
        form.style.display = 'none';
        document.querySelector('.progress-bar').style.display = 'none';
        
        // Show success message with a pop animation
        successMsg.style.display = 'block';
        gsap.fromTo(successMsg, 
            { opacity: 0, scale: 0.9 }, 
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    });
});