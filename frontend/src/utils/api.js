/**
 * API utility for making HTTP requests
 */
import { CONFIG } from '../config/config.js';
import { notificationManager } from './notification.js';

export class ApiClient {
    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
        this.timeout = CONFIG.API.TIMEOUT;
    }

    /**
     * Make HTTP request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Response promise
     */
    async request(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            signal: controller.signal
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            
            throw error;
        }
    }

    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise} Response promise
     */
    async get(endpoint, params = {}) {
        const url = new URL(`${this.baseURL}${endpoint}`);
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        return this.request(url.toString(), { method: 'GET' });
    }

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body data
     * @returns {Promise} Response promise
     */
    async post(endpoint, data) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body data
     * @returns {Promise} Response promise
     */
    async put(endpoint, data) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @returns {Promise} Response promise
     */
    async delete(endpoint) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'DELETE'
        });
    }
}

export class UserApiService {
    constructor() {
        this.apiClient = new ApiClient();
    }

    /**
     * Get all users
     * @returns {Promise} Users list
     */
    async getUsers() {
        try {
            const response = await this.apiClient.get(CONFIG.API.ENDPOINTS.USER);
            return response;
        } catch (error) {
            notificationManager.error('Error al cargar usuarios');
            throw error;
        }
    }

    /**
     * Get user by ID
     * @param {number} id - User ID
     * @returns {Promise} User data
     */
    async getUserById(id) {
        try {
            const response = await this.apiClient.get(CONFIG.API.ENDPOINTS.USER_BY_ID(id));
            return response;
        } catch (error) {
            notificationManager.error('Error al cargar usuario');
            throw error;
        }
    }

    /**
     * Search users
     * @param {string} searchText - Search text
     * @returns {Promise} Search results
     */
    async searchUsers(searchText) {
        try {
            const response = await this.apiClient.get(CONFIG.API.ENDPOINTS.USER_SEARCH, {
                textSearch: searchText
            });
            return response;
        } catch (error) {
            notificationManager.error('Error al buscar usuarios');
            throw error;
        }
    }

    /**
     * Create new user
     * @param {Object} userData - User data
     * @returns {Promise} Created user
     */
    async createUser(userData) {
        try {
            const response = await this.apiClient.post(CONFIG.API.ENDPOINTS.USER, userData);
            return response;
        } catch (error) {
            notificationManager.error('Error al crear usuario');
            throw error;
        }
    }

    /**
     * Update user
     * @param {number} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise} Updated user
     */
    async updateUser(id, userData) {
        try {
            const response = await this.apiClient.put(CONFIG.API.ENDPOINTS.USER_BY_ID(id), userData);
            return response;
        } catch (error) {
            notificationManager.error('Error al actualizar usuario');
            throw error;
        }
    }

    /**
     * Delete user
     * @param {number} id - User ID
     * @returns {Promise} Deletion result
     */
    async deleteUser(id) {
        try {
            const response = await this.apiClient.delete(CONFIG.API.ENDPOINTS.USER_BY_ID(id));
            return response;
        } catch (error) {
            notificationManager.error('Error al eliminar usuario');
            throw error;
        }
    }
}

// Create global instance
export const userApiService = new UserApiService();

export default ApiClient;
