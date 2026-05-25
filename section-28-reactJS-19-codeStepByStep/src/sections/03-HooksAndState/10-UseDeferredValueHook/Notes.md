# useDeferredValue Hook

## What is useDeferredValue?

useDeferredValue accepts a value and returns a deferred copy that may "lag behind" during urgent updates.

## Syntax

```jsx
const deferredValue = useDeferredValue(value);
```

## Basic Example

```jsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // deferredQuery lags behind query during updates
  return <SlowList text={deferredQuery} />;
}
```

## Detecting Stale State

```jsx
const deferredValue = useDeferredValue(value);
const isStale = value !== deferredValue;

<div style={{ opacity: isStale ? 0.5 : 1 }}>
  <ExpensiveComponent data={deferredValue} />
</div>
```

## vs useTransition

| useDeferredValue | useTransition |
|------------------|---------------|
| Works with values | Wraps state setters |
| No isPending flag | Returns isPending |
| For external values | For internal updates |
| Simpler API | More control |

## When to Use

- Values from props (can't use startTransition)
- Search/filter with expensive renders
- Showing stale content during updates
- Child components that render slowly

## Example: Search Filter

```jsx
function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  
  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SlowList text={deferredQuery} />
      </div>
    </div>
  );
}
```

## Best Practices

1. **Use for expensive renders** - Not simple components
2. **Show stale indicator** - Use opacity or loading state
3. **Combine with memo** - Prevent unnecessary renders
