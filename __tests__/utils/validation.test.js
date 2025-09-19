const validation = require('../../src/utils/validation');

describe('validation utilities', () => {
  describe('validateTheme', () => {
    it('should return valid theme when theme is light', () => {
      expect(validation.validateTheme('light')).toBe('light');
    });

    it('should return valid theme when theme is dark', () => {
      expect(validation.validateTheme('dark')).toBe('dark');
    });

    it('should return default theme when theme is invalid', () => {
      expect(validation.validateTheme('invalid')).toBe('light');
    });

    it('should return default theme when theme is null', () => {
      expect(validation.validateTheme(null)).toBe('light');
    });

    it('should return default theme when theme is undefined', () => {
      expect(validation.validateTheme(undefined)).toBe('light');
    });

    it('should return default theme when theme is empty string', () => {
      expect(validation.validateTheme('')).toBe('light');
    });
  });

  describe('validation.safeLocalStorageGet', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    it('should return stored value when key exists and is valid', () => {
      localStorage.setItem('theme', 'light');
      expect(validation.safeLocalStorageGet('theme', 'default')).toBe('light');
    });

    it('should return default value when key does not exist', () => {
      expect(validation.safeLocalStorageGet('non-existent-key', 'default')).toBe('default');
    });

    it('should return default value when localStorage is not available', () => {
      // Mock localStorage to throw an error
      const originalLocalStorage = global.localStorage;
      delete global.localStorage;
      
      expect(validation.safeLocalStorageGet('theme', 'default')).toBe('default');
      
      // Restore localStorage
      global.localStorage = originalLocalStorage;
    });

    it('should return default value for invalid key', () => {
      localStorage.setItem('invalid-key', 'some-value');
      expect(validation.safeLocalStorageGet('invalid-key', 'default')).toBe('default');
    });

    it('should return default value for invalid value', () => {
      localStorage.setItem('theme', 'invalid-theme');
      expect(validation.safeLocalStorageGet('theme', 'default')).toBe('default');
    });

    it('should handle null default value', () => {
      expect(validation.safeLocalStorageGet('non-existent-key', null)).toBe(null);
    });

    it('should handle undefined default value', () => {
      expect(validation.safeLocalStorageGet('non-existent-key', undefined)).toBe(undefined);
    });
  });

  describe('validation.safeLocalStorageSet', () => {
    beforeEach(() => {
      if (global.localStorage) {
        localStorage.clear();
      }
    });

    it('should store valid value when localStorage is available', () => {
      const result = validation.safeLocalStorageSet('theme', 'light');
      expect(result).toBe(true);
      if (global.localStorage) {
        expect(localStorage.getItem('theme')).toBe('light');
      }
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalLocalStorage = global.localStorage;
      delete global.localStorage;
      
      // Should not throw an error and return false
      expect(validation.safeLocalStorageSet('theme', 'light')).toBe(false);
      
      // Restore localStorage
      global.localStorage = originalLocalStorage;
    });

    it('should return false for invalid key', () => {
      const result = validation.safeLocalStorageSet('invalid-key', 'some-value');
      expect(result).toBe(false);
      if (global.localStorage) {
        expect(localStorage.getItem('invalid-key')).toBe(null);
      }
    });

    it('should return false for invalid value', () => {
      const result = validation.safeLocalStorageSet('theme', 'invalid-theme');
      expect(result).toBe(false);
      if (global.localStorage) {
        expect(localStorage.getItem('theme')).toBe(null);
      }
    });

    it('should return false for null values', () => {
      const result = validation.safeLocalStorageSet('theme', null);
      expect(result).toBe(false);
      if (global.localStorage) {
        expect(localStorage.getItem('theme')).toBe(null);
      }
    });

    it('should return false for undefined values', () => {
      const result = validation.safeLocalStorageSet('theme', undefined);
      expect(result).toBe(false);
      if (global.localStorage) {
        expect(localStorage.getItem('theme')).toBe(null);
      }
    });
  });

  describe('validation.validateSearchQuery', () => {
    it('should return valid search query', () => {
      expect(validation.validateSearchQuery('test query')).toBe('test query');
    });

    it('should sanitize and trim search query', () => {
      expect(validation.validateSearchQuery('  test query  ')).toBe('test query');
    });

    it('should return empty string for null input', () => {
      expect(validation.validateSearchQuery(null)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(validation.validateSearchQuery(undefined)).toBe('');
    });

    it('should handle empty string', () => {
      expect(validation.validateSearchQuery('')).toBe('');
    });

    it('should sanitize special characters', () => {
      expect(validation.validateSearchQuery('test@#$%^&*()')).toBe('test@#$%^*()');
    });

    it('should limit long queries', () => {
      const longQuery = 'a'.repeat(150);
      expect(validation.validateSearchQuery(longQuery).length).toBe(100);
    });
  });

  describe('validation.validatePageId', () => {
    it('should return valid page ID', () => {
      expect(validation.validatePageId('orders')).toBe('orders');
    });

    it('should sanitize invalid characters in page ID', () => {
      expect(validation.validatePageId('invalid-page!@#')).toBe('invalid-page');
    });

    it('should return default page ID for null input', () => {
      expect(validation.validatePageId(null)).toBe('default');
    });

    it('should return default page ID for undefined input', () => {
      expect(validation.validatePageId(undefined)).toBe('default');
    });

    it('should return default page ID for empty string', () => {
      expect(validation.validatePageId('')).toBe('default');
    });

    it('should handle valid page IDs', () => {
      const validPages = ['default', 'orders', 'analytics', 'profile'];
      validPages.forEach(page => {
        expect(validation.validatePageId(page)).toBe(page);
      });
    });
  });

  describe('validation.sanitizeString', () => {
    it('should sanitize HTML tags', () => {
      expect(validation.sanitizeString('<script>alert("xss")</script>')).toBe('');
    });

    it('should sanitize dangerous attributes', () => {
      expect(validation.sanitizeString('<img src="x" onerror="alert(1)">')).toBe('');
    });

    it('should remove all HTML tags', () => {
      expect(validation.sanitizeString('<p>Safe content</p>')).toBe('Safe content');
    });

    it('should handle plain text', () => {
      expect(validation.sanitizeString('Plain text content')).toBe('Plain text content');
    });

    it('should handle null input', () => {
      expect(validation.sanitizeString(null)).toBe('');
    });

    it('should handle undefined input', () => {
      expect(validation.sanitizeString(undefined)).toBe('');
    });

    it('should handle empty string', () => {
      expect(validation.sanitizeString('')).toBe('');
    });

    it('should handle special characters', () => {
      expect(validation.sanitizeString('Special chars: !@#$%^&*()')).toBe('Special chars: !@#$%^&*()');
    });

    it('should handle complex HTML', () => {
      const complexHtml = '<div class="safe"><p>Content</p><script>alert("xss")</script></div>';
      expect(validation.sanitizeString(complexHtml)).toBe('Content');
    });
  });
});