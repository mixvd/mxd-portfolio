document.addEventListener('DOMContentLoaded', () => {
    // Reset scroll position to 0 on page refresh
    window.scrollTo(0, 0);

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const cursor = document.querySelector('.cursor');
    const viewWorkButton = document.querySelector('.cta-button[href="#plugins"]');

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Navigation and section switching
    function switchSection(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                window.scrollTo(0, 0);
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    // View My Work button functionality
    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('plugins');
        });
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateTheme();
    });

    function updateTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        const root = document.documentElement;

        if (isDarkMode) {
            root.style.setProperty('--bg-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--nav-bg-color', '#2c2c2c');
            root.style.setProperty('--nav-text-color', '#ffffff');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#ffffff');
            themeToggle.querySelector('.fa-sun').classList.remove('active');
            themeToggle.querySelector('.fa-moon').classList.add('active');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--nav-bg-color', '#f0f0f0');
            root.style.setProperty('--nav-text-color', '#333333');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#333333');
            themeToggle.querySelector('.fa-sun').classList.add('active');
            themeToggle.querySelector('.fa-moon').classList.remove('active');
        }
    }

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Initialize theme
    updateTheme();
});

// Reset scroll position to 0 on page refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});