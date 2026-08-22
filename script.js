(function(){
  const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-menu');
  if(menu&&mobile){menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
  document.querySelectorAll('a[data-conversion],button[data-conversion]').forEach(a=>a.addEventListener('click',()=>{if(typeof window.gtag==='function')window.gtag('event',a.dataset.conversion,{event_category:'lead',event_label:a.getAttribute('href')||a.textContent.trim()||''});}));
  const form=document.getElementById('quote-form');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim(),phone=document.getElementById('phone').value.trim(),service=document.getElementById('service').value,message=document.getElementById('message').value.trim(),status=form.querySelector('.form-status');if(!name||!phone){status.textContent='فضلاً اكتب الاسم ورقم الجوال.';return;}const text=`مرحباً مؤسسة أبو سبعة، أود طلب عرض سعر.\nالاسم: ${name}\nالجوال: ${phone}\nالخدمة: ${service}\nتفاصيل المشروع: ${message||'لا توجد تفاصيل إضافية'}`;if(typeof window.gtag==='function')window.gtag('event','generate_lead',{event_category:'form'});window.open('https://wa.me/966504137856?text='+encodeURIComponent(text),'_blank','noopener');status.textContent='تم تجهيز الطلب، سيتم فتح واتساب لإرساله.';});}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  const cookie=document.getElementById('cookie'),accept=document.getElementById('accept');if(cookie&&!localStorage.getItem('abu7_cookie_ok'))cookie.hidden=false;if(accept)accept.addEventListener('click',()=>{localStorage.setItem('abu7_cookie_ok','1');cookie.hidden=true;});
})();

// --- Scroll progress + active section navigation ---
(function(){
  const bar=document.getElementById('scroll-progress');
  const links=[...document.querySelectorAll('nav a[href^="#"]')];
  const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const update=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(bar)bar.style.transform=`scaleX(${max>0?window.scrollY/max:0})`;
    let current='';
    sections.forEach(s=>{if(s.getBoundingClientRect().top<=130)current=s.id});
    links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
  };
  window.addEventListener('scroll',update,{passive:true});
  update();
})();

// --- Prevent accidental duplicate WhatsApp submits ---
(function(){
  const form=document.getElementById('quote-form');
  if(!form)return;
  let busy=false;
  form.addEventListener('submit',()=>{if(busy)return;busy=true;setTimeout(()=>busy=false,1600);},{capture:true});
})();
