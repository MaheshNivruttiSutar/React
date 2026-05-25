# useCallback Hook

## Quick Overview

useCallback memoizes functions to prevent unnecessary re-renders.

## What You'll Learn

- Function reference stability
- Using with React.memo
- Dependency array
- When to use/not use

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
const memoizedFn = useCallback(() => {
  // function body
}, [dependencies]);
```

---

**Tip**: Only use useCallback when passing callbacks to memoized children or as useEffect dependencies!
