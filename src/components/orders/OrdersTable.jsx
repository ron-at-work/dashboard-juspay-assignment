import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import ThemeSvg from '../ui/ThemeSvg';
import { useTheme } from '../../contexts/ThemeContext';
import { getAvatarSvg, getStatusColor, getStatusTextColor, getFieldMap } from '../../utils/ordersUtils';
import Typography from '../ui/Typography';
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
                  className="w-3 h-3 text-dashboard-textPrimary bg-dashboard-card border-dashboard-border rounded focus:ring-dashboard-accent"
                  style={{ accentColor: '#1C1C1C' }}
                />
              </th>
              {ordersData.columns.map((column, index) => {
                const field = fieldMap[column];
                
                return (
                  <th 
                    key={index} 
                    className="px-6 py-3 text-left cursor-pointer hover:bg-dashboard-bgSenary transition-colors"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center space-x-1">
                      <Typography variant="paragraph2">{column}</Typography>
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
                  className={`hover:bg-dashboard-bgSenary transition-colors ${
                    selectedOrders.includes(order.id) ? 'bg-dashboard-bgSenary' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-3 h-3 text-dashboard-textPrimary bg-dashboard-card border-dashboard-border rounded focus:ring-dashboard-accent"
                      style={{ accentColor: '#1C1C1C' }}
                    />
                  </td>

                  {/* Order ID */}
                    <td className="px-6 py-4">
                      <Typography variant="paragraph2" className="font-medium">{order.orderId}</Typography>
                    </td>

                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <ThemeSvg 
                        name={getAvatarSvg(order.user)} 
                        className="w-8 h-8 rounded-full" 
                      />
                        <Typography variant="paragraph2">{order.user}</Typography>
                    </div>
                  </td>

                  {/* Project */}
                  <td className="px-6 py-4">
                    <Typography variant="paragraph2">{order.project}</Typography>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Typography variant="paragraph2">{order.address}</Typography>
                      {order.address === "Nest Lane Olivette" && (
                        <ThemeSvg name='clipboard' className="w-4 h-4 rounded-full" />
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <ThemeSvg name='calendar' className="w-4 h-4 rounded-full" />
                      <Typography variant="paragraph2">{order.date}</Typography>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getStatusColor(order.statusColor, theme) }}
                      ></div>
                      <Typography 
                        variant="paragraph2" 
                        className="font-medium text-xs" 
                        style={{ color: getStatusTextColor(order.statusColor, theme) }}
                      >
                        {order.status}
                      </Typography>
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
                        <div className="w-16 h-16 bg-dashboard-bgSenary rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-dashboard-textTertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <Typography variant="heading2">No orders found</Typography>
                          <Typography variant="paragraph2">
                            Try adjusting your search or filter criteria
                          </Typography>
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
