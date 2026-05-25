import { useState } from 'react';

export const PostMethodIntegrationExample = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const simulatePostRequest = async () => {
    setLoading(true);
    setMessage(null);

    const requestBody = {
      ...formData,
      createdAt: new Date().toISOString()
    };

    setLastRequest({
      method: 'POST',
      url: 'http://localhost:3001/users',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      ...requestBody,
      id: Math.max(...users.map(u => u.id), 0) + 1
    };

    setUsers(prev => [...prev, newUser]);
    setFormData({ name: '', email: '', role: 'user' });
    setLoading(false);
    setMessage({ type: 'success', text: `User "${newUser.name}" created successfully!` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage({ type: 'error', text: 'Name and email are required' });
      return;
    }
    simulatePostRequest();
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>POST Method Integration</h2>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {/* Form Section */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>Create New User</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Name *
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Email *
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

              <div style={{ marginBottom: '1.5rem' }}>
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: loading ? '#9e9e9e' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Creating User...' : 'Create User (POST)'}
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: message.type === 'success' ? '#e8f5e9' : '#ffebee',
                color: message.type === 'success' ? '#2e7d32' : '#c62828',
                borderRadius: '4px',
                border: `1px solid ${message.type === 'success' ? '#4caf50' : '#f44336'}`
              }}>
                {message.type === 'success' ? '✓' : '✗'} {message.text}
              </div>
            )}
          </div>

          {/* Request Preview */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#ff9800' }}>Request Preview</h3>
            
            {lastRequest ? (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    background: '#2196f3',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    marginRight: '0.5rem'
                  }}>
                    {lastRequest.method}
                  </span>
                  <code style={{ color: '#666' }}>{lastRequest.url}</code>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Headers:</strong>
                  <pre style={{
                    background: '#f5f5f5',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    margin: '0.5rem 0 0 0',
                    fontSize: '0.85rem',
                    overflow: 'auto'
                  }}>
{JSON.stringify(lastRequest.headers, null, 2)}
                  </pre>
                </div>

                <div>
                  <strong>Body:</strong>
                  <pre style={{
                    background: '#f5f5f5',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    margin: '0.5rem 0 0 0',
                    fontSize: '0.85rem',
                    overflow: 'auto'
                  }}>
{JSON.stringify(lastRequest.body, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                Fill the form and submit to see the request
              </div>
            )}
          </div>
        </div>

        {/* Users List */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Users List ({users.length})</h3>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {users.map(user => (
              <div key={user.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{user.email}</div>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: user.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                  color: user.role === 'admin' ? '#1976d2' : '#666',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>POST Request Code</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Usage with form
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const newUser = await createUser(formData);
    setUsers(prev => [...prev, newUser]);
    setFormData({ name: '', email: '' }); // Reset form
    setMessage('User created successfully!');
  } catch (error) {
    setError('Failed to create user');
  } finally {
    setLoading(false);
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PostMethodIntegrationExample;
