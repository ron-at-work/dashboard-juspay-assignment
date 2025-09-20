import React from 'react';
import { motion } from 'framer-motion';
import Typography from './Typography';

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
      className="bg-dashboard-bgSenary rounded-lg p-6 overflow-hidden h-[350px] flex flex-col"
    >
      <div className=" ">
        <Typography variant="heading2">{title}</Typography>
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
                  <Typography variant="paragraph2">{column}</Typography>
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
                className="hover:bg-dashboard-bgSenary transition-colors duration-200"
              >
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-dashboard-textPrimary">
                  <Typography variant="paragraph2">{row.name}</Typography>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-dashboard-textSecondary">
                  <Typography variant="paragraph2">{row.price}</Typography>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-dashboard-textSecondary">
                  <Typography variant="paragraph2">{row.quantity}</Typography>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-dashboard-textPrimary">
                  <Typography variant="paragraph2">{row.amount}</Typography>
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
