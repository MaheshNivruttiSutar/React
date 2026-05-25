# useEffect in React 19

## Quick Overview

useEffect synchronizes your component with external systems (APIs, DOM, subscriptions). React 19 brings improved behavior and encourages better patterns.

## What You'll Learn

- Basic useEffect syntax and lifecycle
- Dependency array patterns
- Cleanup functions
- Data fetching best practices
- React 19 specific changes
- When NOT to use useEffect

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- useState hook
- Component lifecycle understanding
- Async JavaScript

## Key Patterns

```jsx
// Run once on mount
useEffect(() => { /* setup */ return () => { /* cleanup */ }; }, []);

// Run when dependency changes
useEffect(() => { /* effect */ }, [dependency]);

// Data fetching with cleanup
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);
```

## React 19 Guidance

- Prefer `use()` hook for data fetching
- Use event handlers over effects when possible
- Effects have improved error boundary support

---

**Tip**: If you're using useEffect to set derived state, you probably want useMemo instead!
