/* =============================================
   KARTHIK SAI ANALA — PORTFOLIO MAIN JS
   ============================================= */

'use strict';

// ===== TYPED.JS INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Full Stack Developer',
        'Backend Developer',
        'Student',
        'Problem Solver',
        'React Developer',
        'Open Source Enthusiast'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  handleScrollAnimations();
  handleSkillBars();
  toggleBackToTop();
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      allNavLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0, 212, 255' : '0, 102, 255';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  resizeCanvas();
  particles = [];
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  for (let i = 0; i < count; i++) particles.push(new Particle());
  animateParticles();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  animFrameId = requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(animFrameId);
  initParticles();
}, { passive: true });

initParticles();

// ===== SCROLL ANIMATIONS (AOS-lite) =====
const aosElements = document.querySelectorAll('[data-aos]');

function handleScrollAnimations() {
  const triggerPoint = window.innerHeight * 0.88;
  aosElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const delay = parseInt(el.getAttribute('data-delay') || 0);
    if (rect.top < triggerPoint) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}

// Run once on load for elements already in view
handleScrollAnimations();

// ===== SKILL BAR ANIMATION =====
let skillBarsAnimated = false;

function handleSkillBars() {
  if (skillBarsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    skillBarsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const target = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = target + '%';
      }, 200);
    });
  }
}

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM (mailto) =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate fields
  if (!name || !email || !subject || !message) {
    formStatus.textContent = '⚠️ Please fill in all fields before sending.';
    formStatus.className = 'form-status error';
    return;
  }

  // Build mailto link with pre-filled content
  const mailSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
  const mailBody = encodeURIComponent(
    `Hi Karthik,\n\nYou received a new message from your portfolio:\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Subject: ${subject}\n\n` +
    `Message:\n${message}\n\n` +
    `---\nSent via karthiksaianala.portfolio`
  );

  const mailtoLink = `mailto:karthiksaianala@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show confirmation
  formStatus.textContent = '✅ Your email client should open now — just hit Send!';
  formStatus.className = 'form-status success';
  contactForm.reset();

  setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }, 6000);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-height')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CURSOR GLOW (subtle) =====
const heroSection = document.getElementById('home');
let mouseMoveTimer;

heroSection.addEventListener('mousemove', (e) => {
  clearTimeout(mouseMoveTimer);
  const x = e.clientX;
  const y = e.clientY;
  heroSection.style.setProperty('--mouse-x', x + 'px');
  heroSection.style.setProperty('--mouse-y', y + 'px');
}, { passive: true });
