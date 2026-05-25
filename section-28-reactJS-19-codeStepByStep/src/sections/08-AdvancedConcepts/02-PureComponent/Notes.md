# Pure Components & React.memo

## What is a Pure Component?

A Pure Component is a component that renders the same output for the same props and state. In functional React, we achieve this optimization using `React.memo()`.

## The Re-rendering Problem

By default, when a parent component re-renders, ALL its children re-render too, even if their props haven't changed:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {/* Child re-renders on EVERY count change, even though it doesn't use count */}
      <Child name="Static" />
    </div>
  );
}
```

## React.memo() - The Solution

`React.memo` is a Higher Order Component (HOC) that memoizes your component, preventing re-renders when props are the same:

```jsx
import { memo } from 'react';

const Child = memo(function Child({ name }) {
  console.log('Child rendered');
  return <div>Hello, {name}!</div>;
});

// Now Child only re-renders when 'name' prop changes
```

## How React.memo Works

1. First render: Component renders normally
2. Subsequent renders: React compares new props with previous props
3. If props are the same (shallow comparison): Skip re-render, use cached result
4. If props are different: Re-render the component

```jsx
// Shallow comparison means:
{ name: 'John' } === { name: 'John' }  // false (different objects)
'John' === 'John'  // true (same primitive)
```

## When to Use React.memo

### Good Use Cases

```jsx
// 1. Expensive rendering
const ExpensiveList = memo(({ items }) => {
  return items.map(item => <ComplexItem key={item.id} {...item} />);
});

// 2. Frequent parent updates
const StableChild = memo(({ config }) => {
  return <div>{config.title}</div>;
});

// 3. Same props over time
const Header = memo(({ title, logo }) => {
  return <header>{title}</header>;
});
```

### When NOT to Use

```jsx
// 1. Props change frequently anyway
const Counter = memo(({ count }) => <div>{count}</div>); // Useless

// 2. Very simple components (overhead not worth it)
const Label = memo(({ text }) => <span>{text}</span>); // Overkill

// 3. Component uses context that changes often
const ThemedButton = memo(({ label }) => {
  const theme = useContext(ThemeContext); // Re-renders on theme change anyway
  return <button style={theme}>{label}</button>;
});
```

## The Function Reference Problem

Objects and functions create new references on each render:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // NEW function reference every render!
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    // MemoizedButton re-renders because onClick is always "new"
    <MemoizedButton onClick={handleClick} />
  );
}
```

### Solution: useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // SAME function reference across renders
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Empty deps = never changes

  return (
    // MemoizedButton won't re-render unnecessarily
    <MemoizedButton onClick={handleClick} />
  );
}
```

## The Object Reference Problem

Same issue with objects:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // NEW object reference every render!
  const style = { color: 'blue' };

  return <MemoizedBox style={style} />; // Re-renders every time!
}
```

### Solution: useMemo

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // SAME object reference across renders
  const style = useMemo(() => ({ color: 'blue' }), []);

  return <MemoizedBox style={style} />; // Won't re-render unnecessarily
}
```

## Custom Comparison Function

React.memo's second argument lets you customize the comparison:

```jsx
const UserCard = memo(
  function UserCard({ user }) {
    return (
      <div>
        <h3>{user.name}</h3>
        <p>Visits: {user.visits}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true = props are equal, skip re-render
    // Return false = props are different, re-render
    
    // Only re-render if user.id changes (ignore other fields)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### Comparison Function Guidelines

```jsx
// areEqual function
(prevProps, nextProps) => {
  // Return true: props are "equal" - don't re-render
  // Return false: props are "different" - do re-render
}

// Common patterns:
// 1. Compare specific fields
return prevProps.id === nextProps.id;

// 2. Deep comparison (expensive!)
return JSON.stringify(prevProps) === JSON.stringify(nextProps);

// 3. Multiple field comparison
return (
  prevProps.user.id === nextProps.user.id &&
  prevProps.user.name === nextProps.user.name
);
```

## Complete Pattern: memo + useCallback + useMemo

```jsx
function Parent() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  // Memoize expensive computation
  const filteredItems = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );

  // Memoize callback
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []);

  // Memoize object
  const listStyle = useMemo(() => ({
    maxHeight: '400px',
    overflow: 'auto'
  }), []);

  return (
    <MemoizedList
      items={filteredItems}
      onItemClick={handleItemClick}
      style={listStyle}
    />
  );
}

const MemoizedList = memo(function List({ items, onItemClick, style }) {
  return (
    <ul style={style}>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});
```

## Performance Debugging

Use React DevTools Profiler to:
1. Identify unnecessary re-renders
2. See which components re-render and why
3. Measure render times

```jsx
// Add display names for better debugging
const MemoizedComponent = memo(function MyComponent(props) {
  // ...
});
// Shows as "MyComponent" in DevTools instead of "Anonymous"
```

## Summary Table

| Hook/HOC | Purpose | Use When |
|----------|---------|----------|
| `React.memo` | Memoize component | Props don't change often |
| `useCallback` | Memoize function | Passing callbacks to memoized children |
| `useMemo` | Memoize value/object | Expensive calculations or object props |

## Best Practices

1. **Profile first**: Don't optimize prematurely
2. **Memoize selectively**: Not every component needs memo
3. **Watch for new references**: Functions and objects break memoization
4. **Use with useCallback/useMemo**: For complete optimization
5. **Name your components**: Better debugging experience
