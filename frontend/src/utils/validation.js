/**
 * Validation utilities
 */
import { CONFIG } from '../config/config.js';

export class Validator {
    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} Validation result with errors
     */
    static validatePassword(password) {
        const errors = [];
        const { MIN_PASSWORD_LENGTH, REQUIRE_NUMBER, REQUIRE_SPECIAL_CHAR, SPECIAL_CHARS } = CONFIG.FORM.PASSWORD;

        // Check minimum length
        if (password.length < MIN_PASSWORD_LENGTH) {
            errors.push(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
        }

        // Check for number
        if (REQUIRE_NUMBER && !/\d/.test(password)) {
            errors.push('La contraseña debe tener al menos un número');
        }

        // Check for special character
        if (REQUIRE_SPECIAL_CHAR && !SPECIAL_CHARS.test(password)) {
            errors.push('La contraseña debe tener al menos un carácter especial');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number
     * @param {string} phone - Phone number to validate
     * @returns {boolean} Is valid phone
     */
    static validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Validate form field
     * @param {string} value - Field value
     * @param {string} fieldName - Field name
     * @param {number} minLength - Minimum length
     * @returns {Object} Validation result
     */
    static validateField(value, fieldName, minLength = 1) {
        if (!value || value.trim().length < minLength) {
            return {
                isValid: false,
                error: `${fieldName} debe tener al menos ${minLength} caracteres`
            };
        }
        return { isValid: true };
    }

    /**
     * Validate user form data
     * @param {Object} formData - Form data object
     * @returns {Object} Validation result
     */
    static validateUserForm(formData) {
        const errors = [];
        const { VALIDATION } = CONFIG.FORM;

        // Validate first name
        const firstNameValidation = this.validateField(
            formData.firstName, 
            'El nombre', 
            VALIDATION.MIN_NAME_LENGTH
        );
        if (!firstNameValidation.isValid) {
            errors.push(firstNameValidation.error);
        }

        // Validate last name
        const lastNameValidation = this.validateField(
            formData.lastName, 
            'El apellido', 
            VALIDATION.MIN_LASTNAME_LENGTH
        );
        if (!lastNameValidation.isValid) {
            errors.push(lastNameValidation.error);
        }

        // Validate username
        const usernameValidation = this.validateField(
            formData.username, 
            'El nombre de usuario', 
            VALIDATION.MIN_USERNAME_LENGTH
        );
        if (!usernameValidation.isValid) {
            errors.push(usernameValidation.error);
        }

        // Validate email
        if (!this.validateEmail(formData.email)) {
            errors.push('Debe ingresar un email válido');
        }

        // Validate phone
        if (formData.phoneNumber && !this.validatePhone(formData.phoneNumber)) {
            errors.push('Debe ingresar un número de teléfono válido');
        }

        // Validate password (only for new users)
        if (formData.password) {
            const passwordValidation = this.validatePassword(formData.password);
            if (!passwordValidation.isValid) {
                errors.push(...passwordValidation.errors);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

export default Validator;
