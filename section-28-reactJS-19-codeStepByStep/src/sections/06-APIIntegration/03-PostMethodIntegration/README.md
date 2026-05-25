# POST Method Integration

## Quick Overview

Learn how to send data to APIs using POST requests, handle form submissions, and update local state after creating resources.

## What You'll Learn

- Basic POST request syntax
- Form handling with controlled components
- Loading and error states
- Updating local state after creation
- Form validation patterns
- Optimistic updates

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- useState hook
- Form handling in React
- GET API basics

## Key Pattern

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('Failed');
    
    const newUser = await response.json();
    setUsers(prev => [...prev, newUser]);
    setFormData({ name: '', email: '' }); // Reset
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

---

**Tip**: Always include the `Content-Type: application/json` header when sending JSON data!
