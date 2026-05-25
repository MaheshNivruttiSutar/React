import { useState } from 'react';

export const DeleteMethodIntegrationExample = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'editor' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'user' },
  ]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [deletedUsers, setDeletedUsers] = useState([]);

  const handleDelete = async (userId) => {
    setDeletingId(userId);
    setLastAction({
      method: 'DELETE',
      url: `http://localhost:3001/users/${userId}`,
      time: new Date().toLocaleTimeString()
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    const deletedUser = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
    setDeletedUsers(prev => [...prev, deletedUser]);
    setDeletingId(null);
    setConfirmDelete(null);
  };

  const handleUndo = (user) => {
    setUsers(prev => [...prev, user].sort((a, b) => a.id - b.id));
    setDeletedUsers(prev => prev.filter(u => u.id !== user.id));
  };

  const handleBulkDelete = async () => {
    const selectedUsers = users.filter(u => u.role === 'user');
    setDeletingId('bulk');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setDeletedUsers(prev => [...prev, ...selectedUsers]);
    setUsers(prev => prev.filter(u => u.role !== 'user'));
    setDeletingId(null);
    setLastAction({
      method: 'DELETE',
      url: 'Bulk delete (users with role: user)',
      count: selectedUsers.length,
      time: new Date().toLocaleTimeString()
    });
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>DELETE Method Integration</h2>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {/* Users List */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Users ({users.length})</h3>
              <button
                onClick={handleBulkDelete}
                disabled={deletingId || users.filter(u => u.role === 'user').length === 0}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: deletingId ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Delete All Users
              </button>
            </div>

            {users.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                No users remaining
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {users.map(user => (
                  <div key={user.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: deletingId === user.id ? '#ffebee' : '#f9f9f9',
                    borderRadius: '4px',
                    border: '1px solid #eee',
                    opacity: deletingId === user.id ? 0.7 : 1,
                    transition: 'all 0.2s'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.25rem',
                        padding: '0.125rem 0.5rem',
                        background: user.role === 'admin' ? '#e3f2fd' : user.role === 'editor' ? '#fff3e0' : '#f5f5f5',
                        borderRadius: '8px',
                        fontSize: '0.75rem'
                      }}>
                        {user.role}
                      </span>
                    </div>

                    {confirmDelete === user.id ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: '#9e9e9e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(user.id)}
                        disabled={deletingId}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: 'transparent',
                          color: '#f44336',
                          border: '1px solid #f44336',
                          borderRadius: '4px',
                          cursor: deletingId ? 'not-allowed' : 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        {deletingId === user.id ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Last Action */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: 0, color: '#f44336' }}>Last Delete Action</h3>
              
              {lastAction ? (
                <div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    background: '#f44336',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {lastAction.method}
                  </div>
                  <div style={{ fontFamily: 'monospace', color: '#666', marginBottom: '0.5rem' }}>
                    {lastAction.url}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#999' }}>
                    Time: {lastAction.time}
                    {lastAction.count && ` | Deleted: ${lastAction.count} items`}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#999' }}>No delete actions yet</div>
              )}
            </div>

            {/* Deleted Users (Undo) */}
            {deletedUsers.length > 0 && (
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginTop: 0, color: '#ff9800' }}>Recently Deleted ({deletedUsers.length})</h3>
                
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {deletedUsers.slice(-5).reverse().map(user => (
                    <div key={user.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: '#fff3e0',
                      borderRadius: '4px',
                      fontSize: '0.9rem'
                    }}>
                      <span>{user.name}</span>
                      <button
                        onClick={() => handleUndo(user)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: '#ff9800',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Undo
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Example */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>DELETE Request Code</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`// Basic DELETE request
const deleteUser = async (userId) => {
  const response = await fetch(\`http://localhost:3001/users/\${userId}\`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};

// With confirmation dialog
const handleDelete = async (userId) => {
  if (!window.confirm('Are you sure?')) return;
  
  try {
    setDeleting(userId);
    await deleteUser(userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
  } catch (error) {
    setError('Delete failed');
  } finally {
    setDeleting(null);
  }
};

// With optimistic update and undo
const handleDeleteWithUndo = async (userId) => {
  const deletedUser = users.find(u => u.id === userId);
  
  // Optimistically remove
  setUsers(prev => prev.filter(u => u.id !== userId));
  setDeletedUsers(prev => [...prev, deletedUser]);
  
  try {
    await deleteUser(userId);
  } catch (error) {
    // Restore on failure
    setUsers(prev => [...prev, deletedUser]);
    setDeletedUsers(prev => prev.filter(u => u.id !== userId));
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DeleteMethodIntegrationExample;
