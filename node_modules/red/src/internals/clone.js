const { STATE } = require('red/internals/constants');
const typecheck = require('red/internals/typeof');

/**
 * Creates a snapshot of a given thing.
 *
 * @param {Mixed} obj Whatever we need to clone really.
 * @returns {Mixed} Snapshot of whatever was given.
 * @private
 */
module.exports = function clone(obj) {
  let result = obj;

  switch(typecheck(obj)) {
    case 'set': return new Set([...obj].map(value => clone(value)));
    case 'map': return new Map([...obj].map(kv => [clone(kv[0]), clone(kv[1])]));
    case 'date': return new Date(obj.getTime());

    case 'array':
    case 'object':
    result = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //
        // Optimization, we don't want to clone a datastructure that might
        // already have been cloned. Which is the case for an object that
        // is transformed into another of our proxies. In those cases we
        // want to re-use the created snapshot as those would have been
        // created before any other handler is called.
        //
        if (obj[key] && obj[key][STATE]) result[key] = obj[key][STATE].snapshot;
        result[key] = clone(obj[key]);
      }
    }
  }

  return result;
};
