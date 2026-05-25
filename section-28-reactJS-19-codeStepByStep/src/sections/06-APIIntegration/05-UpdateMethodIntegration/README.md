# UPDATE Method Integration (PUT & PATCH)

## Quick Overview

Learn the difference between PUT and PATCH requests and when to use each for updating resources on the server.

## What You'll Learn

- PUT vs PATCH differences
- Full resource replacement (PUT)
- Partial updates (PATCH)
- Edit form patterns
- Toggle functionality
- Optimistic updates

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- POST method understanding
- Form handling in React
- useState hook

## Key Patterns

### PUT - Replace Entire Resource
```javascript
await fetch(`/api/users/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id, name, email, role, active // ALL fields required
  })
});
```

### PATCH - Partial Update
```javascript
await fetch(`/api/users/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ active: false }) // Only changed field
});
```

---

**Tip**: Use PATCH for toggles and single-field updates, PUT when replacing the entire resource!
