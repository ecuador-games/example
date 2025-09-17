/**
 * Form management system
 */
import { Validator } from '../utils/validation.js';
import { userApiService } from '../utils/api.js';
import { notificationManager } from '../utils/notification.js';

export class FormManager {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.isEditMode = false;
        this.currentUserId = null;
        
        this.init();
    }

    /**
     * Initialize form manager
     */
    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFormValidation();
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        // Add required attributes and validation
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(field, 'Este campo es requerido');
            });
        });
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        const validation = Validator.validateUserForm(formData);
        
        if (!validation.isValid) {
            this.showValidationErrors(validation.errors);
            return;
        }

        try {
            await this.saveUser(formData);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }

    /**
     * Get form data as object
     * @returns {Object} Form data
     */
    getFormData() {
        const formData = new FormData(this.form);
        return Object.fromEntries(formData);
    }

    /**
     * Save user (create or update)
     * @param {Object} userData - User data
     */
    async saveUser(userData) {
        let response;
        
        if (this.isEditMode && this.currentUserId) {
            response = await userApiService.updateUser(this.currentUserId, userData);
        } else {
            response = await userApiService.createUser(userData);
        }

        if (response.code === '0') {
            notificationManager.success(response.message);
            this.resetForm();
            this.exitEditMode();
            
            // Trigger user list refresh if callback exists
            if (this.onUserSaved) {
                this.onUserSaved();
            }
        } else {
            notificationManager.error(response.message);
        }
    }

    /**
     * Validate individual field
     * @param {HTMLElement} field - Form field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.id;
        
        let validation;
        
        switch (fieldName) {
            case 'firstName':
                validation = Validator.validateField(value, 'El nombre', 3);
                break;
            case 'lastName':
                validation = Validator.validateField(value, 'El apellido', 2);
                break;
            case 'username':
                validation = Validator.validateField(value, 'El nombre de usuario', 3);
                break;
            case 'email':
                validation = { isValid: Validator.validateEmail(value), error: 'Email inválido' };
                break;
            case 'phoneNumber':
                if (value) {
                    validation = { isValid: Validator.validatePhone(value), error: 'Teléfono inválido' };
                } else {
                    validation = { isValid: true };
                }
                break;
            case 'password':
                if (value && !this.isEditMode) {
                    const passwordValidation = Validator.validatePassword(value);
                    validation = { isValid: passwordValidation.isValid, error: passwordValidation.errors[0] };
                } else {
                    validation = { isValid: true };
                }
                break;
            default:
                validation = { isValid: true };
        }

        if (!validation.isValid) {
            this.showFieldError(field, validation.error);
        } else {
            this.clearFieldError(field);
        }
    }

    /**
     * Show field error
     * @param {HTMLElement} field - Form field
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Clear field error
     * @param {HTMLElement} field - Form field
     */
    clearFieldError(field) {
        field.classList.remove('is-invalid');
        
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Show validation errors
     * @param {Array} errors - Array of error messages
     */
    showValidationErrors(errors) {
        errors.forEach(error => {
            notificationManager.error(error);
        });
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();
        this.clearAllErrors();
        this.showPasswordField();
    }

    /**
     * Clear all field errors
     */
    clearAllErrors() {
        const invalidFields = this.form.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => {
            this.clearFieldError(field);
        });
    }

    /**
     * Show password field
     */
    showPasswordField() {
        const passwordDiv = document.getElementById('div_pwd');
        if (passwordDiv) {
            passwordDiv.style.display = '';
        }
    }

    /**
     * Hide password field
     */
    hidePasswordField() {
        const passwordDiv = document.getElementById('div_pwd');
        if (passwordDiv) {
            passwordDiv.style.display = 'none';
        }
    }

    /**
     * Enter edit mode
     * @param {Object} userData - User data to edit
     */
    enterEditMode(userData) {
        this.isEditMode = true;
        this.currentUserId = userData.id;
        
        // Populate form with user data
        this.populateForm(userData);
        this.hidePasswordField();
    }

    /**
     * Exit edit mode
     */
    exitEditMode() {
        this.isEditMode = false;
        this.currentUserId = null;
        this.showPasswordField();
    }

    /**
     * Populate form with user data
     * @param {Object} userData - User data
     */
    populateForm(userData) {
        const fields = ['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'address'];
        
        fields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"], #${fieldName}`);
            if (field && userData[fieldName]) {
                field.value = userData[fieldName];
            }
        });
    }

    /**
     * Set callback for when user is saved
     * @param {Function} callback - Callback function
     */
    setOnUserSaved(callback) {
        this.onUserSaved = callback;
    }
}

export default FormManager;
