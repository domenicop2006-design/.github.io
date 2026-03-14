// ─── HAMBURGER MENU ─────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
const navbar     = document.getElementById('navbar');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  overlay.classList.add('visible');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('visible');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Close on nav link click
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ─── NAVBAR SCROLL EFFECT ───────────────────────────────────────
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ─── ACTIVE NAV LINK ────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-item');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── SCROLL REVEAL ──────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.about-grid, .card, .testimonial-card, .skill-group, ' +
  '.leadership-banner, .edu-block, .contact-link, .stat'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

// ─── STAGGER DELAYS ─────────────────────────────────────────────
['.cards-grid', '.testimonials-grid', '.skills-grid', '.about-stats', '.contact-links'].forEach(selector => {
  const parent = document.querySelector(selector);
  if (!parent) return;
  parent.querySelectorAll('.card, .testimonial-card, .skill-group, .stat, .contact-link').forEach((child, i) => {
    child.style.transitionDelay = `${i * 75}ms`;
  });
});

// ─── HERO PARALLAX ──────────────────────────────────────────────
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.18}px))`;
  }, { passive: true });
}
