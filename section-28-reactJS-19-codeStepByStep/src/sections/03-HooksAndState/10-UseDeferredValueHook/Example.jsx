import { useState, useDeferredValue, useMemo } from 'react';

const SlowList = ({ text }) => {
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 5000; i++) {
      if (`Item ${i}`.toLowerCase().includes(text.toLowerCase()) || !text) {
        list.push(<div key={i} style={{ padding: '0.25rem', borderBottom: '1px solid #eee' }}>Item {i}</div>);
      }
    }
    return list.slice(0, 100);
  }, [text]);

  return (
    <div style={{ maxHeight: '200px', overflow: 'auto', background: '#f5f5f5', borderRadius: '6px', padding: '0.5rem' }}>
      {items.length > 0 ? items : <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>No matches found</div>}
    </div>
  );
};

export const UseDeferredValueHookExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isStale = searchTerm !== deferredSearchTerm;

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useDeferredValue Hook</h2>

        {/* What is useDeferredValue */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useDeferredValue?</h3>
          <p style={{ color: '#666' }}>
            useDeferredValue accepts a value and returns a "deferred" version that may lag behind.
            During urgent updates, the deferred value keeps its previous value, preventing expensive re-renders.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// query updates immediately (input is responsive)
// deferredQuery lags behind during heavy renders

<input value={query} onChange={e => setQuery(e.target.value)} />
<SlowList text={deferredQuery} />`}
          </pre>
        </div>

        {/* Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Live Demo</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Type quickly to see the deferred value lag behind the input. The input stays responsive.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to filter items..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #667eea',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Current Value:</div>
              <div style={{ fontWeight: 'bold', color: '#1976d2' }}>"{searchTerm}"</div>
            </div>
            <div style={{ padding: '0.75rem', background: isStale ? '#fff3e0' : '#e8f5e9', borderRadius: '6px', transition: 'background 0.2s' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Deferred Value:</div>
              <div style={{ fontWeight: 'bold', color: isStale ? '#e65100' : '#388e3c' }}>
                "{deferredSearchTerm}" {isStale && '(updating...)'}
              </div>
            </div>
          </div>

          <div style={{ opacity: isStale ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <SlowList text={deferredSearchTerm} />
          </div>
        </div>

        {/* vs useTransition */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>useDeferredValue vs useTransition</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>useDeferredValue</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Works with values (props, state)</li>
                <li>No control over when update happens</li>
                <li>Better for values you don't control</li>
                <li>Simpler API</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#388e3c' }}>useTransition</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Wraps state setters</li>
                <li>Returns isPending flag</li>
                <li>Better when you control the update</li>
                <li>More control</li>
              </ul>
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`// useDeferredValue - for values
const deferredValue = useDeferredValue(externalValue);
<ExpensiveComponent value={deferredValue} />

// useTransition - for state updates
const [isPending, startTransition] = useTransition();
startTransition(() => setState(newValue));`}
          </pre>
        </div>

        {/* When to Use */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>When to Use</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'Props from parent', desc: 'When you can\'t wrap the setter in startTransition' },
              { title: 'Search filtering', desc: 'Keep input responsive while filtering' },
              { title: 'Showing stale data', desc: 'Better than blank during update' },
              { title: 'Expensive child renders', desc: 'Defer rendering heavy components' },
            ].map(item => (
              <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>{item.title}</strong>
                <span style={{ color: '#666', marginLeft: '0.5rem' }}>— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseDeferredValueHookExample;
