import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from '../../src/components/ui/NotificationItem';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('NotificationItem', () => {
  const defaultProps = {
    message: 'New order received',
    time: '2 min ago',
    icon: 'bell',
    index: 0
  };

  it('should render notification item with message', () => {
    renderWithTheme(<NotificationItem {...defaultProps} />);
    
    expect(screen.getByText('New order received')).toBeInTheDocument();
  });

  it('should render notification item with time', () => {
    renderWithTheme(<NotificationItem {...defaultProps} />);
    
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should render notification item with icon', () => {
    renderWithTheme(<NotificationItem {...defaultProps} />);
    
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('should handle missing props gracefully', () => {
    renderWithTheme(<NotificationItem />);
    
    // Should not crash and render empty or default content
    expect(screen.queryByText('New order received')).not.toBeInTheDocument();
  });

  it('should handle missing message gracefully', () => {
    const propsWithMissingMessage = {
      time: '2 min ago',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithMissingMessage} />);
    
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should handle missing time gracefully', () => {
    const propsWithMissingTime = {
      message: 'New order received',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithMissingTime} />);
    
    expect(screen.getByText('New order received')).toBeInTheDocument();
  });

  it('should handle missing icon gracefully', () => {
    const propsWithMissingIcon = {
      message: 'New order received',
      time: '2 min ago',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithMissingIcon} />);
    
    expect(screen.getByText('New order received')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    const { container } = renderWithTheme(<NotificationItem {...defaultProps} />);
    
    const notificationItem = container.firstChild;
    expect(notificationItem).toHaveClass('notification-item');
  });

  it('should handle long messages', () => {
    const propsWithLongMessage = {
      message: 'This is a very long notification message that should be handled gracefully by the component',
      time: '2 min ago',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithLongMessage} />);
    
    expect(screen.getByText('This is a very long notification message that should be handled gracefully by the component')).toBeInTheDocument();
  });

  it('should handle special characters in message', () => {
    const propsWithSpecialChars = {
      message: 'New order #12345 received with special chars: !@#$%^&*()',
      time: '2 min ago',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithSpecialChars} />);
    
    expect(screen.getByText('New order #12345 received with special chars: !@#$%^&*()')).toBeInTheDocument();
  });

  it('should handle different icon types', () => {
    const propsWithDifferentIcon = {
      message: 'Payment processed',
      time: '5 min ago',
      icon: 'check',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithDifferentIcon} />);
    
    expect(screen.getByText('Payment processed')).toBeInTheDocument();
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('should handle empty message', () => {
    const propsWithEmptyMessage = {
      message: '',
      time: '2 min ago',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithEmptyMessage} />);
    
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should handle empty time', () => {
    const propsWithEmptyTime = {
      message: 'New order received',
      time: '',
      icon: 'bell',
      index: 0
    };
    
    renderWithTheme(<NotificationItem {...propsWithEmptyTime} />);
    
    expect(screen.getByText('New order received')).toBeInTheDocument();
  });
});
