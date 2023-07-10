# `red/register`

Creates a `Proxy` that automatically registers the components in a
[`red/catalog`][catalog].

## Arguments

- `components`, *Object, `{}`*, The components that should be exposed. T
- `missing`, *Boolean, `false`* Throw an error when a requested component does
  has not been registered.

## Examples

```js
// package: 'ui-library'
const Button = require('your-button-component');
const Input = require('your-input-component');

module.exports = require('red/register')({
  Button,
  Input
}, { missing: true });
```

Now that the component interface has been created it can be consumed in your
application code, in the examples below the `ui-library` package is the
contents of the previous example.

```js
const { Button } = require('ui-library');

console.log(Button); // The component
```

Now when you require the `Button` component it works as intended. You'll get
the `Button` component you've specified (but it's enhanced by the [catalog]).
As we've created our `ui-library` with the `missing` option specified it will
throw an error when a non existing component is referred.

```js
const { NonExistent } = require('ui-library');

// Throw Error: The component (NonExistent) doesn't exist.
```

The major benefit of this approach is that when your users consume your
`ui-library` they can take comfort in knowing that the components they
are trying render actually exist. When you expose components using a normal
`module.exports = {}` pattern, the `NonExistent` `const` will be defined but
contains an `undefined` as value. Nothing will be broken until they render
their application:

> Error: Element type is invalid: expected a string (for built-in components) or
> a class/function (for composite components) but got: undefined. You likely
> forgot to export your component from the file it's defined in, or you might
> have mixed up default and named imports.

While the Error message tells you it can't render because it was given an
`undefined`, you still don't know what component caused it, it can be hidden
deeply in the component tree. Our export pattern completely eliminates this
as an Error is thrown containing the name of Component that doesn't exist.

[catalog]: ../catalog/README.md
