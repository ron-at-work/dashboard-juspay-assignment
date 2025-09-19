import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../../src/contexts/ThemeContext';

// Import the mocked validation functions
const { safeLocalStorageGet, safeLocalStorageSet, validateTheme } = require('../../__mocks__/validation');



// Test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="is-dark">{isDark.toString()}</div>
      <div data-testid="is-light">{isLight.toString()}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    safeLocalStorageGet.mockReturnValue('light');
    safeLocalStorageSet.mockReturnValue(true);
  });

  describe('ThemeProvider', () => {
    it('should provide default light theme', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
      expect(screen.getByTestId('is-light')).toHaveTextContent('true');
    });

    it('should load theme from localStorage on mount', () => {
      safeLocalStorageGet.mockReturnValue('dark');
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(safeLocalStorageGet).toHaveBeenCalledWith('theme', 'light');
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should toggle theme when toggleTheme is called', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      await user.click(screen.getByTestId('toggle-theme'));

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
      expect(screen.getByTestId('is-light')).toHaveTextContent('false');
    });

    it('should save theme to localStorage when changed', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('toggle-theme'));

      expect(safeLocalStorageSet).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should set data-theme attribute on document element', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      await user.click(screen.getByTestId('toggle-theme'));

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle localStorage errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      safeLocalStorageGet.mockImplementation((key, defaultValue) => {
        console.warn('localStorage access failed:', new Error('localStorage error'));
        return defaultValue;
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(consoleSpy).toHaveBeenCalledWith('localStorage access failed:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');
      
      consoleSpy.mockRestore();
    });

    it('should provide all theme context values', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toBeInTheDocument();
      expect(screen.getByTestId('is-dark')).toBeInTheDocument();
      expect(screen.getByTestId('is-light')).toBeInTheDocument();
      expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
    });
  });

  describe('Theme persistence', () => {
    it('should persist theme changes across re-renders', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('toggle-theme'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      // Re-render the component
      rerender(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });
});
