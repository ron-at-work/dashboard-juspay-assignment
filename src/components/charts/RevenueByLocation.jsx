import React from 'react';
import { motion } from 'framer-motion';
import Typography from '../ui/Typography';

/**
 * RevenueByLocation component for displaying revenue by location
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Array} props.locations - Location data
 * @param {number} props.delay - Animation delay
 */
const RevenueByLocation = ({ title, locations, delay = 0 }) => {
  // Calculate max revenue for progress bar scaling
  const maxRevenue = Math.max(...locations.map(loc => parseInt(loc.revenue.replace(/[^\d]/g, ''))));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="chart-container bg-dashboard-bgSenary border-none rounded-lg p-6 h-[350px] flex flex-col"
    >
      <Typography variant="heading2">{title}</Typography>
      
      {/* Map */}
      <div className="relative rounded-lg mb-4 h-32 overflow-hidden">
        <img 
          src="/images/map.png" 
          alt="World Map" 
          className="w-full h-full object-contain "
        />
      </div>

      {/* Location list with progress bars */}
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {locations.map((location, index) => {
          const revenueValue = parseInt(location.revenue.replace(/[^\d]/g, ''));
          const progressPercentage = (revenueValue / maxRevenue) * 100;
          
          return (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: delay + (index * 0.1) + 0.5 
              }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <Typography variant="paragraph2">
                  {location.name}
                </Typography>
                <Typography variant="paragraph2">
                  {location.revenue}
                </Typography>
              </div>
              <div className="w-full bg-dashboard-textTertiary rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: delay + (index * 0.1) + 0.7,
                    ease: "easeOut"
                  }}
                  className="bg-dashboard-chartLinePrimary h-1 rounded-full"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RevenueByLocation;
