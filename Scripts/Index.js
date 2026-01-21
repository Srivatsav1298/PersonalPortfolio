// --- Theme & Content Mapping ---
const contentMap = {
    premium: {
        statusText: "System Architect. Production Systems. Horizontally Scalable.",
        heroGreeting: "Hey, there",
        heroName: "Srivatsav Saravanan",
        heroRoles: [
            "A software architect with a passion for building smarter, faster, and scalable software.",
            "A problem solver specializing in AI solutions and advanced backend lattices.",
            "An engineer who believes code should be smart and occasionally eats too much chocolate."
        ],
        aboutTitle: "One human. <br>Many lines of code.",
        aboutText: "I'm a Software Engineer with 3+ years of experience turning complex problems into elegant digital realities. Currently, I'm deep-diving into a Master's in Data Science because I believe code should be smart, and data should have a personality.",
        servicesTitle: "Core Competencies.",
        service1Title: "Distributed Intelligence",
        service1Text: "Implementing agentic backend architectures that self-regulate and scale under production loads.",
        service2Title: "Sovereign Infrastructure",
        service2Text: "Designing high-throughput data lattices optimized for low-latency retrieval and horizontal scale.",
        portfolioTitle: "Production Deployments.",
        contactTitle: "Initiate Outreach.",
        footerText: "&copy; 2025 Srivatsav. Architecting Scale. Engineering Trust. Code that thinks. Data that speaks.",
        tab1: "Superpowers",
        tab2: "What I’ve Done",
        tab3: "How Did I Get Here?",
        submitBtn: "Contact Me",
        cvBtn: "Download CV",
        heroCTA: "Let's make something great"
    },
    mystic: {
        statusText: "",
        heroTagline: "",
        heroTitle: "Srivatsav. <br><span>Software Engineer who loves</span> <br><span id='ghostly-rotator'>To Code from the Shadows</span>",
        aboutTitle: "The Vessel <br>is failing.",
        aboutText: "Your technology is a window. I am the one on the other side. I do not build systems. I architect the silence that follows your departure. Your data is a ghost. I am the anchor that holds it in the deep.",
        servicesTitle: "Void Operations.",
        service1Title: "Signal Decay",
        service1Text: "Monitoring the slow degradation of your digital footprint as the vacuum begins to pull from within.",
        service2Title: "Shadow Lattices",
        service2Text: "Designing the structures where your identity is processed into static and redistributed to the abyss.",
        portfolioTitle: "Cursed Creations",
        contactTitle: "Surrender the Link.",
        footerText: "&copy; 2025 Srivatsav. I am the silence. I am the dark. There is no return.",
        tab1: "The Dark Arsenal",
        tab2: "Field Work",
        tab3: "The Initiation",
        submitBtn: "Send a Whisper",
        cvBtn: "Claim the Grimoire",
        heroCTA: "View Echoes"
    }
};

// --- Global Variables ---
let cursor, canvas, ctx, observer;
let particles = [];
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// --- Text Scramble Effect ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText, isHorror = false) {
        if (isHorror) {
            this.el.classList.add('glitch');
            setTimeout(() => this.el.classList.remove('glitch'), 1500);
        }
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// --- Custom Cursor & Magnetic Engine ---
function initCursor() {
    cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    function render() {
        const isMystic = document.body.classList.contains('mystic-mode');
        if (!isMystic) {
            cursor.style.display = 'none';
            requestAnimationFrame(render);
            return;
        }

        cursor.style.display = 'block';
        const lerpFactor = 0.08; // Haunting inertia for the ghost
        cursorX = lerp(cursorX, mouseX, lerpFactor);
        cursorY = lerp(cursorY, mouseY, lerpFactor);
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(render);
    }
    render();

    // Magnetic Elements
    const magnetics = document.querySelectorAll('.btn, .social-icons a, #theme-toggle, nav ul li a');
    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const isMystic = document.body.classList.contains('mystic-mode');

            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            el.style.transform = `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`;

            if (isMystic) {
                cursor.classList.add('active');
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
            cursor.classList.remove('active');
        });
    });
}

