import { useState, useTransition, useDeferredValue, Suspense, use } from 'react';

// Simulated data fetching
const createResource = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (data) => { status = 'success'; result = data; },
    (error) => { status = 'error'; result = error; }
  );
  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    }
  };
};

const fetchUserData = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
        2: { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
        3: { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager' },
      };
      resolve(users[userId] || { id: userId, name: 'Unknown', email: 'N/A', role: 'N/A' });
    }, 1000);
  });
};

export const React19APIWithExampleExample = () => {
  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>React 19 APIs with Examples</h2>

        {/* Example 1: use() Hook */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>1. use() Hook - Reading Promises & Context</h3>
          <UseHookDemo />
        </div>

        {/* Example 2: useTransition */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>2. useTransition - Non-blocking Updates</h3>
          <UseTransitionDemo />
        </div>

        {/* Example 3: useDeferredValue */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>3. useDeferredValue - Deferred Rendering</h3>
          <UseDeferredValueDemo />
        </div>

        {/* Example 4: Suspense */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>4. Suspense for Data Fetching</h3>
          <SuspenseDemo />
        </div>

        {/* Example 5: React 19 API Summary */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>5. React 19 New APIs Overview</h3>
          <APISummary />
        </div>
      </div>
    </div>
  );
};

// Example 1: use() Hook
const UseHookDemo = () => {
  const [showData, setShowData] = useState(false);

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        The <code>use()</code> hook can read Promises and Context conditionally:
      </p>

      <button
        onClick={() => setShowData(!showData)}
        style={{
          padding: '0.5rem 1rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {showData ? 'Hide' : 'Show'} Data
      </button>

      {showData && (
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          <Suspense fallback={<p style={{ margin: 0 }}>Loading user data...</p>}>
            <UserDataWithUse userId={1} />
          </Suspense>
        </div>
      )}

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// use() can be called conditionally (unlike useContext)
function Component({ showUser }) {
  if (!showUser) return null;
  
  const user = use(userPromise);  // Read Promise
  const theme = use(ThemeContext);  // Read Context
  
  return <p>{user.name}</p>;
}

// use() with Promise
function UserProfile({ userPromise }) {
  const user = use(userPromise);  // Suspends until resolved
  return <div>{user.name}</div>;
}`}
      </pre>
    </div>
  );
};

const UserDataWithUse = ({ userId }) => {
  // In real app, this promise would come from parent or cache
  const userPromise = fetchUserData(userId);
  
  // Simulating use() behavior with resource pattern
  // Note: In React 19, you'd use: const user = use(userPromise);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    userPromise.then(data => {
      setUser(data);
      setLoading(false);
    });
  });

  if (loading) return <p style={{ margin: 0 }}>Loading...</p>;

  return (
    <div>
      <p style={{ margin: '0 0 0.25rem 0' }}><strong>{user?.name}</strong></p>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{user?.email}</p>
    </div>
  );
};

// Example 2: useTransition
const UseTransitionDemo = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('home');
  const [items, setItems] = useState([]);

  const handleTabChange = (newTab) => {
    // Urgent: Update tab immediately
    setTab(newTab);
    
    // Non-urgent: Generate list in background
    startTransition(() => {
      const newItems = Array.from({ length: 5000 }, (_, i) => `${newTab} item ${i + 1}`);
      setItems(newItems);
    });
  };

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        useTransition marks state updates as non-urgent, keeping UI responsive:
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['home', 'profile', 'settings'].map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            style={{
              padding: '0.5rem 1rem',
              background: tab === t ? '#667eea' : '#e0e0e0',
              color: tab === t ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {isPending && (
        <p style={{ color: '#667eea', fontStyle: 'italic' }}>Loading content...</p>
      )}

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', maxHeight: '150px', overflow: 'auto', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
          Tab: {tab} ({items.length} items)
        </p>
        {items.slice(0, 10).map((item, i) => (
          <p key={i} style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>{item}</p>
        ))}
        {items.length > 10 && <p style={{ color: '#999' }}>... and {items.length - 10} more</p>}
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`const [isPending, startTransition] = useTransition();

function handleClick() {
  // Urgent update - runs immediately
  setInputValue(input);
  
  // Non-urgent update - can be interrupted
  startTransition(() => {
    setSearchResults(filterItems(input));
  });
}

// isPending is true while transition is running`}
      </pre>
    </div>
  );
};

// Example 3: useDeferredValue
const UseDeferredValueDemo = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  const isStale = query !== deferredQuery;

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        useDeferredValue defers updating a value until urgent updates complete:
      </p>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to search..."
        style={{
          padding: '0.75rem',
          border: '2px solid #667eea',
          borderRadius: '4px',
          width: '100%',
          boxSizing: 'border-box',
          marginBottom: '1rem',
        }}
      />

      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '6px', 
        maxHeight: '150px', 
        overflow: 'auto',
        marginBottom: '1rem',
        opacity: isStale ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
          Results: {filteredItems.length} {isStale && '(updating...)'}
        </p>
        {filteredItems.slice(0, 10).map((item, i) => (
          <p key={i} style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>{item}</p>
        ))}
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// query updates immediately (input stays responsive)
// deferredQuery updates with lower priority (list can lag)

const isStale = query !== deferredQuery;
// Show loading indicator when values differ`}
      </pre>
    </div>
  );
};

// Example 4: Suspense
const SuspenseDemo = () => {
  const [userId, setUserId] = useState(1);
  const [resource, setResource] = useState(() => createResource(fetchUserData(1)));

  const handleUserChange = (id) => {
    setUserId(id);
    setResource(createResource(fetchUserData(id)));
  };

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        Suspense shows fallback UI while async content loads:
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {[1, 2, 3].map(id => (
          <button
            key={id}
            onClick={() => handleUserChange(id)}
            style={{
              padding: '0.5rem 1rem',
              background: userId === id ? '#667eea' : '#e0e0e0',
              color: userId === id ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      <Suspense fallback={
        <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px' }}>
          <p style={{ margin: 0, color: '#e65100' }}>Loading user profile...</p>
        </div>
      }>
        <UserProfile resource={resource} />
      </Suspense>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`<Suspense fallback={<LoadingSpinner />}>
  <UserProfile userId={userId} />
</Suspense>

// Inside UserProfile
function UserProfile({ userId }) {
  const user = use(fetchUser(userId));  // Suspends!
  return <div>{user.name}</div>;
}`}
      </pre>
    </div>
  );
};

const UserProfile = ({ resource }) => {
  const user = resource.read();

  return (
    <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>{user.name}</h4>
      <p style={{ margin: '0 0 0.25rem 0', color: '#388e3c' }}>{user.email}</p>
      <p style={{ margin: 0, color: '#4caf50', fontSize: '0.9rem' }}>Role: {user.role}</p>
    </div>
  );
};

// Example 5: API Summary
const APISummary = () => {
  return (
    <div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>use()</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#1565c0' }}>
            Read Promises and Context. Can be called conditionally unlike other hooks.
          </p>
        </div>

        <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>useTransition()</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#388e3c' }}>
            Mark state updates as non-urgent. Returns [isPending, startTransition].
          </p>
        </div>

        <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>useDeferredValue()</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#f57c00' }}>
            Defer updating a value. Great for search inputs with heavy filtering.
          </p>
        </div>

        <div style={{ background: '#fce4ec', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#c2185b' }}>Suspense</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#ad1457' }}>
            Show fallback while async content loads. Works with use() and lazy().
          </p>
        </div>

        <div style={{ background: '#f3e5f5', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#7b1fa2' }}>useOptimistic()</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#8e24aa' }}>
            Show optimistic UI while async action completes. Auto-reverts on error.
          </p>
        </div>

        <div style={{ background: '#e0f2f1', padding: '1rem', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#00695c' }}>useActionState()</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#00897b' }}>
            Manage form state with actions. Handles pending state automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React19APIWithExampleExample;
