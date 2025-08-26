import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback glass">
          <h2 style={{color: '#fff'}}>Something went wrong.</h2>
          <p style={{color: '#ccc'}}>Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;