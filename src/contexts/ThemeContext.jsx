import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { validateTheme, safeLocalStorageGet, safeLocalStorageSet } from '../utils/validation';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first with validation, then default to 'light'
    const savedTheme = safeLocalStorageGet('theme', 'light');
    return validateTheme(savedTheme);
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes with validation
    const validatedTheme = validateTheme(theme);
    safeLocalStorageSet('theme', validatedTheme);
    
    // Apply theme class to document root
    document.documentElement.setAttribute('data-theme', validatedTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
