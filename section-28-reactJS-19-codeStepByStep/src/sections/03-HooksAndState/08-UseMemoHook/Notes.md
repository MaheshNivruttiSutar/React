# useMemo Hook

## What is useMemo?

useMemo memoizes the result of a computation, recalculating only when dependencies change.

## Syntax

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

## Use Cases

### Expensive Calculations

```jsx
const result = useMemo(() => {
  return expensiveCalculation(number);
}, [number]); // Only recalculates when number changes
```

### Filtering Arrays

```jsx
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === category);
}, [items, category]);
```

### Sorting Arrays

```jsx
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

### Derived Values

```jsx
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

## useMemo vs useCallback

```jsx
// useMemo - memoizes VALUE
const value = useMemo(() => computeValue(), [deps]);

// useCallback - memoizes FUNCTION
const fn = useCallback(() => doSomething(), [deps]);

// These are equivalent:
useMemo(() => fn, deps) === useCallback(fn, deps)
```

## When to Use

- Expensive calculations
- Large array operations (filter, sort, map)
- Creating objects passed to context
- Referential equality for memoized children

## When NOT to Use

- Simple calculations
- Already fast operations
- Every single variable (overhead)

## Best Practices

1. **Profile first** - Measure before optimizing
2. **Check dependencies** - Include all used values
3. **Keep calculations pure** - No side effects