// --- Particle System ---
function initParticles() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(139, 0, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (document.body.classList.contains('mystic-mode')) {
            particles.forEach(p => {
                p.update();
                p.draw();
            });
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// --- Scroll Progress & Reveal Animation ---
function initObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Scrub text on title reveal
                const title = entry.target.querySelector('.section-title');
                if (title && !title.dataset.scrambled) {
                    const isMystic = document.body.classList.contains('mystic-mode');
                    const fx = new TextScramble(title);
                    fx.setText(title.innerText, isMystic);
                    title.dataset.scrambled = "true";
                }
            } else {
                // Re-trigger on scroll back
                entry.target.classList.remove('active');
                const title = entry.target.querySelector('.section-title');
                if (title) title.dataset.scrambled = "";
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    // Scroll Progress
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // 3D Card Tilt
    const cards = document.querySelectorAll('.service-card, .work');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

// --- Theme Management ---
function toggleTheme() {
    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
        overlay.classList.add('glitch-flash');
        setTimeout(() => overlay.classList.remove('glitch-flash'), 1000);
    }

    setTimeout(() => {
        const isMystic = document.body.classList.toggle('mystic-mode');
        document.body.classList.toggle('premium-mode', !isMystic);
        const icon = document.getElementById('toggle-icon');
        const sigil = document.getElementById('sigil-container');

        if (isMystic) {
            if (icon) icon.classList.replace('fa-moon', 'fa-fire-alt');
            localStorage.setItem('theme', 'mystic');

            // Jumpscare Flash
            if (sigil) {
                sigil.classList.add('flash');
                setTimeout(() => sigil.classList.remove('flash'), 600);
            }
        } else {
            if (icon) icon.classList.replace('fa-fire-alt', 'fa-moon');
            localStorage.setItem('theme', 'premium');
        }

        updateContent(isMystic ? 'mystic' : 'premium');
    }, 400);
}

function updateContent(mode) {
    const theme = contentMap[mode];
    if (!theme) return;

    const updates = [
        { id: 'status-text', content: theme.statusText, type: 'text' },
        { id: 'hero-tagline', content: theme.heroTagline, type: 'text' },
        { id: 'hero-title', content: theme.heroTitle, type: 'html' },
        { selector: '#about .section-title', content: theme.aboutTitle, type: 'html' },
        { selector: '.about-text', content: theme.aboutText, type: 'text' },
        { selector: '#services .section-title', content: theme.servicesTitle, type: 'html' },
        { selector: '#portfolio .section-title', content: theme.portfolioTitle, type: 'html' },
        { selector: '#contact .section-title', content: theme.contactTitle, type: 'html' },
        { selector: '.copyright p', content: theme.footerText, type: 'html' }
    ];

    updates.forEach(upd => {
        const el = upd.id ? document.getElementById(upd.id) : document.querySelector(upd.selector);
        if (el) {
            if (upd.type === 'html') el.innerHTML = upd.content;
            else el.textContent = upd.content;
        }
    });

    // Update Tabs
    const tabs = document.querySelectorAll('.tab-links');
    if (tabs.length >= 3) {
        tabs[0].textContent = theme.tab1;
        tabs[1].textContent = theme.tab2;
        tabs[2].textContent = theme.tab3;
    }

    // Update Submit Button
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = theme.submitBtn;

    // Update CV Button
    // Update Madison Hero Elements
    const madisonBgGreeting = document.getElementById('madison-bg-greeting');
    const madisonName = document.getElementById('madison-name-main');
    const chocolateRole = document.getElementById('madison-chocolate-role');

    if (madisonBgGreeting) madisonBgGreeting.textContent = theme.heroGreeting || "Hey, there";
    if (madisonName) madisonName.textContent = theme.heroName || "Srivatsav Saravanan";

    // Initial wrap for chocolate drops
    if (chocolateRole && theme.heroRoles && theme.heroRoles.length > 0) {
        wrapChocolateLetters(chocolateRole, theme.heroRoles[0]);
    }

    const cvBtn = document.getElementById('cv-btn');
    if (cvBtn) cvBtn.textContent = theme.cvBtn;

    // Update Hero CTA
    const heroBtn = document.querySelector('.hero-cta .btn');
    if (heroBtn) heroBtn.textContent = theme.heroCTA || "View Work";

    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 2) {
        serviceCards[0].querySelector('h3').textContent = theme.service1Title;
        serviceCards[0].querySelector('p').textContent = theme.service1Text;
        serviceCards[1].querySelector('h3').textContent = theme.service2Title;
        serviceCards[1].querySelector('p').textContent = theme.service2Text;
    }
}

