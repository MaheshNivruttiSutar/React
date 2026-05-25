# Derived State

## What is Derived State?

Derived state is data computed from existing state rather than stored separately. It's calculated during render instead of being synced.

## Bad: Duplicate State

```jsx
// ❌ Keeping derived data in separate state
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [count, setCount] = useState(0);

// Must update all three when items change!
const addItem = (item) => {
  setItems([...items, item]);
  setTotal(total + item.price);
  setCount(count + 1);
};
```

## Good: Derived State

```jsx
// ✅ Compute from source state
const [items, setItems] = useState([]);

// These are derived - computed on render
const total = items.reduce((sum, item) => sum + item.price, 0);
const count = items.length;

// Only update source state
const addItem = (item) => {
  setItems([...items, item]);
  // total and count update automatically!
};
```

## Common Examples

### Filtered List

```jsx
const [items, setItems] = useState([...]);
const [filter, setFilter] = useState('all');

// Derived filtered list
const filteredItems = filter === 'all'
  ? items
  : items.filter(item => item.category === filter);
```

### Search

```jsx
const [items, setItems] = useState([...]);
const [searchTerm, setSearchTerm] = useState('');

// Derived search results
const searchResults = items.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Calculations

```jsx
const [cart, setCart] = useState([...]);

// Derived calculations
const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const tax = subtotal * 0.1;
const total = subtotal + tax;
const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
```

### Sorted List

```jsx
const [items, setItems] = useState([...]);
const [sortBy, setSortBy] = useState('name');

// Derived sorted list
const sortedItems = [...items].sort((a, b) => {
  if (sortBy === 'price') return a.price - b.price;
  return a.name.localeCompare(b.name);
});
```

## useMemo for Performance

When derivation is expensive, use useMemo:

```jsx
// Only recomputes when dependencies change
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === filter);
}, [items, filter]);

const statistics = useMemo(() => {
  return {
    total: items.reduce((sum, i) => sum + i.price, 0),
    average: items.reduce((sum, i) => sum + i.price, 0) / items.length,
    min: Math.min(...items.map(i => i.price)),
    max: Math.max(...items.map(i => i.price)),
  };
}, [items]);
```

## Rules

1. **Single source of truth** - One state, derive the rest
2. **Don't store derived** - Compute on render
3. **Use useMemo** - For expensive calculations
4. **Keep state minimal** - Only store what can't be derived

## Benefits

- **No sync bugs** - Derived values always match source
- **Simpler updates** - Only update source state
- **Less code** - Fewer state variables
- **Clearer logic** - Dependencies are explicit
