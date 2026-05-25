# POST Method Integration

## What is POST?

POST is an HTTP method used to **create** new resources on the server. Unlike GET, POST sends data in the request body.

## Basic POST Request

```javascript
const createUser = async (userData) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};
```

## Complete Pattern with Error Handling

```javascript
const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create failed:', error);
    throw error;
  }
};
```

## React Form Integration

### Controlled Form Pattern

```jsx
import { useState } from 'react';

function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create user');

      setSuccess(true);
      setFormData({ name: '', email: '', role: 'user' }); // Reset
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">User created!</div>}
    </form>
  );
}
```

## Updating Local State After POST

```jsx
const [users, setUsers] = useState([]);

const handleCreate = async (userData) => {
  const newUser = await createUser(userData);
  
  // Add to local state
  setUsers(prev => [...prev, newUser]);
  
  // Or refetch the list
  // await fetchUsers();
};
```

## POST vs PUT vs PATCH

| Method | Purpose | Body | Idempotent |
|--------|---------|------|------------|
| POST | Create new resource | Required | No |
| PUT | Replace resource | Required | Yes |
| PATCH | Partial update | Required | No |

## Form Validation

### Client-side Validation

```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    submitForm();
  }
};
```

### Server-side Validation Response

```javascript
// Server returns validation errors
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
});

if (response.status === 400) {
  const { errors } = await response.json();
  // { email: 'Email already exists' }
  setErrors(errors);
}
```

## File Upload with POST

```jsx
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', 'My Document');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData  // No Content-Type header - browser sets it
  });

  return response.json();
};

// Usage
<input
  type="file"
  onChange={(e) => uploadFile(e.target.files[0])}
/>
```

## Optimistic Updates

Update UI before server confirms:

```jsx
const handleCreate = async (userData) => {
  // Optimistic: add immediately with temp ID
  const tempId = Date.now();
  const optimisticUser = { ...userData, id: tempId };
  setUsers(prev => [...prev, optimisticUser]);

  try {
    const newUser = await createUser(userData);
    // Replace temp with real data
    setUsers(prev => prev.map(u => 
      u.id === tempId ? newUser : u
    ));
  } catch (error) {
    // Revert on failure
    setUsers(prev => prev.filter(u => u.id !== tempId));
    setError('Failed to create user');
  }
};
```

## Request Headers

```javascript
const headers = {
  'Content-Type': 'application/json',  // Required for JSON body
  'Authorization': 'Bearer token123',   // Auth token
  'X-Request-ID': 'unique-id',          // Custom headers
};

fetch('/api/users', {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
});
```

## Best Practices

1. **Always use Content-Type header** for JSON data
2. **Handle loading state** to prevent double submissions
3. **Disable submit button** while loading
4. **Reset form** after successful submission
5. **Show success/error feedback** to users
6. **Validate before submitting** to reduce server load

## Common Mistakes

```jsx
// ❌ Missing Content-Type header
fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify(data) // Server won't parse as JSON
});

// ✅ Include Content-Type
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// ❌ Not stringifying body
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: data // Must be string!
});

// ✅ Stringify the body
body: JSON.stringify(data)
```
