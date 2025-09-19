import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import { ThemeProvider } from '../../src/contexts/ThemeContext';




// Mock the data
jest.mock('../../src/data/dashboard.json', () => ({
  app: {
    name: 'Analytics Dashboard'
  },
  navigation: {
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
    }
  },
  header: {
    search: {
      placeholder: 'Search',
      shortcut: '⌘/'
    },
    actions: {
      bell: { icon: 'bell', count: 3 },
      collapse: { icon: 'collapse' }
    }
  },
  notifications: {
    title: 'Notifications',
    items: [
      { id: 1, title: 'New order received', time: '2 min ago' }
    ]
  },
  activities: {
    title: 'Recent Activity',
    items: [
      { id: 1, description: 'User logged in', time: '10 min ago' }
    ]
  },
  contacts: {
    title: 'Contacts',
    items: [
      { id: 1, name: 'John Doe', status: 'online' }
    ]
  }
}));

// Mock the components
jest.mock('../../src/components/layout/ResponsiveLayout', () => {
  return function MockResponsiveLayout({ children, sidebar, rightSidebar }) {
    return (
      <div data-testid="responsive-layout">
        {sidebar}
        {children}
        {rightSidebar}
      </div>
    );
  };
});

jest.mock('../../src/components/layout/Sidebar', () => {
  return function MockSidebar({ navigation, appName, onPageChange, currentPage }) {
    return (
      <div data-testid="sidebar">
        <div>{appName}</div>
        {Object.entries(navigation).map(([key, section]) => (
          <div key={key}>
            <div>{section.title}</div>
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                data-testid={`nav-${item.id}`}
                className={currentPage === item.id ? 'active' : ''}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../../src/components/layout/Header', () => {
  return function MockHeader({ header, onToggleSidebar, currentPage }) {
    return (
      <div data-testid="header">
        <div>{currentPage}</div>
        <button onClick={onToggleSidebar} data-testid="toggle-sidebar">
          Toggle Sidebar
        </button>
      </div>
    );
  };
});

jest.mock('../../src/components/layout/RightSidebar', () => {
  return function MockRightSidebar({ notifications, activities, contacts }) {
    return (
      <div data-testid="right-sidebar">
        <div>{notifications.title}</div>
        <div>{activities.title}</div>
        <div>{contacts.title}</div>
      </div>
    );
  };
});

jest.mock('../../src/components/Dashboard', () => {
  return function MockDashboard({ dashboardData }) {
    return (
      <div data-testid="dashboard">
        <div>Dashboard Content</div>
      </div>
    );
  };
});

jest.mock('../../src/components/OrdersPage', () => {
  return function MockOrdersPage() {
    return (
      <div data-testid="orders-page">
        <div>Orders Page Content</div>
      </div>
    );
  };
});

// Mock the validation utilities
jest.mock('../../src/utils/validation', () => ({
  validatePageId: jest.fn((pageId) => pageId || 'default'),
  validateTheme: jest.fn((theme) => theme === 'light' || theme === 'dark' ? theme : 'light'),
  safeLocalStorageGet: jest.fn((key, defaultValue) => defaultValue),
  safeLocalStorageSet: jest.fn(),
  validateSearchQuery: jest.fn((query) => query),
  sanitizeString: jest.fn((input) => input),
  validateLocalStorageData: jest.fn((key, value) => true),
}));

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the main app structure', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('right-sidebar')).toBeInTheDocument();
  });

  it('should render dashboard by default', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('orders-page')).not.toBeInTheDocument();
  });

  it('should render orders page when orders is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    const ordersButton = screen.getByTestId('nav-orders');
    await user.click(ordersButton);
    
    expect(screen.getByTestId('orders-page')).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
  });

  it('should render dashboard when default is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    // First go to orders
    const ordersButton = screen.getByTestId('nav-orders');
    await user.click(ordersButton);
    expect(screen.getByTestId('orders-page')).toBeInTheDocument();
    
    // Then go back to default
    const defaultButton = screen.getByTestId('nav-default');
    await user.click(defaultButton);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should handle sidebar toggle', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    const toggleButton = screen.getByTestId('toggle-sidebar');
    await user.click(toggleButton);
    
    // Should not throw error
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should show active navigation item', () => {
    renderWithTheme(<App />);
    
    const defaultButton = screen.getByTestId('nav-default');
    expect(defaultButton).toHaveClass('active');
    
    const ordersButton = screen.getByTestId('nav-orders');
    expect(ordersButton).not.toHaveClass('active');
  });

  it('should update active navigation item when page changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    const ordersButton = screen.getByTestId('nav-orders');
    await user.click(ordersButton);
    
    expect(ordersButton).toHaveClass('active');
    
    const defaultButton = screen.getByTestId('nav-default');
    expect(defaultButton).not.toHaveClass('active');
  });

  it('should render app name in sidebar', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  it('should render navigation sections', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('should render navigation items', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('should render header with current page', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByText('default')).toBeInTheDocument();
  });

  it('should update header when page changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    const ordersButton = screen.getByTestId('nav-orders');
    await user.click(ordersButton);
    
    expect(screen.getByText('orders')).toBeInTheDocument();
  });

  it('should render right sidebar with all sections', () => {
    renderWithTheme(<App />);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  it('should handle multiple page changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    // Start with default
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    
    // Go to orders
    const ordersButton = screen.getByTestId('nav-orders');
    await user.click(ordersButton);
    expect(screen.getByTestId('orders-page')).toBeInTheDocument();
    
    // Go back to default
    const defaultButton = screen.getByTestId('nav-default');
    await user.click(defaultButton);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should handle rapid page changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<App />);
    
    const ordersButton = screen.getByTestId('nav-orders');
    const defaultButton = screen.getByTestId('nav-default');
    
    // Rapidly click between pages
    await user.click(ordersButton);
    await user.click(defaultButton);
    await user.click(ordersButton);
    await user.click(defaultButton);
    
    // Should end up on default page
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should handle missing navigation data gracefully', () => {
    // Mock empty navigation
    jest.doMock('../../src/data/dashboard.json', () => ({
      app: { name: 'Test App' },
      navigation: {},
      header: {},
      notifications: {},
      activities: {},
      contacts: {}
    }));
    
    renderWithTheme(<App />);
    
    // Should still render without errors
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
  });

  it('should handle missing app data gracefully', () => {
    // Mock missing app data
    jest.doMock('../../src/data/dashboard.json', () => ({
      app: null,
      navigation: {},
      header: {},
      notifications: {},
      activities: {},
      contacts: {}
    }));
    
    renderWithTheme(<App />);
    
    // Should still render without errors
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
  });

  it('should handle missing header data gracefully', () => {
    // Mock missing header data
    jest.doMock('../../src/data/dashboard.json', () => ({
      app: { name: 'Test App' },
      navigation: {},
      header: null,
      notifications: {},
      activities: {},
      contacts: {}
    }));
    
    renderWithTheme(<App />);
    
    // Should still render without errors
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
  });

  it('should handle missing sidebar data gracefully', () => {
    // Mock missing sidebar data
    jest.doMock('../../src/data/dashboard.json', () => ({
      app: { name: 'Test App' },
      navigation: null,
      header: {},
      notifications: {},
      activities: {},
      contacts: {}
    }));
    
    renderWithTheme(<App />);
    
    // Should still render without errors
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
  });

  it('should handle missing right sidebar data gracefully', () => {
    // Mock missing right sidebar data
    jest.doMock('../../src/data/dashboard.json', () => ({
      app: { name: 'Test App' },
      navigation: {},
      header: {},
      notifications: null,
      activities: null,
      contacts: null
    }));
    
    renderWithTheme(<App />);
    
    // Should still render without errors
    expect(screen.getByTestId('responsive-layout')).toBeInTheDocument();
  });
});
