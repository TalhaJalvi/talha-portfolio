document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Sidebar Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar .nav-link'); // Already defined, but grouped here for context

    // Toggle the sidebar open/closed on button click
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close the sidebar when a link is clicked (useful on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if we are on a mobile-sized screen (based on your CSS @media query)
            if (window.innerWidth <= 768) { 
                sidebar.classList.remove('open');
            }
        });
    });


    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

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


    // --- Active Link Highlighting on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('.content section');
    // navLinks is already defined above

    const onScroll = () => {
        let currentSectionId = '';
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // The 100px offset accounts for the fixed header
            if (window.scrollY >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll);
    
    // Run once on load to set the initial active link
    onScroll();

});