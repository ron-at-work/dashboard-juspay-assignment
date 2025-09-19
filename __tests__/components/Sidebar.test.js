import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '../../src/components/layout/Sidebar';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock ThemeSvg component
jest.mock('../../src/components/ui/ThemeSvg', () => {
  return function MockThemeSvg({ name, className }) {
    return <div data-testid={`theme-svg-${name}`} className={className} />;
  };
});

const mockNavigation = {
  main: {
    title: 'Main',
    items: [
      {
        id: 'default',
        name: 'Default',
        icon: 'chart',
        subItems: [
          { id: 'overview', name: 'Overview' },
          { id: 'analytics', name: 'Analytics' }
        ]
      },
      {
        id: 'orders',
        name: 'Orders',
        icon: 'ecomm'
      }
    ]
  },
  profile: {
    title: 'Profile',
    items: [
      {
        id: 'settings',
        name: 'Settings',
        icon: 'profile'
      }
    ]
  }
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Sidebar', () => {
  const defaultProps = {
    navigation: mockNavigation,
    appName: 'Analytics Dashboard',
    isCollapsed: false,
    onToggleCollapse: jest.fn(),
    onPageChange: jest.fn(),
    currentPage: 'default',
    onToggleMobileSidebar: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
  });

  it('should render sidebar with app name and navigation', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('should render collapsed sidebar on desktop', () => {
    renderWithTheme(<Sidebar {...defaultProps} isCollapsed={true} />);
    
    // In collapsed state, app name should not be visible (only icon)
    expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
  });

  it('should not show collapsed state on mobile', () => {
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    renderWithTheme(<Sidebar {...defaultProps} isCollapsed={true} />);
    
    // Should show full sidebar content on mobile
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('should handle navigation item clicks', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const ordersItem = screen.getByText('Orders');
    await user.click(ordersItem);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith('orders');
  });

  it('should handle submenu expansion', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const defaultItem = screen.getByText('Default');
    await user.click(defaultItem);
    
    // Should show submenu items
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('should close mobile sidebar when navigation item is clicked', async () => {
    const user = userEvent.setup();
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const ordersItem = screen.getByText('Orders');
    await user.click(ordersItem);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith('orders');
    expect(defaultProps.onToggleMobileSidebar).toHaveBeenCalled();
  });

  it('should not close desktop sidebar when navigation item is clicked', async () => {
    const user = userEvent.setup();
    // Mock desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const ordersItem = screen.getByText('Orders');
    await user.click(ordersItem);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith('orders');
    expect(defaultProps.onToggleMobileSidebar).not.toHaveBeenCalled();
  });

  it('should handle window resize events', () => {
    const { rerender } = renderWithTheme(<Sidebar {...defaultProps} />);
    
    // Change to mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Component should still render
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  it('should show active page styling', () => {
    renderWithTheme(<Sidebar {...defaultProps} currentPage="orders" />);
    
    const ordersItem = screen.getByText('Orders');
    // Check if the parent element has the active styling
    const ordersButton = ordersItem.closest('div');
    expect(ordersButton).toHaveClass('bg-dashboard-bgSecondary', 'text-dashboard-textPrimary', 'border-l-2', 'border-dashboard-textPrimary');
  });

  it('should handle missing navigation data gracefully', () => {
    renderWithTheme(<Sidebar {...defaultProps} navigation={{}} />);
    
    // Should still render app name
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  it('should handle missing subItems gracefully', () => {
    const navigationWithoutSubItems = {
      main: {
        title: 'Main',
        items: [
          {
            id: 'simple',
            name: 'Simple Item',
            icon: 'chart'
          }
        ]
      }
    };
    
    renderWithTheme(<Sidebar {...defaultProps} navigation={navigationWithoutSubItems} />);
    
    expect(screen.getByText('Simple Item')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const sidebar = screen.getByText('Analytics Dashboard').closest('aside');
    expect(sidebar).toHaveClass('bg-dashboard-sidebar', 'lg:border-r', 'border-dashboard-border', 'h-screen', 'overflow-y-auto');
  });

  it('should handle icon mapping correctly', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    // Check if any ThemeSvg components are rendered
    const allIcons = screen.queryAllByTestId(/theme-svg-/);
    expect(allIcons.length).toBeGreaterThan(0);
  });

  it('should handle missing icon gracefully', () => {
    const navigationWithMissingIcon = {
      main: {
        title: 'Main',
        items: [
          {
            id: 'no-icon',
            name: 'No Icon Item',
            icon: 'nonexistent'
          }
        ]
      }
    };
    
    renderWithTheme(<Sidebar {...defaultProps} navigation={navigationWithMissingIcon} />);
    
    expect(screen.getByText('No Icon Item')).toBeInTheDocument();
  });

  it('should handle submenu item clicks', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    // First click to expand
    const defaultItem = screen.getByText('Default');
    await user.click(defaultItem);
    
    // Then click on submenu item
    const overviewItem = screen.getByText('Overview');
    await user.click(overviewItem);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith('overview');
  });

  it('should handle missing onToggleMobileSidebar gracefully', () => {
    const propsWithoutMobileToggle = {
      ...defaultProps,
      onToggleMobileSidebar: null,
    };
    
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    renderWithTheme(<Sidebar {...propsWithoutMobileToggle} />);
    
    // Should not throw error when clicking navigation item
    const ordersItem = screen.getByText('Orders');
    expect(() => fireEvent.click(ordersItem)).not.toThrow();
  });
});
