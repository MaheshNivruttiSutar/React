# Add User and User List Routes

## Overview

This section covers setting up a complete CRUD routing structure with separate pages for listing users, adding new users, and editing existing users.

## Route Structure

```
/users              → UserListPage (view all)
/users/add          → AddUserPage (create new)
/users/:userId/edit → EditUserPage (modify existing)
```

## React Router Setup

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/users/:userId/edit" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Shared Layout with Navigation

```jsx
import { Outlet, NavLink } from 'react-router-dom';

function UsersLayout() {
  return (
    <div>
      <nav>
        <NavLink 
          to="/users"
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          User List
        </NavLink>
        <NavLink 
          to="/users/add"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Add User
        </NavLink>
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Routes with layout
<Route path="/users" element={<UsersLayout />}>
  <Route index element={<UserListPage />} />
  <Route path="add" element={<AddUserPage />} />
  <Route path=":userId/edit" element={<EditUserPage />} />
</Route>
```

## User List Page

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="header">
        <h1>Users</h1>
        <Link to="/users/add" className="btn-primary">
          + Add User
        </Link>
      </div>

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
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Add User Page

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddUserPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create user');
      
      navigate('/users'); // Redirect to list
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link to="/users">← Back to Users</Link>
      
      <h1>Add New User</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Creating...' : 'Create User'}
          </button>
          <Link to="/users">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
```

## Navigation Patterns

### Using Link Component

```jsx
import { Link } from 'react-router-dom';

// Static link
<Link to="/users">View Users</Link>

// Dynamic link with parameter
<Link to={`/users/${user.id}/edit`}>Edit</Link>

// With state
<Link to="/users/add" state={{ from: 'dashboard' }}>
  Add User
</Link>
```

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function AddUserPage() {
  const navigate = useNavigate();

  const handleSave = async () => {
    await createUser(formData);
    navigate('/users');           // Go to list
    // or
    navigate('/users', { replace: true }); // Replace history
    // or
    navigate(-1);                 // Go back
  };
}
```

## Active Navigation Styling

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/users"
  end  // Only match exact path
  className={({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  Users
</NavLink>
```

## Full Route Configuration

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'users',
        element: <UsersLayout />,
        children: [
          { index: true, element: <UserListPage /> },
          { path: 'add', element: <AddUserPage /> },
          { path: ':userId/edit', element: <EditUserPage /> }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
```

## State Management Across Routes

### Option 1: Lift State Up

```jsx
function App() {
  const [users, setUsers] = useState([]);
  
  return (
    <Routes>
      <Route 
        path="/users" 
        element={<UserListPage users={users} setUsers={setUsers} />} 
      />
      <Route 
        path="/users/add" 
        element={<AddUserPage setUsers={setUsers} />} 
      />
    </Routes>
  );
}
```

### Option 2: Context API

```jsx
const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>...</Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
```

### Option 3: Refetch on Page Load

```jsx
function UserListPage() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch fresh data every time page loads
    fetchUsers().then(setUsers);
  }, []);
}
```

## Best Practices

1. **Consistent URL patterns** - Follow RESTful conventions
2. **Provide back navigation** - Always offer a way back
3. **Handle loading states** - Show feedback during async ops
4. **Redirect after actions** - Navigate to list after create/edit
5. **Use layouts** - Share navigation across related pages
6. **Active link styling** - Show current location in nav