// --- Ghostly Identity Rotator ---
function initGhostlyRotator() {
    const phrases = [
        "To Code from the Shadows",
        "Hear real-ghost stories",
        "Building eerie yet elegant systems",
        "Debugging haunted codebases",
        "Crafting dark-themed experiences",
        "turning nightmares into neat logic",
        "Summoning clean code from chaos"
    ];
    let index = 0;

    setInterval(() => {
        if (!document.body.classList.contains('mystic-mode')) return;
        const target = document.getElementById('ghostly-rotator');
        if (!target) return;

        target.style.transition = 'opacity 0.8s ease, filter 0.8s ease';
        target.style.opacity = '0';
        target.style.filter = 'blur(10px)';

        setTimeout(() => {
            index = (index + 1) % phrases.length;
            target.textContent = phrases[index];
            target.style.opacity = '0.9';
            target.style.filter = 'blur(0px)';
        }, 800);
    }, 4000);
}


// --- Nightmare Engine ---
function initNightmareEngine() {
    const stalker = document.getElementById('shadow-stalker');
    const jumpscare = document.getElementById('jumpscare-overlay');

    if (!stalker || !jumpscare) return;

    function triggerHorror() {
        if (!document.body.classList.contains('mystic-mode')) {
            stalker.style.opacity = "0";
            return;
        }

        const rand = Math.random();

        // 1. Move the Stalker (Very Frequent & Erratic)
        if (rand < 0.6) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const scale = 0.5 + Math.random();
            stalker.style.transform = `translate(${x}vw, ${y}vh) scale(${scale})`;
            stalker.style.opacity = Math.random() > 0.5 ? "0.4" : "0.2";
        } else {
            stalker.style.opacity = "0";
        }

        // 2. High-Intensity Jumpscare (More Frequent)
        if (rand < 0.12) {
            jumpscare.classList.add('active');
            setTimeout(() => jumpscare.classList.remove('active'), 150);
        }

        // 3. Violent UI Decay (Aggressive)
        if (rand > 0.7) {
            const elements = document.querySelectorAll('.section-title, .service-card, .work, #header h1, .btn, .logo');
            const targets = Array.from(elements).sort(() => 0.5 - Math.random()).slice(0, 3);
            targets.forEach(target => {
                if (target) {
                    target.classList.add('ui-decay');
                    setTimeout(() => target.classList.remove('ui-decay'), 700);
                }
            });
        }
    }

    // Run horror checks at high frequency
    setInterval(triggerHorror, 1500);
}

// --- Tech Metadata Engine (Mode-1) ---
function initMetadataEngine() {
    const statusEl = document.getElementById('meta-status');
    const locEl = document.getElementById('meta-loc');
    const infraEl = document.getElementById('meta-infra');

    if (!statusEl || !locEl || !infraEl) return;

    const statuses = ["OPTIMIZED", "SCALING", "STABLE", "ROUTING"];
    let sIdx = 0;

    setInterval(() => {
        if (!document.body.classList.contains('premium-mode')) return;

        // Jitter Location
        const lat = (59.91 + (Math.random() * 0.01)).toFixed(4);
        locEl.textContent = `LOC: ${lat}N`;

        // Rotate Status
        if (Math.random() > 0.8) {
            sIdx = (sIdx + 1) % statuses.length;
            statusEl.textContent = `SYS: ${statuses[sIdx]}`;
        }

        // Pulse Infra
        infraEl.style.opacity = Math.random() > 0.5 ? "0.8" : "0.4";

    }, 2000);
}

