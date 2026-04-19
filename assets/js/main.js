import ThemeManager from './theme.js';

class Navigation {
  constructor() {
    this.toc = document.getElementById('toc');
    this.backToTop = document.getElementById('backToTop');
    this.init();
  }

  init() {
    this.bindTocLinks();
    this.bindBackToTop();
    this.observeScroll();
  }

  bindTocLinks() {
    document.querySelectorAll('.toc-item[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  bindBackToTop() {
    if (!this.backToTop) return;
    this.backToTop.addEventListener('click', () => {
      if (this.toc) {
        this.toc.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  observeScroll() {
    if (!this.backToTop) return;

    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      const tocBottom = this.toc ? this.toc.getBoundingClientRect().bottom + scrollY : 300;
      this.backToTop.classList.toggle('visible', scrollY > tocBottom);
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new Navigation();
});
