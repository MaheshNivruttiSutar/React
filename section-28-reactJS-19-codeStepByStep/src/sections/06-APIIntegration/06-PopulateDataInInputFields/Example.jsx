import { useState, useEffect } from 'react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', bio: 'Software developer with 10 years experience' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', bio: 'Product designer passionate about UX' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'editor', bio: 'Content writer and editor' },
];

export const PopulateDataInInputFieldsExample = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fetchUser = async (userId) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const foundUser = mockUsers.find(u => u.id === userId);
    setLoading(false);
    return foundUser;
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUser(selectedUserId).then(data => {
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role,
          bio: data.bio
        });
        setIsDirty(false);
      });
    }
  }, [selectedUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio
      });
      setIsDirty(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Would save: ${JSON.stringify(formData, null, 2)}`);
    setIsDirty(false);
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Populate Data in Input Fields</h2>

        {/* User Selection */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Select User to Edit</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {mockUsers.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUserId(u.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectedUserId === u.id ? '#667eea' : 'white',
                  color: selectedUserId === u.id ? 'white' : '#333',
                  border: '2px solid #667eea',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: selectedUserId === u.id ? 'bold' : 'normal'
                }}
              >
                {u.name}
              </button>
            ))}
          </div>
          <p style={{ marginBottom: 0, fontSize: '0.9rem', color: '#666', marginTop: '0.75rem' }}>
            Click a user to load their data into the form below
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <div style={{ color: '#666' }}>Loading user data...</div>
          </div>
        )}

        {/* Edit Form */}
        {!loading && user && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Edit User: {user.name}</h3>
              {isDirty && (
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: '#fff3e0',
                  color: '#e65100',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  Unsaved changes
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${formData.name !== user.name ? '#ff9800' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {formData.name !== user.name && (
                    <small style={{ color: '#ff9800' }}>
                      Original: {user.name}
                    </small>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${formData.email !== user.email ? '#ff9800' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {formData.email !== user.email && (
                    <small style={{ color: '#ff9800' }}>
                      Original: {user.email}
                    </small>
                  )}
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
                      border: `2px solid ${formData.role !== user.role ? '#ff9800' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  {formData.role !== user.role && (
                    <small style={{ color: '#ff9800' }}>
                      Original: {user.role}
                    </small>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${formData.bio !== user.bio ? '#ff9800' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                  {formData.bio !== user.bio && (
                    <small style={{ color: '#ff9800' }}>
                      Modified from original
                    </small>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={!isDirty}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: isDirty ? '#4caf50' : '#e0e0e0',
                    color: isDirty ? 'white' : '#999',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isDirty ? 'pointer' : 'not-allowed'
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!isDirty}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: isDirty ? '#9e9e9e' : '#e0e0e0',
                    color: isDirty ? 'white' : '#999',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: isDirty ? 'pointer' : 'not-allowed'
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {/* No User Selected */}
        {!loading && !user && (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👆</div>
            <div style={{ color: '#666' }}>Select a user above to load their data</div>
          </div>
        )}

        {/* Code Example */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Code Pattern</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`// State for original data and form data
const [user, setUser] = useState(null);
const [formData, setFormData] = useState({ name: '', email: '' });

// Fetch and populate form
useEffect(() => {
  if (userId) {
    fetchUser(userId).then(data => {
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email
      });
    });
  }
}, [userId]);

// Track changes
const isDirty = user && (
  formData.name !== user.name ||
  formData.email !== user.email
);

// Reset to original values
const handleReset = () => {
  setFormData({
    name: user.name,
    email: user.email
  });
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PopulateDataInInputFieldsExample;
