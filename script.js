const header=document.querySelector('.topbar');
const progress=document.getElementById('scroll-line');
const menu=document.querySelector('.menu');
const mobileNav=document.querySelector('.mobile-nav');
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>{if(header) header.style.background=window.scrollY>30?'rgba(7,16,19,.86)':'rgba(7,16,19,.38)';if(progress){const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';}},{passive:true});
if(menu&&mobileNav){menu.addEventListener('click',()=>{mobileNav.classList.toggle('open');mobileNav.setAttribute('aria-hidden',mobileNav.classList.contains('open')?'false':'true')});mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');mobileNav.setAttribute('aria-hidden','true')}));}
const form=document.getElementById('quote-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim(),phone=document.getElementById('phone').value.trim(),service=document.getElementById('service').value,message=document.getElementById('message').value.trim(),status=form.querySelector('.form-status');if(!name||!phone){status.textContent='فضلاً اكتب الاسم ورقم الجوال.';return;}const text=`مرحباً مؤسسة أبو سبعة، أود طلب عرض سعر.\nالاسم: ${name}\nالجوال: ${phone}\nالخدمة: ${service}\nتفاصيل المشروع: ${message||'لا توجد تفاصيل إضافية'}`;if(typeof window.gtag==='function') window.gtag('event','generate_lead',{event_category:'form'});window.open('https://wa.me/966504137856?text='+encodeURIComponent(text),'_blank','noopener');status.textContent='تم تجهيز الطلب، سيتم فتح واتساب لإرساله.';});}
document.querySelectorAll('[data-conversion]').forEach(el=>el.addEventListener('click',()=>{if(typeof window.gtag==='function')window.gtag('event',el.dataset.conversion||'interaction',{event_category:'conversion'});}));
