document.addEventListener('DOMContentLoaded', () => {

    const contentDisplay = document.querySelector('.content #content-display'); // Target div where content is loaded
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    // const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

// --- Content Loading & Active Link Management (New/Updated) ---

    /**
     * Sets the 'active' class on the correct sidebar link based on the loaded URL.
     * @param {string} currentUrl - The URL of the loaded content file.
     */
    function setActiveLink(currentUrl) {
        navLinks.forEach(link => {
            // Remove 'active' from all links
            link.classList.remove('active');
            
            // Add 'active' to the link that matches the current content URL
            if (link.getAttribute('href') === currentUrl) {
                link.classList.add('active');
            }
        });
    }


// --- Sidebar Toggle Logic (Original, slightly optimized) ---
    
    // Toggle the sidebar open/closed on button click
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

// <!-- Sidebar Link Click Handler (Updated) -->

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop default navigation
            const contentPath = link.getAttribute('href');

            // 1. Load the new content
            loadContent(contentPath); 

            // 2. Close the sidebar (mobile logic)
            if (window.innerWidth <= 768) { 
                sidebar.classList.remove('open');
            }
            
            // NOTE: The active link class is set inside loadContent()
        });
    });
    
// --- Initial Load Logic (New) ---

    const defaultContentPath = navLinks.length > 0 ? navLinks[0].getAttribute('href') : null;
    let initialUrl = defaultContentPath;
    
    // Check if the current URL has a hash (e.g., #installation)
    const currentHash = window.location.hash.substring(1); 
    if (currentHash) {
        // Construct the expected file path
        const expectedUrl = `content/${currentHash}.html`;
        // Check if a link exists for this file
        const hashLink = document.querySelector(`.nav-link[href="${expectedUrl}"]`);
        if (hashLink) {
             initialUrl = expectedUrl;
        }
    }


// --- Theme Switcher (Original) ---

    // Function to set the theme based on preference
    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Load saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Event listener for the theme switcher button
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


// --- REMOVED SCROLLSPY ---
// The original Scrollspy code (onScroll function and event listeners) has been removed 
// because it breaks when content sections are dynamically loaded one-by-one.
// The active link styling is now handled by the loadContent function.

});