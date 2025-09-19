import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityItem from '../../src/components/ui/ActivityItem';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ActivityItem', () => {
  const defaultProps = {
    message: 'User logged in',
    time: '2 min ago',
    avatar: 'https://example.com/avatar.jpg',
    index: 0
  };

  it('should render activity item with message', () => {
    renderWithTheme(<ActivityItem {...defaultProps} />);
    
    expect(screen.getByText('User logged in')).toBeInTheDocument();
  });

  it('should render activity item with time', () => {
    renderWithTheme(<ActivityItem {...defaultProps} />);
    
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should render activity item with avatar', () => {
    renderWithTheme(<ActivityItem {...defaultProps} />);
    
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', '/svgs/man.svg');
  });

  it('should handle missing props gracefully', () => {
    renderWithTheme(<ActivityItem />);
    
    // Should not crash and render empty or default content
    expect(screen.queryByText('User logged in')).not.toBeInTheDocument();
  });

  it('should handle missing message gracefully', () => {
    const propsWithMissingMessage = {
      time: '2 min ago',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ActivityItem {...propsWithMissingMessage} />);
    
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should handle missing time gracefully', () => {
    const propsWithMissingTime = {
      message: 'User logged in',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ActivityItem {...propsWithMissingTime} />);
    
    expect(screen.getByText('User logged in')).toBeInTheDocument();
  });

  it('should handle missing avatar gracefully', () => {
    const propsWithMissingAvatar = {
      message: 'User logged in',
      time: '2 min ago',
      index: 0
    };
    
    renderWithTheme(<ActivityItem {...propsWithMissingAvatar} />);
    
    expect(screen.getByText('User logged in')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    const { container } = renderWithTheme(<ActivityItem {...defaultProps} />);
    
    const activityItem = container.firstChild;
    expect(activityItem).toHaveClass('activity-item');
  });

  it('should handle long messages', () => {
    const propsWithLongMessage = {
      message: 'This is a very long message that should be handled gracefully by the component',
      time: '2 min ago',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ActivityItem {...propsWithLongMessage} />);
    
    expect(screen.getByText('This is a very long message that should be handled gracefully by the component')).toBeInTheDocument();
  });

  it('should handle special characters in message', () => {
    const propsWithSpecialChars = {
      message: 'User @john_doe logged in with special chars: !@#$%^&*()',
      time: '2 min ago',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ActivityItem {...propsWithSpecialChars} />);
    
    expect(screen.getByText('User @john_doe logged in with special chars: !@#$%^&*()')).toBeInTheDocument();
  });
});
