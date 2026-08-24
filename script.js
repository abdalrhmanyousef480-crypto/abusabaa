// ============ مؤسسة أبو سبعة لتحلية المياه — سكربت الموقع ============

const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('solid');
  else header.classList.remove('solid');
};
window.addEventListener('scroll', onScroll);
onScroll();

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.mobile-nav .close-btn');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const counters = document.querySelectorAll('[data-count]');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target % 1 === 0 ? Math.floor(target * eased) : (target * eased).toFixed(1);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => countIO.observe(el));

// --- نموذج التواصل: تجهيز رسالة واتساب ---
const contactForm = document.getElementById('contact-form');
const isEnglish = document.documentElement.lang === 'en';
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const service = document.getElementById('c-service').value;
    const message = document.getElementById('c-message').value.trim();

    if (!name || !phone) {
      alert(isEnglish ? 'Please fill in at least your name and phone number.' : 'الرجاء تعبئة الاسم ورقم الجوال على الأقل.');
      return;
    }

    const waNumber = '966504137856'; // رقم واتساب المؤسسة
    const text = isEnglish
      ? `Hello Abu Sab'a Water Desalination,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService requested: ${encodeURIComponent(service)}%0ADetails: ${encodeURIComponent(message)}`
      : `مرحباً مؤسسة أبو سبعة لتحلية المياه،%0Aالاسم: ${encodeURIComponent(name)}%0Aالجوال: ${encodeURIComponent(phone)}%0Aالخدمة المطلوبة: ${encodeURIComponent(service)}%0Aالتفاصيل: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    contactForm.reset();
  });

  /* =========================
   Back To Top
========================= */

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
}

document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
