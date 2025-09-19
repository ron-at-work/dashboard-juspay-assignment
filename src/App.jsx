import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightSidebar from './components/layout/RightSidebar';
import Dashboard from './components/Dashboard';
import OrdersPage from './components/OrdersPage';
import dashboardData from './data/dashboard.json';
import { validatePageId } from './utils/validation';

/**
 * MainContent component that renders header and current page
 * @param {Object} props - Component props
 * @param {Object} props.header - Header data
 * @param {Function} props.onToggleSidebar - Function to toggle left sidebar
 * @param {Function} props.onToggleRightSidebar - Function to toggle right sidebar
 * @param {Object} props.dashboardData - Dashboard data
 * @param {string} props.currentPage - Current active page
 * @param {Function} props.onPageChange - Function to handle page changes
 */
const MainContent = ({ header, onToggleSidebar, onToggleRightSidebar, onToggleLeftSidebar, dashboardData, currentPage, onPageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex-1 flex flex-col overflow-hidden"
  >
    {/* Header */}
    <Header 
      header={header} 
      onToggleSidebar={onToggleSidebar}
      onToggleRightSidebar={onToggleRightSidebar}
      onToggleLeftSidebar={onToggleLeftSidebar}
      currentPage={currentPage}
    />

    {/* Page Content */}
    {currentPage === 'orders' ? (
      <OrdersPage ordersData={dashboardData.orders} />
    ) : (
      <Dashboard data={dashboardData} />
    )}
  </motion.div>
);

MainContent.propTypes = {
  header: PropTypes.object.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  onToggleRightSidebar: PropTypes.func,
  onToggleLeftSidebar: PropTypes.func,
  dashboardData: PropTypes.object.isRequired,
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

/**
 * Main App component that renders the complete dashboard layout
 */
function App() {
  const { app, navigation, header, notifications, activities, contacts } = dashboardData;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('default');

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const handlePageChange = useCallback((pageId) => {
    const validatedPageId = validatePageId(pageId);
    setCurrentPage(validatedPageId);
  }, []);

  const sidebar = (
    <Sidebar 
      navigation={navigation} 
      appName={app.name} 
      isCollapsed={isSidebarCollapsed}
      onToggleCollapse={handleToggleSidebar}
      onPageChange={handlePageChange}
      currentPage={currentPage}
    />
  );

  const rightSidebar = (
    <RightSidebar
      notifications={notifications}
      activities={activities}
      contacts={contacts}
    />
  );

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ResponsiveLayout
          sidebar={sidebar}
          rightSidebar={rightSidebar}
        >
          <MainContent 
            header={header}
            onToggleSidebar={handleToggleSidebar}
            dashboardData={dashboardData}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </ResponsiveLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;