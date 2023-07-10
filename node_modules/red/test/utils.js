const { mount } = require('@cypress/react18');
const React = require('react');

module.exports = {
  /**
   * This enhanced mount method ensures that all our components are tested
   * under strict mode. We should never be using deprecated API's.
   *
   * @param {Component} component The component that needs to be rendered.
   * @param {Object} opts Options for mounting.
   * @returns {Mixed} The mount result.
   * @public
   */
  mount: function mounter(component, opts) {
    return mount(
      <>
        <React.StrictMode />
        <div data-red-root>
          { component }
        </div>
      </>
    , opts);
  }
}
