const { forwardRef, createElement, createContext, useContext, useMemo } = require('react');
const displayName = require('red/internals/displayname');

/**
 * The catalog allows you register components that can switched out for
 * different components at the flip of switch. This allows you to easily
 * do experimentation with components, introduce loading states, ui skeletons,
 * and much more.
 */
class Catalog {
  /**
   * Create a new catalog.
   *
   * @param {Object} [components={}] The components it should contain.
   * @param {Catalog} parent Reference to a parent catalog.
   * @public
   */
  constructor(components = {}, parent) {
    this.components = components;
    this.parent = parent;
    this.db = new Map();

    //
    // Introduce a custom Registry component that can update the context with
    // a new database that contains all components that are allowed.
    //
    this.db.set('Swap', this.swap());
    this.context = displayName(createContext(this), 'Catalog');
  }

  /**
   * Create a wrapper component that can leverage components introduced through
   * context instead of the originally provided components.
   *
   * @param {String} name Name of the component.
   * @returns {React.Component} A forwardRef wrapped component that renders given component.
   * @public
   */
  create(name) {
    /**
    * Each component provided by the registry is wrapped so it can replace
    * components on the fly using React Context, but also provide a meaningful
    * DX when components fail.
    *
    * @param {Mixed} children Children to be rendered.
    * @param {Object} props Properties for the component.
    * @param {Mixed} ref reference for the component.
    * @public
    */
    return displayName(forwardRef(({ children, ...props }, ref) => {
      const context = useContext(this.context);
      const element = context.get(name);

      if (!element) throw new Error(`The component (${name}) doesn't exist.`);

      //
      // We return a memorized component, this will prevent expensive
      // rerenders of the component when the context changes. As a context
      // change doesn't mean that this specific element also needs to be
      // rerendered.
      //
      return useMemo(() => (
        createElement(element, { ...props, ref }, children)
      ), [element, props, ref, children]);
    }), { name: name });
  }

  /**
   * Create a component that introduces a new database through
   * React.Context so components can be rerendered.
   *
   * @returns {React.Component} A custom component that clones the database.
   * @private
   */
  swap() {
    return displayName(({ children, ...props }) => {
      //
      // Clone the current database, and merge in the new components that
      // we should be introducing through the context. We need to use memo
      // here to prevent creating multiple clones, but also limiting the
      // amount of component updates as our goal is to trigger only a
      // re-render on components that have been updated.
      //
      const value = useMemo(() => this.clone(props), [ props ]);
      return createElement(this.context.Provider, { value }, children);
    }, { name: 'Swap' });
  }

  /**
   * Creates a referenced clone.
   *
   * @param {Object} [components={}] The components it should own.
   * @returns {Catalog} The new ReactRegistry.
   * @public
   */
  clone(components = {}) {
    return new Catalog(components, this);
  }

  /**
   * Checks if a given component exists.
   *
   * @param {String} name The name of the component.
   * @returns {Boolean} Indication of existance.
   * @public
   */
  has(name) {
    return !!this.get(name);
  }

  /**
   * Find a component by name.
   *
   * @param {String} name The name of the component.
   * @returns {React.Component} [description]
   * @public
   */
  get(name) {
    if (name in this.components) return this.components[name];
    if (this.parent) return this.parent.get(name);
  }

  /**
   * Add a new component to the catalog.
   *
   * @param {String} name Name of the component.
   * @param {React.Component} component Component to use.
   * @returns {Boolean} Indication if component was stored.
   * @public
   */
  set(name, component) {
    if (name in this.components) return false;

    this.components[name] = component;
    return true;
  }
}

//
// Expose for consumption.
//
module.exports = {
  catalog: new Catalog(),
  Catalog
};
