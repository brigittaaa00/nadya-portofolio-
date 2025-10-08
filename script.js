/* Smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile menu if open
    document.getElementById('nav-menu')?.classList.remove('open');
  });
});

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', ()=>{
  navMenu.classList.toggle('open');
});

/* IntersectionObserver for fade-in / fade-up elements */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting) ent.target.classList.add('in-view');
  });
},{threshold: 0.15});
document.querySelectorAll('.fade, .fade-up').forEach(el=>io.observe(el));

/* Animate skill bars when visible */
const progressObserver = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const bars = entry.target.querySelectorAll('.progress');
      bars.forEach(bar=>{
        const p = bar.dataset.percent || 0;
        bar.querySelector('.progress-bar').style.width = p + '%';
      });
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.2});
document.querySelectorAll('#skills').forEach(s=>progressObserver.observe(s));

/* Simple contact form feedback (no backend) */
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    msg.textContent = 'Pesan berhasil dikirim (demo). Silakan hubungi lewat email: [EmailAnda]';
    msg.style.color = '#2b6e2b';
    form.reset();
  });
}

/* Optional: close mobile menu when clicking outside */
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.nav-inner')) navMenu.classList.remove('open');
});
