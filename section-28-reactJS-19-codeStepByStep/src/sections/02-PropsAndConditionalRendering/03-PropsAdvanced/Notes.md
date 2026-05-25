# Advanced Props Patterns

## Rest/Spread Props

Pass additional props through to underlying elements.

```jsx
const Button = ({ children, variant, ...props }) => (
  <button className={`btn btn-${variant}`} {...props}>
    {children}
  </button>
);

// Usage - onClick and data-testid pass through
<Button variant="primary" onClick={handleClick} data-testid="btn">
  Click
</Button>
```

## Default Props

Set default values using destructuring.

```jsx
const Button = ({ 
  size = 'medium',
  variant = 'primary',
  disabled = false,
  children 
}) => (
  <button className={`btn-${size} btn-${variant}`} disabled={disabled}>
    {children}
  </button>
);
```

## Render Props

Pass a function to control rendering.

```jsx
const List = ({ items, renderItem, emptyMessage }) => {
  if (items.length === 0) {
    return <p>{emptyMessage}</p>;
  }
  return <ul>{items.map(renderItem)}</ul>;
};

// Usage
<List
  items={users}
  renderItem={(user) => (
    <li key={user.id}>
      {user.name} - {user.role}
    </li>
  )}
  emptyMessage="No users"
/>
```

## Compound Components

Components that work together.

```jsx
const Tabs = ({ children, defaultTab }) => {
  const [active, setActive] = useState(defaultTab);
  // ... manages active state
  return <div>{children}</div>;
};

const Tab = ({ children }) => <div>{children}</div>;

// Usage
<Tabs defaultTab={0}>
  <Tab label="Home">Home content</Tab>
  <Tab label="Profile">Profile content</Tab>
</Tabs>
```

## JSX Elements as Props

Pass components or JSX as props.

```jsx
const Button = ({ children, leftIcon, rightIcon }) => (
  <button>
    {leftIcon && <span className="icon-left">{leftIcon}</span>}
    {children}
    {rightIcon && <span className="icon-right">{rightIcon}</span>}
  </button>
);

// Usage
<Button leftIcon={<SearchIcon />}>
  Search
</Button>
```

## Children Manipulation

Use React.Children utilities.

```jsx
import { Children, cloneElement } from 'react';

const ButtonGroup = ({ children, size }) => (
  <div className="btn-group">
    {Children.map(children, child =>
      cloneElement(child, { size })
    )}
  </div>
);
```

## Props Validation (TypeScript)

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
}) => { ... };
```

## Polymorphic Components

Render as different elements.

```jsx
const Box = ({ as: Component = 'div', children, ...props }) => (
  <Component {...props}>{children}</Component>
);

// Usage
<Box as="section" className="hero">Hero content</Box>
<Box as="article">Article content</Box>
<Box as={Link} to="/home">Link content</Box>
```

## Best Practices

1. **Use TypeScript** for prop validation
2. **Document props** with comments
3. **Keep props minimal** - split large components
4. **Use composition** over complex props
5. **Consistent naming** - onX for handlers
