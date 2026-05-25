# useEffect for Lifecycle Methods

## Class Lifecycle → useEffect Mapping

### componentDidMount

```jsx
// Class
componentDidMount() {
  fetchData();
}

// Hooks equivalent
useEffect(() => {
  fetchData();
}, []); // Empty dependency array = run once on mount
```

### componentDidUpdate

```jsx
// Class
componentDidUpdate(prevProps) {
  if (prevProps.userId !== this.props.userId) {
    fetchUser(this.props.userId);
  }
}

// Hooks equivalent
useEffect(() => {
  fetchUser(userId);
}, [userId]); // Runs when userId changes
```

### componentWillUnmount

```jsx
// Class
componentWillUnmount() {
  subscription.unsubscribe();
}

// Hooks equivalent
useEffect(() => {
  const subscription = subscribe();
  
  return () => {
    subscription.unsubscribe(); // Cleanup function
  };
}, []);
```

## Dependency Array Patterns

```jsx
// Run ONCE on mount
useEffect(() => {
  // Mount logic
}, []);

// Run when specific values change
useEffect(() => {
  // Update logic
}, [value1, value2]);

// Run after EVERY render (rarely needed)
useEffect(() => {
  // Runs every time
});
```

## Execution Order

1. Component renders
2. Screen updates (paint)
3. useEffect runs
4. (On next render) Cleanup runs first
5. Then new effect runs

## Common Patterns

### Data Fetching on Mount

```jsx
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);
```

### Subscription with Cleanup

```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Sync with Props

```jsx
useEffect(() => {
  setLocalValue(propValue);
}, [propValue]);
```

## Key Differences from Class Lifecycle

| Class | Hooks |
|-------|-------|
| Separate methods | Single useEffect (or multiple) |
| `this` binding | Closure captures values |
| Complex `prevProps` comparison | Dependency array |
| Sync before paint | Async after paint |

## Best Practices

1. **Keep effects focused** - One purpose per useEffect
2. **List all dependencies** - React warns about missing ones
3. **Clean up side effects** - Prevent memory leaks
4. **Avoid objects in deps** - Use primitives or useMemo
