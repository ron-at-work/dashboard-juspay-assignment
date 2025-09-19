import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * ResponsiveLayout component that handles mobile/tablet responsive behavior
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {React.ReactNode} props.sidebar - Sidebar component
 * @param {React.ReactNode} props.rightSidebar - Right sidebar component
 * @param {Function} props.onToggleRightSidebar - Function to toggle right sidebar
 */
const ResponsiveLayout = ({ children, sidebar, rightSidebar, onToggleRightSidebar }) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Set default right sidebar state based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setIsRightSidebarOpen(true);
      } else {
        setIsRightSidebarOpen(false);
      }
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleLeftSidebar = useCallback(() => {
    setIsLeftSidebarOpen(prev => !prev);
  }, []);

  const toggleRightSidebar = useCallback(() => {
    setIsRightSidebarOpen(prev => !prev);
    // Call external toggle function if provided
    if (onToggleRightSidebar) {
      onToggleRightSidebar();
    }
  }, [onToggleRightSidebar]);

  return (
    <div className="flex h-screen bg-dashboard-bgPrimary main-layout">

      {/* Left Sidebar - Desktop */}
      <div className="hidden lg:block">
        {sidebar && React.cloneElement(sidebar, { onToggleMobileSidebar: toggleLeftSidebar })}
      </div>

      {/* Left Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isLeftSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleLeftSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-full z-50"
            >
              <div className="relative h-full">
                <button
                  onClick={toggleLeftSidebar}
                  className="absolute top-4 right-4 p-2 bg-dashboard-card rounded-lg shadow-md hover:shadow-lg transition-shadow z-10"
                >
                  <X className="w-5 h-5 text-dashboard-textSecondary" />
                </button>
                {sidebar && React.cloneElement(sidebar, { onToggleMobileSidebar: toggleLeftSidebar })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children && React.cloneElement(children, { 
          onToggleRightSidebar: toggleRightSidebar,
          onToggleLeftSidebar: toggleLeftSidebar
        })}
      </div>

      {/* Right Sidebar - Desktop */}
      <AnimatePresence mode="wait">
        {isRightSidebarOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden xl:block w-80 bg-dashboard-sidebar border-l border-dashboard-border h-screen overflow-y-auto overflow-x-hidden"
          >
            {rightSidebar}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Sidebar - Mobile/Tablet Overlay */}
      <AnimatePresence mode="wait">
        {isRightSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleRightSidebar}
            />
            <motion.div
              initial={{ x: '100dvw' }}
              animate={{ x: 0 }}
              exit={{ x: '100dvw' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden fixed right-0 top-0 h-full w-full z-50 overflow-x-hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={toggleRightSidebar}
                  className="absolute top-4 right-4 p-2 bg-dashboard-card rounded-lg shadow-md hover:shadow-lg transition-shadow z-10"
                >
                  <X className="w-5 h-5 text-dashboard-textSecondary" />
                </button>
                {rightSidebar}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

ResponsiveLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  rightSidebar: PropTypes.node.isRequired,
  onToggleRightSidebar: PropTypes.func,
};

export default ResponsiveLayout;
