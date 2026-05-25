# useCallback Hook

## What is useCallback?

useCallback memoizes a function, returning the same function reference unless dependencies change.

## Syntax

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b], // Dependencies
);
```

## The Problem

```jsx
// Without useCallback - new function every render
function Parent() {
  const handleClick = () => { ... }; // New reference each render
  
  return <Child onClick={handleClick} />; // Child re-renders
}
```

## The Solution

```jsx
function Parent() {
  const handleClick = useCallback(() => {
    // function body
  }, []); // Same reference
  
  return <MemoizedChild onClick={handleClick} />; // Child skips re-render
}
```

## With React.memo

```jsx
const Child = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback - Child re-renders when count changes
  const handleClick = () => { };
  
  // With useCallback - Child doesn't re-render
  const handleClick = useCallback(() => { }, []);
  
  return <Child onClick={handleClick} />;
}
```

## Dependencies

```jsx
// Empty deps - never changes
const fn = useCallback(() => { }, []);

// With deps - changes when deps change
const fn = useCallback(() => {
  console.log(id);
}, [id]);
```

## When to Use

1. **Passing to memoized children**
2. **As dependency in useEffect**
3. **In custom hooks**

## When NOT to Use

- Simple components
- No memoized children
- Over-optimization

## useCallback vs useMemo

```jsx
// useCallback memoizes function
const fn = useCallback(() => result, [deps]);

// useMemo memoizes value
const value = useMemo(() => computeValue(), [deps]);

// These are equivalent:
useCallback(fn, deps) === useMemo(() => fn, deps)
```
