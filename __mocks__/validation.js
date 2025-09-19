// Manual mock for validation module
const validateTheme = jest.fn((theme) => theme === 'light' || theme === 'dark' ? theme : 'light');

const safeLocalStorageGet = jest.fn((key, defaultValue) => {
  try {
    // Simulate localStorage access - check if key is valid
    const validKeys = ['theme'];
    if (!validKeys.includes(key)) {
      return defaultValue;
    }
    // For testing, return the actual value if it's valid
    const value = global.localStorage ? global.localStorage.getItem(key) : null;
    if (value && typeof value === 'string' && value.length <= 1000) {
      // Check if the value is a valid theme
      if (key === 'theme' && !['light', 'dark'].includes(value)) {
        return defaultValue;
      }
      return value;
    }
    return defaultValue;
  } catch (error) {
    console.warn('localStorage access failed:', error);
    return defaultValue;
  }
});

const safeLocalStorageSet = jest.fn((key, value) => {
  try {
    // Simulate localStorage set - check if key and value are valid
    const validKeys = ['theme'];
    if (!validKeys.includes(key) || typeof value !== 'string' || value.length > 1000) {
      return false;
    }
    // Check if the value is a valid theme
    if (key === 'theme' && !['light', 'dark'].includes(value)) {
      return false;
    }
    // For testing, actually set the value
    if (global.localStorage) {
      global.localStorage.setItem(key, value);
    } else {
      // If localStorage is not available, return false
      return false;
    }
    return true;
  } catch (error) {
    console.warn('localStorage write failed:', error);
    return false;
  }
});

const validateSearchQuery = jest.fn((query) => {
  if (typeof query !== 'string') {
    return '';
  }
  // Simulate sanitization and trimming - match actual behavior
  const sanitized = query.replace(/<[^>]*>/g, '').replace(/[<>'"&]/g, '').trim();
  return sanitized.length > 100 ? sanitized.substring(0, 100) : sanitized;
});

const validatePageId = jest.fn((pageId) => {
  if (typeof pageId !== 'string') {
    return 'default';
  }
  // Simulate sanitization
  const sanitized = pageId.replace(/[^a-zA-Z0-9-_]/g, '');
  return sanitized || 'default';
});

const sanitizeString = jest.fn((input) => {
  if (typeof input !== 'string') {
    return '';
  }
  // Simulate HTML tag removal and trimming - match actual behavior
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"]/g, '') // Don't remove & character
    .trim();
});

const validateLocalStorageData = jest.fn((key, value) => {
  const validKeys = ['theme'];
  return validKeys.includes(key) && typeof value === 'string' && value.length <= 1000;
});

module.exports = {
  validateTheme,
  safeLocalStorageGet,
  safeLocalStorageSet,
  validateSearchQuery,
  validatePageId,
  sanitizeString,
  validateLocalStorageData,
};
