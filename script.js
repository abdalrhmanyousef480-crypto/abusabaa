(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-btn');
  const setMenu = open => {
    mobileNav?.classList.toggle('open', open);
    mobileNav?.setAttribute('aria-hidden', String(!open));
    navToggle?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  navToggle?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const reveal = document.querySelectorAll('.reveal:not(.in)');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    }), {threshold:.12});
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  // Lightweight conversion hooks. Add your real Google Ads/Analytics IDs later.
  window.dataLayer = window.dataLayer || [];
  window.trackLead = type => {
    window.dataLayer.push({event:'lead_click', lead_type:type});
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', {method:type});
  };
  document.querySelectorAll('[data-conversion]').forEach(el => el.addEventListener('click', () => window.trackLead(el.dataset.conversion)));

  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('c-name')?.value.trim();
    const phone = document.getElementById('c-phone')?.value.trim();
    const service = document.getElementById('c-service')?.value;
    const message = document.getElementById('c-message')?.value.trim();
    const status = form.querySelector('.form-status');
    if (!name || !phone) { if (status) status.textContent = 'فضلاً أدخل الاسم ورقم الجوال.'; document.getElementById(!name ? 'c-name' : 'c-phone')?.focus(); return; }
    const text = `مرحباً مؤسسة أبو سبعة لتحلية المياه،\nالاسم: ${name}\nالجوال: ${phone}\nالخدمة المطلوبة: ${service}\nتفاصيل المشروع: ${message || 'لا توجد تفاصيل إضافية'}`;
    window.trackLead('form_whatsapp');
    window.open(`https://wa.me/966504137856?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    if (status) status.textContent = 'تم تجهيز رسالتك وفتح واتساب.';
    form.reset();
  });

  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  const cookie = document.getElementById('cookie-banner');
  const accepted = localStorage.getItem('abu7_cookie_consent');
  if (cookie && !accepted) cookie.hidden = false;
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('abu7_cookie_consent', 'accepted');
    if (cookie) cookie.hidden = true;
  });
})();
