# useTransition Hook

## What is useTransition?

useTransition marks state updates as non-urgent, keeping the UI responsive during expensive renders.

## Syntax

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setExpensiveState(newValue);
});
```

## How It Works

```jsx
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    // Urgent: Keep input responsive
    setQuery(e.target.value);
    
    // Non-urgent: Can be interrupted
    startTransition(() => {
      setResults(filterItems(e.target.value));
    });
  };
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={results} />
    </>
  );
}
```

## isPending Flag

```jsx
const [isPending, startTransition] = useTransition();

// Show loading state
<div style={{ opacity: isPending ? 0.5 : 1 }}>
  {content}
</div>

{isPending && <LoadingSpinner />}
```

## Use Cases

1. **Search/Filter** - Input stays responsive
2. **Tab switching** - Show stale content during load
3. **Large lists** - Render without blocking
4. **Complex forms** - Validate without freezing

## Without vs With Transition

```jsx
// Without - Input may feel sluggish
const handleChange = (e) => {
  setQuery(e.target.value);
  setResults(expensiveFilter(e.target.value)); // Blocks!
};

// With - Input stays smooth
const handleChange = (e) => {
  setQuery(e.target.value); // Immediate
  startTransition(() => {
    setResults(expensiveFilter(e.target.value)); // Deferred
  });
};
```

## Best Practices

1. **Don't overuse** - Only for genuinely slow updates
2. **Keep urgent updates outside** - Input changes, animations
3. **Use isPending for feedback** - Loading indicators
4. **Combine with Suspense** - For data fetching
