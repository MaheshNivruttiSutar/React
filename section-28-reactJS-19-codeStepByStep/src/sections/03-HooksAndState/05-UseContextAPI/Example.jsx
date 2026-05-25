import { useState, createContext, useContext } from 'react';

const ThemeContext = createContext('light');
const UserContext = createContext(null);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        background: theme === 'dark' ? '#fff' : '#333',
        color: theme === 'dark' ? '#333' : '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

const ThemedCard = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <div style={{
      padding: '1.5rem',
      background: isDark ? '#2d2d2d' : 'white',
      color: isDark ? '#fff' : '#333',
      borderRadius: '8px',
      border: `1px solid ${isDark ? '#444' : '#ddd'}`,
      marginBottom: '1rem',
    }}>
      {title && <h4 style={{ marginTop: 0, color: isDark ? '#90caf9' : '#1976d2' }}>{title}</h4>}
      {children}
    </div>
  );
};

const UserGreeting = () => {
  const user = useContext(UserContext);
  return user ? (
    <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
      Welcome back, <strong>{user.name}</strong>! ({user.role})
    </div>
  ) : (
    <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px' }}>
      Please log in to continue.
    </div>
  );
};

const DeepNestedComponent = () => {
  const { theme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <div style={{
      padding: '1rem',
      background: theme === 'dark' ? '#424242' : '#f5f5f5',
      borderRadius: '6px',
      marginTop: '0.5rem',
    }}>
      <strong>Deeply Nested Component</strong>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
        Theme: {theme} | User: {user?.name || 'Guest'}
      </p>
      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
        I accessed context without props drilling!
      </p>
    </div>
  );
};

const MiddleComponent = () => (
  <div style={{ padding: '1rem', border: '1px dashed #999', borderRadius: '6px' }}>
    <strong>Middle Component</strong> (no props passed)
    <DeepNestedComponent />
  </div>
);

export const UseContextAPIExample = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const login = () => setUser({ name: 'John Doe', role: 'Admin' });
  const logout = () => setUser(null);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={user}>
        <div style={{
          padding: '2rem',
          background: isDark ? '#1a1a1a' : '#fafafa',
          minHeight: '100vh',
          color: isDark ? '#fff' : '#333',
          transition: 'all 0.3s',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#667eea', margin: 0 }}>useContext API</h2>
              <ThemeToggle />
            </div>

            {/* What is Context */}
            <ThemedCard title="What is Context?">
              <p style={{ margin: 0 }}>
                Context provides a way to pass data through the component tree without 
                having to pass props manually at every level. Ideal for "global" data 
                like themes, user auth, or language preferences.
              </p>
            </ThemedCard>

            {/* User Context Demo */}
            <ThemedCard title="User Context Demo">
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button onClick={login} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Log In
                </button>
                <button onClick={logout} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Log Out
                </button>
              </div>
              <UserGreeting />
            </ThemedCard>

            {/* Props Drilling vs Context */}
            <ThemedCard title="Avoiding Props Drilling">
              <p style={{ marginTop: 0 }}>
                Without context, you'd need to pass theme and user through every component.
                With context, nested components access values directly.
              </p>
              <MiddleComponent />
            </ThemedCard>

            {/* How to Use */}
            <ThemedCard title="How to Use Context">
              <pre style={{
                background: isDark ? '#1e1e1e' : '#f5f5f5',
                color: isDark ? '#d4d4d4' : '#333',
                padding: '1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                overflow: 'auto',
              }}>
{`// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Context (in parent)
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>

// 3. Consume Context (in any child)
const { theme, toggleTheme } = useContext(ThemeContext);`}
              </pre>
            </ThemedCard>

            {/* Best Practices */}
            <ThemedCard title="Best Practices">
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { tip: 'Use for global state', desc: 'Theme, auth, language, etc.' },
                  { tip: 'Don\'t overuse', desc: 'Not every state needs context' },
                  { tip: 'Split contexts', desc: 'Separate theme from user from settings' },
                  { tip: 'Memoize values', desc: 'Prevent unnecessary re-renders' },
                ].map(item => (
                  <div key={item.tip} style={{ padding: '0.75rem', background: isDark ? '#333' : '#f0f0f0', borderRadius: '4px' }}>
                    <strong>{item.tip}</strong>
                    <span style={{ color: isDark ? '#aaa' : '#666', marginLeft: '0.5rem' }}>— {item.desc}</span>
                  </div>
                ))}
              </div>
            </ThemedCard>
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default UseContextAPIExample;
