import { useState } from 'react';

// Helper Components
const LoginForm = ({ onLogin }) => (
  <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '2px solid #667eea' }}>
    <h3 style={{ marginTop: 0, color: '#667eea' }}>Please Login</h3>
    <input 
      type="text" 
      placeholder="Username" 
      style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
    />
    <input 
      type="password" 
      placeholder="Password" 
      style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
    />
    <button 
      onClick={onLogin}
      style={{ width: '100%', padding: '0.75rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Login
    </button>
  </div>
);

const Dashboard = ({ user, onLogout }) => (
  <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '2px solid #4caf50' }}>
    <h3 style={{ marginTop: 0, color: '#4caf50' }}>Welcome, {user.name}!</h3>
    <p style={{ color: '#666' }}>You are successfully logged in to the dashboard.</p>
    <button 
      onClick={onLogout}
      style={{ padding: '0.75rem 1.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Logout
    </button>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch(status) {
      case 'active': return { color: '#4caf50', bg: '#e8f5e8', text: 'Active' };
      case 'inactive': return { color: '#f44336', bg: '#ffebee', text: 'Inactive' };
      case 'pending': return { color: '#ff9800', bg: '#fff3e0', text: 'Pending' };
      default: return { color: '#9e9e9e', bg: '#f5f5f5', text: 'Unknown' };
    }
  };
  
  const config = getStatusConfig(status);
  
  return (
    <span style={{
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: config.color,
      background: config.bg
    }}>
      {config.text}
    </span>
  );
};

const NotificationList = ({ notifications }) => (
  <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
    <h4 style={{ marginTop: 0, color: '#333' }}>Notifications</h4>
    {notifications.length === 0 ? (
      <p style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>
        No notifications available
      </p>
    ) : (
      notifications.map(notification => (
        <div key={notification.id} style={{ 
          padding: '0.75rem', 
          background: notification.read ? '#f5f5f5' : '#e3f2fd', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          borderLeft: `4px solid ${notification.read ? '#ddd' : '#2196f3'}`
        }}>
          <div style={{ fontWeight: notification.read ? 'normal' : 'bold', color: '#333' }}>
            {notification.message}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
            {notification.time}
          </div>
        </div>
      ))
    )}
  </div>
);

