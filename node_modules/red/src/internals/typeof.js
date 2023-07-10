/**
 * Simply, a better typeof.
 *
 * @param {Mixed} value What ever we want to know the type of.
 * @returns {String} Type indication.
 * @public
 */
module.exports = function type(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
