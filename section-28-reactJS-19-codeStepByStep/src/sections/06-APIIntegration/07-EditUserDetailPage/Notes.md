# Edit User Detail Page

## Overview

A dedicated edit page pattern where users navigate from a list to a separate page for editing. This is common in admin panels and data management UIs.

## Page Flow

```
User List Page → Click Edit → Edit User Page → Save → Back to List
    /users              →      /users/:id/edit    →     /users
```

## Route Setup with React Router

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:userId/edit" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## User List Page

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Edit User Page

```jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
        setFormData({ ...data });
      } catch (error) {
        setErrors({ fetch: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      if (!response.ok) throw new Error('Update failed');
      
      navigate('/users'); // Go back to list
    } catch (error) {
      setErrors({ save: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (errors.fetch) return <div>Error: {errors.fetch}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/users')}>← Back</button>
      
      <h1>Edit User: {user.name}</h1>
      
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
        
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
      
      {errors.save && <div className="error">{errors.save}</div>}
    </div>
  );
}
```

## Form Validation

```jsx
const validate = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Invalid email format';
  }
  
  if (!formData.phone.trim()) {
    newErrors.phone = 'Phone is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;
  // Save...
};
```

## Handling Not Found

```jsx
function EditUserPage() {
  const { userId } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setUser(data);
      });
  }, [userId]);

  if (notFound) {
    return (
      <div>
        <h2>User Not Found</h2>
        <p>The user you're looking for doesn't exist.</p>
        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  // ...
}
```

## Confirm Before Leaving

```jsx
import { useBlocker } from 'react-router-dom';

function EditUserPage() {
  const [isDirty, setIsDirty] = useState(false);

  // Block navigation if form is dirty
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  return (
    <>
      <form>...</form>
      
      {blocker.state === 'blocked' && (
        <div className="modal">
          <p>You have unsaved changes. Leave anyway?</p>
          <button onClick={() => blocker.proceed()}>Leave</button>
          <button onClick={() => blocker.reset()}>Stay</button>
        </div>
      )}
    </>
  );
}
```

## URL Parameters Best Practices

```jsx
// Get ID from URL
const { userId } = useParams();

// userId is always a string!
// Convert to number if needed
const id = parseInt(userId, 10);

// Or keep as string and compare accordingly
fetch(`/api/users/${userId}`);
```

## Page Layout Structure

```jsx
function EditUserPage() {
  return (
    <div className="page">
      {/* Header with back button */}
      <header className="page-header">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h1>Edit User</h1>
      </header>
      
      {/* Main content */}
      <main className="page-content">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <UserForm data={formData} onChange={handleChange} />
        )}
      </main>
      
      {/* Footer with actions */}
      <footer className="page-footer">
        <button onClick={handleSubmit} disabled={saving}>
          Save Changes
        </button>
        <button onClick={() => navigate('/users')}>
          Cancel
        </button>
      </footer>
    </div>
  );
}
```

## Best Practices

1. **Use URL parameters** for identifying which resource to edit
2. **Show loading state** while fetching user data
3. **Handle not found** cases gracefully
4. **Validate before saving** on both client and server
5. **Provide back navigation** clearly
6. **Confirm before leaving** with unsaved changes
7. **Disable submit** while saving or when no changes
