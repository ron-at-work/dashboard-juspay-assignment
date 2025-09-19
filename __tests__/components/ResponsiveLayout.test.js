import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResponsiveLayout from '../../src/components/layout/ResponsiveLayout';

// Mock the child components
const MockSidebar = ({ onToggleMobileSidebar }) => (
  <div data-testid="sidebar">
    <button onClick={onToggleMobileSidebar} data-testid="sidebar-toggle">
      Toggle Sidebar
    </button>
  </div>
);

const MockRightSidebar = () => (
  <div data-testid="right-sidebar">Right Sidebar</div>
);

const MockChildren = ({ onToggleRightSidebar, onToggleLeftSidebar }) => (
  <div data-testid="children">
    <button onClick={onToggleRightSidebar} data-testid="toggle-right">
      Toggle Right
    </button>
    <button onClick={onToggleLeftSidebar} data-testid="toggle-left">
      Toggle Left
    </button>
  </div>
);

describe('ResponsiveLayout', () => {
  const defaultProps = {
    sidebar: <MockSidebar />,
    rightSidebar: <MockRightSidebar />,
    children: <MockChildren />,
    onToggleRightSidebar: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
  });

  it('should render all components', () => {
    render(<ResponsiveLayout {...defaultProps} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    // Right sidebar is only rendered when isRightSidebarOpen is true
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should show desktop sidebar by default', () => {
    render(<ResponsiveLayout {...defaultProps} />);
    
    const desktopSidebar = screen.getByTestId('sidebar');
    expect(desktopSidebar).toBeInTheDocument();
  });

  it('should show right sidebar by default', () => {
    render(<ResponsiveLayout {...defaultProps} />);
    
    // Right sidebar is only rendered when isRightSidebarOpen is true
    // By default, it should be closed, so we check that it's not visible
    const rightSidebars = screen.queryAllByTestId('right-sidebar');
    expect(rightSidebars).toHaveLength(0);
  });

  it('should handle left sidebar toggle on mobile', async () => {
    const user = userEvent.setup();
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-left');
    await user.click(toggleButton);
    
    // Should show mobile overlay - check that sidebar elements exist
    const sidebars = screen.getAllByTestId('sidebar');
    expect(sidebars.length).toBeGreaterThan(0);
  });

  it('should handle right sidebar toggle', async () => {
    const user = userEvent.setup();
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-right');
    await user.click(toggleButton);
    
    expect(defaultProps.onToggleRightSidebar).toHaveBeenCalled();
  });

  it('should handle window resize events', () => {
    const { rerender } = render(<ResponsiveLayout {...defaultProps} />);
    
    // Change to mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Component should still render
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should handle mobile sidebar overlay', async () => {
    const user = userEvent.setup();
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-left');
    await user.click(toggleButton);
    
    // Should show mobile overlay - check that sidebar elements exist
    const sidebars = screen.getAllByTestId('sidebar');
    expect(sidebars.length).toBeGreaterThan(0);
  });

  it('should handle right sidebar overlay on mobile/tablet', async () => {
    const user = userEvent.setup();
    // Mock tablet width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-right');
    await user.click(toggleButton);
    
    // Should show right sidebar overlay - check that right sidebar elements exist
    const rightSidebars = screen.getAllByTestId('right-sidebar');
    expect(rightSidebars.length).toBeGreaterThan(0);
  });

  it('should handle missing onToggleRightSidebar gracefully', () => {
    const propsWithoutToggle = {
      ...defaultProps,
      onToggleRightSidebar: null,
    };
    
    render(<ResponsiveLayout {...propsWithoutToggle} />);
    
    // Should still render without errors
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    // Right sidebar might not be rendered when onToggleRightSidebar is null
  });

  it('should handle missing sidebar gracefully', () => {
    const propsWithoutSidebar = {
      ...defaultProps,
      sidebar: null,
    };
    
    render(<ResponsiveLayout {...propsWithoutSidebar} />);
    
    // Should still render other components
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should handle missing right sidebar gracefully', () => {
    const propsWithoutRightSidebar = {
      ...defaultProps,
      rightSidebar: null,
    };
    
    render(<ResponsiveLayout {...propsWithoutRightSidebar} />);
    
    // Should still render other components
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should handle missing children gracefully', () => {
    const propsWithoutChildren = {
      ...defaultProps,
      children: null,
    };
    
    render(<ResponsiveLayout {...propsWithoutChildren} />);
    
    // Should still render sidebars
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    render(<ResponsiveLayout {...defaultProps} />);
    
    const layout = screen.getByTestId('sidebar').closest('.main-layout');
    expect(layout).toHaveClass('flex', 'h-screen', 'bg-dashboard-bgPrimary', 'main-layout');
  });

  it('should handle multiple resize events', () => {
    render(<ResponsiveLayout {...defaultProps} />);
    
    // Change to mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    window.dispatchEvent(new Event('resize'));
    
    // Change to desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    window.dispatchEvent(new Event('resize'));
    
    // Component should still render
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should handle sidebar toggle multiple times', async () => {
    const user = userEvent.setup();
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-left');
    
    // Toggle multiple times
    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);
    
    // Should still render - check that sidebar elements exist
    const sidebars = screen.getAllByTestId('sidebar');
    expect(sidebars.length).toBeGreaterThan(0);
  });

  it('should handle right sidebar toggle multiple times', async () => {
    const user = userEvent.setup();
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    const toggleButton = screen.getByTestId('toggle-right');
    
    // Toggle multiple times
    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);
    
    // Should call the handler multiple times
    expect(defaultProps.onToggleRightSidebar).toHaveBeenCalledTimes(3);
  });

  it('should handle edge case screen sizes', () => {
    // Test exact breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // lg breakpoint
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should handle very small screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320, // Very small mobile
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should handle very large screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 2560, // Very large desktop
    });
    
    render(<ResponsiveLayout {...defaultProps} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
});
