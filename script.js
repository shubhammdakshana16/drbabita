/* ============================================
   Dr. Babita Kemiya — Interactions & Animations
   ============================================ */

// ===== Loader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

// Custom cursor removed — using native cursor

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const floatTop = document.getElementById('floatTop');
  if (window.scrollY > 600) floatTop.classList.add('show');
  else floatTop.classList.remove('show');
});

document.getElementById('floatTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile Menu =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
});

// ===== Reveal on Scroll =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterIO.observe(c));

// ===== Parallax on Hero =====
const heroImg = document.querySelector('.hero-image-wrapper');
const floatingIcons = document.querySelectorAll('.floating-icon');
window.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 1024) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  if (heroImg) {
    heroImg.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
  }
  floatingIcons.forEach((icon, i) => {
    const factor = (i + 1) * 6;
    icon.style.translate = `${x * factor}px ${y * factor}px`;
  });
});

// ===== Tilt on Service Cards =====
document.querySelectorAll('.service-card, .testimonial-card, .process-step').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Form Submit — opens WhatsApp with prefilled data =====
const WHATSAPP_NUMBER = '917697049341';

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  const data = new FormData(form);
  const name    = (data.get('name')    || '').toString().trim();
  const phone   = (data.get('phone')   || '').toString().trim();
  const email   = (data.get('email')   || '').toString().trim();
  const service = (data.get('service') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  const lines = [
    'Hello Dr. Babita,',
    '',
    `I'd like to book a physiotherapy consultation.`,
    '',
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Email:* ${email}`,
    `*Service:* ${service}`,
  ];
  if (message) {
    lines.push('', `*Condition / Notes:*`, message);
  }
  lines.push('', 'Please let me know your availability. Thank you!');

  const text = encodeURIComponent(lines.join('\n'));
  const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Opening WhatsApp...</span>';
  btn.disabled = true;

  window.open(url, '_blank', 'noopener');

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> <span>Sent to WhatsApp!</span>';
    btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
    form.reset();
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
    }, 2600);
  }, 600);
}

// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
