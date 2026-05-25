# Pass Function as Props

## Quick Overview

Learn how to pass functions to child components for communication.

## What You'll Learn

- Passing callback functions
- Child to parent communication
- Lifting state up pattern
- Common use cases

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
// Parent
<Child onAction={(data) => handleAction(data)} />

// Child  
const Child = ({ onAction }) => (
  <button onClick={() => onAction('data')}>Click</button>
);
```

---

**Tip**: Use `on` prefix for callback props (onClick, onChange, onSubmit)!
