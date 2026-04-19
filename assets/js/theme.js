export default class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeText = this.themeToggle?.querySelector('.theme-toggle__text');
    this.html = document.documentElement;
    this.currentTheme = 'light';

    this.init();
  }

  init() {
    this.loadTheme();
    this.bindEvents();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = savedTheme || (systemDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);
  }

  applyTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    this.updateThemeText(theme);
  }

  updateThemeText(theme) {
    if (this.themeText) {
      this.themeText.textContent = theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري';
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }
}
