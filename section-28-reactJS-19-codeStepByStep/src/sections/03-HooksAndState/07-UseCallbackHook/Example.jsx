import { useState, useCallback, memo } from 'react';

const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`${label} rendered`);
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1.5rem',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        margin: '0.25rem',
      }}
    >
      {label}
    </button>
  );
});

export const UseCallbackHookExample = () => {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const incrementWithoutCallback = () => {
    setCount(c => c + 1);
  };

  const incrementWithCallback = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  const removeItem = useCallback((index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useCallback Hook</h2>

        {/* What is useCallback */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useCallback?</h3>
          <p style={{ color: '#666' }}>
            useCallback memoizes a function so it keeps the same reference between renders, 
            unless its dependencies change. This prevents unnecessary re-renders when passing 
            callbacks to memoized child components.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Without useCallback - new function every render
const handleClick = () => { ... };

// With useCallback - same function reference
const handleClick = useCallback(() => {
  // function body
}, [dependencies]);`}
          </pre>
        </div>

        {/* Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Re-render Demo (check console)</h3>
          
          <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', marginBottom: '1rem' }}>
            <strong>Open DevTools Console</strong> to see which buttons re-render when you click
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Count</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{count}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Other Count</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>{otherCount}</div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Without useCallback (re-renders on ANY state change):</p>
            <ExpensiveChild onClick={incrementWithoutCallback} label="Without useCallback" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>With useCallback (only re-renders when deps change):</p>
            <ExpensiveChild onClick={incrementWithCallback} label="With useCallback" />
          </div>

          <button
            onClick={() => setOtherCount(c => c + 1)}
            style={{ padding: '0.75rem 1.5rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Increment Other Count (causes re-render)
          </button>
        </div>

        {/* List Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>List with Callbacks</h3>
          
          <button onClick={addItem} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>
            Add Item
          </button>

          <div>
            {items.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: '#f5f5f5', marginBottom: '0.25rem', borderRadius: '4px' }}>
                <span>{item}</span>
                <button onClick={() => removeItem(index)} style={{ padding: '0.25rem 0.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`const addItem = useCallback(() => {
  setItems(prev => [...prev, newItem]);
}, []);

const removeItem = useCallback((index) => {
  setItems(prev => prev.filter((_, i) => i !== index));
}, []);`}
          </pre>
        </div>

        {/* When to Use */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>When to Use useCallback</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>Use when:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Passing callback to React.memo child</li>
                <li>Callback is a useEffect dependency</li>
                <li>Callback used in custom hook</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px' }}>
              <strong>Don't overuse:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Not all callbacks need it</li>
                <li>Adds complexity</li>
                <li>Has its own overhead</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackHookExample;
