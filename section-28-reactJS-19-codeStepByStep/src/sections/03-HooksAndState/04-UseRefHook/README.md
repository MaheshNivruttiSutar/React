# useRef Hook

## Quick Overview

useRef holds mutable values that persist across renders without causing re-renders.

## What You'll Learn

- DOM element access
- Mutable value storage
- useRef vs useState
- Common patterns

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
const inputRef = useRef(null);

// DOM access
<input ref={inputRef} />
inputRef.current.focus();

// Mutable storage (no re-render)
const countRef = useRef(0);
countRef.current += 1;
```

---

**Tip**: Use useRef for values you need to persist but don't want to trigger re-renders!
