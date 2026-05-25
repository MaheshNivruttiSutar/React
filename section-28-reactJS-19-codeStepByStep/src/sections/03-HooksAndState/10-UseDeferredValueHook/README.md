# useDeferredValue Hook

## Quick Overview

useDeferredValue creates a deferred version of a value that lags behind during urgent updates.

## What You'll Learn

- Deferring expensive updates
- Detecting stale state
- Comparison with useTransition

## Time to Complete

Approximately 10 minutes

## Key Pattern

```jsx
const deferredValue = useDeferredValue(value);
const isStale = value !== deferredValue;

<div style={{ opacity: isStale ? 0.5 : 1 }}>
  <ExpensiveComponent data={deferredValue} />
</div>
```

---

**Tip**: Use when you receive values from props and can't use useTransition!
