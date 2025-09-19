/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitizes string input by removing potentially dangerous characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags and potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"&]/g, '')
    .trim();
};

/**
 * Validates theme value
 * @param {string} theme - Theme value to validate
 * @returns {string} - Valid theme or default
 */
export const validateTheme = (theme) => {
  const validThemes = ['light', 'dark'];
  return validThemes.includes(theme) ? theme : 'light';
};

/**
 * Validates search query
 * @param {string} query - Search query to validate
 * @returns {string} - Validated and sanitized query
 */
export const validateSearchQuery = (query) => {
  if (typeof query !== 'string') {
    return '';
  }
  
  // Limit length and sanitize
  const sanitized = sanitizeString(query);
  return sanitized.length > 100 ? sanitized.substring(0, 100) : sanitized;
};

/**
 * Validates page ID
 * @param {string} pageId - Page ID to validate
 * @returns {string} - Validated page ID or default
 */
export const validatePageId = (pageId) => {
  if (typeof pageId !== 'string') {
    return 'default';
  }
  
  // Allow only alphanumeric characters, hyphens, and underscores
  const sanitized = pageId.replace(/[^a-zA-Z0-9-_]/g, '');
  return sanitized || 'default';
};

/**
 * Validates localStorage data
 * @param {string} key - localStorage key
 * @param {string} value - localStorage value
 * @returns {boolean} - Whether the data is valid
 */
export const validateLocalStorageData = (key, value) => {
  const validKeys = ['theme'];
  
  if (!validKeys.includes(key)) {
    return false;
  }
  
  if (typeof value !== 'string') {
    return false;
  }
  
  // Check for reasonable length
  if (value.length > 1000) {
    return false;
  }
  
  return true;
};

/**
 * Safe localStorage getter with validation
 * @param {string} key - localStorage key
 * @param {string} defaultValue - Default value if invalid
 * @returns {string} - Validated value or default
 */
export const safeLocalStorageGet = (key, defaultValue = '') => {
  try {
    const value = localStorage.getItem(key);
    
    if (!validateLocalStorageData(key, value)) {
      return defaultValue;
    }
    
    return value;
  } catch (error) {
    console.warn('localStorage access failed:', error);
    return defaultValue;
  }
};

/**
 * Safe localStorage setter with validation
 * @param {string} key - localStorage key
 * @param {string} value - Value to store
 * @returns {boolean} - Whether the operation was successful
 */
export const safeLocalStorageSet = (key, value) => {
  try {
    if (!validateLocalStorageData(key, value)) {
      return false;
    }
    
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn('localStorage write failed:', error);
    return false;
  }
};
