import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import ThemeSvg from '../ui/ThemeSvg';
import { useTheme } from '../../contexts/ThemeContext';
import Typography from '../ui/Typography';
import { validateSearchQuery } from '../../utils/validation';

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
  onOpenAddModal,
  handleSort
}) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Typography variant="heading2" className='mb-4' >{ordersData.title}</Typography>
       

      {/* Action Buttons and Search */}
      <div className="flex  justify-between items-start sm:items-center gap-4 bg-dashboard-bgSenary p-2 rounded-xl">
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenAddModal}
            className={`flex items-center space-x-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md  `}
          >
            <ThemeSvg name='plusicon' className="w-6 h-6 rounded-full" />
          </button>
          
          {/* Filter Dropdown */}
          <div className="relative filter-dropdown">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`border-none rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center space-x-1 `}
            >
              <ThemeSvg name='filter' className="w-6 h-6 rounded-full" />
              <ChevronDown className="w-4 h-4 text-dashboard-textSecondary" />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-dashboard-card border border-dashboard-border rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <Typography variant="paragraph2">Filter by Status</Typography>
                  <button
                    onClick={() => handleStatusFilter('all')}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-dashboard-bgSenary ${
                      statusFilter === 'all' ? 'bg-dashboard-bgSenary text-dashboard-textPrimary' : 'text-dashboard-textSecondary'
                    }`}
                  >
                    <Typography variant="paragraph2">All Statuses</Typography>
                  </button>
                  {uniqueStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-dashboard-bgSenary ${
                        statusFilter === status ? 'bg-dashboard-bgSenary text-dashboard-textPrimary' : 'text-dashboard-textSecondary'
                      }`}
                    >
                      <Typography variant="paragraph2">{status}</Typography>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => handleSort('date')}
            className={`border-none rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md  `}
            title="Sort by Date"
          >
            <ThemeSvg name='sort' className="w-6 h-6 rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
          <div className=" flex items-center gap-2 justify-center">
          <div className="relative flex items-center bg-dashboard-bgPrimary rounded-xl px-1 py-1 border border-dashboard-border">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(validateSearchQuery(e.target.value))}
                className="w-40 pl-2 pr-2 bg-transparent text-dashboard-textSecondary focus:ring-0 focus:outline-none border-0 transition-all duration-200 text-sm leading-5"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                }}
              />
            </div>
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
  handleSort: PropTypes.func.isRequired,
};

export default OrdersHeader;