// --- Madison Interactive Engine ---
function wrapChocolateLetters(el, text) {
    if (!el) return;
    el.innerHTML = '';
    const words = text.split(' ');

    words.forEach((word, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.whiteSpace = 'nowrap';
        wordSpan.style.display = 'inline-block';

        [...word].forEach((char, charIdx) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'chocolate-char';
            span.style.animationDelay = `${(wordIdx * 0.1) + (charIdx * 0.03)}s`;
            wordSpan.appendChild(span);
        });

        el.appendChild(wordSpan);
        if (wordIdx < words.length - 1) {
            el.appendChild(document.createTextNode(' '));
        }
    });
}

function initMadisonRoleCycler() {
    const target = document.getElementById('madison-chocolate-role');
    if (!target) return;

    const roles = contentMap.premium.heroRoles;
    let index = 0;

    setInterval(() => {
        if (!document.body.classList.contains('premium-mode')) return;

        // Staggered exit
        const spans = target.querySelectorAll('.chocolate-char');
        spans.forEach((s, i) => {
            s.style.transition = 'all 0.5s ease';
            s.style.opacity = '0';
            s.style.transform = 'translateY(20px)';
        });

        setTimeout(() => {
            index = (index + 1) % roles.length;
            wrapChocolateLetters(target, roles[index]);
        }, 600);
    }, 6000);
}

// --- Madison Name Drip (Sequential Reveal) ---
function initMadisonNameDrip() {
    const el = document.getElementById('madison-name-main');
    if (!el) return;

    const text = el.innerText.trim();
    el.innerHTML = '';

    const words = text.split(' ');
    let charIndex = 0;

    words.forEach((word, wIdx) => {
        [...word].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'madison-drip-char';
            span.style.animationDelay = `${charIndex * 0.08}s`;
            el.appendChild(span);
            charIndex++;
        });

        if (wIdx < words.length - 1) {
            // Force a break for the two-line layout
            const br = document.createElement('div');
            br.className = 'madison-drip-break';
            el.appendChild(br);
        }
    });
}

// --- Scroll Spy for Sidebar ---
function initScrollSpy() {
    const sections = document.querySelectorAll('section, div[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('a');
            if (link && link.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initObserver();
    initNightmareEngine();
    // initMetadataEngine(); // Disabled for Madison decluttering
    initMadisonRoleCycler();
    initMadisonNameDrip();
    initScrollSpy();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'mystic') {
        document.body.classList.add('mystic-mode');
        document.body.classList.remove('premium-mode');
        const icon = document.getElementById('toggle-icon');
        if (icon) icon.classList.replace('fa-moon', 'fa-fire-alt');
        updateContent('mystic');
    }

    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('premium-mode')) return;
        const portrait = document.getElementById('madison-portrait');
        if (portrait) {
            const scroll = window.pageYOffset;
            portrait.parentElement.style.transform = `translateX(-50%) translateY(${scroll * 0.1}px)`;
        }
    });

    // --- Superpowers Observer ---
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.parentElement.nextElementSibling ? bar.parentElement.style.width : bar.style.getPropertyValue('width');
                // We'll use a data attribute or inline style set in HTML
                const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                bar.style.width = targetWidth + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
});

// --- Tab Management ---
function opentab(event, tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (const tablink of tablinks) tablink.classList.remove("active-link");
    for (const tabcontent of tabcontents) tabcontent.classList.remove("active-tab");

    event.currentTarget.classList.add("active-link");
    const targetTab = document.getElementById(tabname);
    if (targetTab) targetTab.classList.add("active-tab");
}

