import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import ThemeSvg from '../ui/ThemeSvg';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Orders page header component with search and filter controls
 */
const OrdersHeader = ({ 
  ordersData, 
  searchTerm, 
  setSearchTerm, 
  showFilterDropdown, 
  setShowFilterDropdown,
  uniqueStatuses,
  statusFilter,
  handleStatusFilter,
  onOpenAddModal
}) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold text-dashboard-textPrimary mb-6">
        {ordersData.title}
      </h1>

      {/* Action Buttons and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-dashboard-bgSecondary p-2 rounded-xl">
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenAddModal}
            className={`flex items-center space-x-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md p-2 ${
              theme.isDark ? 'hover:bg-dashboard-bgSecondary' : 'hover:bg-dashboard-bgTertiary'
            }`}
          >
            <ThemeSvg name='plusicon' className="w-8 h-8 rounded-full" />
          </button>
          
          {/* Filter Dropdown */}
          <div className="relative filter-dropdown">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`border-none rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center space-x-1 p-2 ${
                theme.isDark ? 'hover:bg-dashboard-bgSecondary' : 'hover:bg-dashboard-bgTertiary'
              }`}
            >
              <ThemeSvg name='filter' className="w-8 h-8 rounded-full" />
              <ChevronDown className="w-4 h-4 text-dashboard-textSecondary" />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-dashboard-card border border-dashboard-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <div className="text-sm font-medium text-dashboard-textPrimary mb-2">Filter by Status</div>
                  <button
                    onClick={() => handleStatusFilter('all')}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-dashboard-bgSecondary ${
                      statusFilter === 'all' ? 'bg-dashboard-bgSecondary text-dashboard-textPrimary' : 'text-dashboard-textSecondary'
                    }`}
                  >
                    All Statuses
                  </button>
                  {uniqueStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-dashboard-bgSecondary ${
                        statusFilter === status ? 'bg-dashboard-bgSecondary text-dashboard-textPrimary' : 'text-dashboard-textSecondary'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button className={`border-none rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md p-2 ${
            theme.isDark ? 'hover:bg-dashboard-bgSecondary' : 'hover:bg-dashboard-bgTertiary'
          }`}>
            <ThemeSvg name='sort' className="w-8 h-8 rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative $">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dashboard-textTertiary" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border border-dashboard-border bg-dashboard-bgSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent w-64 text-dashboard-textPrimary placeholder-dashboard-textTertiary ${theme === 'dark' ? 'bg-dashboard-bgPrimary' : 'bg-dashboard-bgSecondary'}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

OrdersHeader.propTypes = {
  ordersData: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  showFilterDropdown: PropTypes.bool.isRequired,
  setShowFilterDropdown: PropTypes.func.isRequired,
  uniqueStatuses: PropTypes.array.isRequired,
  statusFilter: PropTypes.string.isRequired,
  handleStatusFilter: PropTypes.func.isRequired,
  onOpenAddModal: PropTypes.func.isRequired,
};

export default OrdersHeader;
