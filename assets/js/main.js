/* ============================================================
   OK WebStart — main.js
   Single shared JavaScript file for all pages
   ============================================================ */

/* global Lenis, ScrollReveal */

'use strict';

/* ── 1. initLenis ─────────────────────────────────────────── */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    smoothTouch: false,
  });

  window._lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* ── 2. initFloatingHeader ────────────────────────────────── */
function initFloatingHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('is-visible');
    } else {
      header.classList.remove('is-visible');
    }
  }, { passive: true });
}

/* ── 3. initMobileNav ─────────────────────────────────────── */
function initMobileNav() {
  const btn      = document.getElementById('hamburgerBtn');
  const drawer   = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const links    = drawer ? drawer.querySelectorAll('.drawer-link, .drawer-cta') : [];

  if (!btn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    btn.focus();
  }

  btn.addEventListener('click', function () {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  links.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ── 4. initBackToTop ─────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    if (window._lenis) {
      window._lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ── 5. initScrollReveal ──────────────────────────────────── */
function initScrollReveal() {
  if (typeof ScrollReveal === 'undefined') return;

  const sr = ScrollReveal({
    distance:   '36px',
    duration:   700,
    easing:     'cubic-bezier(0.4, 0, 0.2, 1)',
    viewFactor: 0.08,
    reset:      false,
    mobile:     true,
  });

  sr.reveal('.reveal-up', {
    origin: 'bottom',
    interval: function (el) {
      const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
      return delay * 1000;
    },
  });

  sr.reveal('.reveal-right', { origin: 'left' });
  sr.reveal('.reveal-left',  { origin: 'right' });
  sr.reveal('.reveal-fade',  { distance: '0px' });
}

/* ── 6. initCounters ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const isFloat = el.dataset.float === 'true';
    const duration = 1800;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

/* ── 7. initScrollSpy ─────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href') || '';
          if (href === '#' + id || href.endsWith('#' + id)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -50% 0px',
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ── 8. initSmoothAnchors ─────────────────────────────────── */
function initSmoothAnchors() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = -80;

    if (window._lenis) {
      window._lenis.scrollTo(target, { offset: offset, duration: 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
}

/* ── 9. initFooterYear ────────────────────────────────────── */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── 10. initCursorGlow ───────────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let rafId = null;
  let mouseX = -250, mouseY = -250;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafId) {
      rafId = requestAnimationFrame(function () {
        glow.style.setProperty('--x', mouseX + 'px');
        glow.style.setProperty('--y', mouseY + 'px');
        rafId = null;
      });
    }
  }, { passive: true });
}

/* ── 11. initCardTilt ─────────────────────────────────────── */
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const MAX_DEG = 4;
  const cards = document.querySelectorAll('.bento-card, .portfolio-card, .testimonial-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotateX = -dy * MAX_DEG;
      const rotateY =  dx * MAX_DEG;

      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(6px)';
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });
}

/* ── 12. initTestimonialCarousel ──────────────────────────── */
function initTestimonialCarousel() {
  const track   = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');

  if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

  const cards   = Array.from(track.children);
  const total   = cards.length;
  let current   = 0;
  let autoplayTimer = null;

  function visibleCount() {
    if (window.innerWidth <= 640)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getGap() {
    const gapStr = getComputedStyle(track).gap;
    return parseFloat(gapStr) || 0;
  }

  // Uses offsetWidth — NOT getBoundingClientRect() to avoid mobile zero-width bug
  function setCardWidths() {
    const visible = visibleCount();
    const gap = getGap();
    const viewportWidth = track.parentElement.offsetWidth;
    const cardWidth = (viewportWidth - (gap * (visible - 1))) / visible;
    cards.forEach(function (card) {
      card.style.width = cardWidth + 'px';
      card.style.flexShrink = '0';
    });
  }

  function pageCount() {
    return Math.max(1, total - visibleCount() + 1);
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const pages = pageCount();
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
      dot.addEventListener('click', function () {
        goTo(i);
        resetAutoplay();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function goTo(index) {
    const max = Math.max(0, total - visibleCount());
    // Infinite wrap-around
    if (index < 0) {
      current = max;
    } else if (index > max) {
      current = 0;
    } else {
      current = index;
    }

    const cardWidth = cards[0] ? cards[0].offsetWidth : 0;
    const gap = getGap();
    const offset = current * (cardWidth + gap);

    track.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(function () {
      goTo(current + 1);
    }, 5000);
  }

  prevBtn.addEventListener('click', function () {
    goTo(current - 1);
    resetAutoplay();
  });
  nextBtn.addEventListener('click', function () {
    goTo(current + 1);
    resetAutoplay();
  });

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX   = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }
      resetAutoplay();
    }
  }, { passive: true });

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setCardWidths();
      buildDots();
      goTo(0);
    }, 150);
  });

  // Defer first paint so offsetWidth is available after layout
  requestAnimationFrame(function () {
    setCardWidths();
    buildDots();
    goTo(0);
    resetAutoplay();
  });
}

/* ── INIT ─────────────────────────────────────────────────── */
function init() {
  document.body.style.overflow = ''; // clear any lingering scroll lock
  initLenis();
  initFloatingHeader();
  initMobileNav();
  initBackToTop();
  initScrollReveal();
  initCounters();
  initScrollSpy();
  initSmoothAnchors();
  initFooterYear();
  initCursorGlow();
  initCardTilt();
  initTestimonialCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
