# What is State?

## Definition

**State** is data that can change over time and affects what a component renders. When state changes, React re-renders the component.

## State vs Props

| State | Props |
|-------|-------|
| Owned by component | Passed from parent |
| Can change | Read-only |
| Triggers re-render | Triggers re-render |
| `useState` hook | Function parameters |

## useState Hook

```jsx
const [value, setValue] = useState(initialValue);
```

- `value` - Current state value
- `setValue` - Function to update state
- `initialValue` - Starting value

## State Types

### Number

```jsx
const [count, setCount] = useState(0);

setCount(5);           // Set to 5
setCount(count + 1);   // Increment
setCount(prev => prev + 1);  // Functional update
```

### String

```jsx
const [name, setName] = useState('');

setName('John');
setName(e.target.value);  // From input
```

### Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);

setIsOpen(true);
setIsOpen(!isOpen);     // Toggle
setIsOpen(prev => !prev);  // Toggle with functional
```

### Array

```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));

// Update item
setItems(items.map(item => 
  item.id === id ? { ...item, name: 'New' } : item
));
```

### Object

```jsx
const [user, setUser] = useState({ name: '', age: 0 });

// Update field
setUser({ ...user, name: 'John' });

// Update nested
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: 'NYC' }
}));
```

## Rules

### 1. Never Mutate State

```jsx
// ❌ Wrong
items.push(newItem);
user.name = 'John';

// ✅ Correct
setItems([...items, newItem]);
setUser({ ...user, name: 'John' });
```

### 2. State Updates are Async

```jsx
setCount(count + 1);
console.log(count);  // Still old value!

// Use useEffect to react to changes
useEffect(() => {
  console.log(count);  // New value
}, [count]);
```

### 3. Use Functional Updates

```jsx
// When new state depends on previous
setCount(prev => prev + 1);

// Especially important for rapid updates
const increment = () => {
  setCount(prev => prev + 1);  // ✅ Always works
  setCount(count + 1);         // ⚠️ Might be stale
};
```

## When to Use State

- Form inputs
- Toggle UI elements
- Counters
- Selected items
- Dynamic lists
- User preferences

## Best Practices

1. **Initialize properly** - Match initial value type
2. **Keep state minimal** - Derive values when possible
3. **Lift state up** - Share between components via parent
4. **Use functional updates** - For state based on previous
