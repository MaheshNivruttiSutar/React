# What is State?

## Quick Overview

State is data that changes over time and triggers re-renders when updated.

## What You'll Learn

- What state is and why it matters
- useState hook syntax
- Different state types (number, string, boolean, array, object)
- State update patterns
- Rules and best practices

## Time to Complete

Approximately 20 minutes

## Key Pattern

```jsx
const [count, setCount] = useState(0);

// Update state
setCount(5);              // Direct value
setCount(prev => prev + 1);  // Functional update
```

---

**Tip**: Never mutate state directly - always create new values with setters!
