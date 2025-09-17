/**
 * User management system
 */
import { CONFIG } from '../config/config.js';
import { userApiService } from '../utils/api.js';
import { notificationManager } from '../utils/notification.js';

export class UserManager {
  constructor() {
    this.users = [];
    this.filteredUsers = [];
    this.isSearchMode = false;
    this.searchQuery = '';
    this.searchTimeout = null;

    this.init();
  }

  /**
   * Initialize user manager
   */
  async init() {
    await this.loadUsers();
    this.bindEvents();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => this.handleSearchInput(e));
    }
  }

  /**
   * Load users from API
   */
  async loadUsers() {
    try {
      const response = await userApiService.getUsers();

      if (response.code === '0') {
        this.users = response.data || [];
        this.filteredUsers = [...this.users];
        this.renderUsers();
      } else {
        notificationManager.error('Error al cargar usuarios');
      }
    } catch (error) {
      console.error('Error loading users:', error);
      notificationManager.error('Error al cargar usuarios');
    }
  }

  /**
   * Handle search input with debouncing
   * @param {Event} e - Input event
   */
  handleSearchInput(e) {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set new timeout for debounced search
    this.searchTimeout = setTimeout(() => {
      this.searchUsers(query);
    }, CONFIG.SEARCH.DEBOUNCE_DELAY);
  }

  /**
   * Search users
   * @param {string} query - Search query
   */
  async searchUsers(query) {
    this.searchQuery = query;

    if (!query || query.length < CONFIG.SEARCH.MIN_QUERY_LENGTH) {
      this.isSearchMode = false;
      this.filteredUsers = [...this.users];
    } else {
      this.isSearchMode = true;
      try {
        const response = await userApiService.searchUsers(query);

        if (response.code === '0') {
          this.filteredUsers = response.data || [];
        } else {
          this.filteredUsers = [];
          notificationManager.warning('No se encontraron resultados');
        }
      } catch (error) {
        console.error('Error searching users:', error);
        this.filteredUsers = [];
      }
    }

    this.renderUsers();
  }

  /**
   * Clear search
   */
  clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
    }
    this.searchUsers('');
  }

  /**
   * Render users table
   */
  renderUsers() {
    const tableContainer = document.getElementById('usersTable');
    if (!tableContainer) {
      return;
    }

    if (this.filteredUsers.length === 0) {
      tableContainer.innerHTML = this.getEmptyStateHTML();
      return;
    }

    const tableHTML = this.generateTableHTML();
    tableContainer.innerHTML = tableHTML;
  }

  /**
   * Generate table HTML
   * @returns {string} Table HTML
   */
  generateTableHTML() {
    const tableHeader = `
            <table class="table-modern">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

    const tableRows = this.filteredUsers
      .map(
        user => `
            <tr>
                <td>${user.id}</td>
                <td>${this.getFullName(user)}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber || '-'}</td>
                <td>
                    <button class="btn-modern btn-sm btn-outline-modern me-2"
                            onclick="userManager.editUser(${user.id})"
                            title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-modern btn-sm btn-outline-modern"
                            onclick="userManager.deleteUser(${user.id})"
                            title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
      )
      .join('');

    return `${tableHeader + tableRows}</tbody></table>`;
  }

  /**
   * Get empty state HTML
   * @returns {string} Empty state HTML
   */
  getEmptyStateHTML() {
    return `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No se encontraron usuarios</h5>
                <p class="text-muted">
                    ${this.isSearchMode ? 'Intenta con otros términos de búsqueda' : 'No hay usuarios registrados'}
                </p>
            </div>
        `;
  }

  /**
   * Get full name from user object
   * @param {Object} user - User object
   * @returns {string} Full name
   */
  getFullName(user) {
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Sin nombre';
  }

  /**
   * Edit user
   * @param {number} userId - User ID
   */
  async editUser(userId) {
    try {
      const response = await userApiService.getUserById(userId);

      if (response.code === '1' && response.data) {
        // Trigger edit mode in form manager if it exists
        if (window.formManager) {
          window.formManager.enterEditMode(response.data);
        }

        // Scroll to form
        const formSection = document.getElementById('contacto');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        notificationManager.error('Error al cargar datos del usuario');
      }
    } catch (error) {
      console.error('Error editing user:', error);
      notificationManager.error('Error al cargar datos del usuario');
    }
  }

  /**
   * Delete user
   * @param {number} userId - User ID
   */
  async deleteUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      return;
    }

    const fullName = this.getFullName(user);
    const confirmed = await this.showDeleteConfirmation(fullName);

    if (confirmed) {
      try {
        const response = await userApiService.deleteUser(userId);

        if (response.code === '1') {
          notificationManager.success('Usuario eliminado correctamente');
          await this.loadUsers(); // Reload users
        } else {
          notificationManager.error(response.message || 'Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        notificationManager.error('Error al eliminar usuario');
      }
    }
  }

  /**
   * Show delete confirmation dialog
   * @param {string} userName - User name
   * @returns {Promise<boolean>} Confirmation result
   */
  showDeleteConfirmation(userName) {
    return new Promise(resolve => {
      const confirmed = confirm(`¿Estás seguro de eliminar a ${userName}?`);
      resolve(confirmed);
    });
  }

  /**
   * Refresh users list
   */
  async refresh() {
    await this.loadUsers();
  }

  /**
   * Get users count
   * @returns {number} Users count
   */
  getUsersCount() {
    return this.users.length;
  }

  /**
   * Get filtered users count
   * @returns {number} Filtered users count
   */
  getFilteredUsersCount() {
    return this.filteredUsers.length;
  }
}

export default UserManager;
