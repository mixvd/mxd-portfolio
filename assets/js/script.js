document.addEventListener('DOMContentLoaded', () => {
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
        const pluginInfo = getPluginInfo(plugin);
        popupContent.querySelector('h3').textContent = pluginInfo.title;
        popupContent.querySelector('p').innerHTML = pluginInfo.description;

        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function getPluginInfo(plugin) {
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
                <p>A simple medal system.</p>
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
            },
            'advmedical': {
                title: 'Advanced Medical System',
                description: `
                <p>An advanced medical system that handle multiple injury.</p>
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
            'resistancelocker': {
                title: 'Resistance Locker',
                description: `
                <p>Add a resistance locker to switch uniform when you are in Citizen faction.</p>
                <ul>
                    <li>Can't drop/unequip while equipped.</li>
                    <li>Configuration in-game</li>
                    <li>Timer between each switch to prevent abuse</li>
                </ul>
                `
            },
            'tyingoverhaul': {
                title: 'Tying Overhaul',
                description: `
                <p>An overhaul of the tying system.</p>
                <ul>
                    <li>You can now drag tied player by pressing ALT+R while looking at them</li>
                    <li>You can gag player and their sentence to the chat will be unreadable</li>
                    <li>You can blindfold player to make their screen become full black</li>
                    <li>Including commands for admin to manage gag and blindfold</li>
                </ul>
                `
            },
            'reshade': {
                title: 'ReShade',
                description: `
                <p>Add a fully customizable shader in-game.</p>
                <ul>
                    <li>Only in LUA</li>
                    <li>Intensity, Contrast, Saturation, Bloom, Sharpen, Color Temperature, Tonemap, Ambient Occlusion, Depth of Field, LUT Intensity, LUT Contrast</li>
                    <li>Also include an automatic adaptive lighting</li>
                </ul>
                `
            },
            'lootbox': {
                title: 'Lootbox',
                description: `
                <p>Add a simple lootbox system.</p>
                <ul>
                    <li>Lootboxes are auto-generated using tables</li>
                    <li>You can set each item a drop percentage</li>
                    <li>Easily configurable through only one file</li>
                    <li>Simple but clean UI</li>
                </ul>
                `
            },
            'cooking': {
                title: 'Cooking System',
                description: `
                <p>Add a simple cooking system.</p>
                <ul>
                    <li>Cooking system with recipes, stoves, and pots</li>
                    <li>Recipe book item for viewing available recipes</li>
                    <li>Stove and pot entities that can be placed and interacted with</li>
                    <li>Ability to add ingredients to pots</li>
                    <li>Cooking process with timer and visual effects (smoke)</li>
                    <li>Burn timer for overcooked food</li>
                    <li>Inventory integration for adding/removing ingredients and cooked food</li>
                    <li>Configuration options (e.g., burn time)</li>
                    <li>Prevention of physgun/toolgun abuse on cooking entities</li>
                    <li>Extra ingredient return system when cooking</li>
                </ul>
                `
            },
            'advforcefield': {
                title: 'Advanced Forcefield',
                description: `
                <p>An advanced forcefield system recognition using Half-Life 2 camera.</p>
                <ul>
                    <li>You need to have a valid CID to go through forcefield.</li>
                    <li>Forcefield is locked by default and will deal you damages if do not verify your identity.</li>
                    <li>You can interact with the camera to verify your identity.</li>
                    <li>Custom derma to show the player the mechanic.</li>
                </ul>
                `
            },
            'flyer': {
                title: 'Flyer',
                description: `
                <p>A simple flyer system where you can set materials from Garry's Mod materials folder.</p>
                <ul>
                    <li>You can set material with a path.</li>
                    <li>Flyer are persistent.</li>
                    <li>You can clean flyer with an item.</li>
                    <li>Fully in-game configurable.</li>
                </ul>
                `
            },
            'laundry': {
                title: 'Laundry System',
                description: `
                <p>A simple laundry system where clothing now have durability and wet parameters.</p>
                <ul>
                    <li>Clothing items now have durability and wet parameters.</li>
                    <li>You can wash your clothes to restore the durability, if it goes to 0 the clothes are not wearable anymore.</li>
                    <li>You can dry you clothes, if you do not dry them, the durability will decrease more faster.</li>
                    <li>Fully in-game configurable, wash time, dry time, restore durability percent, and more.</li>
                    <li>Including a clean UI/UX for easy understanding on how the system work for players.</li>
                    <li>You can set ITEM.noDurability = true if you want certain clothes to have no durability.</li>
                    <li>You can set ITEM.durability = 100 if you want certain amount of durability on your clothes.</li>
                </ul>
                `
            },
        };
        return plugins[plugin] || { title: 'Unknown Plugin', description: 'No information available.' };
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

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

    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('plugins');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
    updateTheme();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateTheme();
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
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

    updateTheme();
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});