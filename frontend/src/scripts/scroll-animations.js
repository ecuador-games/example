/**
 * Scroll animations system
 */
import { CONFIG } from '../config/config.js';

export class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        
        this.init();
    }

    /**
     * Initialize scroll animation manager
     */
    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    /**
     * Setup intersection observer
     */
    setupIntersectionObserver() {
        const options = {
            threshold: CONFIG.ANIMATION.SCROLL_THRESHOLD,
            rootMargin: CONFIG.ANIMATION.SCROLL_ROOT_MARGIN
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
    }

    /**
     * Observe elements for animation
     */
    observeElements() {
        const elementsToAnimate = document.querySelectorAll(
            '.card-glass, .section, .animate-on-scroll, [data-animate]'
        );

        elementsToAnimate.forEach(element => {
            this.addAnimationClass(element);
            this.observer.observe(element);
        });
    }

    /**
     * Add animation class to element
     * @param {HTMLElement} element - Element to animate
     */
    addAnimationClass(element) {
        if (!element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
        }
    }

    /**
     * Animate element when it comes into view
     * @param {HTMLElement} element - Element to animate
     */
    animateElement(element) {
        if (this.animatedElements.has(element)) return;
        
        this.animatedElements.add(element);
        element.classList.add('visible');
        
        // Add stagger delay for multiple elements
        this.addStaggerDelay(element);
    }

    /**
     * Add stagger delay for grouped elements
     * @param {HTMLElement} element - Element to add delay to
     */
    addStaggerDelay(element) {
        const parent = element.parentElement;
        if (!parent) return;
        
        const siblings = Array.from(parent.children).filter(child => 
            child.classList.contains('animate-on-scroll')
        );
        
        const index = siblings.indexOf(element);
        if (index > 0) {
            element.style.animationDelay = `${index * 100}ms`;
        }
    }

    /**
     * Add element to animation observer
     * @param {HTMLElement} element - Element to observe
     */
    addElement(element) {
        this.addAnimationClass(element);
        this.observer.observe(element);
    }

    /**
     * Remove element from animation observer
     * @param {HTMLElement} element - Element to stop observing
     */
    removeElement(element) {
        this.observer.unobserve(element);
        this.animatedElements.delete(element);
    }

    /**
     * Reset all animations
     */
    resetAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('visible');
        });
        this.animatedElements.clear();
    }

    /**
     * Animate element immediately
     * @param {HTMLElement} element - Element to animate
     */
    animateImmediately(element) {
        this.addAnimationClass(element);
        this.animateElement(element);
    }

    /**
     * Add custom animation to element
     * @param {HTMLElement} element - Element to animate
     * @param {string} animationClass - CSS animation class
     * @param {number} delay - Animation delay in milliseconds
     */
    addCustomAnimation(element, animationClass, delay = 0) {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    }

    /**
     * Remove custom animation from element
     * @param {HTMLElement} element - Element to remove animation from
     * @param {string} animationClass - CSS animation class to remove
     */
    removeCustomAnimation(element, animationClass) {
        element.classList.remove(animationClass);
    }

    /**
     * Create parallax effect
     * @param {HTMLElement} element - Element to apply parallax to
     * @param {number} speed - Parallax speed (0-1)
     */
    createParallax(element, speed = 0.5) {
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            element.style.transform = `translateY(${rate}px)`;
        };

        window.addEventListener('scroll', updateParallax);
        
        // Return cleanup function
        return () => {
            window.removeEventListener('scroll', updateParallax);
        };
    }

    /**
     * Animate counter numbers
     * @param {HTMLElement} element - Element containing number
     * @param {number} target - Target number
     * @param {number} duration - Animation duration in milliseconds
     */
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    /**
     * Destroy animation manager
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }
}

export default ScrollAnimationManager;
