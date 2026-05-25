# UPDATE Method Integration (PUT & PATCH)

## Overview

There are two HTTP methods for updating resources:
- **PUT**: Replace the entire resource
- **PATCH**: Partial update (only specified fields)

## PUT Request

PUT replaces the entire resource with the provided data.

```javascript
const updateUser = async (userId, userData) => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};

// Must include ALL fields
await updateUser(1, {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  active: true
});
```

## PATCH Request

PATCH updates only the specified fields.

```javascript
const patchUser = async (userId, updates) => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
};

// Only update specific fields
await patchUser(1, { name: 'Johnny' }); // Other fields unchanged
await patchUser(1, { active: false });   // Only update active status
```

## PUT vs PATCH Comparison

| Aspect | PUT | PATCH |
|--------|-----|-------|
| Purpose | Replace resource | Partial update |
| Request Body | Complete resource | Only changed fields |
| Missing Fields | Removed/nulled | Preserved |
| Idempotent | Yes | No |
| Use Case | Full update | Toggle, single field |

## React Edit Form Pattern

```jsx
function EditUser({ user, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT', // or 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Update failed');
      
      const updated = await response.json();
      onSave(updated);
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

## Inline Editing Pattern

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSave = async (userId, updates) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    const updated = await response.json();
    setUsers(prev => prev.map(u => u.id === userId ? updated : u));
    setEditingId(null);
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {editingId === user.id ? (
            <EditForm 
              user={user} 
              onSave={(updates) => handleSave(user.id, updates)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              {user.name}
              <button onClick={() => setEditingId(user.id)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
```

## Toggle with PATCH

Perfect for boolean fields:

```jsx
const toggleActive = async (userId, currentActive) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active: !currentActive })
  });
  
  return response.json();
};

// In component
const handleToggle = async (user) => {
  const updated = await toggleActive(user.id, user.active);
  setUsers(prev => prev.map(u => u.id === user.id ? updated : u));
};
```

## Optimistic Update

```jsx
const handleUpdate = async (userId, updates) => {
  // Optimistically update UI
  const originalUsers = [...users];
  setUsers(prev => prev.map(u => 
    u.id === userId ? { ...u, ...updates } : u
  ));

  try {
    await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch (error) {
    // Revert on failure
    setUsers(originalUsers);
    alert('Update failed');
  }
};
```

## Error Handling

```javascript
const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      if (response.status === 400) {
        const { errors } = await response.json();
        throw new Error(errors.join(', '));
      }
      throw new Error('Update failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};
```

## When to Use PUT vs PATCH

### Use PUT when:
- Updating entire resource
- Form has all fields
- Replacing resource completely
- Ensuring data consistency

### Use PATCH when:
- Updating single field
- Toggle switches
- Partial updates
- Reducing bandwidth

## Best Practices

1. **Choose the right method** - PUT for full updates, PATCH for partial
2. **Validate before sending** - Check required fields
3. **Handle conflicts** - 409 status for concurrent edits
4. **Show loading state** - Disable form while saving
5. **Optimistic updates** - For better UX on fast operations

## Common Mistakes

```javascript
// ❌ Using PUT with partial data
fetch(`/api/users/${id}`, {
  method: 'PUT',
  body: JSON.stringify({ name: 'John' }) // Missing other fields!
});

// ✅ Use PATCH for partial updates
fetch(`/api/users/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ name: 'John' })
});

// ❌ Forgetting Content-Type header
fetch(`/api/users/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});

// ✅ Include Content-Type
fetch(`/api/users/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```
