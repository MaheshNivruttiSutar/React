import { useState, useEffect } from 'react';

const ChildComponent = ({ name, onUnmount }) => {
  useEffect(() => {
    console.log(`[${name}] Component MOUNTED`);
    
    return () => {
      console.log(`[${name}] Component will UNMOUNT`);
      if (onUnmount) onUnmount(name);
    };
  }, [name, onUnmount]);

  useEffect(() => {
    console.log(`[${name}] Component UPDATED`);
  });

  return (
    <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '0.5rem' }}>
      <strong>{name}</strong> is mounted
    </div>
  );
};

export const UseEffectForLifecycleExample = () => {
  const [showChild, setShowChild] = useState(true);
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [children, setChildren] = useState(['Child-A']);

  const addLog = (message) => {
    setLogs(prev => [...prev, { id: Date.now(), message, time: new Date().toLocaleTimeString() }].slice(-10));
  };

  useEffect(() => {
    addLog('Parent: componentDidMount equivalent');
    return () => addLog('Parent: componentWillUnmount equivalent');
  }, []);

  useEffect(() => {
    addLog(`Parent: componentDidUpdate - count is now ${count}`);
  }, [count]);

  const addChild = () => {
    const newName = `Child-${String.fromCharCode(65 + children.length)}`;
    setChildren(prev => [...prev, newName]);
  };

  const removeChild = () => {
    if (children.length > 0) {
      setChildren(prev => prev.slice(0, -1));
    }
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useEffect for Lifecycle Methods</h2>

        {/* Lifecycle Log */}
        <div style={{ ...cardStyle, background: '#1e1e1e', color: '#d4d4d4', position: 'sticky', top: '1rem', zIndex: 10 }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#4caf50' }}>Lifecycle Log (check console too)</h4>
          <div style={{ maxHeight: '100px', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#666' }}>Interact with components to see lifecycle events...</div>
            ) : (
              logs.slice(-6).map(log => (
                <div key={log.id}>
                  <span style={{ color: '#666' }}>[{log.time}]</span> {log.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lifecycle Mapping */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Class Lifecycle → useEffect Mapping</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>componentDidMount</h4>
              <pre style={{ margin: 0, fontSize: '0.8rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
{`useEffect(() => {
  // Runs ONCE after mount
}, []); // Empty deps`}
              </pre>
            </div>
            
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#388e3c' }}>componentDidUpdate</h4>
              <pre style={{ margin: 0, fontSize: '0.8rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
{`useEffect(() => {
  // Runs on mount + when deps change
}, [dep1, dep2]);`}
              </pre>
            </div>
            
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>componentWillUnmount</h4>
              <pre style={{ margin: 0, fontSize: '0.8rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
{`useEffect(() => {
  return () => {
    // Cleanup on unmount
  };
}, []);`}
              </pre>
            </div>
            
            <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#c2185b' }}>Every Render</h4>
              <pre style={{ margin: 0, fontSize: '0.8rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
{`useEffect(() => {
  // Runs after EVERY render
}); // No deps array`}
              </pre>
            </div>
          </div>
        </div>

        {/* Mount/Unmount Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Mount/Unmount Demo</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setShowChild(!showChild)}
              style={{
                padding: '0.75rem 1.5rem',
                background: showChild ? '#f44336' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {showChild ? 'Unmount Child' : 'Mount Child'}
            </button>
          </div>

          {showChild && (
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong>Child Component</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                I have mounted! Check the log above. When you click "Unmount", my cleanup function will run.
              </p>
            </div>
          )}

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`useEffect(() => {
  console.log('Child MOUNTED');
  
  return () => {
    console.log('Child UNMOUNTED (cleanup)');
  };
}, []);`}
          </pre>
        </div>

        {/* Update Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Update Demo (Dependency Changes)</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button onClick={() => setCount(c => c - 1)} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-1</button>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>{count}</span>
            <button onClick={() => setCount(c => c + 1)} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+1</button>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`useEffect(() => {
  console.log('Count changed to:', count);
  // This runs on mount AND when count changes
}, [count]);`}
          </pre>
        </div>

        {/* Multiple Children Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple Children (Mount/Unmount Order)</h3>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button onClick={addChild} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Child</button>
            <button onClick={removeChild} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove Child</button>
          </div>

          <div>
            {children.map(name => (
              <ChildComponent
                key={name}
                name={name}
                onUnmount={(n) => addLog(`${n} unmounted`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseEffectForLifecycleExample;
