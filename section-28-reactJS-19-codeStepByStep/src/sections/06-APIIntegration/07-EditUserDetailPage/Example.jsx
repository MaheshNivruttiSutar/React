import { useState, useEffect } from 'react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0101', role: 'admin', department: 'Engineering', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', role: 'user', department: 'Design', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '555-0103', role: 'editor', department: 'Marketing', avatar: 'https://i.pravatar.cc/100?img=3' },
];

export const EditUserDetailPageExample = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const simulateRoute = (userId) => {
    setSelectedUserId(userId);
    setCurrentView('edit');
  };

  const goBack = () => {
    setCurrentView('list');
    setSelectedUserId(null);
    setUser(null);
    setFormData(null);
    setErrors({});
  };

  useEffect(() => {
    if (selectedUserId && currentView === 'edit') {
      setLoading(true);
      setTimeout(() => {
        const foundUser = users.find(u => u.id === selectedUserId);
        setUser(foundUser);
        setFormData({ ...foundUser });
        setLoading(false);
      }, 500);
    }
  }, [selectedUserId, currentView, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    setUsers(prev => prev.map(u => 
      u.id === selectedUserId ? { ...formData } : u
    ));
    
    setSaving(false);
    goBack();
  };

  const isDirty = user && formData && (
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.phone !== user.phone ||
    formData.role !== user.role ||
    formData.department !== user.department
  );

  if (currentView === 'list') {
    return (
      <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>User Management</h2>
          
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', background: '#667eea', color: 'white' }}>
              <h3 style={{ margin: 0 }}>Users ({users.length})</h3>
            </div>
            
            <div style={{ padding: '0.5rem' }}>
              {users.map(u => (
                <div
                  key={u.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={u.avatar}
                      alt={u.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{u.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{u.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#999' }}>{u.department}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => simulateRoute(u.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#2196f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
            <strong>Note:</strong> This simulates navigation to /users/:id/edit. 
            In a real app with React Router, you would use <code>useParams()</code> to get the user ID from the URL.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button
          onClick={goBack}
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

        {loading ? (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <div style={{ color: '#666' }}>Loading user details...</div>
          </div>
        ) : user && formData ? (
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', background: '#667eea', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid white' }}
              />
              <div>
                <h3 style={{ margin: 0 }}>Edit User</h3>
                <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>ID: {user.id}</div>
              </div>
              {isDirty && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  Unsaved changes
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
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
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${errors.name ? '#f44336' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.name && (
                    <div style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {errors.name}
                    </div>
                  )}
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
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${errors.email ? '#f44336' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.email && (
                    <div style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${errors.phone ? '#f44336' : '#ddd'}`,
                      borderRadius: '4px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.phone && (
                    <div style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
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
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="submit"
                  disabled={saving || !isDirty}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: saving || !isDirty ? '#e0e0e0' : '#4caf50',
                    color: saving || !isDirty ? '#999' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: saving || !isDirty ? 'not-allowed' : 'pointer'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={goBack}
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
        ) : (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ color: '#f44336' }}>User not found</div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4 style={{ marginTop: 0, color: '#667eea' }}>With React Router</h4>
          <pre style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.85rem',
            margin: 0
          }}>
{`// Route: /users/:userId/edit
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Fetch user with userId
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const handleSave = async () => {
    await updateUser(userId, formData);
    navigate('/users'); // Go back to list
  };

  return <form>...</form>;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetailPageExample;
