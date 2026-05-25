# Reuse Component in Loop

## Quick Overview

Learn to extract reusable components from loops for cleaner, more maintainable code.

## What You'll Learn

- Extracting components from map()
- Passing data via props
- Callback props for actions
- Dynamic form field components
- When to extract components

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- map() function
- Component props
- Event handlers

## Key Pattern

```jsx
// Reusable component
const UserCard = ({ user, onEdit, onDelete }) => (
  <div>
    <h3>{user.name}</h3>
    <button onClick={() => onEdit(user)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </div>
);

// Use in loop
{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))}
```

---

**Tip**: Extract a component when JSX gets longer than 10-15 lines or when the same structure repeats!
