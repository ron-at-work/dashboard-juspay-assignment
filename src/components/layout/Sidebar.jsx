import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import PropTypes from 'prop-types';
import ThemeSvg from '../ui/ThemeSvg';
import Typography from '../ui/Typography';

/**
 * Sidebar component for navigation - Pixel perfect design
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation data from JSON
 * @param {string} props.appName - Application name
 * @param {Function} props.onPageChange - Function to handle page changes
 * @param {string} props.currentPage - Current active page ID
 */
const Sidebar = React.memo(({ navigation, appName, isCollapsed, onToggleCollapse, onPageChange, currentPage, onToggleMobileSidebar }) => {
  const [expandedItems, setExpandedItems] = useState({
    'profile': true // Default open
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Close accordion when sidebar is collapsed (only on desktop)
  React.useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(currentIsMobile);
      
      // Only apply collapse logic on desktop (lg and above)
      const isDesktop = !currentIsMobile;
      if (isDesktop && isCollapsed) {
        setExpandedItems({});
      } else {
        // Restore default state when expanded or on mobile
        setExpandedItems({ 'profile': true });
      }
    };

    // Check on mount and when isCollapsed changes
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  const toggleExpanded = useCallback((itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }, []);

  // Map icon names from JSON to SVG file names
  const iconMap = {
    chart: 'default',
    folder: 'projects',
    dashboard: 'default',
    shopping: 'ecomm',
    book: 'filled-book',
    user: 'profile',
    settings: 'account',
    building: 'group',
    edit: 'notebook',
    message: 'chats',
  };

  const renderNavItem = (item, sectionKey) => {
    const isActive = item.id === currentPage;
    const isExpanded = expandedItems[item.id] || false;
    const iconName = iconMap[item.icon] || 'default';
    
    // On mobile, always show full content (ignore collapsed state)
    const shouldShowCollapsed = !isMobile && isCollapsed;

    const handleItemClick = () => {
      if (item.subItems) {
        toggleExpanded(item.id);
      } else {
        // Handle page navigation
        onPageChange(item.id);
        
        // Close mobile sidebar when navigating to a page
        if (isMobile && onToggleMobileSidebar) {
          onToggleMobileSidebar();
        }
      }
    };

    return (
      <motion.div
        key={item.id}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`flex items-center py-1 text-sm font-medium transition-colors duration-200 ${
            isActive 
              ? `relative pl-9 rounded-lg bg-dashboard-bgSecondary text-dashboard-textPrimary  ${shouldShowCollapsed ? 'pl-0' : 'pl-3'}` 
              : `text-dashboard-textSecondary hover:bg-dashboard-bgSecondary hover:rounded-lg hover:text-dashboard-textPrimary ${shouldShowCollapsed ? 'pl-0' : 'pl-3'}`
          } ${shouldShowCollapsed ? 'justify-center' : ''} ${item.subItems ? 'cursor-pointer' : 'cursor-pointer'}`}
          onClick={handleItemClick}
        >
          {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-dashboard-textPrimary"></div>}
          {/* Chevron icon BEFORE the name - exclude specific items and hide when collapsed */}
          {!shouldShowCollapsed && !(item.name === 'Overview' || (item.name === 'Projects' && sectionKey === 'favorites') || item.name === 'Default') && (
            item.subItems ? (
              isExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )
          )}
          
          {/* Show icon or dot based on section and item */}
          {sectionKey === 'favorites' ? (
            // Favorites section - show dots
            <div className={`${shouldShowCollapsed ? 'w-3 h-3' : 'w-1.5 h-1.5'} bg-dashboard-textSecondary rounded-full ${shouldShowCollapsed ? '' : 'mr-3'}`}></div>
          ) : sectionKey === 'dashboards' && item.id === 'default' ? (
            // Default dashboard - show default icon
            <ThemeSvg name="default" className={`${shouldShowCollapsed ? 'w-6 h-6' : 'w-4 h-4'} ${shouldShowCollapsed ? '' : 'mr-3'}`} />
          ) : sectionKey === 'dashboards' || sectionKey === 'pages' ? (
            // Other dashboards and pages - show icons
            <ThemeSvg name={iconName} className={`${shouldShowCollapsed ? 'w-6 h-6' : 'w-4 h-4'} ${shouldShowCollapsed ? '' : 'mr-3'}`} />
          ) : (
            // No icon for other cases
            <div className={`${shouldShowCollapsed ? 'w-6 h-6' : 'w-4 h-4'} ${shouldShowCollapsed ? '' : 'mr-3'}`}></div>
          )}
          
          {!shouldShowCollapsed && <Typography variant="body3">{item.name}</Typography>}
        </div>
        
        {/* Sub-items - no icons, no dots */}
        {item.subItems && isExpanded && (
          <div className="ml-12 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <div
                key={subItem.id}
                className="py-1 text-sm text-dashboard-textSecondary hover:text-dashboard-textPrimary transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  onPageChange(subItem.id);
                  // Close mobile sidebar when navigating to a page
                  if (isMobile && onToggleMobileSidebar) {
                    onToggleMobileSidebar();
                  }
                }}
              >
                <Typography variant="body3">{subItem.name}</Typography>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const renderNavSection = (section, sectionKey) => {
    // On mobile, always show full content (ignore collapsed state)
    const shouldShowCollapsed = !isMobile && isCollapsed;
    
    // Special handling for Favorites and Recently sections
    if (sectionKey === 'favorites') {
      return (
        <div key={sectionKey} className="mb-6">
        {!shouldShowCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-3 flex items-center space-x-4"
          >
            <Typography variant="body1">
              {section.title}
            </Typography>
            <Typography variant="body2">
              Recently
            </Typography>
          </motion.div>
        )}
          
          {section.items && section.items.length > 0 && (
            <div className="space-y-1">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  {renderNavItem(item, sectionKey)}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular sections
    return (
      <div key={sectionKey} className="mb-6">
        {!shouldShowCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-3"
          >
            <Typography variant="body5">   
               {section.title} 
            </Typography>
          </motion.div>
        )}
        
        {section.items && section.items.length > 0 && (
          <div className="space-y-1">
            {section.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                {renderNavItem(item, sectionKey)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // On mobile, always show full content (ignore collapsed state)
  const shouldShowCollapsed = !isMobile && isCollapsed;

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full lg:${shouldShowCollapsed ? 'w-16' : 'w-64'} bg-dashboard-sidebar lg:border-r border-dashboard-border h-screen overflow-y-auto transition-all duration-300`}
    >
      <div className="p-6">
        {/* Profile Section with ByeWind Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-3 mb-8"
        >
          <ThemeSvg name="byewind" className="w-8 h-8" />
          {!shouldShowCollapsed && (
            <Typography variant="heading1">{appName}</Typography>
          )}
        </motion.div>


        {/* Navigation */}
        <nav className="space-y-6">
          {Object.entries(navigation).map(([key, section]) =>
            renderNavSection(section, key)
          )}
        </nav>
      </div>
    </motion.aside>
  );
});

Sidebar.propTypes = {
  navigation: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  onToggleMobileSidebar: PropTypes.func,
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
