// Auto-rotate slider every 4 seconds
let currentSlide = 1;
let slideInterval;

// Function to show specific slide
function showSlide(slideNumber) {
    const slide = document.getElementById('slide' + slideNumber);
    if (slide) {
        slide.checked = true;
        currentSlide = slideNumber;
    }
}

// Function to go to next slide
function nextSlide() {
    currentSlide = currentSlide % 3 + 1;
    showSlide(currentSlide);
}

// Start auto-rotation
function startAutoRotation() {
    slideInterval = setInterval(nextSlide, 4000);
}

// Stop auto-rotation
function stopAutoRotation() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-rotation
    startAutoRotation();
    
    // Update variant cards to work with slider
    document.querySelectorAll('.variant-card').forEach((card, index) => {
        card.onclick = () => {
            showSlide(index + 1);
            // Reset auto-rotation when user manually selects
            stopAutoRotation();
            setTimeout(startAutoRotation, 8000); // Restart after 8 seconds
        };
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoRotation);
        sliderContainer.addEventListener('mouseleave', startAutoRotation);
    }
    
    // Stop auto-rotate when user manually selects a slide
    document.querySelectorAll('input[name="slider"]').forEach(radio => {
        radio.addEventListener('change', () => {
            stopAutoRotation();
            setTimeout(startAutoRotation, 8000);
        });
    });
});

// Function to handle color selection
function selectColor(color) {
    const prices = {
        'white': 65,
        'black': 72,
        'gold': 78
    };
    const colorNames = {
        'white': 'البيضاء',
        'black': 'السوداء',
        'gold': 'الذهبية'
    };

    alert(`تم اختيار النسخة ${colorNames[color]} بسعر ${prices[color]} دينار\nسيتم نقلك لإتمام الطلب`);

    // Scroll to pricing section
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
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