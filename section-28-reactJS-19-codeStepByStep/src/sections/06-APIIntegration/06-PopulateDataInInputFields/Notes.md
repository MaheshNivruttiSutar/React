# Populate Data in Input Fields

## Overview

When editing existing data, you need to:
1. Fetch the data from the API
2. Populate form fields with the fetched data
3. Track changes (dirty state)
4. Allow reset to original values

## Basic Pattern

```jsx
function EditUser({ userId }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  // Fetch and populate
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email
      });
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          name: e.target.value
        }))}
      />
      <input
        name="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          email: e.target.value
        }))}
      />
    </form>
  );
}
```

## Why Two State Variables?

```jsx
// user: Original data from server (for comparison/reset)
const [user, setUser] = useState(null);

// formData: Current form values (can be modified)
const [formData, setFormData] = useState({ name: '', email: '' });
```

Benefits:
- Compare current vs original (dirty detection)
- Reset to original values
- Show "original value" hints
- Prevent accidental data loss

## Tracking Dirty State

```jsx
const [isDirty, setIsDirty] = useState(false);

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
  setIsDirty(true);
};

// Or compute dynamically
const isDirty = user && (
  formData.name !== user.name ||
  formData.email !== user.email
);
```

## Reset to Original

```jsx
const handleReset = () => {
  if (user) {
    setFormData({
      name: user.name,
      email: user.email
    });
    setIsDirty(false);
  }
};

// In form
<button 
  type="button" 
  onClick={handleReset}
  disabled={!isDirty}
>
  Reset
</button>
```

## Show Original Values

```jsx
<div>
  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    style={{
      borderColor: formData.name !== user.name ? 'orange' : 'gray'
    }}
  />
  {formData.name !== user.name && (
    <small>Original: {user.name}</small>
  )}
</div>
```

## Prevent Leaving with Unsaved Changes

```jsx
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [isDirty]);
```

## Complete Edit Form Component

```jsx
function EditUserForm({ userId, onSave, onCancel }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        role: data.role
      });
      setLoading(false);
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Compute dirty state
  const isDirty = user && (
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.role !== user.role
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const updated = await response.json();
      setUser(updated); // Update original reference
      onSave(updated);
    } catch (error) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <button type="submit" disabled={!isDirty || saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={handleReset} disabled={!isDirty}>
          Reset
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {isDirty && <p>You have unsaved changes</p>}
    </form>
  );
}
```

## Populating Different Input Types

### Text/Email
```jsx
<input value={formData.name} onChange={handleChange} />
```

### Select
```jsx
<select value={formData.role} onChange={handleChange}>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
```

### Checkbox
```jsx
<input
  type="checkbox"
  checked={formData.active}
  onChange={(e) => setFormData(prev => ({
    ...prev,
    active: e.target.checked
  }))}
/>
```

### Radio
```jsx
<input
  type="radio"
  name="status"
  value="active"
  checked={formData.status === 'active'}
  onChange={handleChange}
/>
```

## Best Practices

1. **Keep original data** - Store fetched data separately
2. **Track dirty state** - Know when form has changes
3. **Provide reset option** - Let users revert changes
4. **Show loading state** - While fetching data
5. **Disable submit** - When no changes or saving
6. **Warn on navigation** - If unsaved changes exist
