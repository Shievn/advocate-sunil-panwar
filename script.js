/* ==========================================================================
   ADV. SUNIL PANWAR - INTERACTIVE JAVASCRIPT
   Handles: Slideshow, Mobile Menu, Search Filter, Smooth Scroll, Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. HERO IMAGE SLIDESHOW (3-Second Interval) --- */
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;
    const slideDuration = 3000; // 3000 milliseconds = 3 seconds

    function showNextSlide() {
        // Remove the active class from the current image
        slides[currentSlideIndex].classList.remove('active-slide');
        
        // Calculate the next index. If it reaches the end, loop back to 0.
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        
        // Add the active class to the new image to trigger the CSS transition
        slides[currentSlideIndex].classList.add('active-slide');
    }

    // Start the slideshow only if slides exist
    if (slides.length > 0) {
        setInterval(showNextSlide, slideDuration);
    }


    /* --- 2. MOBILE HAMBURGER MENU TOGGLE --- */
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggles the 'active' class which slides the menu in/out via CSS
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger lines into an 'X'
            hamburger.classList.toggle('toggle'); 
        });
    }


    /* --- 3. CUSTOM SMOOTH SCROLLING (Fixes iframe errors) --- */
    // Instead of using href="#id" which causes "refused to connect" in some editors,
    // we use data-target="id" and JavaScript's scrollIntoView API.
    const scrollLinks = document.querySelectorAll('a[data-target]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop default link jumping behavior
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smoothly scroll to the section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // If the mobile menu is open, close it automatically after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });


    /* --- 4. LIVE SEARCH FILTER FOR INDIAN LAWS --- */
    const searchInput = document.getElementById('law-search-input');
    const lawCards = document.querySelectorAll('.law-card');
    const noResultsBox = document.getElementById('no-search-results');

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            // Get the user's search query and convert to lowercase
            const filterTerm = this.value.toLowerCase();
            let hasVisibleCards = false;

            // Loop through all law cards
            lawCards.forEach(card => {
                // Extract the text content from the card
                const cardText = card.innerText.toLowerCase();

                // If the text contains the search term, show it. Otherwise, hide it.
                if (cardText.includes(filterTerm)) {
                    card.style.display = 'flex';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show or hide the "No Results" message based on matches
            if (hasVisibleCards) {
                noResultsBox.style.display = 'none';
            } else {
                noResultsBox.style.display = 'block';
            }
        });
    }


    /* --- 5. SCROLL ANIMATIONS (Intersection Observer) --- */
    // This makes elements slide up and fade in as the user scrolls down to them
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is currently visible in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Once it has animated, stop observing it so it doesn't repeat
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the animation when the element is 15% visible
        threshold: 0.15 
    });

    // Attach the observer to all elements with the .animate-on-scroll class
    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
