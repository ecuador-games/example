/**
 * Configuration file for the application
 */
export const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'http://localhost:5053/api',
    ENDPOINTS: {
      USER: '/user',
      USER_BY_ID: id => `/user/${id}`,
      USER_SEARCH: '/user/Search'
    },
    TIMEOUT: 10000
  },

  // Theme Configuration
  THEME: {
    DEFAULT: 'dark',
    STORAGE_KEY: 'theme',
    TRANSITION_DURATION: 300
  },

  // Animation Configuration
  ANIMATION: {
    SCROLL_THRESHOLD: 0.1,
    SCROLL_ROOT_MARGIN: '0px 0px -50px 0px',
    FADE_DURATION: 600
  },

  // Form Configuration
  FORM: {
    VALIDATION: {
      MIN_NAME_LENGTH: 3,
      MIN_USERNAME_LENGTH: 3,
      MIN_LASTNAME_LENGTH: 2,
      MIN_EMAIL_LENGTH: 6,
      MIN_PHONE_LENGTH: 10,
      MIN_PASSWORD_LENGTH: 8
    },
    PASSWORD: {
      REQUIRE_NUMBER: true,
      REQUIRE_SPECIAL_CHAR: true,
      SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/
    }
  },

  // Notification Configuration
  NOTIFICATION: {
    AUTO_HIDE_DELAY: 3000,
    POSITION: {
      TOP: '100px',
      RIGHT: '20px'
    }
  },

  // Search Configuration
  SEARCH: {
    MIN_QUERY_LENGTH: 3,
    DEBOUNCE_DELAY: 300
  }
};

export default CONFIG;
