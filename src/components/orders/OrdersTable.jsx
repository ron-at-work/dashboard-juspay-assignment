import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import ThemeSvg from '../ui/ThemeSvg';
import { useTheme } from '../../contexts/ThemeContext';
import { getAvatarSvg, getStatusColor, getStatusTextColor, getFieldMap } from '../../utils/ordersUtils';

/**
 * Orders table component
 */
const OrdersTable = ({ 
  ordersData, 
  currentOrders, 
  selectedOrders, 
  sortField, 
  sortDirection,
  handleSelectAll,
  handleSelectOrder,
  handleSort
}) => {
  const { theme } = useTheme();
  const fieldMap = getFieldMap();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-dashboard-bgPrimary rounded-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-dashboard-textSecondary">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === ordersData.data.length && ordersData.data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-dashboard-textPrimary bg-dashboard-card border-dashboard-border rounded focus:ring-dashboard-accent"
                  style={{ accentColor: '#1C1C1C' }}
                />
              </th>
              {ordersData.columns.map((column, index) => {
                const field = fieldMap[column];
                
                return (
                  <th 
                    key={index} 
                    className="px-6 py-3 text-left text-sm font-normal text-dashboard-textSecondary cursor-pointer hover:bg-dashboard-bgSecondary transition-colors"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column}</span>
                      {sortField === field && (
                        <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-dashboard-border">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`hover:bg-dashboard-bgSecondary transition-colors ${
                    selectedOrders.includes(order.id) ? 'bg-dashboard-bgSecondary' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-4 h-4 text-dashboard-textPrimary bg-dashboard-card border-dashboard-border rounded focus:ring-dashboard-accent"
                      style={{ accentColor: '#1C1C1C' }}
                    />
                  </td>

                  {/* Order ID */}
                    <td className="px-6 py-4 text-sm font-medium text-dashboard-textPrimary">
                      {order.orderId}
                    </td>

                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <ThemeSvg 
                        name={getAvatarSvg(order.user)} 
                        className="w-8 h-8 rounded-full" 
                      />
                        <span className="text-sm text-dashboard-textPrimary">{order.user}</span>
                    </div>
                  </td>

                  {/* Project */}
                  <td className="px-6 py-4 text-sm text-dashboard-textPrimary">
                    {order.project}
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4 text-sm text-dashboard-textPrimary">
                    <div className="flex items-center space-x-2">
                      <span>{order.address}</span>
                      {order.address === "Nest Lane Olivette" && (
                        <ThemeSvg name='clipboard' className="w-4 h-4 rounded-full" />
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-dashboard-textPrimary">
                    <div className="flex items-center space-x-2">
                      <ThemeSvg name='calendar' className="w-4 h-4 rounded-full" />
                      <span>{order.date}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getStatusColor(order.statusColor, theme) }}
                      ></div>
                      <span 
                        className="text-sm font-medium" 
                        style={{ color: getStatusTextColor(order.statusColor, theme) }}
                      >
                        {order.status}
                      </span>
                        {order.status === "Rejected" && (
                          <MoreHorizontal className="w-4 h-4 text-dashboard-textTertiary" />
                        )}
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                    <td colSpan={ordersData.columns.length + 2} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-dashboard-bgSecondary rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-dashboard-textTertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-medium text-dashboard-textPrimary mb-2">No orders found</h3>
                          <p className="text-dashboard-textSecondary mb-4">
                            Try adjusting your search or filter criteria
                          </p>
                         
                        </div>
                      </div>
                    </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
