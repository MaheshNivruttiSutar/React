# Pure Components & React.memo

## Quick Overview

React.memo prevents unnecessary re-renders by memoizing components. When props don't change, React skips rendering and reuses the last result.

## What You'll Learn

- What causes unnecessary re-renders
- How React.memo works
- useCallback for function props
- useMemo for object props
- Custom comparison functions
- When to use (and when not to)

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- useState hook
- Understanding of component re-rendering
- Basic understanding of references in JavaScript

## Key Concepts

```jsx
// Memoize component
const MemoizedComponent = memo(MyComponent);

// Memoize callback (for function props)
const handleClick = useCallback(() => {}, [deps]);

// Memoize value (for object props)
const config = useMemo(() => ({ key: 'value' }), [deps]);
```

## When to Use

- Components that render often with same props
- Components with expensive rendering logic
- Child components of frequently updating parents

## When NOT to Use

- Props change on every render anyway
- Very simple/cheap components
- Premature optimization

---

**Tip**: Open browser console while using the examples to see render logs and understand when components re-render!
