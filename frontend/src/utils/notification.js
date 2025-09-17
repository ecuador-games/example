/**
 * Notification utility for showing messages to users
 */
import { CONFIG } from '../config/config.js';

export class NotificationManager {
    constructor() {
        this.notifications = new Set();
    }

    /**
     * Show a notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds (optional)
     */
    show(message, type = 'info', duration = CONFIG.NOTIFICATION.AUTO_HIDE_DELAY) {
        const notification = this.createNotification(message, type);
        this.addToDOM(notification);
        this.notifications.add(notification);

        // Auto remove after duration
        setTimeout(() => {
            this.remove(notification);
        }, duration);
    }

    /**
     * Create notification element
     * @param {string} message - Message to display
     * @param {string} type - Type of notification
     * @returns {HTMLElement} Notification element
     */
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: CONFIG.NOTIFICATION.POSITION.TOP,
            right: CONFIG.NOTIFICATION.POSITION.RIGHT,
            zIndex: '1050',
            minWidth: '300px',
            maxWidth: '400px',
            padding: '16px',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            animation: 'slideInRight 0.3s ease-out',
            background: this.getBackgroundColor(type),
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-lg)'
        });

        // Create content
        notification.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <i class="${this.getIcon(type)} me-2"></i>
                    <span>${message}</span>
                </div>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        return notification;
    }

    /**
     * Get background color for notification type
     * @param {string} type - Notification type
     * @returns {string} Background color
     */
    getBackgroundColor(type) {
        const colors = {
            success: 'var(--bg-card)',
            error: 'var(--bg-card)',
            warning: 'var(--bg-card)',
            info: 'var(--bg-card)'
        };
        return colors[type] || colors.info;
    }

    /**
     * Get icon for notification type
     * @param {string} type - Notification type
     * @returns {string} Icon class
     */
    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle text-success',
            error: 'fas fa-exclamation-circle text-danger',
            warning: 'fas fa-exclamation-triangle text-warning',
            info: 'fas fa-info-circle text-primary'
        };
        return icons[type] || icons.info;
    }

    /**
     * Add notification to DOM
     * @param {HTMLElement} notification - Notification element
     */
    addToDOM(notification) {
        document.body.appendChild(notification);
    }

    /**
     * Remove notification
     * @param {HTMLElement} notification - Notification element
     */
    remove(notification) {
        if (notification && notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
                this.notifications.delete(notification);
            }, 300);
        }
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }

    /**
     * Show success notification
     * @param {string} message - Success message
     */
    success(message) {
        this.show(message, 'success');
    }

    /**
     * Show error notification
     * @param {string} message - Error message
     */
    error(message) {
        this.show(message, 'error');
    }

    /**
     * Show warning notification
     * @param {string} message - Warning message
     */
    warning(message) {
        this.show(message, 'warning');
    }

    /**
     * Show info notification
     * @param {string} message - Info message
     */
    info(message) {
        this.show(message, 'info');
    }
}

// Create global instance
export const notificationManager = new NotificationManager();

export default NotificationManager;
