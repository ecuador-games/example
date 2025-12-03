/**
 * Theme management system
 */
import { CONFIG } from '../config/config.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');

    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.watchSystemPreference();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  /**
   * Watch system preference changes
   */
  watchSystemPreference() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Get stored theme from localStorage
   * @returns {string|null} Stored theme or null
   */
  getStoredTheme() {
    return localStorage.getItem(CONFIG.THEME.STORAGE_KEY);
  }

  /**
   * Get preferred theme from system
   * @returns {string} Preferred theme
   */
  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply
   */
  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    this.updateThemeIcon(theme);
    this.saveThemePreference(theme);
    this.animateThemeTransition();
  }

  /**
   * Update theme icon
   * @param {string} theme - Current theme
   */
  updateThemeIcon(theme) {
    if (this.themeIcon) {
      this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme to save
   */
  saveThemePreference(theme) {
    localStorage.setItem(CONFIG.THEME.STORAGE_KEY, theme);
  }

  /**
   * Animate theme transition
   */
  animateThemeTransition() {
    document.body.style.transition = `all ${CONFIG.THEME.TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    setTimeout(() => {
      document.body.style.transition = '';
    }, CONFIG.THEME.TRANSITION_DURATION);
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  /**
   * Get current theme
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Set specific theme
   * @param {string} theme - Theme to set
   */
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.applyTheme(theme);
    }
  }

  /**
   * Reset theme to system preference
   */
  resetToSystemPreference() {
    localStorage.removeItem(CONFIG.THEME.STORAGE_KEY);
    this.applyTheme(this.getPreferredTheme());
  }
}

export default ThemeManager;
