document.addEventListener('DOMContentLoaded', () => {
    // Reset scroll position to 0 on page refresh
    window.scrollTo(0, 0);

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const cursor = document.querySelector('.cursor');
    const viewWorkButton = document.querySelector('.cta-button[href="#plugins"]');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const popupClose = document.querySelector('.popup-close');
    const videos = document.querySelectorAll('.plugin-video video');
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            navUl.classList.remove('show');
        }
    });

    // Close menu when resizing to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navUl.classList.remove('show');
        }
    });

    videos.forEach(video => {
        video.disablePictureInPicture = true;
        video.controlsList = "nodownload noremoteplayback";
    });

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plugin = button.getAttribute('data-plugin');
            showPopup(plugin);
        });
    });

    popupClose.addEventListener('click', () => {
        hidePopup();
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });

    function showPopup(plugin) {
        // Update the content based on the plugin
        const pluginInfo = getPluginInfo(plugin);
        popupContent.querySelector('h3').textContent = pluginInfo.title;
        popupContent.querySelector('p').innerHTML = pluginInfo.description; // Use innerHTML to handle HTML content

        // Show the popup
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    function hidePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }

    function getPluginInfo(plugin) {
        // Add more plugin information as needed
        const plugins = {
            'serial-number': {
                title: 'Serial Number',
                description: `
                    <p>A serial number system for weaponry.</p>
                    <ul>
                        <li>You can erase serial numbers.</li>
                        <li>You can exclude weapons from having a serial number.</li>
                        <li>You can protect weapons from serial number erasing.</li>
                        <li>Combine can check for fingerprints on weapons to match a certain character.</li>
                    </ul>
                `
            },
            'npc-menu': {
                title: 'NPC Drop Config Menu',
                description: `
                <p>A menu to config NPC Drop.</p>
                <ul>
                    <li>You can add various items to the same NPC.</li>
                    <li>You can set a % drop per item.</li>
                    <li>You can modify the drop rate per item.</li>
                    <li>You can remove item per NPC.</li>
                    <li>No more needs to edit code to make NPCs drop items !</li>
                </ul>
                `
            },
            'wiretaps': {
                title: 'Wiretaps',
                description: `
                <p>An advanced wiretaps system.</p>
                <ul>
                    <li>A wiretap receiver</li>
                    <li>A wiretap listener</li>
                    <li>An operation table to make the listener work</li>
                    <li>You can listen to the wiretap frequency while the item is in the world or in your
                        inventory, but you always need to be near the operation table</li>
                    <li>Wiretap receiver got "batteryLife", when it runs out the receiver does not emit anymore
                        and becomes unusable</li>
                    <li>You can generate log paper, all messages the receiver has recorded will be printed on
                        the paper</li>
                    <li>For roleplay purposes, only the description of the people who talk is shown in the
                        wiretap log</li>
                    <li>Various configurations available (You can set the wiretap receiver range, the wiretap
                        battery life, ...)</li>
                </ul>
                `
            },
            'doorclass': {
                title: 'Door Class Group',
                description: `
                <p>A simple door class group.</p>
                <ul>
                    <li>Door group class system</li>
                    <li>Multiple classes for multiple factions can access a door by defining a group to it</li>
                </ul>
                `
            },
            'medal-system': {
                title: 'Medal System',
                description: `
                <ul>
                    <li>Simple medal system that shows up in player tooltip with a management menu for
                        staff/faction/class</li>
                    <li>Easy to add/remove medals with multiple parameters such as the image path, height,
                        width, name, description...</li>
                </ul>
                `
            },
            'cinematic-menu': {
                title: 'Cinematic Menu',
                description: `
                <p>A simple menu to create cinematic.</p>
                <ul>
                    <li>Ported this plugin from NS by TovarischPootis</li>
                    <li>Open up a menu to create a cinematic displayed on all players screens.</li>
                </ul>
                `
            },
            'airdrop': {
                title: 'Airdrop',
                description: `
                <p>A simple airdrop system.</p>
                <ul>
                    <li>You can set airdrops to a certain location, and the players will drop items when they reach the location.</li>
                </ul>
                `
            },
            'slot-machine': {
                title: 'Slot Machine',
                description: `
                <p>A slot machine.</p>
                <ul>
                    <li>Add slot machine to Helix with full customization of the machine directly in-game.</li>
                    <li>This plugin originally came from DarkRP and Clockwork, I found it in one of my old HD
                        and decided to revive it. The model is actually pretty ugly, if someone got modelling
                        skills feel free to update it !</li>
                    <li>Credits for the base addon: [myb] flapjack (STEAM_0:0:37238513)</li>
                </ul>
                `
            },
            'broken-glass': {
                title: 'Broken Glass',
                description: `
                <p>A simple broken glass system for City 8: Definitive Edition.</p>
                <ul>
                    <li>Add a command to remove broken glass on the ground.</li>
                    <li>Add a sound effect when walking on the broken glass.</li>
                    <li>Only available for this map: <strong>City 8: Definitive Edition</strong></li>
                </ul>
                `
            },
            'gathering': {
                title: 'Gathering',
                description: `
                <p>A gathering system where you can gather wood, rock and plenty of things.</p>
                <ul>
                    <li>In-game configuration.</li>
                    <li>Automatic respawn.</li>
                    <li>Easy file configuration.</li>
                </ul>
                `
            }
        };
        return plugins[plugin] || { title: 'Unknown Plugin', description: 'No information available.' };
    }

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