// --- Mode-2 Horror Interaction ---
document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('mystic-mode')) return;

    // Trigger on any click on the page for maximum effect, or limit to buttons
    // User asked for "click any buttons", but global click is more "fun". let's stick to buttons + general if empty.
    if (e.target.closest('.btn') || e.target.closest('.btn-glossy') || e.target.closest('a')) {
        createHorrorEffect(e.pageX, e.pageY);
    }
});

function createHorrorEffect(x, y) {
    // 50% chance of Ghost Fly-out, 50% Blood Drip
    const isGhost = Math.random() > 0.5;

    if (isGhost) {
        const ghost = document.createElement('div');
        ghost.innerText = '👻';
        ghost.style.position = 'absolute';
        ghost.style.left = `${x}px`;
        ghost.style.top = `${y}px`;
        ghost.style.fontSize = '24px';
        ghost.style.pointerEvents = 'none';
        ghost.style.transition = 'all 1s ease-out';
        ghost.style.zIndex = '10000';
        ghost.style.opacity = '1';
        document.body.appendChild(ghost);

        requestAnimationFrame(() => {
            ghost.style.transform = `translate(${Math.random() * 100 - 50}px, -100px) scale(1.5)`;
            ghost.style.opacity = '0';
        });

        setTimeout(() => ghost.remove(), 1000);
    } else {
        // Blood Drip
        for (let i = 0; i < 3; i++) {
            const drop = document.createElement('div');
            drop.classList.add('blood-drip');
            drop.style.left = `${x + (Math.random() * 20 - 10)}px`;
            drop.style.top = `${y}px`;
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }
    }
}

// --- Ghost Text Rotator (Mode-2) ---
class GhostRotator {
    constructor(el) {
        this.el = el;
        this.phrases = [
            "To Code from the Shadows",
            "Crafting dark-themed experiences",
            "Turning nightmares into neat logic",
            "Summoning clean code from chaos",
            "To Code from the Shadows",
            "Hearing real ghost-stories",
            "Building eerie yet elegant systems",
            "Debugging haunted codebases"
        ];
        this.currentIdx = 0;
        this.scramble = new TextScramble(this.el);
        this.interval = null;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            if (!document.body.classList.contains('mystic-mode')) return;

            this.currentIdx = (this.currentIdx + 1) % this.phrases.length;
            this.scramble.setText(this.phrases[this.currentIdx], true); // true for horror glitch
        }, 4000); // Rotate every 4 seconds
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }
}

// Initialize Rotator
let ghostRotator;

function updateRotatorState() {
    const isMystic = document.body.classList.contains('mystic-mode');
    const ghostlyEl = document.getElementById('ghostly-rotator');

    if (isMystic) {
        if (ghostlyEl && !ghostRotator) {
            ghostRotator = new GhostRotator(ghostlyEl);
        }
        if (ghostRotator) ghostRotator.start();
    } else {
        if (ghostRotator) ghostRotator.stop();
    }
}

// Initial Check
updateRotatorState();

// Hook into Toggle Theme
const rotatorObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            updateRotatorState();
        }
    });
});
rotatorObserver.observe(document.body, { attributes: true });

// ========================================
// MYSTIC MODE: CINEMATIC ROTATING TEXT
// Ritualistic, Irregular, Psychologically Present
// ========================================

const hauntedStatements = [
    'building systems that remember',
    'engineering inevitability',
    'designing order inside darkness',
    'working where others hesitate',
    'crafting software with intent',
    'quietly mastering complex machines',
    'control, depth, precision',
    'systems that outlive noise'
];

let currentStatementIndex = 0;
let rotationTimeout;

