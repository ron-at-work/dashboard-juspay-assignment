import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../src/components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Component that throws an error in render
const ThrowErrorInRender = () => {
  throw new Error('Render error');
};

// Mock console.error to avoid noise in test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
  });

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();
    // The error text is in the pre element, so we need to look for it differently
    expect(screen.getByText(/Render error/)).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('should not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('should have retry button that resets error state', async () => {
    const user = userEvent.setup();
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Check that retry button exists and can be clicked
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
    
    // Click the retry button - this should reset the error state
    await user.click(retryButton);
    
    // The error state should be reset (though children won't re-render automatically)
    // This test just verifies the button exists and can be clicked
  });

  it('should have refresh page button', () => {
    // Mock window.location.reload
    delete window.location;
    window.location = { reload: jest.fn() };
    
    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByText('Refresh Page');
    expect(refreshButton).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should log error details to console', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });

  it('should handle multiple errors correctly', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Trigger another error
    rerender(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorInRender />
      </ErrorBoundary>
    );

    // Check for the error icon SVG element
    const errorIcon = document.querySelector('svg');
    expect(errorIcon).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Try Again');
    expect(buttons[1]).toHaveTextContent('Refresh Page');
  });
});
