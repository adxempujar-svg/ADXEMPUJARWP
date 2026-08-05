// Fecha dinámica, menú responsive y mejora de interacción logo (mouse move efecto sutil)
document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      if(!expanded){
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
      } else {
        navList.style.display = '';
      }
    });
  }

  // Efecto sutil de parallax en logo con movimiento del mouse (desactivado si prefers-reduced-motion)
  const logo = document.getElementById('logo');
  if(logo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      // rotamos y desplazamos levemente
      logo.style.transform = `rotate(${dx * 8 - 4}deg) translateY(${dy * -6}px) scale(1.06)`;
      logo.style.boxShadow = `0 18px 60px rgba(0,240,255,0.08), ${dx*40}px ${dy*40}px 50px rgba(155,92,255,0.06)`;
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = '';
      logo.style.boxShadow = '';
    });
    logo.addEventListener('focus', () => {
      // accessible keyboard focus
      logo.style.transform = 'rotate(-8deg) scale(1.08) translateY(-3px)';
    });
    logo.addEventListener('blur', () => {
      logo.style.transform = '';
    });
  }
});
