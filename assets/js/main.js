// === Carol Musyoka Portfolio — Main JS ===

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Portfolio page animations ---
  // Typing effect in hero badge
  const typedEl = document.getElementById('pf-typed');
  if (typedEl) {
    const phrases = [
      'Hello',
      'Kotlin lover',
      'Building for Android',
      'Shipping to Play Store'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTime = 0;

    const typeLoop = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          pauseTime = 2200;
        } else {
          pauseTime = 70 + Math.random() * 40;
        }
      } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          pauseTime = 500;
        } else {
          pauseTime = 35;
        }
      }
      setTimeout(typeLoop, pauseTime);
    };
    setTimeout(typeLoop, 800);
  }

  // Portfolio stat counters
  const pfStats = document.querySelectorAll('.pf-stat-num');
  if (pfStats.length && 'IntersectionObserver' in window) {
    const animatePfCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      const step = (ts) => {
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };
    const pfObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animatePfCounter(e.target); pfObserver.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    pfStats.forEach(el => pfObserver.observe(el));
  }

  // Card scroll-in animations with stagger
  const pfCards = document.querySelectorAll('.pf-card-animate');
  if (pfCards.length && 'IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('pf-visible');
          }, i * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    pfCards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.06}s`;
      cardObserver.observe(el);
    });
  }

  // Section header reveals
  const pfHeaders = document.querySelectorAll('.pf-section-header');
  if (pfHeaders.length && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pf-visible');
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    pfHeaders.forEach(el => headerObserver.observe(el));
  }

  // Hand-drawn arrow draw-on animation
  const pfArrows = document.querySelectorAll('.pf-arrow, .pf-arrow-section, .pf-arrow-cta');
  if (pfArrows.length && 'IntersectionObserver' in window) {
    const arrowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('pf-drawn');
          }, 300);
          arrowObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    pfArrows.forEach(el => arrowObserver.observe(el));
  }

});
