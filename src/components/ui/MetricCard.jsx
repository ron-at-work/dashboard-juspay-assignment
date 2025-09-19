import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown 
} from 'lucide-react';

/**
 * MetricCard component displays key performance metrics with animations
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.value - Metric value
 * @param {string} props.change - Change percentage
 * @param {string} props.trend - Trend direction ('up' or 'down')
 * @param {string} props.icon - Icon name
 * @param {string} props.bgColor - Background color class
 * @param {string} props.textColor - Text color class (optional)
 * @param {number} props.delay - Animation delay
 */
const MetricCard = ({ title, value, change, trend, bgColor = 'bg-dashboard-card', textColor = 'text-dashboard-textPrimary', delay = 0 }) => {



  const getTrendColor = (trend) => {
    return 'text-dashboard-textPrimary';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const TrendIcon = getTrendIcon(trend);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${bgColor} rounded-lg shadow-sm p-6 overflow-hidden shadow-md transition-all duration-300 group h-full w-full`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className={`text-sm font-semibold ${textColor} mb-2`}>{title}</p>
        </div>
        <div className="flex items-end justify-between">
          <motion.p 
            className={`text-2xl font-semibold ${textColor}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
          <div className='flex items-center gap-1'>
            <span className={`text-sm font-medium ${textColor}`}>{change}</span>
            <TrendIcon className={`w-4 h-4 ${textColor}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down']).isRequired,
  icon: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  delay: PropTypes.number,
};

MetricCard.defaultProps = {
  delay: 0,
};

export default MetricCard;
