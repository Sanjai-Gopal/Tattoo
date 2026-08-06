import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Uncaught render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container error-page">
          <p className="error-code">500</p>
          <h1>Something Went Wrong</h1>
          <p>An unexpected error occurred while rendering this page.</p>
          <button className="shop-all-btn" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
