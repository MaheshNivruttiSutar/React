# useMemo Hook

## Quick Overview

useMemo caches expensive computations between re-renders.

## What You'll Learn

- Memoizing computed values
- Filtering and sorting optimization
- When to use/avoid useMemo

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);
```

---

**Tip**: Only use useMemo for genuinely expensive computations - measure first!
