const { PureComponent, createElement, Fragment } = require('react');
const displayName = require('red/internals/displayname');

/**
 * ErrorBoundary is an extendable class that transparently handles any
 * error that is propagated through the React Tree.
 *
 * @extends PureComponent
 */
class ErrorBoundary extends PureComponent {
  state = {};

  /**
   * Automatically assign the received error as state.
   *
   * @param {Error} error The error that has bubbled up.
   * @returns {Object} The new state.
   * @private
   */
  static getDerivedStateFromError(error) {
    return { error };
  }

  /**
   * Allows forwarding of the error.
   *
   * @private
   */
  componentDidCatch() {
    this.forward && this.forward(...arguments);
  }

  /**
   * Renders the result of the assigned component function.
   *
   * @returns {Fragment} Fragment, witht the component result.
   * @private
   */
  render() {
    const error = this.state.error;
    const props = this.props;
    let kiddo;

    if (this.functional) kiddo = this.functional(props, error);
    else if (err) kiddo = createElement(props.error || this.error, { error, ...props }, props.children);
    else kiddo = props.children;

    return createElement(Fragment, null, kiddo);
  }
}

/**
 * Creates a ErrorBoundary, but using a functional API. It designed after the
 * React.forwardRef API.
 *
 * @param {Function} fn Function that receives the props, and an optional err.
 * @param {Function} [fwd] Optional error handler that can forward errors to services.
 * @returns {ErrorBoundary} ErrorBoundary component.
 * @public
 */
function createBoundary(fn, fwd) {
  return displayName(class extends ErrorBoundary {
    forward = fwd;
    functional = fn;
  }, { name: 'ErrorBoundaryWrapper' });
}

//
// Expose for consumption.
//
module.exports = require('red/export')({
  ErrorBoundary,
  createBoundary
});
