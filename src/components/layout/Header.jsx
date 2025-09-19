import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Search
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSvg from '../ui/ThemeSvg';
import { validateSearchQuery } from '../../utils/validation';

/**
 * Header component with search, navigation icons, and theme toggle
 * @param {Object} props - Component props
 * @param {Object} props.header - Header data from JSON
 * @param {Function} props.onToggleSidebar - Function to toggle left sidebar
 * @param {Function} props.onToggleRightSidebar - Function to toggle right sidebar
 * @param {string} props.currentPage - Current active page ID
 */
const Header = React.memo(({ header, onToggleSidebar, onToggleRightSidebar, onToggleLeftSidebar, currentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    // Validate and sanitize search query
    const validatedQuery = validateSearchQuery(searchQuery);
    if (validatedQuery) {
      // Search logic would go here
      console.log('Searching for:', validatedQuery);
    }
  }, [searchQuery]);

  // Combined toggle function that works for both desktop and mobile
  const handleToggleSidebar = useCallback(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (isMobile) {
      // On mobile, call mobile toggle (for overlay functionality)
      if (onToggleLeftSidebar) {
        onToggleLeftSidebar();
      }
    } else {
      // On desktop, call desktop toggle (for collapse functionality)
      if (onToggleSidebar) {
        onToggleSidebar();
      }
    }
  }, [onToggleSidebar, onToggleLeftSidebar]);

  // Function to get the display name for the current page
  const getCurrentPageName = () => {
    switch (currentPage) {
      case 'default':
        return 'Default';
      case 'orders':
        return 'Orders';
      case 'ecommerce':
        return 'eCommerce';
      case 'projects':
        return 'Projects';
      case 'courses':
        return 'Online Courses';
      case 'profile':
        return 'User Profile';
      case 'account':
        return 'Account';
      case 'corporate':
        return 'Corporate';
      case 'blog':
        return 'Blog';
      case 'social':
        return 'Social';
      default:
        return 'Default';
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dashboard-card border-b border-dashboard-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Dashboards navigation - hidden on mobile */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleToggleSidebar}
              className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ThemeSvg name="collapse" className="w-5 h-5" />
            </button>
            <div className="block md:hidden">
           <h3 className=" font-semibold  tracking-wider text-dashboard-textPrimary">
              ByeWind
            </h3>  
        </div>
            <div className="hidden md:flex items-center space-x-3">
              <ThemeSvg name="star-filled" className="w-5 h-5 text-gray-600" />
              <span className="text-dashboard-textSecondary text-sm font-medium">Dashboards</span>
              <ThemeSvg name='trailing-slash' className="w-5 h-5" />
              <span className="text-dashboard-textPrimary text-sm font-medium">{getCurrentPageName()}</span>
            </div>
          </div>
        </div>

      

        {/* Right side - Search bar and Action icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className={`relative flex items-center ${theme === 'dark' ? 'bg-dashboard-bgSecondary' : 'bg-dashboard-bgQuinary'} rounded-xl px-2 py-2`}>
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(validateSearchQuery(e.target.value))}
                className="w-40 pl-2 pr-2 bg-transparent focus:ring-0 focus:outline-none border-0 transition-all duration-200 text-sm"
              />
              <span className="text-gray-400 text-xs">⌘/</span>
            </div>
          </form>

          {/* Action icons */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ThemeSvg name={theme === 'light' ? 'sun' : 'moon'} className={theme === 'light' ? 'w-5 h-5' : 'w-4 h-4'} />
          </button>
          <button className="flex items-center justify-center w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            <ThemeSvg name="history" className="w-5 h-5" />
          </button>
          <div className="relative">
            <button 
              onClick={() => {
                console.log('Bell icon clicked!', onToggleRightSidebar);
                if (onToggleRightSidebar) {
                  onToggleRightSidebar();
                }
              }}
              className="flex items-center justify-center w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ThemeSvg name="bell" className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center justify-center w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            <ThemeSvg name="collapse" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
});

Header.propTypes = {
  header: PropTypes.object,
  onToggleSidebar: PropTypes.func.isRequired,
  onToggleRightSidebar: PropTypes.func,
  onToggleLeftSidebar: PropTypes.func,
  currentPage: PropTypes.string,
};

Header.displayName = 'Header';

export default Header;
