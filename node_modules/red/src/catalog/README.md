# `red/catalog`

The `red/catalog` allows you to create components that can be swapped by
a completely different component. Just give you some idea on what this
pattern unlocks:

- **Experimentation** All your components support A/B testing out of the box,
  when a user is within a treatment you can simply replace default (control)
  with the new version.
- **Loading states** Are currently processing something, replace all interactive
  components with their loading equivalents.
- **Skeleton UI** Default to skeleton UI components, and once your app and it's
  data is loaded switch to your actual components.
- **React Native** You don't need to rewrite your application, shared components
- **UI library agnostic** As a developer of components your components can be
  used by anyone, no matter which ui framework they use. As any component that
  used can be replaced with their library equivalents.

And the list goes on. This class is the backbone of the `red/register` and `red`
endpoints. It's not recommended that you interact with class directly.

## Swap

When the catalog is created it introduces the `Swap` automatically. This
component allows you switch out any of the components that you are rendering
on the fly. There's no limit to the amount of components that you can swap.

There are a couple of ways of accessing the `Swap` component, it comes
automatically introduced on the `red`, `red/register` components as they
interact with the catalog, otherwise you can access them to the catalogs
`.swap` method and `.db.get`'s component cache.

```js
const { Swap } = require('red/register')();
const { Swap } = require('red');

const { catalog } = require('red/catalog');
const Swap = catalog.db.get('Swap');  // Cached instance
const Swap = catalog.swap();          // Component Creation
```

The component assumes that any `prop` that is given is a component that
should be replaced.

```js
<Example>
  <Text>Hello World</Text>

  <Swap Text={ Bold }>
    <Text>This text is now bold</Text>

    <div>
      <Text>This is also bold</Text>
    </div>
  </Swap>

  <Text>Still normal text</Text>
</Example>
```

In the example above we use the `Swap` component to replace the `Text` component
with our `Bold` component. So all occurrences of `Text` will now be rendering
with the `Bold` component instead. The `Swap` component can be nested with
more `Swap` components, this way you can also **prevent** certain components
from getting swapped.

```js
<Swap Text={ Bold }>
  <Text>This text is now bold</Text>

  <Swap Text={ Text }>
    <Text>This will be normal text</Text>
  </Swap>
</Swap>
```

## create

- `name`, *String*, The name of the component it should render. This should
  match with the name of the component that you register using [set](#set)

```js
const Picture = catalog.create('Picture');
const Button = catalog.create('Button');
const Header = catalog.create('Header');
const Text = catalog.create('Text');
const Bold = catalog.create('Bold');
const Box = catalog.create('Box');

<Box>
  <Header>This is an example</Header>

  <Picture src="https://example.com/image.jpeg" />
  <Text><Bold>Lorem ipsum</Bold> dolor sit amet, consectetur adipiscing elit</Text>

  <Button onPress={ (e) =>  console.log('Pressed') }>Next</Button>
</Box>
```

In order for the actual components to be registered in the catalog, see the
[set](#set) method below.

Components can be registered at any point in time, until they are rendered by
React. When you do try to render an unregistered component we will throw an
error.

```js
const Text = catalog.create('Text');

function App() {
  return <Text>Example</Text>
}

//
// Still no error is thrown, you can still create the whole component structure
// without registering.
//
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

//
// Now the component will throw an error as we're actually trying to render.
//
root.render(<App />);
```

In the example above the following error will be throw:

> The component (Text) doesn't exist.

It provides the name of the component that is missing. 

## set

Registers the component for a given name. Note that when you [clone](#clone)
or construct the catalog you can also pass in the initial set of components
that you want your catalog to support.

- `name`, *String*, The name of the component you're trying to register.
- `Component`, *Component* The component.

```js
function Picture({ src, description }) {
  return <img src={ src } alt={ description } />
}

catalog.set('Picture', Picture);
```
