import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import Typography from './Typography';

/**
 * MetricCard component displays key performance metrics with animations
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.value - Metric value
 * @param {string} props.change - Change percentage
 * @param {string} props.trend - Trend direction ('up' or 'down')
 * @param {string} props.icon - Icon name
 * @param {string} props.bgColor - Background color class
 * @param {string} props.textColor - Text color class or hex color (optional)
 * @param {number} props.delay - Animation delay
 */
const MetricCard = ({ title, value, change, trend, bgColor = 'bg-dashboard-card', textColor = 'text-dashboard-textPrimary', delay = 0 }) => {

  // Helper function to determine if textColor is a hex color or CSS class
  const isHexColor = (color) => {
    return color?.startsWith('#');
  };

  // Get the appropriate text color style
  const getTextColorStyle = (color) => {
    if (isHexColor(color)) {
      return { color: color };
    }
    return {};
  };

  // Get the appropriate text color class
  const getTextColorClass = (color) => {
    if (isHexColor(color)) {
      return '';
    }
    return color;
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
      className={`${bgColor} flex flex-col justify-center gap-2 rounded-2xl shadow-sm p-4 sm:p-6 overflow-hidden shadow-md transition-all duration-300 group h-full w-full min-w-0`}
    >
        <div>
          <Typography variant="heading2"
            className={`${getTextColorClass(textColor)} font-semibold `}
            style={getTextColorStyle(textColor)}
          >
            {title}
          </Typography>
        </div>
        <div className="flex items-end justify-between gap-2 sm:gap-4  items-center min-w-0">
          <motion.p 
            className={`${getTextColorClass(textColor)} flex-shrink-0 min-w-0`}
            style={getTextColorStyle(textColor)}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            <Typography variant="paragraph1" className="truncate">
            {value}
          </Typography>
          </motion.p>
          <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
            <Typography variant="paragraph2"
              className={` text-xs ${getTextColorClass(textColor)}`}
              style={getTextColorStyle(textColor)}
            >
              {change}
            </Typography>
            <TrendIcon 
              className={`w-4 h-4 ${getTextColorClass(textColor)}`}
              style={getTextColorStyle(textColor)}
            />
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
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  delay: PropTypes.number,
};

MetricCard.defaultProps = {
  delay: 0,
};

export default MetricCard;
