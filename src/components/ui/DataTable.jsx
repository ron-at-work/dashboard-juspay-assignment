import React from 'react';
import { motion } from 'framer-motion';

/**
 * DataTable component for displaying tabular data with animations
 * @param {Object} props - Component props
 * @param {string} props.title - Table title
 * @param {Array} props.columns - Column headers
 * @param {Array} props.data - Table data
 * @param {number} props.delay - Animation delay
 */
const DataTable = ({ title, columns, data, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-dashboard-bgSecondary rounded-lg p-6 overflow-hidden h-[350px] flex flex-col"
    >
      <div className=" ">
        <h3 className="text-lg font-semibold text-dashboard-textPrimary">{title}</h3>
      </div>
      <div className="flex-1 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashboard-textTertiary">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-medium text-dashboard-textSecondary"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-full">
            {data.map((row, rowIndex) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: delay + (rowIndex * 0.1) 
                }}
                className="hover:bg-dashboard-bgSecondary transition-colors duration-200"
              >
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-dashboard-textPrimary">
                  {row.name}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-dashboard-textSecondary">
                  {row.price}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-dashboard-textSecondary">
                  {row.quantity}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-dashboard-textPrimary">
                  {row.amount}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DataTable;
