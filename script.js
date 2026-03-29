/* ===================================================
   ABHAY KRISHNA — Portfolio Scripts
   =================================================== */

// ─── Custom Cursor ───────────────────────────────────
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// ─── Scroll Reveal ───────────────────────────────────
const revealEls = document.querySelectorAll('[data-scroll-reveal]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if the element has siblings
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ─── Stagger card reveals ─────────────────────────────
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target;
      const cards = parent.querySelectorAll(
        '.about-card, .ai-tool-card, .skill-group, .cert-item'
      );
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 + i * 80);
      });
      cardObserver.unobserve(parent);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-grid, .ai-tools-grid, .skills-grid, .certs-list')
  .forEach(el => cardObserver.observe(el));

// ─── Active Nav on Scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── Smooth Scroll for nav links ─────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ─── Hamburger Toggle ────────────────────────────────
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  if (menu) menu.classList.toggle('open');
  if (icon) icon.classList.toggle('open');
}

// Close hamburger on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('hamburger-nav');
  const menu = document.querySelector('.menu-links');
  if (nav && !nav.contains(e.target) && menu) {
    menu.classList.remove('open');
    document.querySelector('.hamburger-icon')?.classList.remove('open');
  }
});

// ─── Terminal Typing Effect ───────────────────────────
function typeText(el, text, speed = 60, delay = 0) {
  if (!el) return;
  el.style.width = '0';
  el.style.overflow = 'hidden';
  el.style.whiteSpace = 'nowrap';
  el.style.display = 'inline-block';
  el.textContent = '';

  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      el.style.width = 'auto';
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }, delay);
}

// Run typing on hero terminal
const typed1 = document.querySelector('.typed');
const typed2 = document.querySelector('.typed2');
if (typed1) {
  typeText(typed1, typed1.getAttribute('data-text') || 'whoami', 65, 400);
}
if (typed2) {
  typeText(typed2, typed2.getAttribute('data-text') || 'cat role.txt', 65, 1600);
}

// ─── Skill pill hover ripple ─────────────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  pill.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// ─── Nav scroll shrink ───────────────────────────────
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');
window.addEventListener('scroll', () => {
  const nav = desktopNav || hamburgerNav;
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(99,202,183,0.15)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
}, { passive: true });

// ─── Project item stagger ─────────────────────────────
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = document.querySelectorAll('.project-item');
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 + i * 100);
      });
      projectObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const projectsList = document.querySelector('.projects-list');
if (projectsList) projectObserver.observe(projectsList);
