import React from 'react';
import { render, screen } from '@testing-library/react';
import RightSidebar from '../../src/components/layout/RightSidebar';

// Mock the UI components
jest.mock('../../src/components/ui/NotificationItem', () => {
  return function MockNotificationItem({ message, time, icon, index }) {
    if (!message) {
      return <div data-testid="notification-item">No message</div>;
    }
    return <div data-testid="notification-item">{message}</div>;
  };
});

jest.mock('../../src/components/ui/ActivityItem', () => {
  return function MockActivityItem({ message, time, avatar, index }) {
    if (!message) {
      return <div data-testid="activity-item">No message</div>;
    }
    return <div data-testid="activity-item">{message}</div>;
  };
});

jest.mock('../../src/components/ui/ContactItem', () => {
  return function MockContactItem({ name, avatar, index }) {
    if (!name) {
      return <div data-testid="contact-item">No name</div>;
    }
    return <div data-testid="contact-item">{name}</div>;
  };
});

describe('RightSidebar', () => {
  const defaultProps = {
    notifications: {
      title: 'Notifications',
      items: [
        { id: 1, message: 'New order received', time: '2 min ago' },
        { id: 2, message: 'Payment processed', time: '5 min ago' }
      ]
    },
    activities: {
      title: 'Recent Activity',
      items: [
        { id: 1, message: 'User logged in', time: '10 min ago' },
        { id: 2, message: 'Order updated', time: '15 min ago' }
      ]
    },
    contacts: {
      title: 'Contacts',
      items: [
        { id: 1, name: 'John Doe', status: 'online' },
        { id: 2, name: 'Jane Smith', status: 'offline' }
      ]
    }
  };

  it('should render sidebar with all sections', () => {
    render(<RightSidebar {...defaultProps} />);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  it('should render notification items', () => {
    render(<RightSidebar {...defaultProps} />);
    
    expect(screen.getByText('New order received')).toBeInTheDocument();
    expect(screen.getByText('Payment processed')).toBeInTheDocument();
  });

  it('should render activity items', () => {
    render(<RightSidebar {...defaultProps} />);
    
    expect(screen.getByText('User logged in')).toBeInTheDocument();
    expect(screen.getByText('Order updated')).toBeInTheDocument();
  });

  it('should render contact items', () => {
    render(<RightSidebar {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should handle empty notifications', () => {
    const propsWithEmptyNotifications = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: []
      }
    };
    
    render(<RightSidebar {...propsWithEmptyNotifications} />);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.queryByText('New order received')).not.toBeInTheDocument();
  });

  it('should handle empty activities', () => {
    const propsWithEmptyActivities = {
      ...defaultProps,
      activities: {
        title: 'Recent Activity',
        items: []
      }
    };
    
    render(<RightSidebar {...propsWithEmptyActivities} />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.queryByText('User logged in')).not.toBeInTheDocument();
  });

  it('should handle empty contacts', () => {
    const propsWithEmptyContacts = {
      ...defaultProps,
      contacts: {
        title: 'Contacts',
        items: []
      }
    };
    
    render(<RightSidebar {...propsWithEmptyContacts} />);
    
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should handle missing notifications', () => {
    const propsWithoutNotifications = {
      ...defaultProps,
      notifications: null
    };
    
    render(<RightSidebar {...propsWithoutNotifications} />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  it('should handle missing activities', () => {
    const propsWithoutActivities = {
      ...defaultProps,
      activities: null
    };
    
    render(<RightSidebar {...propsWithoutActivities} />);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  it('should handle missing contacts', () => {
    const propsWithoutContacts = {
      ...defaultProps,
      contacts: null
    };
    
    render(<RightSidebar {...propsWithoutContacts} />);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('should handle missing all data', () => {
    const propsWithoutData = {
      notifications: null,
      activities: null,
      contacts: null
    };
    
    render(<RightSidebar {...propsWithoutData} />);
    
    // Should still render the sidebar structure
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    render(<RightSidebar {...defaultProps} />);
    
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-full', 'xl:w-80', 'bg-dashboard-sidebar', 'xl:border-l', 'border-dashboard-border', 'h-screen', 'overflow-y-auto', 'overflow-x-hidden');
  });

  it('should handle single notification item', () => {
    const propsWithSingleNotification = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: [
          { id: 1, message: 'Single notification', time: '1 min ago' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithSingleNotification} />);
    
    expect(screen.getByText('Single notification')).toBeInTheDocument();
  });

  it('should handle single activity item', () => {
    const propsWithSingleActivity = {
      ...defaultProps,
      activities: {
        title: 'Recent Activity',
        items: [
          { id: 1, message: 'Single activity', time: '1 min ago' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithSingleActivity} />);
    
    expect(screen.getByText('Single activity')).toBeInTheDocument();
  });

  it('should handle single contact item', () => {
    const propsWithSingleContact = {
      ...defaultProps,
      contacts: {
        title: 'Contacts',
        items: [
          { id: 1, name: 'Single contact', status: 'online' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithSingleContact} />);
    
    expect(screen.getByText('Single contact')).toBeInTheDocument();
  });

  it('should handle many items in each section', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      message: `Notification ${i + 1}`,
      time: `${i + 1} min ago`
    }));
    
    const propsWithManyItems = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: manyItems
      }
    };
    
    render(<RightSidebar {...propsWithManyItems} />);
    
    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Notification 10')).toBeInTheDocument();
  });

  it('should handle items with missing properties', () => {
    const propsWithIncompleteItems = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: [
          { id: 1, message: 'Incomplete notification' },
          { id: 2, time: '5 min ago' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithIncompleteItems} />);
    
    expect(screen.getByText('Incomplete notification')).toBeInTheDocument();
  });

  it('should handle items with special characters', () => {
    const propsWithSpecialChars = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: [
          { id: 1, message: 'Special chars: @#$%^&*()', time: '1 min ago' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithSpecialChars} />);
    
    expect(screen.getByText('Special chars: @#$%^&*()')).toBeInTheDocument();
  });

  it('should handle long text content', () => {
    const propsWithLongText = {
      ...defaultProps,
      notifications: {
        title: 'Notifications',
        items: [
          { id: 1, message: 'Very long notification title that might wrap to multiple lines and should be handled gracefully', time: '1 min ago' }
        ]
      }
    };
    
    render(<RightSidebar {...propsWithLongText} />);
    
    expect(screen.getByText('Very long notification title that might wrap to multiple lines and should be handled gracefully')).toBeInTheDocument();
  });
});
