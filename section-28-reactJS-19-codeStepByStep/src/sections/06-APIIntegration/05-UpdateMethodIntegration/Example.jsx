import { useState } from 'react';

export const UpdateMethodIntegrationExample = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', active: true },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'editor', active: false },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [saving, setSaving] = useState(false);
  const [lastRequest, setLastRequest] = useState(null);
  const [method, setMethod] = useState('PUT');

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: '' });
  };

  const handleSave = async () => {
    setSaving(true);

    const user = users.find(u => u.id === editingUser);
    const requestBody = method === 'PUT' 
      ? { ...formData, id: editingUser, active: user.active }
      : formData;

    setLastRequest({
      method,
      url: `http://localhost:3001/users/${editingUser}`,
      body: requestBody,
      time: new Date().toLocaleTimeString()
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    setUsers(prev => prev.map(u => 
      u.id === editingUser ? { ...u, ...formData } : u
    ));

    setSaving(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: '' });
  };

  const handleToggleActive = async (userId) => {
    const user = users.find(u => u.id === userId);
    
    setLastRequest({
      method: 'PATCH',
      url: `http://localhost:3001/users/${userId}`,
      body: { active: !user.active },
      time: new Date().toLocaleTimeString()
    });

    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, active: !u.active } : u
    ));
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>UPDATE Method Integration (PUT & PATCH)</h2>

        {/* Method Toggle */}
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Update Method:</span>
            <button
              onClick={() => setMethod('PUT')}
              style={{
                padding: '0.5rem 1rem',
                background: method === 'PUT' ? '#ff9800' : 'transparent',
                color: method === 'PUT' ? 'white' : '#ff9800',
                border: '2px solid #ff9800',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              PUT (Replace)
            </button>
            <button
              onClick={() => setMethod('PATCH')}
              style={{
                padding: '0.5rem 1rem',
                background: method === 'PATCH' ? '#9c27b0' : 'transparent',
                color: method === 'PATCH' ? 'white' : '#9c27b0',
                border: '2px solid #9c27b0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              PATCH (Partial)
            </button>
          </div>
          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
            {method === 'PUT' 
              ? 'PUT replaces the entire resource. All fields must be sent.'
              : 'PATCH updates only specified fields. Other fields remain unchanged.'}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {/* Users List */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Users</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {users.map(user => (
                <div key={user.id} style={{
                  padding: '1rem',
                  background: editingUser === user.id ? '#e3f2fd' : '#f9f9f9',
                  borderRadius: '8px',
                  border: `2px solid ${editingUser === user.id ? '#2196f3' : 'transparent'}`
                }}>
                  {editingUser === user.id ? (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Name"
                        style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <input
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            background: saving ? '#9e9e9e' : '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: saving ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {saving ? 'Saving...' : `Save (${method})`}
                        </button>
                        <button
                          onClick={handleCancel}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#9e9e9e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ 
                          fontWeight: 'bold',
                          opacity: user.active ? 1 : 0.5,
                          textDecoration: user.active ? 'none' : 'line-through'
                        }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <span style={{
                            padding: '0.125rem 0.5rem',
                            background: user.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                            borderRadius: '8px',
                            fontSize: '0.75rem'
                          }}>
                            {user.role}
                          </span>
                          <span style={{
                            padding: '0.125rem 0.5rem',
                            background: user.active ? '#e8f5e9' : '#ffebee',
                            color: user.active ? '#2e7d32' : '#c62828',
                            borderRadius: '8px',
                            fontSize: '0.75rem'
                          }}>
                            {user.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggleActive(user.id)}
                          style={{
                            padding: '0.4rem 0.6rem',
                            background: 'transparent',
                            color: '#9c27b0',
                            border: '1px solid #9c27b0',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            padding: '0.4rem 0.6rem',
                            background: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Request Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Last Request */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: 0, color: '#ff9800' }}>Last Request</h3>
              
              {lastRequest ? (
                <div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    background: lastRequest.method === 'PUT' ? '#ff9800' : '#9c27b0',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {lastRequest.method}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#666', marginBottom: '0.75rem' }}>
                    {lastRequest.url}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
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
                  <div style={{ fontSize: '0.85rem', color: '#999' }}>
                    Time: {lastRequest.time}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#999' }}>Edit a user to see the request</div>
              )}
            </div>

            {/* PUT vs PATCH */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: 0, color: '#667eea' }}>PUT vs PATCH</h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#ff9800' }}>PUT</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                    <li>Replaces entire resource</li>
                    <li>Must send all fields</li>
                    <li>Missing fields = removed</li>
                    <li>Idempotent</li>
                  </ul>
                </div>
                <div style={{ padding: '1rem', background: '#f3e5f5', borderRadius: '6px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#9c27b0' }}>PATCH</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                    <li>Partial update</li>
                    <li>Send only changed fields</li>
                    <li>Other fields preserved</li>
                    <li>Not idempotent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Update Request Code</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`// PUT - Replace entire resource
const updateUser = async (userId, userData) => {
  const response = await fetch(\`http://localhost:3001/users/\${userId}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      active: userData.active
    })
  });
  return response.json();
};

// PATCH - Partial update
const patchUser = async (userId, updates) => {
  const response = await fetch(\`http://localhost:3001/users/\${userId}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates) // Only fields to update
  });
  return response.json();
};

// Usage examples
await updateUser(1, { name: 'John', email: 'john@example.com', role: 'admin', active: true });
await patchUser(1, { active: false }); // Only update active status
await patchUser(1, { name: 'Johnny' }); // Only update name`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default UpdateMethodIntegrationExample;
