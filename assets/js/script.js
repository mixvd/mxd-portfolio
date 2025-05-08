document.addEventListener('DOMContentLoaded', () => {
    // Loading animation
    const loadingScreen = document.querySelector('.loading-screen');
    const progress = document.querySelector('.progress');

    let width = 0;
    const loadingInterval = setInterval(() => {
        width += Math.random() * 10;
        if (width > 100) width = 100;
        progress.style.width = width + '%';

        if (width === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Activate the first section
                document.getElementById('home').classList.add('active');
                // Start observing sections for animation
                observeSections();
            }, 500);
        }
    }, 200);

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a, .hero-cta a, .scroll-indicator');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    updateActiveNavLink(targetId);
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Header shrink effect
        if (scrollPosition > 100) {
            document.querySelector('header').classList.add('scrolled');
        } else {
            document.querySelector('header').classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink('#' + section.id);
            }
        });
    });

    function updateActiveNavLink(targetId) {
        document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for section animations
    function observeSections() {
        const sections = document.querySelectorAll('section:not(.active)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        sunIcon.classList.toggle('active');
        moonIcon.classList.toggle('active');

        // Save theme preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Plugin filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pluginCards = document.querySelectorAll('.plugin-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show/hide plugin cards based on filter
            pluginCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Plugin preview video playback
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(playBtn => {
        const previewContainer = playBtn.parentElement;
        const video = previewContainer.querySelector('video');

        previewContainer.addEventListener('click', () => {
            if (video.paused) {
                // Pause all other videos
                document.querySelectorAll('.plugin-preview video').forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.pause();
                        otherVideo.currentTime = 0;
                    }
                });

                // Play this video
                video.play();
                playBtn.style.opacity = 0;
            } else {
                video.pause();
                playBtn.style.opacity = 1;
            }
        });

        // Reset play button when video ends
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            playBtn.style.opacity = 1;
        });
    });

    // Plugin detail modal
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-header h3');
    const modalBody = document.querySelector('.modal-body');

    // Plugin information database
    const pluginInfo = {
        'laundry': {
            title: 'Laundry System',
            description: `
                <p>A comprehensive money laundering system.</p>
                <ul>
                    <li>Fully functional money laundering mechanics</li>
                    <li>Configurable laundering rates and times</li>
                    <li>Multiple laundering methods with different risk/reward profiles</li>
                    <li>Integration with economy systems</li>
                    <li>Anti-exploitation measures</li>
                </ul>
            `
        },
        'flyer': {
            title: 'Flyer',
            description: `
                <p>A flyer creation and distribution system.</p>
                <ul>
                    <li>Create custom flyers with text and images</li>
                    <li>Distribute flyers to other players</li>
                    <li>Post flyers on walls and surfaces</li>
                    <li>Customizable flyer templates</li>
                    <li>Admin management tools</li>
                </ul>
            `
        },
        'advforcefield': {
            title: 'Advanced Forcefield',
            description: `
                <p>A sophisticated protection system with numerous configuration options.</p>
                <ul>
                    <li>Create customizable protection zones</li>
                    <li>Whitelist specific players or factions</li>
                    <li>Configure damage levels and knockback effects</li>
                    <li>Visual effects and sound customization</li>
                    <li>Energy consumption system with generators</li>
                    <li>Timer-based activation options</li>
                </ul>
            `
        },
        'cooking': {
            title: 'Cooking System',
            description: `
                <p>A cooking system that allows creating recipes with various ingredients.</p>
                <ul>
                    <li>Cooking system with recipes, stoves, and pots</li>
                    <li>Recipe book item for viewing available recipes</li>
                    <li>Stove and pot entities that can be placed and interacted with</li>
                    <li>Ability to add ingredients to pots</li>
                    <li>Cooking process with timer and visual effects (smoke)</li>
                    <li>Burn timer for overcooked food</li>
                </ul>
            `
        },
        'lootbox': {
            title: 'Lootbox',
            description: `
                <p>A customizable lootbox system with probability-based rewards.</p>
                <ul>
                    <li>Lootboxes are auto-generated using tables</li>
                    <li>You can set each item a drop percentage</li>
                    <li>Easily configurable through only one file</li>
                    <li>Simple but clean UI</li>
                </ul>
            `
        },
        'reshade': {
            title: 'ReShade',
            description: `
                <p>An in-game graphics enhancement system with customizable parameters.</p>
                <ul>
                    <li>Only in LUA</li>
                    <li>Intensity, Contrast, Saturation, Bloom, Sharpen, Color Temperature, Tonemap, Ambient Occlusion, Depth of Field, LUT Intensity, LUT Contrast</li>
                    <li>Also include an automatic adaptive lighting</li>
                </ul>
            `
        },
        'tyingoverhaul': {
            title: 'Tying Overhauled',
            description: `
                <p>An enhanced restraint system with advanced features.</p>
                <ul>
                    <li>You can now drag tied player by pressing ALT+R while looking at them</li>
                    <li>You can gag player and their sentence to the chat will be unreadable</li>
                    <li>You can blindfold player to make their screen become full black</li>
                    <li>Including commands for admin to manage gag and blindfold</li>
                </ul>
            `
        },
        'resistancelocker': {
            title: 'Resistance Locker',
            description: `
                <p>A uniform switching system for resistance factions.</p>
                <ul>
                    <li>Add a resistance locker to switch uniform when you are in Citizen faction.</li>
                    <li>Can't drop/unequip while equipped.</li>
                    <li>Configuration in-game</li>
                    <li>Timer between each switch to prevent abuse</li>
                </ul>
            `
        },
        'advmedical': {
            title: 'Advanced Medical System',
            description: `
                <p>A complex medical simulation with injuries and treatments.</p>
                <ul>
                    <li>Handle broken bones</li>
                    <li>Handle bleeding</li>
                    <li>Handle pain</li>
                    <li>Handle burning damage</li>
                    <li>3D2D for checking vitals</li>
                    <li>Personal HUD to view own vitals</li>
                    <li>Multiple items to heal/boost yourself</li>
                    <li>Revive system included</li>
                    <li>Draggable dead corpses</li>
                </ul>
            `
        },
        'wiretaps': {
            title: 'Wiretaps',
            description: `
                <p>An advanced surveillance system with monitoring capabilities.</p>
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
        'serial-number': {
            title: 'Serial Number',
            description: `
                <p>A weapon tracking system with forensic capabilities.</p>
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
                <p>An in-game interface for configuring NPC loot drops.</p>
                <ul>
                    <li>You can add various items to the same NPC.</li>
                    <li>You can set a % drop per item.</li>
                    <li>You can modify the drop rate per item.</li>
                    <li>You can remove item per NPC.</li>
                    <li>No more needs to edit code to make NPCs drop items!</li>
                </ul>
            `
        },
        'gathering': {
            title: 'Gathering',
            description: `
                <p>A resource collection system with respawning nodes.</p>
                <ul>
                    <li>In-game configuration.</li>
                    <li>Automatic respawn.</li>
                    <li>Easy file configuration.</li>
                </ul>
            `
        },
        'medal-system': {
            title: 'Medal System',
            description: `
                <p>An achievement and recognition system with visual badges.</p>
                <ul>
                    <li>Simple medal system that shows up in player tooltip with a management menu for
                        staff/faction/class</li>
                    <li>Easy to add/remove medals with multiple parameters such as the image path, height,
                        width, name, description...</li>
                </ul>
            `
        },
        'doorclass': {
            title: 'Door Class Group',
            description: `
                <p>An advanced door access control system based on class groups.</p>
                <ul>
                    <li>Door group class system</li>
                    <li>Multiple classes for multiple factions can access a door by defining a group to it</li>
                </ul>
            `
        },
        'airdrop': {
            title: 'Airdrop',
            description: `
                <p>A scheduled supply drop system at designated locations.</p>
                <ul>
                    <li>You can set airdrops to a certain location, and the players will drop items when they reach the location.</li>
                    <li>Configurable drop times and locations</li>
                    <li>Sound and visual effects for immersion</li>
                    <li>Customizable loot tables</li>
                </ul>
            `
        },
        'cinematic-menu': {
            title: 'Cinematic Menu',
            description: `
                <p>An interface for creating immersive cinematics in-game.</p>
                <ul>
                    <li>Ported this plugin from NS by TovarischPootis</li>
                    <li>Open up a menu to create a cinematic displayed on all players screens.</li>
                    <li>Customizable text and timing</li>
                    <li>Admin control for server-wide cinematics</li>
                </ul>
            `
        },
        'slot-machine': {
            title: 'Slot Machine',
            description: `
                <p>A fully functional gambling machine with customizable odds.</p>
                <ul>
                    <li>Add slot machine to Helix with full customization of the machine directly in-game.</li>
                    <li>This plugin originally came from DarkRP and Clockwork, I found it in one of my old HD
                        and decided to revive it. The model is actually pretty ugly, if someone got modelling
                        skills feel free to update it!</li>
                    <li>Credits for the base addon: [myb] flapjack (STEAM_0:0:37238513)</li>
                </ul>
            `
        },
        'broken-glass': {
            title: 'Broken Glass',
            description: `
                <p>An environmental enhancement for City 8: Definitive Edition.</p>
                <ul>
                    <li>Add a command to remove broken glass on the ground.</li>
                    <li>Add a sound effect when walking on the broken glass.</li>
                    <li>Only available for this map: <strong>City 8: Definitive Edition</strong></li>
                </ul>
            `
        }
    };

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plugin = button.getAttribute('data-plugin');

            if (pluginInfo[plugin]) {
                modalTitle.textContent = pluginInfo[plugin].title;
                modalBody.innerHTML = pluginInfo[plugin].description;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});