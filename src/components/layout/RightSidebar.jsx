import React from 'react';
import { motion } from 'framer-motion';
import NotificationItem from '../ui/NotificationItem';
import ActivityItem from '../ui/ActivityItem';
import ContactItem from '../ui/ContactItem';

/**
 * RightSidebar component for notifications, activities, and contacts
 * @param {Object} props - Component props
 * @param {Object} props.notifications - Notifications data
 * @param {Object} props.activities - Activities data
 * @param {Object} props.contacts - Contacts data
 */
const RightSidebar = React.memo(({ notifications, activities, contacts }) => {
  return (
    <aside className="w-full xl:w-80 bg-dashboard-sidebar xl:border-l border-dashboard-border h-screen overflow-y-auto overflow-x-hidden">
      <div className="p-4 space-y-6 max-w-full">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-dashboard-textPrimary mb-4">
            {notifications?.title || 'Notifications'}
          </h3>
          <div className="space-y-2 max-w-full">
            {notifications?.items?.map((item, index) => (
              <NotificationItem
                key={item.id}
                message={item.message}
                time={item.time}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-dashboard-textPrimary mb-4">
            {activities?.title || 'Recent Activity'}
          </h3>
          <div className="space-y-2 max-w-full">
            {activities?.items?.map((item, index) => (
              <ActivityItem
                key={item.id}
                message={item.message}
                time={item.time}
                avatar={item.avatar}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-dashboard-textPrimary mb-4">
            {contacts?.title || 'Contacts'}
          </h3>
          <div className="space-y-2 max-w-full">
            {contacts?.items?.map((item, index) => (
              <ContactItem
                key={item.id}
                name={item.name}
                avatar={item.avatar}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </aside>
  );
});

RightSidebar.displayName = 'RightSidebar';

export default RightSidebar;
