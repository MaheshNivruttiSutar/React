# DELETE Method Integration

## What is DELETE?

DELETE is an HTTP method used to remove resources from the server. It's typically used with a resource ID to delete a specific item.

## Basic DELETE Request

```javascript
const deleteUser = async (userId) => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete');
  }
};
```

## DELETE with Error Handling

```javascript
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`Delete failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
```

## React Integration

### Basic Pattern

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (userId) => {
    setDeleting(userId);
    
    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      alert('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button 
            onClick={() => handleDelete(user.id)}
            disabled={deleting === user.id}
          >
            {deleting === user.id ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## Confirmation Patterns

### Browser Confirm Dialog

```jsx
const handleDelete = async (userId) => {
  if (!window.confirm('Are you sure you want to delete this user?')) {
    return;
  }
  
  await deleteUser(userId);
  setUsers(prev => prev.filter(u => u.id !== userId));
};
```

### Custom Confirmation UI

```jsx
function DeleteButton({ user, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div>
        <span>Delete {user.name}?</span>
        <button onClick={() => onDelete(user.id)}>Yes</button>
        <button onClick={() => setShowConfirm(false)}>No</button>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)}>
      Delete
    </button>
  );
}
```

## Optimistic Delete with Undo

```jsx
function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [deletedUsers, setDeletedUsers] = useState([]);

  const handleDelete = async (userId) => {
    const deletedUser = users.find(u => u.id === userId);
    
    // Optimistically remove from list
    setUsers(prev => prev.filter(u => u.id !== userId));
    setDeletedUsers(prev => [...prev, deletedUser]);

    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    } catch (error) {
      // Restore on failure
      setUsers(prev => [...prev, deletedUser].sort((a, b) => a.id - b.id));
      setDeletedUsers(prev => prev.filter(u => u.id !== userId));
      alert('Delete failed');
    }
  };

  const handleUndo = (user) => {
    // Restore to list
    setUsers(prev => [...prev, user].sort((a, b) => a.id - b.id));
    setDeletedUsers(prev => prev.filter(u => u.id !== user.id));
    
    // Recreate on server
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  };

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {deletedUsers.length > 0 && (
        <div>
          <h4>Recently Deleted</h4>
          {deletedUsers.map(user => (
            <div key={user.id}>
              {user.name}
              <button onClick={() => handleUndo(user)}>Undo</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
```

## Bulk Delete

```jsx
const handleBulkDelete = async (userIds) => {
  setDeleting(true);
  
  try {
    // Delete all in parallel
    await Promise.all(
      userIds.map(id => 
        fetch(`/api/users/${id}`, { method: 'DELETE' })
      )
    );
    
    setUsers(prev => prev.filter(u => !userIds.includes(u.id)));
  } catch (error) {
    alert('Some deletes failed');
    // Refetch to get accurate state
    await fetchUsers();
  } finally {
    setDeleting(false);
  }
};
```

## Soft Delete vs Hard Delete

### Hard Delete (Permanent)
```javascript
// Actually removes from database
await fetch(`/api/users/${id}`, { method: 'DELETE' });
```

### Soft Delete (Archive)
```javascript
// Marks as deleted but keeps record
await fetch(`/api/users/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ deleted: true, deletedAt: new Date() })
});
```

## Response Handling

```javascript
const deleteUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });

  // DELETE typically returns:
  // - 200 OK with body
  // - 204 No Content (most common)
  // - 202 Accepted (async delete)
  
  if (response.status === 204) {
    return; // No content to parse
  }
  
  if (response.ok) {
    return response.json(); // If server returns data
  }
  
  throw new Error(`Delete failed: ${response.status}`);
};
```

## Best Practices

1. **Always confirm** before destructive actions
2. **Show loading state** during delete
3. **Provide undo option** when possible
4. **Handle errors gracefully** with user feedback
5. **Update local state** after successful delete
6. **Consider soft delete** for important data

## Common Mistakes

```jsx
// ❌ Not updating local state
const handleDelete = async (id) => {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
  // User still shows in list!
};

// ✅ Update local state
const handleDelete = async (id) => {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
  setUsers(prev => prev.filter(u => u.id !== id));
};

// ❌ No confirmation for destructive action
<button onClick={() => handleDelete(id)}>Delete</button>

// ✅ With confirmation
<button onClick={() => {
  if (confirm('Delete this item?')) handleDelete(id);
}}>Delete</button>
```
