// ============ مؤسسة أبو سبعة لتحلية المياه — سكربت الموقع ============

const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

// One lightweight scroll handler for both header state and back-to-top state.
let scrollTicking = false;
const updateScrollUI = () => {
  const y = window.scrollY || window.pageYOffset || 0;

  if (header) header.classList.toggle('solid', y > 40);
  if (backToTop) backToTop.classList.toggle('show', y > 500);
  scrollTicking = false;
};

const onScroll = () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
updateScrollUI();

// ---------- Navigation ----------
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.mobile-nav .close-btn');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => mobileNav.classList.add('open'));

  if (closeBtn) {
    closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ---------- Reveal animations ----------
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- Animated counters ----------
const counters = document.querySelectorAll('[data-count]');
const setCounterValue = (el, value) => {
  const suffix = el.dataset.suffix || '';
  el.textContent = Number.isInteger(value)
    ? value.toLocaleString() + suffix
    : Number(value).toFixed(1) + suffix;
};

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.count);
  if (!Number.isFinite(target)) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    setCounterValue(el, target);
    return;
  }

  const duration = 1600;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target % 1 === 0
      ? Math.floor(target * eased)
      : target * eased;

    setCounterValue(el, value);

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const countIO = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => countIO.observe(el));
} else {
  counters.forEach(animateCounter);
}

// ---------- Contact form → WhatsApp ----------
const contactForm = document.getElementById('contact-form');
const isEnglish = document.documentElement.lang === 'en';

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('c-name');
    const phoneEl = document.getElementById('c-phone');
    const serviceEl = document.getElementById('c-service');
    const messageEl = document.getElementById('c-message');

    const name = nameEl?.value.trim() || '';
    const phone = phoneEl?.value.trim() || '';
    const service = serviceEl?.value || '';
    const message = messageEl?.value.trim() || '';

    if (!name || !phone) {
      alert(isEnglish
        ? 'Please fill in at least your name and phone number.'
        : 'الرجاء تعبئة الاسم ورقم الجوال على الأقل.');
      return;
    }

    const waNumber = '966504137856';
    const text = isEnglish
      ? `Hello Abu Sab'a Water Desalination,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService requested: ${encodeURIComponent(service)}%0ADetails: ${encodeURIComponent(message)}`
      : `مرحباً مؤسسة أبو سبعة لتحلية المياه،%0Aالاسم: ${encodeURIComponent(name)}%0Aالجوال: ${encodeURIComponent(phone)}%0Aالخدمة المطلوبة: ${encodeURIComponent(service)}%0Aالتفاصيل: ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank', 'noopener');
    contactForm.reset();
  });
}

// ---------- Back to top ----------
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