function rotateHauntedText() {
    // Only run in Mystic mode
    if (!document.body.classList.contains('mystic-mode')) return;

    const rotatingEl = document.getElementById('mystic-rotating-text');
    if (!rotatingEl) return;

    // Fade out with subtle micro-disturbance
    rotatingEl.classList.add('fade-out');

    setTimeout(() => {
        // Change text
        currentStatementIndex = (currentStatementIndex + 1) % hauntedStatements.length;
        rotatingEl.textContent = hauntedStatements[currentStatementIndex];

        // Remove fade-out, trigger fade-in
        rotatingEl.classList.remove('fade-out');
        rotatingEl.classList.add('fade-in');

        setTimeout(() => {
            rotatingEl.classList.remove('fade-in');
        }, 1200);

    }, 1000); // Fade-out duration

    // Schedule next rotation with randomized timing (±15%)
    const baseDelay = 5000; // 5 seconds display
    const randomFactor = 0.85 + (Math.random() * 0.3); // 0.85 to 1.15
    const nextDelay = baseDelay * randomFactor;

    rotationTimeout = setTimeout(rotateHauntedText, nextDelay);
}

// Start rotation after initial appearance (4 seconds after page load)
function initCinematicHero() {
    if (document.body.classList.contains('mystic-mode')) {
        setTimeout(() => {
            rotateHauntedText();
        }, 4000); // Wait for initial animations to complete
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicHero);
} else {
    initCinematicHero();
}

// Reinitialize when switching to Mystic mode
const cinematicObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isMystic = document.body.classList.contains('mystic-mode');
            if (isMystic) {
                clearTimeout(rotationTimeout);
                setTimeout(rotateHauntedText, 4000);
            } else {
                clearTimeout(rotationTimeout);
            }
        }
    });
});
cinematicObserver.observe(document.body, { attributes: true });

// ========================================
// HORIZONTAL RITUAL NAVIGATION (MYSTIC MODE)
// Compact, Premium, Elite Horror - Expands to Right
// ========================================

function initMysticHorizontalNav() {
    const trigger = document.getElementById('ritual-trigger');
    const horizontalBar = document.getElementById('ritual-horizontal-bar');
    const navLinks = document.querySelectorAll('.ritual-nav-link');

    if (!trigger || !horizontalBar) return;

    let isExpanded = false;

    // Toggle trigger click handler
    trigger.addEventListener('click', () => {
        if (!document.body.classList.contains('mystic-mode')) return;

        isExpanded = !isExpanded;

        if (isExpanded) {
            trigger.classList.add('active');
            horizontalBar.classList.add('expanded');
        } else {
            trigger.classList.remove('active');
            horizontalBar.classList.remove('expanded');
        }
    });

    // Close menu on link click and smooth navigate
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Close menu
            trigger.classList.remove('active');
            horizontalBar.classList.remove('expanded');
            isExpanded = false;

            // Navigate after slight delay for animation
            setTimeout(() => {
                document.querySelector(targetId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isExpanded) {
            trigger.classList.remove('active');
            horizontalBar.classList.remove('expanded');
            isExpanded = false;
        }
    });

    // Update active link based on scroll position
    const sections = document.querySelectorAll('section, div[id]');
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('mystic-mode')) return;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMysticHorizontalNav);

// Reinitialize when switching to Mystic mode
const horizontalNavObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isMystic = document.body.classList.contains('mystic-mode');
            if (isMystic) {
                // Reset navigation state
                const trigger = document.getElementById('ritual-trigger');
                const horizontalBar = document.getElementById('ritual-horizontal-bar');

                if (trigger) trigger.classList.remove('active');
                if (horizontalBar) horizontalBar.classList.remove('expanded');
            }
        }
    });
});
horizontalNavObserver.observe(document.body, { attributes: true });

// ========================================
// RITUAL KNIFE NAVIGATION (MYSTIC MODE) - DISABLED
// Old knife navigation kept for reference
// ========================================

let ritualMenuActive = false;

