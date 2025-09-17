/**
 * Main application entry point
 */
import ThemeManager from './theme-manager.js';
import FormManager from './form-manager.js';
import UserManager from './user-manager.js';
import NavigationManager from './navigation-manager.js';
import ScrollAnimationManager from './scroll-animations.js';

export class App {
    constructor() {
        this.themeManager = null;
        this.formManager = null;
        this.userManager = null;
        this.navigationManager = null;
        this.scrollAnimationManager = null;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeApp());
            } else {
                this.initializeApp();
            }
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    /**
     * Initialize all app components
     */
    async initializeApp() {
        console.log('🚀 Initializing ModernApp...');
        
        // Initialize managers
        this.themeManager = new ThemeManager();
        this.formManager = new FormManager('contactForm');
        this.userManager = new UserManager();
        this.navigationManager = new NavigationManager();
        this.scrollAnimationManager = new ScrollAnimationManager();
        
        // Set up global references for backward compatibility
        window.userManager = this.userManager;
        window.formManager = this.formManager;
        
        // Connect form and user managers
        this.formManager.setOnUserSaved(() => {
            this.userManager.refresh();
        });
        
        // Initialize global functions for backward compatibility
        this.setupGlobalFunctions();
        
        // Update current year
        this.updateCurrentYear();
        
        // Log successful initialization
        this.logInitialization();
    }

    /**
     * Setup global functions for backward compatibility
     */
    setupGlobalFunctions() {
        // Search functions
        window.searchUser = () => {
            const query = document.getElementById('searchInput')?.value || '';
            this.userManager.searchUsers(query);
        };

        window.clearSearch = () => {
            this.userManager.clearSearch();
        };
    }

    /**
     * Update current year in footer
     */
    updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Log initialization success
     */
    logInitialization() {
        console.log('✅ ModernApp initialized successfully!');
        console.log('📋 Available features:');
        console.log('  • Theme management (light/dark mode)');
        console.log('  • Form validation and submission');
        console.log('  • User management (CRUD operations)');
        console.log('  • Smooth navigation');
        console.log('  • Scroll animations');
        console.log('  • Responsive design');
        console.log('  • Modern UI components');
    }

    /**
     * Get theme manager instance
     * @returns {ThemeManager} Theme manager
     */
    getThemeManager() {
        return this.themeManager;
    }

    /**
     * Get form manager instance
     * @returns {FormManager} Form manager
     */
    getFormManager() {
        return this.formManager;
    }

    /**
     * Get user manager instance
     * @returns {UserManager} User manager
     */
    getUserManager() {
        return this.userManager;
    }

    /**
     * Get navigation manager instance
     * @returns {NavigationManager} Navigation manager
     */
    getNavigationManager() {
        return this.navigationManager;
    }

    /**
     * Get scroll animation manager instance
     * @returns {ScrollAnimationManager} Scroll animation manager
     */
    getScrollAnimationManager() {
        return this.scrollAnimationManager;
    }

    /**
     * Destroy app and cleanup
     */
    destroy() {
        if (this.scrollAnimationManager) {
            this.scrollAnimationManager.destroy();
        }
        
        // Clear global references
        window.userManager = null;
        window.formManager = null;
        window.searchUser = null;
        window.clearSearch = null;
    }
}

// Initialize app when script loads
const app = new App();

// Export for potential external use
export default app;
