const { catalog } = require('red/catalog');

/**
 * Register a new set components that we want to expose to our users.
 *
 * @param {Object} [components={}] The default set of components.
 * @param {Object} [options={}] Configuration.
 * @returns {Object} The proxy that wrapped your components.
 * @public
 */
function register(components = {}, {
  missing = false
} = {}) {
  const collection = catalog.clone(components);

  return new Proxy({ /* Expose no internals to our consumers */ }, {
    get(_, name) {
      if (collection.db.has(name)) return collection.db.get(name);

      //
      // React gives a terrible DX when it's trying to render a component
      // that doesn't exist. e.g. when someone is making a typo in the
      // import statement or when a component they are trying to import
      // simply doesn't exist. As the exports is just an object, tooling
      // often don't catch these errors early enough, we can do better.
      //
      // When we detect that a user is trying to render a non-existing
      // component we can throw an error with the actual *name* of component
      // they made a mistake with, so they can just search and correct
      // these bugs instead of wondering what suddenly become "undefined"
      // in their codebase.
      //
      if (missing && !collection.has(name)) {
        throw new Error(`The component (${name}) doesn't exist.`);
      }

      collection.db.set(name, collection.create(name));
      return collection.db.get(name);
    }
  });
}

//
// Expose for consumption.
//
module.exports = register;