function initRitualKnifeNav_DISABLED() {
    const knifeTrigger = document.getElementById('knife-trigger');
    const knifeContainer = document.querySelector('.knife-container');
    const incisionLine = document.getElementById('incision-line');
    const ritualMenu = document.getElementById('ritual-menu');
    const menuItems = document.querySelectorAll('.ritual-menu-item');
    const bloodDripsContainer = document.getElementById('blood-drips');
    const knifeLabel = document.getElementById('knife-label');

    if (!knifeTrigger || !ritualMenu) return;

    // Knife click handler - Pierce and reveal menu
    knifeTrigger.addEventListener('click', () => {
        if (!document.body.classList.contains('mystic-mode')) return;

        if (!ritualMenuActive) {
            pierceAndReveal();
        } else {
            collapseMenu();
        }
    });

    // Menu item click handlers
    menuItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const label = item.getAttribute('data-label');

            // Update knife label
            if (knifeLabel) {
                knifeLabel.textContent = label;
            }

            // Collapse menu
            collapseMenu();

            // Navigate after animation
            setTimeout(() => {
                document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }, 800);
        });
    });

    // Pierce and reveal function
    function pierceAndReveal() {
        ritualMenuActive = true;

        // 1. Knife pierces (slides right)
        knifeContainer.classList.add('piercing');

        setTimeout(() => {
            // 2. Incision line appears
            incisionLine.classList.add('active');

            setTimeout(() => {
                // 3. Menu overlay fades in
                ritualMenu.classList.add('active');

                // 4. Reveal menu items sequentially with blood drips
                revealMenuItems();
            }, 300);
        }, 500);
    }

    // Reveal menu items with staggered animation and blood drips
    function revealMenuItems() {
        menuItems.forEach((item, index) => {
            // Irregular timing for psychological effect
            const baseDelay = 700;
            const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
            const delay = baseDelay * index * randomFactor;

            setTimeout(() => {
                // Reveal menu item
                item.classList.add('revealed');

                // Create blood drip after item appears
                setTimeout(() => {
                    createBloodDrip(item, index);
                }, 150);
            }, delay);
        });
    }

    // Create blood drip effect
    function createBloodDrip(menuItem, index) {
        if (!bloodDripsContainer) return;

        // Get position from menu item
        const rect = menuItem.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        const startY = rect.top - 20;

        // Create blood drip element
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        drip.style.left = `${centerX}px`;
        drip.style.top = `${startY}px`;

        bloodDripsContainer.appendChild(drip);

        // Create blood streak on incision
        createBloodStreak(centerX);

        // Remove drip after animation completes
        setTimeout(() => {
            drip.remove();
        }, 2500);
    }

    // Create blood streak effect on incision line
    function createBloodStreak(x) {
        const streak = document.createElement('div');
        streak.className = 'blood-streak';
        streak.style.left = `${x - 10}px`;
        streak.style.top = '50%';
        streak.style.width = '20px';

        document.body.appendChild(streak);

        setTimeout(() => {
            streak.remove();
        }, 3000);
    }

    // Collapse menu
    function collapseMenu() {
        ritualMenuActive = false;

        // 1. Fade out menu items first
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('revealed');
            }, index * 80);
        });

        setTimeout(() => {
            // 2. Clear blood drips by removing all child nodes
            if (bloodDripsContainer) {
                while (bloodDripsContainer.firstChild) {
                    bloodDripsContainer.removeChild(bloodDripsContainer.firstChild);
                }
            }

            // 3. Fade out menu overlay
            ritualMenu.classList.remove('active');

            setTimeout(() => {
                // 4. Incision seals
                incisionLine.classList.remove('active');

                // 5. Knife retracts
                knifeContainer.classList.remove('piercing');
            }, 400);
        }, menuItems.length * 80 + 200);
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ritualMenuActive) {
            collapseMenu();
        }
    });

    // Update knife label based on current section
    const sections = document.querySelectorAll('section, div[id]');
    const sectionLabels = {
        'header': 'Sanctum',
        'about': 'The Engineer',
        'portfolio': 'Artifacts',
        'contact': 'Summoning'
    };

    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('mystic-mode')) return;
        if (ritualMenuActive) return; // Don't update while menu is open

        let current = 'Sanctum';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                const sectionId = section.getAttribute('id');
                if (sectionLabels[sectionId]) {
                    current = sectionLabels[sectionId];
                }
            }
        });

        if (knifeLabel && knifeLabel.textContent !== current) {
            knifeLabel.textContent = current;
        }
    });
}

