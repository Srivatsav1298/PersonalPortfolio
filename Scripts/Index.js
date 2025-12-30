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
                    title.dataset.scrambled = true;
                }

                observer.unobserve(entry.target);
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

// --- Initialize All ---
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initObserver();
    initNightmareEngine();
    initMetadataEngine();
    initMadisonRoleCycler();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.sticky-nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.padding = '10px 0';
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                nav.style.padding = '15px 0';
                nav.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'mystic') {
        document.body.classList.add('mystic-mode');
        document.body.classList.remove('premium-mode');
        const icon = document.getElementById('toggle-icon');
        if (icon) icon.classList.replace('fa-moon', 'fa-fire-alt');
        updateContent('mystic');
    }
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

// --- Menu Management ---
function openmenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) sidemenu.style.right = "0";
}

function closemenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) sidemenu.style.right = "-200px";
}