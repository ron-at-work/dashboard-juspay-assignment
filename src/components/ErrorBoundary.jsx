import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of the component tree that crashed
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-dashboard-bgPrimary">
          <div className="max-w-md w-full bg-dashboard-card rounded-lg shadow-lg p-6 border border-dashboard-border">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg 
                  className="h-8 w-8 text-dashboard-error" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-dashboard-textPrimary">
                  Something went wrong
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-dashboard-textSecondary">
                We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4">
                <summary className="text-sm font-medium text-dashboard-textPrimary cursor-pointer">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-dashboard-bgSecondary rounded border">
                  <pre className="text-xs text-dashboard-textSecondary whitespace-pre-wrap">
                    {this.state.error?.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 bg-dashboard-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-dashboard-bgSecondary text-dashboard-textPrimary px-4 py-2 rounded-md text-sm font-medium hover:bg-dashboard-bgTertiary transition-colors border border-dashboard-border"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
