import { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2024-02-20' },
];

export const AddUserAndUserListRoutesExample = () => {
  const [currentRoute, setCurrentRoute] = useState('/users');
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = (path) => {
    setCurrentRoute(path);
    setMessage(null);
    if (path === '/users/add') {
      setFormData({ name: '', email: '', role: 'user' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser = {
      ...formData,
      id: Math.max(...users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setLoading(false);
    setMessage({ type: 'success', text: `User "${newUser.name}" created successfully!` });
    
    setTimeout(() => {
      navigate('/users');
    }, 1500);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const NavBar = () => (
    <nav style={{
      background: '#667eea',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', marginRight: '2rem' }}>
        User Management
      </span>
      <button
        onClick={() => navigate('/users')}
        style={{
          padding: '0.5rem 1rem',
          background: currentRoute === '/users' ? 'white' : 'transparent',
          color: currentRoute === '/users' ? '#667eea' : 'white',
          border: '2px solid white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        User List
      </button>
      <button
        onClick={() => navigate('/users/add')}
        style={{
          padding: '0.5rem 1rem',
          background: currentRoute === '/users/add' ? 'white' : 'transparent',
          color: currentRoute === '/users/add' ? '#667eea' : 'white',
          border: '2px solid white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        + Add User
      </button>
      <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
        Route: {currentRoute}
      </div>
    </nav>
  );

  const UserListPage = () => (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Users ({users.length})</h2>
        <button
          onClick={() => navigate('/users/add')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + Add New User
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Role</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Created</th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>{user.id}</td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{user.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: user.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                    color: user.role === 'admin' ? '#1976d2' : '#666',
                    borderRadius: '12px',
                    fontSize: '0.85rem'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#999', fontSize: '0.9rem' }}>{user.createdAt}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <button
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      background: '#2196f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '0.5rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      background: 'transparent',
                      color: '#f44336',
                      border: '1px solid #f44336',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AddUserPage = () => (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/users')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'transparent',
          border: '1px solid #667eea',
          color: '#667eea',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        ← Back to Users
      </button>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ background: '#667eea', padding: '1.5rem', color: 'white' }}>
          <h2 style={{ margin: 0 }}>Add New User</h2>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Fill in the form below to create a new user</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {message && (
            <div style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '4px',
              background: message.type === 'success' ? '#e8f5e9' : '#ffebee',
              color: message.type === 'success' ? '#2e7d32' : '#c62828',
              border: `1px solid ${message.type === 'success' ? '#4caf50' : '#f44336'}`
            }}>
              {message.type === 'success' ? '✓' : '✗'} {message.text}
            </div>
          )}

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: loading ? '#9e9e9e' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating User...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
              style={{
                padding: '0.875rem 1.5rem',
                background: 'transparent',
                color: '#666',
                border: '2px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <NavBar />
      
      {currentRoute === '/users' && <UserListPage />}
      {currentRoute === '/users/add' && <AddUserPage />}
      {currentRoute.includes('/edit') && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>Edit page would be here</h3>
          <p style={{ color: '#666' }}>Route: {currentRoute}</p>
          <button
            onClick={() => navigate('/users')}
            style={{
              padding: '0.5rem 1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to List
          </button>
        </div>
      )}

      <div style={{ margin: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#667eea' }}>Route Structure</h3>
        <pre style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.9rem',
          margin: 0
        }}>
{`// React Router Setup
<Routes>
  <Route path="/users" element={<UserListPage />} />
  <Route path="/users/add" element={<AddUserPage />} />
  <Route path="/users/:userId/edit" element={<EditUserPage />} />
</Routes>

// Navigation
<Link to="/users">User List</Link>
<Link to="/users/add">Add User</Link>
<Link to={\`/users/\${user.id}/edit\`}>Edit</Link>

// Programmatic navigation
navigate('/users');         // After save
navigate('/users/add');     // Go to add page`}
        </pre>
      </div>
    </div>
  );
};

export default AddUserAndUserListRoutesExample;