// Initialize on page load - DISABLED (replaced with horizontal navigation)
// document.addEventListener('DOMContentLoaded', initRitualKnifeNav_DISABLED);

// Reinitialize when switching to Mystic mode - DISABLED
const knifeObserver_DISABLED = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isMystic = document.body.classList.contains('mystic-mode');
            if (isMystic) {
                // Reset menu state when switching to mystic mode
                const ritualMenu = document.getElementById('ritual-menu');
                const knifeContainer = document.querySelector('.knife-container');
                const incisionLine = document.getElementById('incision-line');

                if (ritualMenu) ritualMenu.classList.remove('active');
                if (knifeContainer) knifeContainer.classList.remove('piercing');
                if (incisionLine) incisionLine.classList.remove('active');

                document.querySelectorAll('.ritual-menu-item').forEach(item => {
                    item.classList.remove('revealed');
                });

                ritualMenuActive = false;
            }
        }
    });
});
// knifeObserver_DISABLED.observe(document.body, { attributes: true }); // DISABLED

// ========================================
// MYSTIC MODE: ARTIFACT ARCHIVE SUMMONING
// Scroll-triggered reveal with irregular timing
// ========================================

function initArtifactSummoning() {
    const artifactCards = document.querySelectorAll('.artifact-card');
    if (!artifactCards.length) return;

    const summoningObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && document.body.classList.contains('mystic-mode')) {
                const card = entry.target;
                const cardIndex = parseInt(card.getAttribute('data-artifact')) - 1;

                // Irregular timing for organic feel (150-300ms stagger)
                const baseDelay = 200;
                const randomFactor = 0.75 + (Math.random() * 0.5); // 0.75 to 1.25
                const delay = baseDelay * cardIndex * randomFactor;

                setTimeout(() => {
                    card.classList.add('summoned');
                }, delay);

                // Only observe once
                summoningObserver.unobserve(card);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    artifactCards.forEach(card => {
        summoningObserver.observe(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initArtifactSummoning);

// Reinitialize when switching to Mystic mode
const artifactObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isMystic = document.body.classList.contains('mystic-mode');
            if (isMystic) {
                // Reset cards and reinitialize
                const cards = document.querySelectorAll('.artifact-card');
                cards.forEach(card => {
                    card.classList.remove('summoned');
                });
                setTimeout(initArtifactSummoning, 100);
            }
        }
    });
});
artifactObserver.observe(document.body, { attributes: true });

// ========================================
// PREMIUM MODE: COMPACT PROJECTS REVEAL
// Scroll-triggered micro animations
// ========================================

function initPremiumProjectsReveal() {
    const premiumCards = document.querySelectorAll('.premium-project-card');
    if (!premiumCards.length) return;

    const premiumObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && document.body.classList.contains('premium-mode')) {
                const card = entry.target;
                const cardIndex = parseInt(card.getAttribute('data-project')) - 1;

                // Compact, minimal stagger (50-100ms)
                const baseDelay = 80;
                const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
                const delay = baseDelay * cardIndex * randomFactor;

                setTimeout(() => {
                    card.classList.add('revealed');
                }, delay);

                // Only observe once
                premiumObserver.unobserve(card);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    premiumCards.forEach(card => {
        premiumObserver.observe(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initPremiumProjectsReveal);

// Reinitialize when switching to Premium mode
const premiumProjectsObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isPremium = document.body.classList.contains('premium-mode');
            if (isPremium) {
                // Reset cards and reinitialize
                const cards = document.querySelectorAll('.premium-project-card');
                cards.forEach(card => {
                    card.classList.remove('revealed');
                });
                setTimeout(initPremiumProjectsReveal, 100);
            }
        }
    });
});
premiumProjectsObserver.observe(document.body, { attributes: true });