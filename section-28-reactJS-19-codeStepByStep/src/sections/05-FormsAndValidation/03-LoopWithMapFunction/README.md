# Loop with Map Function

## Quick Overview

Learn to render dynamic lists in React using the JavaScript `map()` function with proper key handling.

## What You'll Learn

- Basic map() syntax
- Mapping objects with unique keys
- Rendering tables and grids
- Key prop importance
- Conditional rendering in loops
- Updating mapped items

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- JavaScript array methods
- JSX basics
- Component props

## Key Pattern

```jsx
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

{users.map(user => (
  <div key={user.id}>
    {user.name}
  </div>
))}
```

---

**Tip**: Always use a unique, stable ID as the key prop - avoid using array index for lists that can change!
