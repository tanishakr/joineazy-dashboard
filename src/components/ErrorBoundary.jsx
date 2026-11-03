import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  // React calls this automatically when a child component crashes
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // Clear the saved data and reload the app with fresh seed data
  handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div
            role="alert"
            className="bg-surface border border-line rounded-xl p-8 max-w-md text-center"
          >
            <p className="text-4xl mb-3">⚠️</p>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted mb-6">
              The saved data may be corrupted. Resetting will restore the sample
              data and log you out.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2 font-semibold"
            >
              Reset data
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary