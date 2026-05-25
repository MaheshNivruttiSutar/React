import { createContext, useState, useContext, use } from 'react';

// Create Contexts
const ThemeContext = createContext('light');
const UserContext = createContext(null);
const CounterContext = createContext(null);

export const ContextAPIInReact19Example = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John Doe', role: 'Admin' });
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem', background: theme === 'light' ? '#fafafa' : '#1a1a2e', minHeight: '100vh', transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Context API in React 19</h2>

        {/* Example 1: Basic Context with useContext */}
        <div style={{ background: theme === 'light' ? 'white' : '#16213e', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: theme === 'light' ? '#333' : '#eee', marginTop: 0 }}>1. Theme Context (Traditional useContext)</h3>
          
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.75rem 1.5rem',
              background: theme === 'light' ? '#333' : '#fff',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            Toggle Theme: {theme}
          </button>

          <ThemeContext.Provider value={theme}>
            <ThemedCard />
          </ThemeContext.Provider>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// Traditional approach with useContext
const theme = useContext(ThemeContext);

// React 19: Provider as Context directly
<ThemeContext value={theme}>  {/* New in React 19! */}
  <ThemedCard />
</ThemeContext>`}
          </pre>
        </div>

        {/* Example 2: React 19 use() Hook */}
        <div style={{ background: theme === 'light' ? 'white' : '#16213e', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: theme === 'light' ? '#333' : '#eee', marginTop: 0 }}>2. React 19's use() Hook</h3>
          <p style={{ color: theme === 'light' ? '#666' : '#aaa' }}>
            The new <code>use()</code> hook can read context and can be called conditionally!
          </p>

          <UserContext.Provider value={user}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h4 style={{ color: theme === 'light' ? '#333' : '#eee', margin: '0 0 0.5rem 0' }}>useContext (Traditional)</h4>
                <UserCardTraditional />
              </div>
              <div>
                <h4 style={{ color: theme === 'light' ? '#333' : '#eee', margin: '0 0 0.5rem 0' }}>use() Hook (React 19)</h4>
                <UserCardReact19 />
              </div>
            </div>
          </UserContext.Provider>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// Traditional - must be at top level
const user = useContext(UserContext);

// React 19 - can be conditional!
function Component({ showUser }) {
  if (showUser) {
    const user = use(UserContext);  // Works inside conditions!
    return <p>{user.name}</p>;
  }
  return <p>No user</p>;
}`}
          </pre>
        </div>

        {/* Example 3: Multiple Contexts */}
        <div style={{ background: theme === 'light' ? 'white' : '#16213e', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: theme === 'light' ? '#333' : '#eee', marginTop: 0 }}>3. Multiple Contexts</h3>
          
          <ThemeContext.Provider value={theme}>
            <UserContext.Provider value={user}>
              <CounterContext.Provider value={{ count, setCount }}>
                <Dashboard />
              </CounterContext.Provider>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </div>

        {/* Example 4: Context with Reducer Pattern */}
        <div style={{ background: theme === 'light' ? 'white' : '#16213e', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: theme === 'light' ? '#333' : '#eee', marginTop: 0 }}>4. React 19: Context as Provider</h3>
          <p style={{ color: theme === 'light' ? '#666' : '#aaa' }}>
            In React 19, you can use Context directly as Provider (no need for .Provider)
          </p>

          {/* React 19 new syntax - Context directly as Provider */}
          <ThemeContext.Provider value={theme}>
            <NewProviderSyntaxDemo />
          </ThemeContext.Provider>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// Before React 19
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// React 19 - Context can be used directly as provider
<ThemeContext value={theme}>
  <App />
</ThemeContext>

// Note: .Provider still works for backward compatibility`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Traditional useContext approach
const ThemedCard = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{
      padding: '1rem',
      background: theme === 'light' ? '#e3f2fd' : '#0f3460',
      color: theme === 'light' ? '#1976d2' : '#e94560',
      borderRadius: '6px',
    }}>
      <p style={{ margin: 0 }}>
        This card uses the <strong>{theme}</strong> theme from context!
      </p>
    </div>
  );
};

// Traditional useContext
const UserCardTraditional = () => {
  const user = useContext(UserContext);
  
  return (
    <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
      <p style={{ margin: 0, color: '#2e7d32' }}>
        <strong>{user?.name}</strong>
      </p>
      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#388e3c' }}>
        Role: {user?.role}
      </p>
    </div>
  );
};

// React 19 use() hook
const UserCardReact19 = () => {
  // use() can be called conditionally unlike useContext!
  const user = use(UserContext);
  
  return (
    <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px' }}>
      <p style={{ margin: 0, color: '#e65100' }}>
        <strong>{user?.name}</strong>
      </p>
      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#f57c00' }}>
        Role: {user?.role}
      </p>
    </div>
  );
};

// Dashboard using multiple contexts
const Dashboard = () => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const { count, setCount } = useContext(CounterContext);

  return (
    <div style={{
      background: theme === 'light' ? '#f5f5f5' : '#0f3460',
      padding: '1rem',
      borderRadius: '6px',
    }}>
      <p style={{ margin: '0 0 0.5rem 0', color: theme === 'light' ? '#333' : '#eee' }}>
        Welcome, <strong>{user.name}</strong>!
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={() => setCount(c => c - 1)}
          style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ color: theme === 'light' ? '#333' : '#eee', fontWeight: 'bold' }}>
          Count: {count}
        </span>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Demo for new Provider syntax
const NewProviderSyntaxDemo = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{
      background: theme === 'light' ? '#fce4ec' : '#4a148c',
      padding: '1rem',
      borderRadius: '6px',
      color: theme === 'light' ? '#c2185b' : '#f8bbd9',
    }}>
      <p style={{ margin: 0 }}>
        Current theme: <strong>{theme}</strong>
      </p>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
        (Works with both old .Provider and new direct syntax)
      </p>
    </div>
  );
};

export default ContextAPIInReact19Example;
