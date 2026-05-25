import { useState } from 'react';

export const WhatIsStateExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [items, setItems] = useState(['Apple', 'Banana']);
  const [user, setUser] = useState({ name: '', email: '' });

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>What is State?</h2>

        {/* Explanation */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Understanding State</h3>
          
          <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              <strong>State</strong> is data that changes over time and affects what the component renders.
              When state changes, React re-renders the component with the new data.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
              <strong>Props</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                Passed from parent, read-only
              </p>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>State</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                Owned by component, can change
              </p>
            </div>
          </div>
        </div>

        {/* Number State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Number State (Counter)</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>{count}</div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={() => setCount(count - 1)} style={{ padding: '0.75rem 1.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>-1</button>
              <button onClick={() => setCount(0)} style={{ padding: '0.75rem 1.5rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</button>
              <button onClick={() => setCount(count + 1)} style={{ padding: '0.75rem 1.5rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+1</button>
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [count, setCount] = useState(0);

// Update state
setCount(count + 1);  // Add 1
setCount(0);          // Reset
setCount(prev => prev + 1);  // Functional update`}
          </pre>
        </div>

        {/* String State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>String State (Text Input)</h3>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #667eea', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box', marginBottom: '1rem' }}
          />
          
          <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px', marginBottom: '1rem' }}>
            Hello, <strong>{name || 'stranger'}</strong>! 👋
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [name, setName] = useState('');

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
          </pre>
        </div>

        {/* Boolean State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Boolean State (Toggle)</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setIsOn(!isOn)}
              style={{
                width: '80px',
                padding: '0.75rem',
                background: isOn ? '#4caf50' : '#e0e0e0',
                color: isOn ? 'white' : '#333',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
            >
              {isOn ? 'ON' : 'OFF'}
            </button>
            <span style={{ fontSize: '1.25rem' }}>{isOn ? '💡' : '🌑'}</span>
          </div>

          {isOn && (
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', marginBottom: '1rem' }}>
              The light is on! This content only shows when isOn is true.
            </div>
          )}

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [isOn, setIsOn] = useState(false);

<button onClick={() => setIsOn(!isOn)}>
  {isOn ? 'ON' : 'OFF'}
</button>

{isOn && <div>Light is on!</div>}`}
          </pre>
        </div>

        {/* Array State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Array State (List)</h3>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => setItems([...items, `Item ${items.length + 1}`])} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add Item</button>
            <button onClick={() => setItems(items.slice(0, -1))} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Remove Last</button>
            <button onClick={() => setItems(['Apple', 'Banana'])} style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
          </div>

          <ul style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '1rem' }}>
            {items.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [items, setItems] = useState(['Apple', 'Banana']);

// Add item (create new array)
setItems([...items, 'Cherry']);

// Remove item
setItems(items.filter((_, i) => i !== index));

// Update item
setItems(items.map((item, i) => 
  i === index ? newValue : item
));`}
          </pre>
        </div>

        {/* Object State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Object State (Form)</h3>
          
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              style={{ padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{ padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '1rem' }}>
            <strong>Current User:</strong><br />
            Name: {user.name || '(empty)'}<br />
            Email: {user.email || '(empty)'}
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [user, setUser] = useState({ name: '', email: '' });

// Update one field (spread existing, then override)
setUser({ ...user, name: 'John' });

// Or use functional update
setUser(prev => ({ ...prev, email: 'john@example.com' }));`}
          </pre>
        </div>

        {/* Key Points */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Key Points About State</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'State is immutable', desc: 'Never mutate directly, always create new values' },
              { title: 'Updates trigger re-renders', desc: 'Component re-renders when state changes' },
              { title: 'State is local', desc: 'Each component instance has its own state' },
              { title: 'Use functional updates', desc: 'When new state depends on previous state' },
            ].map(item => (
              <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>{item.title}</strong>: {item.desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsStateExample;
