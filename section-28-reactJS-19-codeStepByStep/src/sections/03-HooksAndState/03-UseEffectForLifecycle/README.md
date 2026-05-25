# useEffect for Lifecycle Methods

## Quick Overview

Learn how useEffect replaces class component lifecycle methods.

## What You'll Learn

- componentDidMount equivalent
- componentDidUpdate equivalent  
- componentWillUnmount (cleanup)
- Dependency array patterns

## Time to Complete

Approximately 15 minutes

## Lifecycle Mapping

```jsx
// Mount
useEffect(() => { }, []);

// Update (on deps change)
useEffect(() => { }, [dep]);

// Unmount (cleanup)
useEffect(() => {
  return () => { };
}, []);
```

---

**Tip**: Each useEffect should do one thing well - use multiple effects for different concerns!
