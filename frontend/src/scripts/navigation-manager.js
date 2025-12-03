/**
 * Navigation management system
 */
import { CONFIG } from '../config/config.js';

export class NavigationManager {
  constructor() {
    this.currentSection = null;
    this.navLinks = [];
    this.sections = [];

    this.init();
  }

  /**
   * Initialize navigation manager
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.updateActiveNav();
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    this.sections = document.querySelectorAll('section[id]');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', e => this.handleNavClick(e));
    });

    // Update navigation on scroll
    window.addEventListener('scroll', () => this.updateNavOnScroll());

    // Update navigation on resize
    window.addEventListener('resize', () => this.updateActiveNav());
  }

  /**
   * Handle navigation link click
   * @param {Event} e - Click event
   */
  handleNavClick(e) {
    e.preventDefault();

    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      this.scrollToSection(targetSection);
      this.updateActiveNavLink(e.target);
    }
  }

  /**
   * Scroll to section with offset for fixed navbar
   * @param {HTMLElement} section - Target section
   */
  scrollToSection(section) {
    const navbarHeight = this.getNavbarHeight();
    const offsetTop = section.offsetTop - navbarHeight - 20; // Extra 20px margin

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  /**
   * Get navbar height
   * @returns {number} Navbar height in pixels
   */
  getNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.offsetHeight : 80; // Default fallback
  }

  /**
   * Update active navigation link
   * @param {HTMLElement} activeLink - Active navigation link
   */
  updateActiveNavLink(activeLink) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  /**
   * Update navigation based on scroll position
   */
  updateNavOnScroll() {
    const scrollPos = window.scrollY + this.getNavbarHeight() + 100;

    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        this.setActiveSection(id);
      }
    });
  }

  /**
   * Set active section
   * @param {string} sectionId - Section ID
   */
  setActiveSection(sectionId) {
    if (this.currentSection === sectionId) return;

    this.currentSection = sectionId;

    // Update navigation links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Update active navigation based on current section
   */
  updateActiveNav() {
    if (this.sections.length === 0) return;

    const scrollPos = window.scrollY + this.getNavbarHeight() + 100;

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i];
      const top = section.offsetTop;

      if (scrollPos >= top) {
        this.setActiveSection(section.getAttribute('id'));
        break;
      }
    }
  }

  /**
   * Navigate to section programmatically
   * @param {string} sectionId - Section ID to navigate to
   */
  navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      this.scrollToSection(section);
    }
  }

  /**
   * Get current active section
   * @returns {string|null} Current section ID
   */
  getCurrentSection() {
    return this.currentSection;
  }

  /**
   * Add new navigation link
   * @param {string} href - Link href
   * @param {string} text - Link text
   * @param {string} targetId - Target section ID
   */
  addNavLink(href, text, targetId) {
    const navContainer = document.querySelector('.navbar-nav');
    if (!navContainer) return;

    const li = document.createElement('li');
    li.className = 'nav-item';

    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = href;
    link.textContent = text;
    link.addEventListener('click', e => this.handleNavClick(e));

    li.appendChild(link);
    navContainer.appendChild(li);

    // Update cached elements
    this.cacheElements();
  }

  /**
   * Remove navigation link
   * @param {string} targetId - Target section ID
   */
  removeNavLink(targetId) {
    const link = document.querySelector(`a[href="#${targetId}"]`);
    if (link && link.parentElement) {
      link.parentElement.remove();
      this.cacheElements();
    }
  }

  /**
   * Enable/disable navigation
   * @param {boolean} enabled - Enable or disable navigation
   */
  setNavigationEnabled(enabled) {
    this.navLinks.forEach(link => {
      link.style.pointerEvents = enabled ? 'auto' : 'none';
      link.style.opacity = enabled ? '1' : '0.5';
    });
  }
}

export default NavigationManager;
