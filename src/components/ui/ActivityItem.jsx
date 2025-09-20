import React from 'react';
import { motion } from 'framer-motion';
import ThemeSvg from './ThemeSvg';  
import Typography from './Typography';

/**
 * ActivityItem component for displaying individual activities
 * @param {Object} props - Component props
 * @param {string} props.message - Activity message
 * @param {string} props.time - Time stamp
 * @param {string} props.avatar - Avatar identifier
 * @param {number} props.index - Item index for animation delay
 */
const ActivityItem = ({ message, time, avatar, index = 0 }) => {
  // Alternating avatar SVGs: man, woman, man-two, woman-two, man, woman, man-two, woman-two...
  const getAvatarSvg = (index) => {
    const avatars = ['man', 'woman', 'man-two', 'woman-two'];
    return avatars[index % avatars.length];
  };

  const avatarSvg = getAvatarSvg(index);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="activity-item"
    >
      <div className="flex-shrink-0">
        <ThemeSvg name={avatarSvg} className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <Typography variant="paragraph3">{message}</Typography>
        <Typography variant="body7">{time}</Typography>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
