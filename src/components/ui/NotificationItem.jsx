import React from 'react';
import { motion } from 'framer-motion';
import ThemeSvg from './ThemeSvg';
import Typography from './Typography';

/**
 * NotificationItem component for displaying individual notifications
 * @param {Object} props - Component props
 * @param {string} props.message - Notification message
 * @param {string} props.time - Time stamp
 * @param {string} props.icon - Icon name
 * @param {number} props.index - Item index for animation delay
 */
const NotificationItem = ({ message, time, icon, index = 0 }) => {
  // Determine which SVG to use based on message content
  const getIconName = (message) => {
    if (!message) return 'bell'; // default fallback for undefined/null message
    
    if (message.toLowerCase().includes('bug')) {
      return 'bug';
    } else if (message.toLowerCase().includes('subscribed')) {
      return 'live';
    } else if (message.toLowerCase().includes('user')) {
      return 'profile';
    }
    return 'bell'; // default fallback
  };

  const iconName = getIconName(message);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="notification-item"
    >
      <div className="flex-shrink-0">
        <ThemeSvg name={iconName} className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <Typography variant="paragraph3">{message}</Typography>
        <Typography variant="body7">{time}</Typography>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