export const ConditionalrenderingExample = () => {
  // State for different conditional rendering examples
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ name: 'John Doe', role: 'admin' });
  const [showDetails, setShowDetails] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [loadingState, setLoadingState] = useState('idle'); // idle, loading, success, error
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to the app!', time: '2 minutes ago', read: false },
    { id: 2, message: 'Your profile was updated', time: '1 hour ago', read: true }
  ]);
  const [theme, setTheme] = useState('light');

  const handleLogin = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoadingState('success');
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoadingState('idle');
  };

  const simulateLoading = () => {
    setLoadingState('loading');
    setTimeout(() => {
      setLoadingState(Math.random() > 0.5 ? 'success' : 'error');
    }, 2000);
  };

  const clearNotifications = () => setNotifications([]);
  const addNotification = () => {
    const newNotification = {
      id: Date.now(),
      message: `New notification ${Date.now()}`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: theme === 'light' ? '#fafafa' : '#333', 
      minHeight: '100vh',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: theme === 'light' ? '#667eea' : '#fff', margin: 0 }}>
            Conditional Rendering Examples
          </h2>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.5rem 1rem',
              background: theme === 'light' ? '#333' : '#fff',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* If/Else Pattern - Authentication Example */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔐 If/Else Pattern - Authentication</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Basic conditional rendering with if/else logic
            </p>
            
            {/* This is the conditional rendering in action */}
            {isLoggedIn ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
            
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: theme === 'light' ? '#f5f5f5' : '#555', 
              borderRadius: '4px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem' 
            }}>
              {`{isLoggedIn ? (
  <Dashboard user={user} onLogout={handleLogout} />
) : (
  <LoginForm onLogin={handleLogin} />
)}`}
            </div>
          </div>

          {/* Logical && Operator */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>⚡ Logical && Operator</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Show content only when condition is true
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#667eea', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
            {/* && Operator in action */}
            {showDetails && (
              <div style={{ 
                padding: '1rem', 
                background: theme === 'light' ? '#e3f2fd' : '#555', 
                borderRadius: '6px', 
                marginBottom: '1rem' 
              }}>
                <h4 style={{ marginTop: 0, color: '#1976d2' }}>Additional Details</h4>
                <p style={{ margin: 0, color: '#666' }}>
                  This content is only rendered when showDetails is true using the && operator.
                  It's perfect for optional content that appears/disappears based on state.
                </p>
              </div>
            )}

            {isLoggedIn && (
              <div style={{ 
                padding: '1rem', 
                background: theme === 'light' ? '#e8f5e8' : '#555', 
                borderRadius: '6px', 
                marginBottom: '1rem' 
              }}>
                <p style={{ margin: 0, color: '#388e3c' }}>
                  ✅ You are logged in! This message only appears for authenticated users.
                </p>
              </div>
            )}
            
            <div style={{ 
              padding: '0.75rem', 
              background: theme === 'light' ? '#f5f5f5' : '#555', 
              borderRadius: '4px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem' 
            }}>
              {`{showDetails && (
  <div>This only renders when showDetails is true</div>
)}

{isLoggedIn && (
  <p>Only visible to logged-in users</p>
)}`}
            </div>
          </div>

          {/* Switch/Case Pattern */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔄 Switch/Case Pattern - Multiple States</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Handle multiple conditions with different UI states
            </p>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setLoadingState('idle')}
                style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Idle
              </button>
              <button 
                onClick={simulateLoading}
                style={{ padding: '0.5rem 1rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Start Loading
              </button>
            </div>
            
            {/* Switch-like conditional rendering */}
            {(() => {
              switch(loadingState) {
                case 'loading':
                  return (
                    <div style={{ 
                      padding: '2rem', 
                      textAlign: 'center', 
                      background: theme === 'light' ? '#fff3cd' : '#555', 
                      borderRadius: '6px' 
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                      <p style={{ margin: 0, color: '#856404' }}>Loading data...</p>
                    </div>
                  );
                case 'success':
                  return (
                    <div style={{ 
                      padding: '2rem', 
                      textAlign: 'center', 
                      background: theme === 'light' ? '#e8f5e8' : '#555', 
                      borderRadius: '6px' 
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
                      <p style={{ margin: 0, color: '#388e3c' }}>Data loaded successfully!</p>
                    </div>
                  );
                case 'error':
                  return (
                    <div style={{ 
                      padding: '2rem', 
                      textAlign: 'center', 
                      background: theme === 'light' ? '#ffebee' : '#555', 
                      borderRadius: '6px' 
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
                      <p style={{ margin: 0, color: '#d32f2f' }}>Failed to load data. Please try again.</p>
                    </div>
                  );
                default:
                  return (
                    <div style={{ 
                      padding: '2rem', 
                      textAlign: 'center', 
                      background: theme === 'light' ? '#f5f5f5' : '#555', 
                      borderRadius: '6px' 
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💤</div>
                      <p style={{ margin: 0, color: '#666' }}>Ready to load data</p>
                    </div>
                  );
              }
            })()}
            
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: theme === 'light' ? '#f5f5f5' : '#555', 
              borderRadius: '4px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem' 
            }}>
              {`{(() => {
  switch(loadingState) {
    case 'loading': return <LoadingSpinner />;
    case 'success': return <SuccessMessage />;
    case 'error': return <ErrorMessage />;
    default: return <IdleState />;
  }
})()}`}
            </div>
          </div>

          {/* Role-Based Rendering */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>👤 Role-Based Conditional Rendering</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Show different content based on user role or permissions
            </p>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setUserRole('user')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: userRole === 'user' ? '#667eea' : '#ddd', 
                  color: userRole === 'user' ? 'white' : '#333', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                User
              </button>
              <button 
                onClick={() => setUserRole('moderator')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: userRole === 'moderator' ? '#667eea' : '#ddd', 
                  color: userRole === 'moderator' ? 'white' : '#333', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                Moderator
              </button>
              <button 
                onClick={() => setUserRole('admin')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: userRole === 'admin' ? '#667eea' : '#ddd', 
                  color: userRole === 'admin' ? 'white' : '#333', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                Admin
              </button>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              background: theme === 'light' ? '#f0f0f0' : '#555', 
              borderRadius: '6px', 
              marginBottom: '1rem' 
            }}>
              <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold' }}>
                Current Role: <StatusBadge status={userRole === 'admin' ? 'active' : userRole === 'moderator' ? 'pending' : 'inactive'} />
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </p>
              
              {/* Role-specific content */}
              <div>
                <p>✅ View content (All users)</p>
                {(userRole === 'moderator' || userRole === 'admin') && (
                  <p>✅ Moderate content (Moderator+)</p>
                )}
                {userRole === 'admin' && (
                  <>
                    <p>✅ Delete content (Admin only)</p>
                    <p>✅ Manage users (Admin only)</p>
                    <p>✅ Access admin panel (Admin only)</p>
                  </>
                )}
              </div>
            </div>
            
            <div style={{ 
              padding: '0.75rem', 
              background: theme === 'light' ? '#f5f5f5' : '#555', 
              borderRadius: '4px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem' 
            }}>
              {`// Basic role check
{userRole === 'admin' && <AdminPanel />}

// Multiple role check
{(userRole === 'moderator' || userRole === 'admin') && (
  <ModeratorTools />
)}

// Complex permissions
{hasPermission(user, 'DELETE_POSTS') && (
  <DeleteButton />
)}`}
            </div>
          </div>

          {/* List Conditional Rendering */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📋 List Conditional Rendering</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Handle empty states and dynamic lists
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={addNotification}
                style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add Notification
              </button>
              <button 
                onClick={clearNotifications}
                style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Clear All
              </button>
            </div>
            
            <NotificationList notifications={notifications} />
            
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: theme === 'light' ? '#f5f5f5' : '#555', 
              borderRadius: '4px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem' 
            }}>
              {`{notifications.length === 0 ? (
  <EmptyState message="No notifications" />
) : (
  notifications.map(notification => (
    <NotificationItem key={notification.id} {...notification} />
  ))
)}`}
            </div>
          </div>

          {/* Key Patterns Summary */}
          <div style={{ 
            padding: '1.5rem', 
            background: theme === 'light' ? 'white' : '#444', 
            borderRadius: '8px', 
            border: `2px solid ${theme === 'light' ? '#e0e0e0' : '#666'}` 
          }}>
            <h3 style={{ marginTop: 0, color: '#667eea' }}>🎯 Conditional Rendering Patterns</h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
                <strong>Ternary Operator</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#333' }}>
                  <code>{'{condition ? <A /> : <B />}'}</code><br/>
                  Choose between two components
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
                <strong>Logical && Operator</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#333' }}>
                  <code>{'{condition && <Component />}'}</code><br/>
                  Show component only if true
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
                <strong>Switch Pattern</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#333' }}>
                  <code>{'(() => { switch(state) {...} })()'}</code><br/>
                  Handle multiple states
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
                <strong>Early Return</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#333' }}>
                  <code>if (loading) return {'<Loading />'}</code><br/>
                  Exit early for special states
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConditionalrenderingExample;