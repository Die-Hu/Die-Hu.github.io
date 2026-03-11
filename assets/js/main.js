/* ============================================
   DIORAMA STUDIO - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initLightbox();
  initGalleryFilters();
  initMobileMenu();
});

/* --- Navigation scroll effect --- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --- Gallery Filters --- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.gallery-grid .card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* --- Lightbox --- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox__img');
  const lbTitle = lightbox.querySelector('.lightbox__title');
  const lbDesc = lightbox.querySelector('.lightbox__desc');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  const lbBuyBtn = lightbox.querySelector('.lightbox__buy');

  let currentIndex = 0;
  let visibleCards = [];

  function getVisibleCards() {
    return Array.from(
      document.querySelectorAll('.gallery-grid .card')
    ).filter((c) => c.style.display !== 'none');
  }

  function openLightbox(index) {
    visibleCards = getVisibleCards();
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const card = visibleCards[currentIndex];
    if (!card) return;
    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    const subtitle = card.querySelector('.card__subtitle');

    // Use preview image (higher res) if available via data attribute
    lbImg.src = (img.dataset && img.dataset.preview) ? img.dataset.preview : img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = title ? title.textContent : '';
    lbDesc.textContent = subtitle ? subtitle.textContent : '';
    if (lbBuyBtn) {
      lbBuyBtn.href = card.dataset.href || '#';
    }
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + visibleCards.length) % visibleCards.length;
    updateLightbox();
  }

  // Event delegation for gallery cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-grid .card');
    if (card) {
      e.preventDefault();
      visibleCards = getVisibleCards();
      const index = visibleCards.indexOf(card);
      if (index > -1) openLightbox(index);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const menu = document.querySelector('.nav__mobile-menu');
  const closeBtn = document.querySelector('.nav__mobile-close');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggle.textContent = '\u2715';
  }

  function closeMenu() {
    menu.classList.remove('active');
    document.body.style.overflow = '';
    toggle.textContent = '\u2630';
  }

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button (X) inside mobile menu
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });
}
