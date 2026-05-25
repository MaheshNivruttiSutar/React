import { useState, useEffect, useRef } from 'react';

export const React19UseEffectHookExample = () => {
  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useEffect in React 19</h2>

        {/* Example 1: Basic useEffect */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>1. Basic useEffect - Component Mount</h3>
          <BasicEffectDemo />
        </div>

        {/* Example 2: Dependency Array */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>2. Dependency Array</h3>
          <DependencyArrayDemo />
        </div>

        {/* Example 3: Cleanup Function */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>3. Cleanup Function</h3>
          <CleanupDemo />
        </div>

        {/* Example 4: Data Fetching */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>4. Data Fetching with Cleanup</h3>
          <DataFetchingDemo />
        </div>

        {/* Example 5: Event Listeners */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>5. Event Listeners</h3>
          <EventListenerDemo />
        </div>

        {/* Example 6: React 19 Changes */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>6. React 19 useEffect Behavior</h3>
          <React19ChangesDemo />
        </div>
      </div>
    </div>
  );
};

// Example 1: Basic Effect
const BasicEffectDemo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('Component mounted!');
    setMounted(true);
  }, []); // Empty array = run once on mount

  return (
    <div>
      <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
        <p style={{ margin: 0, color: '#2e7d32' }}>
          Component mounted: <strong>{mounted ? 'Yes' : 'No'}</strong>
        </p>
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`useEffect(() => {
  console.log('Component mounted!');
  // Runs once after first render
}, []); // Empty dependency array`}
      </pre>
    </div>
  );
};

// Example 2: Dependency Array
const DependencyArrayDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [effectLog, setEffectLog] = useState([]);

  useEffect(() => {
    setEffectLog(prev => [...prev, `Count changed to: ${count}`]);
  }, [count]); // Only runs when count changes

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Count: {count}
        </button>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type name (no effect trigger)"
          style={{ padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '4px', flex: 1 }}
        />
      </div>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', maxHeight: '150px', overflow: 'auto' }}>
        <strong>Effect Log:</strong>
        {effectLog.slice(-5).map((log, i) => (
          <p key={i} style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>{log}</p>
        ))}
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Effect only runs when 'count' changes
useEffect(() => {
  console.log('Count changed to:', count);
}, [count]); // Dependency array with 'count'

// Typing in the name input does NOT trigger this effect`}
      </pre>
    </div>
  );
};

// Example 3: Cleanup Function
const CleanupDemo = () => {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowTimer(!showTimer)}
        style={{
          padding: '0.5rem 1rem',
          background: showTimer ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {showTimer ? 'Stop Timer' : 'Start Timer'}
      </button>

      {showTimer && <TimerComponent />}

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  // Cleanup function - runs on unmount
  return () => {
    console.log('Cleaning up interval');
    clearInterval(interval);
  };
}, []);`}
      </pre>
    </div>
  );
};

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Timer started');
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      console.log('Timer cleanup - interval cleared');
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px' }}>
      <p style={{ margin: 0, fontSize: '1.5rem', color: '#1976d2' }}>
        Timer: <strong>{seconds}</strong> seconds
      </p>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
        (Unmount to see cleanup in console)
      </p>
    </div>
  );
};

// Example 4: Data Fetching
const DataFetchingDemo = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchUser = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUsers = {
        1: { name: 'John Doe', email: 'john@example.com' },
        2: { name: 'Jane Smith', email: 'jane@example.com' },
        3: { name: 'Bob Wilson', email: 'bob@example.com' },
      };

      if (!isCancelled) {
        setUser(mockUsers[userId] || null);
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isCancelled = true; // Prevent state update after unmount
    };
  }, [userId]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {[1, 2, 3].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
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

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
        {loading ? (
          <p style={{ margin: 0, color: '#666' }}>Loading...</p>
        ) : user ? (
          <div>
            <p style={{ margin: '0 0 0.25rem 0' }}><strong>{user.name}</strong></p>
            <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
          </div>
        ) : (
          <p style={{ margin: 0, color: '#999' }}>No user found</p>
        )}
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`useEffect(() => {
  let isCancelled = false;  // Cleanup flag

  const fetchUser = async () => {
    const response = await fetch(\`/api/user/\${userId}\`);
    const data = await response.json();
    
    if (!isCancelled) {  // Only update if not cancelled
      setUser(data);
    }
  };

  fetchUser();

  return () => {
    isCancelled = true;  // Cancel on cleanup
  };
}, [userId]);`}
      </pre>
    </div>
  );
};

// Example 5: Event Listeners
const EventListenerDemo = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: '#2e7d32' }}>Window Size</p>
          <p style={{ margin: 0, color: '#388e3c' }}>
            {windowSize.width} x {windowSize.height}
          </p>
        </div>
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px' }}>
          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: '#1976d2' }}>Mouse Position</p>
          <p style={{ margin: 0, color: '#1565c0' }}>
            X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        </div>
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`useEffect(() => {
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);  // Cleanup!
  };
}, []);`}
      </pre>
    </div>
  );
};

// Example 6: React 19 Changes
const React19ChangesDemo = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log('Effect ran - render count:', renderCount.current);
  });

  return (
    <div>
      <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>React 19 useEffect Changes</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#f57c00' }}>
          <li>Strict Mode no longer double-invokes effects in production builds</li>
          <li>Better cleanup guarantees</li>
          <li>Improved error boundaries for effect errors</li>
          <li>Effects are batched more efficiently</li>
        </ul>
      </div>

      <div style={{ background: '#fce4ec', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#c2185b' }}>Best Practices in React 19</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#ad1457' }}>
          <li>Always include cleanup for subscriptions/timers</li>
          <li>Use AbortController for fetch requests</li>
          <li>Consider using the new <code>use()</code> hook for data fetching</li>
          <li>Prefer event handlers over effects when possible</li>
        </ul>
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// React 19: Use AbortController for fetch
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    });

  return () => controller.abort();
}, []);`}
      </pre>
    </div>
  );
};

export default React19UseEffectHookExample;
