/**
 * Force the name of a component in an UpperCase first format.
 *
 * @param {String} name Name of the component.
 * @returns {String} UpperCase First name.
 * @private
 */
function format(name = '') {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Provide a meaningful displayName for the given component.
 *
 * @param {React.Component} component [description]
 * @param {String} name Name the component needs to replaced with.
 * @param {[type]} prefix Prefix the name with the following.
 * @param {[type]} suffix Suffix the name with the following.
 * @returns {React.Component} The component you passed.
 * @public
 */
module.exports = function displayName(component, { name, prefix, suffix } = {}) {
  const og = component.displayName;

  if (!og && name) component.displayName = format(name);
  if (prefix) component.displayName = format(prefix) + format(og);
  if (suffix) component.displayName = format(og) + format(suffix);

  return component;
};
