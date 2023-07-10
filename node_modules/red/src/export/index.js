const displayName = require('red/internals/displayname');
const { catalog } = require('red/catalog');

/**
 * Introduces the given component to our core catalog before exposing it.
 *
 * @param {Object} components Object with the name => components that needs exported.
 * @returns {Object} The component that was given.
 * @public
 */
function exporter(components = {}) {
  for (const [name, component] of Object.entries(components)) {
    catalog.set(name, displayName(component, { name }));
  }

  return components;
}

//
// Expose for consumption.
//
module.exports = exporter;
